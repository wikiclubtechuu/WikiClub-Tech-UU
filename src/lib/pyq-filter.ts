// The filtering algorithm for the PYQ tool. Pure functions, no React.
//
// How it works:
//  1. Nothing is hardcoded for Subject / Year. Their dropdown options are built from the
//     papers that were uploaded. Semester / Exam / Course / Session start from a standard
//     list (FILTER_FIELDS[].base) and are merged with whatever the data contains.
//  2. Filters are independent and optional ("All" by default). Picking only a Subject shows
//     that subject's papers across ALL semesters and years. Picking only an Exam Type or
//     Semester works too, so students can browse without choosing a subject.
//  3. Every dropdown's options and counts are computed from the papers that match the
//     OTHER filters (faceted filtering). So a student can never pick a combination that
//     returns nothing: those options are disabled with no count.
//  4. If changing one filter makes an earlier choice impossible, that choice is cleared.
import type { FilterKey, Paper, Selection, SortMode } from "../types/pyq";

export interface FilterField {
  key: FilterKey;
  label: string;
  allLabel: string;
  /** Sort options as numbers instead of text. */
  numeric?: boolean;
  /** Newest first (used for Year). */
  descending?: boolean;
  /** Always-shown standard options (merged with the uploaded data). */
  base?: string[];
  /** How to display a stored value, e.g. 3 -> "Semester 3". */
  format?: (value: string) => string;
}

// Order here = order of the dropdowns on the page.
export const FILTER_FIELDS: FilterField[] = [
  { key: "subject", label: "Subject", allLabel: "All subjects" },
  {
    key: "sem",
    label: "Semester",
    allLabel: "All semesters",
    numeric: true,
    base: ["1", "2", "3", "4", "5", "6", "7", "8"],
    format: (v) => `Semester ${v}`,
  },
  { key: "year", label: "Year", allLabel: "All years", numeric: true, descending: true },
  {
    key: "exam",
    label: "Exam Type",
    allLabel: "All exam types",
    base: ["Mid 1", "Mid 2", "Make-up", "End Term", "Summer Semester"],
  },
  {
    key: "course",
    label: "Course",
    allLabel: "All courses",
    base: ["B.Tech", "BCA", "MCA", "Diploma"],
  },
  { key: "branch", label: "Branch / Specialization", allLabel: "All branches" },
  { key: "session", label: "Session", allLabel: "All sessions", base: ["Odd", "Even"] },
];

export interface FilterOption {
  value: string;
  label: string;
  /** Papers that match if this option is picked. 0 = disabled in the UI. */
  count: number;
}

/** Lower-case, trim and collapse spaces so "COA", "coa " and "Coa" are one subject. */
export const normalize = (v: unknown) =>
  String(v ?? "").trim().toLowerCase().replace(/\s+/g, " ");

/** The comparable value of a paper for a filter. */
export function valueOf(p: Paper, key: FilterKey): string {
  if (key === "subject") return normalize(p.subject);
  const v = p[key];
  return v == null ? "" : String(v).trim();
}

/** normalized subject -> display name (the first spelling found in the data). */
export function subjectLabels(papers: Paper[]): Record<string, string> {
  const labels: Record<string, string> = {};
  for (const p of papers) {
    const n = normalize(p.subject);
    if (n && !labels[n]) labels[n] = p.subject.trim();
  }
  return labels;
}

/** Papers that match the search text and every selected filter except `skip`. */
export function matchPapers(
  papers: Paper[],
  selection: Selection,
  query: string,
  skip?: FilterKey
): Paper[] {
  const q = normalize(query);
  return papers.filter(
    (p) =>
      (!q || normalize(p.subject).includes(q)) &&
      FILTER_FIELDS.every(
        ({ key }) => key === skip || !selection[key] || valueOf(p, key) === selection[key]
      )
  );
}

/** Dropdown options for one filter, with counts based on the other selected filters. */
export function getOptions(
  papers: Paper[],
  field: FilterField,
  selection: Selection,
  query: string,
  labels: Record<string, string>
): FilterOption[] {
  const counts = new Map<string, number>((field.base ?? []).map((v) => [v, 0]));
  for (const p of matchPapers(papers, selection, query, field.key)) {
    const v = valueOf(p, field.key);
    if (v) counts.set(v, (counts.get(v) ?? 0) + 1);
  }
  const text = (v: string) =>
    field.key === "subject" ? labels[v] ?? v : field.format ? field.format(v) : v;

  return [...counts]
    .sort(([a], [b]) =>
      field.numeric
        ? field.descending
          ? Number(b) - Number(a)
          : Number(a) - Number(b)
        : text(a).localeCompare(text(b))
    )
    .map(([value, count]) => ({ value, label: text(value), count }));
}

/** Removes selections that no longer match any paper (e.g. after another filter changed). */
export function cleanSelection(
  papers: Paper[],
  selection: Selection,
  query: string
): Selection {
  const labels = subjectLabels(papers);
  const next: Selection = { ...selection };
  for (const field of FILTER_FIELDS) {
    const chosen = next[field.key];
    if (!chosen) continue;
    const ok = getOptions(papers, field, next, query, labels).some(
      (o) => o.value === chosen && o.count > 0
    );
    if (!ok) delete next[field.key];
  }
  return next;
}

export function sortPapers(list: Paper[], mode: SortMode): Paper[] {
  const out = [...list];
  if (mode === "az") out.sort((a, b) => a.subject.localeCompare(b.subject) || b.year - a.year);
  else if (mode === "sem") out.sort((a, b) => a.sem - b.sem || b.year - a.year);
  else out.sort((a, b) => b.year - a.year || a.sem - b.sem); // "recent"
  return out;
}
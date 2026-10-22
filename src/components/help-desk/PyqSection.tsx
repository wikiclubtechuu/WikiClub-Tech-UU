// FILE: src/components/help-desk/PyqSection.tsx
// The PYQ tool UI: search, 4 filters in one row, and papers grouped by academic year
// (1st year = semesters 1-2, 2nd year = 3-4, 3rd year = 5-6, 4th year = 7-8).
// Colours and styles come from src/app/help-desk/help-desk.css (loaded by help-desk/layout.tsx).
// Filtering logic lives in src/lib/pyq-filter.ts.
// Students get read-only access: "View Paper" opens our own viewer page, no download button.
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FileText, GraduationCap, CalendarDays, ClipboardList, Search, RotateCcw } from "lucide-react";
import type { FilterKey, Paper, Selection, SortMode } from "@/types/pyq";
import {
  FILTER_FIELDS,
  cleanSelection,
  getOptions,
  matchPapers,
  sortPapers,
  subjectLabels,
} from "@/lib/pyq-filter";
import Reveal from "@/components/help-desk/Reveal";

// The four filters shown in the row. (Branch, course and session are hidden.)
const VISIBLE_FILTERS: FilterKey[] = ["subject", "sem", "exam", "year"];

// How many papers each year section shows before "Show all".
const SHOW_INITIAL = 6;

// One accent per academic year (defined in help-desk.css as hd-accent-blue / green / teal / navy).
const YEARS = [
  { year: 1, label: "1st Year", note: "Semester 1 & 2", accent: "hd-accent-blue" },
  { year: 2, label: "2nd Year", note: "Semester 3 & 4", accent: "hd-accent-green" },
  { year: 3, label: "3rd Year", note: "Semester 5 & 6", accent: "hd-accent-teal" },
  { year: 4, label: "4th Year", note: "Semester 7 & 8", accent: "hd-accent-navy" },
] as const;

const academicYear = (sem: number) => Math.min(4, Math.max(1, Math.ceil(sem / 2)));

export default function PyqSection({ papers }: { papers: Paper[] }) {
  const [selection, setSelection] = useState<Selection>({});
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortMode>("recent");
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  // Drop any choice that no longer matches a paper after another filter changed.
  const sel = useMemo(() => cleanSelection(papers, selection, query), [papers, selection, query]);
  const labels = useMemo(() => subjectLabels(papers), [papers]);

  const results = useMemo(
    () => sortPapers(matchPapers(papers, sel, query), sort),
    [papers, sel, query, sort]
  );

  // Split the results into 1st-4th year sections, skipping empty ones.
  const groups = useMemo(
    () =>
      YEARS.map((y) => ({
        ...y,
        items: results.filter((p) => academicYear(p.sem) === y.year),
      })).filter((g) => g.items.length > 0),
    [results]
  );

  const change = (key: FilterKey, value: string) => setSelection({ ...sel, [key]: value });
  const clearAll = () => {
    setSelection({});
    setQuery("");
  };

  const subjectName = sel.subject ? labels[sel.subject] : null;
  const filters = FILTER_FIELDS.filter((f) => VISIBLE_FILTERS.includes(f.key));
  const field = "hd-field w-full rounded-xl px-3 py-2.5";

  return (
    <section id="pyq" className="space-y-6">
      <Reveal>
        <div className="hd-panel p-6">
          <span className="hd-eyebrow">
            <GraduationCap className="h-4 w-4" /> Student Help Desk
          </span>
          <h2 className="hd-display mt-3 text-3xl sm:text-4xl">Previous Year Questions</h2>
          <p className="hd-muted mb-5 mt-2">Find question papers for your course and semester.</p>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by subject name..."
              aria-label="Search by subject name"
              className={`${field} pl-9`}
            />
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="hd-panel p-6">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h3 className="hd-title text-lg font-bold">Filter question papers</h3>
            <button onClick={clearAll} className="hd-ghost">
              <RotateCcw className="h-3.5 w-3.5" /> Clear all filters
            </button>
          </div>
          {/* Four filters sit in a single row on desktop, two per row on tablets, one on phones. */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {filters.map((f) => (
              <div key={f.key}>
                <label htmlFor={`f-${f.key}`} className="hd-muted mb-1 block text-xs font-semibold">
                  {f.label}
                </label>
                <select
                  id={`f-${f.key}`}
                  value={sel[f.key] ?? ""}
                  onChange={(e) => change(f.key, e.target.value)}
                  className={field}
                >
                  <option value="">{f.allLabel}</option>
                  {getOptions(papers, f, sel, query, labels).map((o) => (
                    <option key={o.value} value={o.value} disabled={o.count === 0}>
                      {o.label}
                      {o.count ? ` (${o.count})` : ""}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.16}>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="hd-display text-2xl sm:text-3xl">Question Papers</h2>
            <p className="hd-muted mt-1 text-sm">
              {papers.length === 0 ? (
                "No papers uploaded yet"
              ) : (
                <>
                  Showing <b>{results.length}</b> question paper{results.length === 1 ? "" : "s"}
                  {subjectName && (
                    <>
                      {" "}for <b>{subjectName}</b>
                      {!sel.sem && !sel.year && " across all semesters and years"}
                    </>
                  )}
                </>
              )}
            </p>
          </div>
          <div>
            <label htmlFor="sort" className="hd-muted mb-1 block text-xs font-semibold">Sort by</label>
            <select id="sort" value={sort} onChange={(e) => setSort(e.target.value as SortMode)} className={field}>
              <option value="recent">Most recent</option>
              <option value="az">Subject A-Z</option>
              <option value="sem">Semester</option>
            </select>
          </div>
        </div>
      </Reveal>

      {groups.length === 0 ? (
        <div className="hd-panel hd-muted border-dashed py-12 text-center">
          {papers.length === 0 ? (
            <>
              <b className="hd-title">No question papers yet.</b>
              <br />
              Papers will appear here once they are uploaded.
            </>
          ) : (
            <>
              <b className="hd-title">No papers match these filters.</b>
              <br />
              Try removing a filter or clear all.
            </>
          )}
        </div>
      ) : (
        <div className="space-y-10 pb-6">
          {groups.map((g) => {
            const open = !!expanded[g.year];
            const shown = open ? g.items : g.items.slice(0, SHOW_INITIAL);
            return (
              <section key={g.year} aria-labelledby={`year-${g.year}`} className={g.accent}>
                <Reveal className="mb-4">
                  <div className="flex items-center gap-3">
                    <h3 id={`year-${g.year}`} className="hd-pill rounded-full px-4 py-1.5 text-base font-bold">
                      {g.label}
                    </h3>
                    <span className="hd-muted text-sm">{g.note}</span>
                    <span className="hd-count rounded-full px-2.5 py-0.5 text-xs font-semibold">
                      {g.items.length} paper{g.items.length === 1 ? "" : "s"}
                    </span>
                    <div className="hd-line hidden h-px flex-1 sm:block" />
                  </div>
                </Reveal>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {shown.map((p, i) => (
                    <PaperCard key={p.id} paper={p} index={i} />
                  ))}
                </div>

                {g.items.length > SHOW_INITIAL && (
                  <div className="mt-4 text-center">
                    <button
                      onClick={() => setExpanded({ ...expanded, [g.year]: !open })}
                      className="hd-more rounded-lg px-4 py-2 text-sm font-semibold"
                    >
                      {open ? "Show fewer" : `Show all ${g.items.length} papers`}
                    </button>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      )}
    </section>
  );
}

function PaperCard({ paper: p, index }: { paper: Paper; index: number }) {
  return (
    <Reveal delay={(index % 3) * 0.08} className="h-full">
      <article className="hd-card flex h-full flex-col gap-3 p-4">
        <div className="flex gap-3">
          <div className="hd-icon grid h-11 w-11 shrink-0 place-items-center rounded-xl">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h4 className="hd-title font-semibold leading-snug">{p.subject}</h4>
            {p.course && (
              <span className="hd-chip mt-1.5 inline-block rounded-md px-2 py-0.5 text-xs font-semibold">
                {p.course}
              </span>
            )}
          </div>
        </div>
        <div className="hd-muted grid grid-cols-2 gap-x-3 gap-y-1 text-[13px]">
          <span className="flex items-center gap-1.5"><GraduationCap className="h-3.5 w-3.5" /> Semester {p.sem}</span>
          <span className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" /> {p.year}</span>
          {p.exam && <span className="flex items-center gap-1.5"><ClipboardList className="h-3.5 w-3.5" /> {p.exam}</span>}
        </div>
        {/* View only. Opens our own viewer page in the same tab, with a Back button there. */}
        <Link href={`/help-desk/pyqs/view/${p.id}`} className="hd-btn mt-auto">
          <FileText className="h-4 w-4" /> View Paper
        </Link>
      </article>
    </Reveal>
  );
}
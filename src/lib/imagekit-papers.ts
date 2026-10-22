// FILE: src/lib/imagekit-papers.ts
// PURPOSE: The data layer of the PYQ tool. Reads question papers straight from ImageKit
// (no database). Server-only: it uses a secret key, so never import it from a "use client" file.
//
// REQUIRED ENVIRONMENT VARIABLES (put them in .env.local, restart `npm run dev` after editing):
//   IMAGEKIT_PRIVATE_KEY  - ImageKit private API key (secret; never commit it)
//   IMAGEKIT_PYQ_FOLDER   - root folder of the papers inside ImageKit, e.g. /PYQs (case-sensitive)
//
// HOW A PAPER'S DETAILS ARE FOUND:
//   There is no metadata store, so subject / semester / year / exam / course / branch are
//   guessed from the FOLDER PATH and FILE NAME (see parseFile below). Example:
//   /PYQs/B.Tech/CSE/Sem 3 2025/COA Mid 1.pdf  ->  COA, semester 3, 2025, Mid 1, B.Tech, CSE.
//   Multi-page papers are uploaded as "Name.png", "Name back.png" or "Name p2.png" and are
//   grouped back into one paper (see groupPages).

// HTTP Basic auth header for ImageKit's REST API (private key as username, empty password).
// Also used by the file-streaming route, which is why it is exported.
export const AUTH =
  "Basic " + Buffer.from(`${process.env.IMAGEKIT_PRIVATE_KEY}:`).toString("base64");

// Normalised to look like "/PYQs". Case matters! Exported so the file route can make sure
// it only serves files that live inside this folder.
export const ROOT = "/" + (process.env.IMAGEKIT_PYQ_FOLDER || "/pyqs").replace(/^\/+|\/+$/g, "");

// ---- EDIT THESE -----------------------------------------------------------
// Used when no 20xx year can be found in the file name or folder path.
const DEFAULT_YEAR = 2025;

// Subject -> semester. Keys must be lowercase. These numbers are GUESSES.
const SEMESTER_BY_SUBJECT: Record<string, number> = {
  "engineering mathematics 1": 1,
  "engineering mathematics 2": 2,
  "engineering physics": 1,
  "engineering chemistry": 1,
  "basic electronics engineering": 1,
  "electrical engineering": 1,
  "programming and problem solving": 1,
  "elements of mechanical engineering": 1,
  "emerging technology for engineering": 1,
  "environmental sciences": 1,
};
// ---------------------------------------------------------------------------

export type IKItem = {
  type: "file" | "folder";
  name: string;
  fileId?: string;
  url?: string;
  filePath?: string;
  folderPath?: string;
  fileType?: string;
};

// The shape the site sends to the browser. fileUrl is OUR route, never ImageKit.
export type Paper = {
  id: string;
  subject: string;
  sem: number;
  year: number;
  exam: string;
  course: string;
  branch: string;
  session: string;
  fileUrl: string;
  pages: { id: string; pdf: boolean }[]; // every page of the paper, front first
};

// Lists one folder, page by page. Cached for 5 minutes.
async function listFolder(path: string): Promise<IKItem[]> {
  const items: IKItem[] = [];
  const limit = 100;
  for (let skip = 0; ; skip += limit) {
    const qs = new URLSearchParams({ path, type: "all", limit: String(limit), skip: String(skip) });
    const res = await fetch(`https://api.imagekit.io/v1/files?${qs}`, {
      headers: { Authorization: AUTH },
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error(`ImageKit ${res.status}: ${await res.text()}`);
    const page: IKItem[] = await res.json();
    items.push(...page);
    if (page.length < limit) break;
  }
  return items;
}

// Walks the whole folder tree and returns every image or PDF.
async function listPapers(path: string): Promise<IKItem[]> {
  const out: IKItem[] = [];
  for (const item of await listFolder(path)) {
    if (item.type === "folder" && item.folderPath) {
      out.push(...(await listPapers(item.folderPath)));
    } else if (
      item.type === "file" &&
      (item.fileType === "image" || /\.(pdf|jpe?g|png|webp|avif|gif)$/i.test(item.name))
    ) {
      out.push(item);
    }
  }
  return out;
}

const COURSES: [RegExp, string][] = [
  [/^b[\s._-]*tech$/i, "B.Tech"],
  [/^bca$/i, "BCA"],
  [/^mca$/i, "MCA"],
  [/^diploma$/i, "Diploma"],
];

function matchExam(text: string): string | null {
  if (/make[\s_-]*up|re[\s_-]*exam|supplementary/i.test(text)) return "Make-up";
  if (/\bsummer/i.test(text)) return "Summer Semester";
  if (
    /\b(?:second|2nd|ii|two)[\s_-]*(?:mid|mst)/i.test(text) ||
    /\b(?:mid|mst)(?:[\s_-]*(?:term|sem(?:ester)?))?[\s_-]*(?:2|ii|two|second)(?![a-z0-9])/i.test(text)
  )
    return "Mid 2";
  if (
    /\b(?:first|1st|one)[\s_-]*(?:mid|mst)/i.test(text) ||
    /\b(?:mid|mst)(?:[\s_-]*(?:term|sem(?:ester)?))?[\s_-]*(?:1|i|one|first)(?![a-z0-9])/i.test(text) ||
    /\b(?:mid|mst)(?![a-z])/i.test(text)
  )
    return "Mid 1";
  if (/\bend[\s_-]*(?:term|sem(?:ester)?)|\bfinal/i.test(text)) return "End Term";
  return null;
}

// Multi-page papers: "Name.png" (front), "Name back.png" or "Name p2.png" (other pages).
const PAGE_MARK =
  /(?:^|[\s_\-(]+)(?:(back|rear)|(?:p|pg|page|side)[\s_\-]*(\d{1,2})|(front))[\s_\-)]*$/i;

function splitPage(base: string): { key: string; page: number } {
  const m = base.match(PAGE_MARK);
  if (!m || m.index === undefined) return { key: base, page: 1 };
  const page = m[1] ? 2 : m[2] ? Number(m[2]) : 1;
  return { key: base.slice(0, m.index).trim() || base, page };
}

const normalise = (t: string) =>
  t.toLowerCase().replace(/[\s_-]+/g, " ").replace(/^[^a-z0-9]+|[^a-z0-9]+$/g, "");

type PaperGroup = { primary: IKItem; files: IKItem[] };

function groupPages(files: IKItem[]): PaperGroup[] {
  const groups = new Map<string, { n: number; f: IKItem }[]>();
  for (const f of files) {
    if (!f.url || !f.fileId) continue;
    const base = f.name.replace(/\.[a-z0-9]+$/i, "");
    const { key, page } = splitPage(base);
    const folder = (f.filePath || "").replace(/\/[^/]*$/, "");
    const id = `${folder}|${normalise(key)}`;
    const list = groups.get(id) ?? [];
    list.push({ n: page, f });
    groups.set(id, list);
  }
  return [...groups.values()].map((list) => {
    list.sort((a, b) => a.n - b.n);
    return { primary: list[0].f, files: list.map((x) => x.f) };
  });
}

function parseFile(f: IKItem) {
  const rawBase = f.name.replace(/\.[a-z0-9]+$/i, "");
  const base = splitPage(rawBase).key;
  const folders = (f.filePath || "")
    .replace(ROOT, "")
    .split("/")
    .filter(Boolean)
    .slice(0, -1);
  const all = [...folders, base].join(" / ");

  const subject =
    base
      .replace(/sem(?:ester)?[\s_-]*\d/gi, " ")
      .replace(/20\d{2}/g, " ")
      .replace(/\b(?:first|second|1st|2nd)\b/gi, " ")
      .replace(/\b(?:mid|mst)(?:[\s_-]*(?:term|sem(?:ester)?))?(?:[\s_-]*(?:1|2|ii|i|one|two))?(?![a-z0-9])/gi, " ")
      .replace(/\bend[\s_-]*(?:term|sem(?:ester)?)?(?![a-z])/gi, " ")
      .replace(/\b(?:make[\s_-]*up|re[\s_-]*exam|supplementary|summer|final|pyqs?|question|papers?|exam(?:ination)?)(?![a-z])/gi, " ")
      .replace(/\(\s*\)/g, " ")
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ")
      .replace(/^[^a-z0-9]+|[^a-z0-9]+$/gi, "")
      .trim() || base;

  const sem =
    Number(all.match(/sem(?:ester)?[\s_-]*(\d)/i)?.[1]) ||
    SEMESTER_BY_SUBJECT[subject.toLowerCase()] ||
    1;
  const year = Number(all.match(/(20\d{2})/)?.[1]) || DEFAULT_YEAR;
  const exam = matchExam(base) ?? matchExam(folders.join(" / ")) ?? "End Term";

  const courseIdx = folders.findIndex((seg) => COURSES.some(([re]) => re.test(seg.trim())));
  const course = courseIdx >= 0 ? COURSES.find(([re]) => re.test(folders[courseIdx].trim()))![1] : "B.Tech";

  const next = folders[courseIdx + 1];
  const looksLikeSemOrYear = next && /sem|20\d{2}/i.test(next);
  const branch = courseIdx >= 0 && next && !looksLikeSemOrYear ? next.trim() : "CSE";

  return { subject, sem, year, exam, course, branch, session: sem % 2 === 1 ? "Odd" : "Even" };
}

// Public entry point: returns every paper, with our own file routes as links.
export async function loadPapers(): Promise<Paper[]> {
  const files = await listPapers(ROOT);
  return groupPages(files).map(({ primary, files: pageFiles }) => ({
    id: primary.fileId as string,
    ...parseFile(primary),
    fileUrl: `/api/pyqs/file/${primary.fileId}`,
    pages: pageFiles.map((f) => ({
      id: f.fileId as string,
      pdf: /\.pdf$/i.test(f.name),
    })),
  }));
}
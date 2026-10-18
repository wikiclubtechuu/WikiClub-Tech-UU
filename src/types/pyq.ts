// FILE: src/types/pyq.ts
// PURPOSE: Shared types for the Help Desk -> PYQ tool (used by the filter logic and the UI).

/** One uploaded question paper. This is exactly what the admin/backend must send. */
export interface Paper {
  /** Unique id (database id, or any unique string while using static data). */
  id: string;
  /** Subject name as typed by the admin, e.g. "COA". Spelling/case variants
   *  ("coa ", "Coa") are grouped together automatically by the filter. */
  subject: string;
  /** Semester number, 1-8. */
  sem: number;
  /** Exam year, e.g. 2026. */
  year: number;
  /** Link to the PDF (Cloudinary / S3 / Drive / public folder). Used by "View Paper". */
  fileUrl: string;
  /** Optional: "Mid 1" | "Mid 2" | "Make-up" | "End Term" | "Summer Semester". */
  exam?: string;
  /** Optional: "B.Tech" | "BCA" | "MCA" | "Diploma". */
  course?: string;
  /** Optional: "CSE", "AI & ML", ... */
  branch?: string;
  /** Optional: "Odd" | "Even". */
  session?: string;
}

/** Every filter the student can use. Each key is also a field on Paper. */
export type FilterKey =
  | "subject"
  | "sem"
  | "year"
  | "exam"
  | "course"
  | "branch"
  | "session";

/** Currently selected value per filter. Missing/empty = "All". */
export type Selection = Partial<Record<FilterKey, string>>;

export type SortMode = "recent" | "az" | "sem";
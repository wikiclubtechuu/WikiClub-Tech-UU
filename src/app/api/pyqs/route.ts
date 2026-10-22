// FILE: src/app/api/pyqs/route.ts   (route: GET /api/pyqs)
// PURPOSE: JSON API that lists question papers from ImageKit, with optional filtering and sorting.
// Query parameters (all optional): subject (partial match), sem, year, exam, course, branch,
// session, sort = recent | az | sem. Response: { success, count, data: Paper[] }.
// NOTE: The PYQ web page itself calls loadPapers() directly on the server; this endpoint exists
// for other clients (e.g. the future chatbot or an admin panel).

import { NextRequest, NextResponse } from "next/server";
import { loadPapers } from "@/lib/imagekit-papers";

export async function GET(request: NextRequest) {
  try {
    const sp = request.nextUrl.searchParams;
    const subject = sp.get("subject")?.toLowerCase();
    const sem = sp.get("sem");
    const year = sp.get("year");
    const exam = sp.get("exam");
    const course = sp.get("course");
    const branch = sp.get("branch");
    const session = sp.get("session");
    const sort = sp.get("sort") || "recent";

    let data = await loadPapers();

    data = data.filter(
      (p) =>
        (!subject || p.subject.toLowerCase().includes(subject)) &&
        (!sem || p.sem === Number(sem)) &&
        (!year || p.year === Number(year)) &&
        (!exam || p.exam === exam) &&
        (!course || p.course === course) &&
        (!branch || p.branch === branch) &&
        (!session || p.session === session)
    );

    data.sort((a, b) => {
      if (sort === "az") return a.subject.localeCompare(b.subject) || b.year - a.year;
      if (sort === "sem") return a.sem - b.sem || b.year - a.year;
      return b.year - a.year || a.sem - b.sem;
    });

    return NextResponse.json({ success: true, count: data.length, data });
  } catch (error) {
    console.error("Error fetching papers:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to fetch papers" },
      { status: 500 }
    );
  }
}
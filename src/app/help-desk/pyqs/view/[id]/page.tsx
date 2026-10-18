// FILE: src/app/help-desk/pyqs/view/[id]/page.tsx   (route: /help-desk/pyqs/view/<paperId>)
// PURPOSE: Read-only paper viewer (no download button). `id` is the ImageKit file id of the paper's first page.
// Shows one question paper inside the site, with all its pages, one under the other.
// Pages load from /api/pyqs/file/<id>, which is our own domain, never ImageKit directly.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { loadPapers } from "@/lib/imagekit-papers";
import BackButton from "@/components/help-desk/BackButton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Question Paper | Help Desk | WikiClub Tech",
};

export default async function ViewPaperPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Look the paper up in the (cached) ImageKit listing; an unknown id shows the site's 404 page.
  const papers = await loadPapers();
  const paper = papers.find((p) => p.id === id);
  if (!paper) notFound();

  const total = paper.pages.length;
  const details = [paper.exam, `Semester ${paper.sem}`, String(paper.year)].join(" | ");

  // "Front page" / "Back page" for two sides, "Page 3 of 4" when there are more.
  const label = (i: number) =>
    total === 2 ? (i === 0 ? "Front page" : "Back page") : `Page ${i + 1} of ${total}`;

  return (
    <main className="mx-auto max-w-4xl px-5 py-8">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <BackButton />
        <div className="text-right">
          <h1 className="hd-title text-xl font-bold">{paper.subject}</h1>
          <p className="hd-muted text-sm">
            {details}
            {total > 1 && ` | ${total} pages`}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {paper.pages.map((page, i) => {
          // PDFs render in an <iframe>; scanned images render in a plain <img>. Both load from our own API route.
          const src = `/api/pyqs/file/${page.id}`;
          return (
            <section key={page.id} aria-label={label(i)}>
              {total > 1 && <p className="hd-muted mb-2 text-sm font-semibold">{label(i)}</p>}
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                {page.pdf ? (
                  <iframe src={src} title={`${paper.subject} ${label(i)}`} className="h-[80vh] w-full" />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={src}
                    alt={`${paper.subject} question paper, ${label(i).toLowerCase()}`}
                    loading={i === 0 ? "eager" : "lazy"}
                    className="mx-auto block h-auto w-full"
                  />
                )}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-6">
        <BackButton />
      </div>
    </main>
  );
}
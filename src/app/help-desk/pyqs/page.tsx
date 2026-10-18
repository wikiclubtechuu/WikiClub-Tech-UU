// FILE: src/app/help-desk/pyqs/page.tsx   (route: /help-desk/pyqs)
// PURPOSE: The PYQ (Previous Year Questions) tool page.
// Server component: loads papers from ImageKit (see src/lib/imagekit-papers.ts) and passes them
// to the client-side <PyqSection>, which does all searching / filtering / sorting in the browser.
// If ImageKit is unreachable (wrong key, offline) the page still renders, with an empty list.

import Link from "next/link";
import { loadPapers } from "@/lib/imagekit-papers";
import PyqSection from "@/components/help-desk/PyqSection";
import type { Paper } from "@/types/pyq";

// Always fetch fresh data on each request (papers are added by uploading to ImageKit, not by redeploying).
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Previous Year Questions | Help Desk",
};

export default async function PyqsPage() {
  let papers: Paper[] = [];
  try {
    // The server-side Paper (has extra `pages`) is a superset of the UI's Paper type, hence the cast.
    papers = (await loadPapers()) as unknown as Paper[];
  } catch (e) {
    console.error("Failed to load papers:", e);
  }

  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      <Link href="/help-desk" className="hd-back-link inline-block text-sm font-semibold">
        ← Back to Help Desk
      </Link>
      <div className="mt-6">
        <PyqSection papers={papers} />
      </div>
    </main>
  );
}
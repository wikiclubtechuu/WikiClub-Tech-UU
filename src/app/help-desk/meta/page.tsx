// FILE: src/app/help-desk/meta/page.tsx   (route: /help-desk/meta)
// PURPOSE: "Meta Pages" tool. Currently a placeholder: it will hold a collection of useful links
// (e.g. university portals, syllabus pages). Replace the dashed box with a list of links when ready.
// Uses the shared PageShell for the back link + page title, and .animate-fade-up from help-desk.css.

import PageShell from "@/components/help-desk/PageShell";

export default function MetaPage() {
  return (
    <PageShell title="Meta Pages">
      <div className="animate-fade-up rounded-2xl border-2 border-dashed border-gray-200 p-8 text-center text-gray-500">
        A collection of useful links will be added here.
      </div>
    </PageShell>
  );
}
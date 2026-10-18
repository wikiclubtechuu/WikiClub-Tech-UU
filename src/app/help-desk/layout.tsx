// FILE: src/app/help-desk/layout.tsx
// PURPOSE: Section layout for everything under /help-desk (hub, PYQs, social, FAQs, contact, meta).
//
// HOW IT FITS THE CLIENT'S SITE:
//   This is a NESTED layout. The client's root layout (src/app/layout.tsx) still renders the
//   Navbar, Footer, Toaster and the <main className="pt-16"> wrapper around it, so the new
//   site chrome is untouched. This file only adds:
//     1. help-desk.css  - the "hd-" theme (colours, cards, buttons). Next.js loads this CSS
//        only when a /help-desk route is visited, so it cannot restyle the client's pages.
//     2. A wrapper div (.hd-theme) that scopes every custom colour variable to this section.
//     3. The soft blue/green background glow behind the content.
// NOTE: <main> is rendered by the root layout, and each help-desk page renders its own <main>
//   as well (kept exactly as it was in the old repo, where it worked fine on localhost).

import "./help-desk.css";
import HelpDeskBackground from "@/components/help-desk/HelpDeskBackground";

export default function HelpDeskLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="hd-theme relative isolate">
      <HelpDeskBackground />
      {children}
    </div>
  );
}
// FILE: src/components/help-desk/PageShell.tsx
// PURPOSE: Common frame for the simple help-desk sub-pages (Contact, FAQs, Social, Meta):
// a "Back to Help Desk" link, an animated page title, then the page content.
// `wide` / `full` pick a wider max-width for pages with side-by-side boxes (Social, FAQs).
// Used by: contact, faqs, social, meta pages.
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Reveal from "@/components/help-desk/Reveal";

export default function PageShell({
  title,
  children,
  wide = false,
  full = false,
}: {
  title: string;
  children: React.ReactNode;
  wide?: boolean; // wider layout, used by pages with side-by-side boxes
  full?: boolean; // widest layout, used by the FAQ matrix
}) {
  const width = full ? "max-w-[90rem]" : wide ? "max-w-5xl" : "max-w-3xl";

  return (
    <div className={`mx-auto px-5 py-10 ${width}`}>
      <Link href="/help-desk" className="hd-back-link inline-flex items-center gap-1.5 text-sm font-semibold">
        <ArrowLeft className="h-4 w-4" /> Back to Help Desk
      </Link>
      <Reveal className="mt-4 mb-8">
        <h1 className="hd-display text-4xl sm:text-5xl">{title}</h1>
      </Reveal>
      {children}
    </div>
  );
}
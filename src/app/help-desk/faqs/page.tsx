// FILE: src/app/help-desk/faqs/page.tsx   (route: /help-desk/faqs; the folder must be named "faqs" in lowercase)
// PURPOSE: FAQs tool. Questions are grouped into 5 categories (sidebar on the left, searchable
// question cards on the right) and end with a "Did not find your answer?" call-to-action that
// links to the Contact page. The questions themselves live in src/lib/faq-data.ts and the
// interactive list is the client component <FaqGrid>.

import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import PageShell from "@/components/help-desk/PageShell";
import FaqGrid from "@/components/help-desk/FaqGrid";
import Reveal from "@/components/help-desk/Reveal";

export const metadata: Metadata = {
  title: "FAQs | Help Desk | WikiClub Tech",
  description: "Answers to common questions about WikiClub Tech UU: membership, certificates, events and more.",
};

export default function FaqsPage() {
  return (
    <PageShell title="FAQs" full>
      <Reveal className="-mt-3 mb-6">
        <p className="hd-muted max-w-2xl text-lg">
          Quick answers about WikiClub Tech UU. Tap a question to see the answer.
        </p>
      </Reveal>

      <FaqGrid />

      <Reveal className="mt-12">
        <section className="hd-panel hd-accent-green flex flex-col items-center gap-3 p-8 text-center">
          <h2 className="hd-display text-2xl">Did not find your answer?</h2>
          <p className="hd-muted max-w-md">Send us your question and we will get back to you.</p>
          <Link href="/help-desk/contact" className="hd-btn mt-1">
            <Mail className="h-4 w-4" /> Contact us
          </Link>
        </section>
      </Reveal>
    </PageShell>
  );
}
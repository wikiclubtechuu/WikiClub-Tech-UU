// FILE: src/app/help-desk/page.tsx   (route: /help-desk)
// PURPOSE: The Student Help Desk home page ("hub"). Shows a hero heading and one card per tool:
//   PYQs, Social Media, Contact / Feedback, FAQs, Meta Pages, plus an "Upcoming Tools" card
//   that is a non-clickable placeholder for future features, and a chatbot placeholder panel.
// This is a Server Component (no state); the entrance animations come from <Reveal>.
import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  Share2,
  Mail,
  MessageCircleQuestion,
  Link2,
  Sparkles,
  ArrowRight,
  GraduationCap,
} from "lucide-react";
import Reveal from "@/components/help-desk/Reveal";

export const metadata: Metadata = {
  title: "Help Desk | WikiClub Tech",
  description: "Student help desk: previous year question papers and more.",
};

// One entry per card on the hub.
//  - href: the tool's route. `null` marks a placeholder card that is NOT clickable
//    (used by "Upcoming Tools", rendered with a dashed border and a "Coming soon" label).
//  - accent: one of the hd-accent-* classes from help-desk.css; it tints the icon, top border
//    and hover glow of that card.
const tools = [
  { title: "PYQs", desc: "Search and view previous year question papers.", href: "/help-desk/pyqs", icon: FileText, accent: "hd-accent-blue" },
  { title: "Social Media", desc: "Follow UU Wiki Club on Instagram, LinkedIn and more.", href: "/help-desk/social", icon: Share2, accent: "hd-accent-green" },
  { title: "Contact / Feedback", desc: "Reach out to us or share your suggestions.", href: "/help-desk/contact", icon: Mail, accent: "hd-accent-teal" },
  { title: "FAQs", desc: "Answers to commonly asked questions.", href: "/help-desk/faqs", icon: MessageCircleQuestion, accent: "hd-accent-green" },
  { title: "Meta Pages", desc: "A collection of useful links.", href: "/help-desk/meta", icon: Link2, accent: "hd-accent-blue" },
  { title: "Upcoming Tools", desc: "More tools are on the way. Stay tuned!", href: null, icon: Sparkles, accent: "hd-accent-navy" },
];

export default function HelpDeskPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 pb-12">
      <section className="py-14 text-center sm:py-20">
        <Reveal>
          <span className="hd-eyebrow">
            <GraduationCap className="h-4 w-4" /> WikiClub Tech
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="hd-display mt-5 text-5xl sm:text-6xl lg:text-7xl">Student Help Desk</h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="hd-muted mx-auto mt-5 max-w-xl text-lg sm:text-xl">
            Everything you need for your studies in one place. Pick a tool to get started.
          </p>
        </Reveal>
      </section>

      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t, i) => {
          const Icon = t.icon;
          // Shared card contents; wrapped below in a <Link> (real tool) or a plain <div> (placeholder).
          const body = (
            <>
              <div className={`${t.href ? "hd-icon" : "bg-gray-100 text-gray-400"} grid h-12 w-12 place-items-center rounded-xl`}>
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="hd-title text-lg font-bold">{t.title}</h2>
              <p className="hd-muted text-sm">{t.desc}</p>
              {t.href ? (
                <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold" style={{ color: "var(--accent-strong)" }}>
                  Open <ArrowRight className="h-4 w-4" />
                </span>
              ) : (
                <span className="mt-auto text-xs font-semibold text-gray-400">Coming soon</span>
              )}
            </>
          );

          return (
            <Reveal key={t.title} delay={Math.min(i, 5) * 0.08} className="h-full">
              {t.href ? (
                <Link href={t.href} className={`hd-card flex h-full flex-col gap-3 p-6 ${t.accent}`}>
                  {body}
                </Link>
              ) : (
                <div className="flex h-full flex-col gap-3 rounded-3xl border-2 border-dashed border-gray-200 bg-white/60 p-6">
                  {body}
                </div>
              )}
            </Reveal>
          );
        })}
      </section>

      {/* Chatbot placeholder: reserved spot (id="chatbot") where the help-desk chatbot will be mounted later. */}
      <Reveal className="mt-6">
        <section id="chatbot" className="hd-panel hd-muted border-dashed p-6 text-center">
          <b className="hd-title block text-lg">Chatbot placeholder</b>
          The help desk chatbot will appear here.
        </section>
      </Reveal>
    </main>
  );
}
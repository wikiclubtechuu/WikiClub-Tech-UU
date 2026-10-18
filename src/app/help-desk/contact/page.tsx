// FILE: src/app/help-desk/contact/page.tsx   (route: /help-desk/contact)
// PURPOSE: Contact / Feedback tool.
// Contact / Feedback page: the contact email, plus the feedback form (a Google Form shown inside the page).

import type { Metadata } from "next";
import { Mail, MessageSquare, ExternalLink } from "lucide-react";
import PageShell from "@/components/help-desk/PageShell";
import CopyEmailButton from "@/components/help-desk/CopyEmailButton";
import Reveal from "@/components/help-desk/Reveal";

export const metadata: Metadata = {
  title: "Contact / Feedback | Help Desk | WikiClub Tech",
  description: "Get in touch with the WikiClub Tech team or share your feedback.",
};

// ===== EDIT THESE =====================================================================
const CONTACT_EMAIL = "wikiclubtechuu@gmail.com";

// Paste the Google Form link here. Best is the address from the form's "Embed HTML" code:
//   Google Forms > Send > the "<>" tab > copy what is inside src="..."
// It looks like: https://docs.google.com/forms/d/e/XXXXXXXX/viewform?embedded=true 
// Leave it empty ("") and the page shows "Feedback form: coming soon" instead.
const FEEDBACK_FORM_URL = "https://forms.gle/L1N13rd6KLM9o7KH7" as string;

// How tall the form box is on the page (the form scrolls inside it if it is longer).
const FORM_HEIGHT = 820;
// =======================================================================================

// Builds the address for the embedded form, and the plain one for "Open in a new tab".
function formUrls(raw: string): { embed: string; open: string } | null {
  try {
    const u = new URL(raw.trim());
    u.searchParams.set("embedded", "true");
    const embed = u.toString();
    u.searchParams.delete("embedded");
    return { embed, open: u.toString() };
  } catch {
    return null;
  }
}

export default function ContactPage() {
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Student Help Desk")}`;
  const form = FEEDBACK_FORM_URL.trim() ? formUrls(FEEDBACK_FORM_URL) : null;

  return (
    <PageShell title="Contact / Feedback">
      <div className="space-y-6">
        <Reveal>
          <section className="hd-card hd-accent-blue p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="hd-icon grid h-14 w-14 shrink-0 place-items-center rounded-2xl">
                <Mail className="h-7 w-7" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="hd-eyebrow">Contact</span>
                <h2 className="hd-title mt-2 text-xl font-bold">Email us</h2>
                <p className="hd-muted mt-1 text-sm">
                  Questions, a missing paper or a suggestion? Write to us. If a paper is missing, mention the
                  subject, semester and exam so we can find it faster.
                </p>
                <a
                  href={mailto}
                  className="mt-3 inline-block break-all text-lg font-semibold hover:underline"
                  style={{ color: "var(--accent-strong)" }}
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <a href={mailto} className="hd-btn">
                <Mail className="h-4 w-4" /> Send an email
              </a>
              <CopyEmailButton email={CONTACT_EMAIL} />
            </div>
          </section>
        </Reveal>

        <Reveal delay={0.1}>
          {form ? (
            <section className="hd-card hd-accent-green overflow-hidden">
              <div className="flex flex-wrap items-start justify-between gap-3 p-6 pb-4">
                <div className="flex items-start gap-4">
                  <div className="hd-icon grid h-11 w-11 shrink-0 place-items-center rounded-xl">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="hd-eyebrow">Feedback</span>
                    <h2 className="hd-title mt-2 text-xl font-bold">Share your feedback</h2>
                    <p className="hd-muted mt-1 text-sm">
                      Tell us what is working and what is not. It only takes a minute.
                    </p>
                  </div>
                </div>
                <a href={form.open} target="_blank" rel="noopener noreferrer" className="hd-ghost">
                  <ExternalLink className="h-4 w-4" /> Open in a new tab
                </a>
              </div>

              <div className="hd-edge-y bg-gray-50">
                <iframe
                  src={form.embed}
                  title="Feedback form"
                  loading="lazy"
                  width="100%"
                  height={FORM_HEIGHT}
                  className="block w-full border-0"
                >
                  Loading…
                </iframe>
              </div>

              <p className="hd-muted px-6 py-4 text-sm">
                Form not showing? Use the <b>Open in a new tab</b> button above.
              </p>
            </section>
          ) : (
            <section className="hd-panel hd-accent-green flex items-start gap-4 border-dashed p-6">
              <div className="hd-icon grid h-11 w-11 shrink-0 place-items-center rounded-xl">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <h2 className="hd-title font-bold">Feedback form</h2>
                <p className="hd-muted mt-1 text-sm">Coming soon. For now, send your feedback to the email above.</p>
              </div>
            </section>
          )}
        </Reveal>
      </div>
    </PageShell>
  );
}
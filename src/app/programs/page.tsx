import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Code2,
  Mail,
  Sparkles,
} from "lucide-react";

const programs = [
  {
    id: "chai-with-wiki",
    title: "Chai with Wiki",
    eyebrow: "CONNECT & DISCOVER",
    description:
      "A relaxed, beginner-friendly space to discover Wikimedia, open knowledge, and open-source collaboration through conversations and community-led learning.",
    href: "https://meta.wikimedia.org/wiki/Chai_with_Wiki",
    accent: "blue",
  },
  {
    id: "road-to-wiki",
    title: "Road to Wiki",
    eyebrow: "BUILD & CONTRIBUTE",
    description:
      "A structured learning and mentorship journey that helps students explore Wikimedia technologies and work toward meaningful open-source contributions.",
    icon: Code2,
    href: "https://meta.wikimedia.org/wiki/Road_to_wiki_program_UU",
    accent: "green",
  },
] as const;

const faqs = [
  {
    q: "Do I need prior Wikimedia experience?",
    a: "No. These programs are designed to make open-source and Wikimedia contribution approachable for students at different experience levels.",
  },
  {
    q: "What can I learn through these programs?",
    a: "You can explore Wikimedia technologies, open-source collaboration, contribution workflows, community practices, and practical software-development skills.",
  },
  {
    q: "How do I learn more or get involved?",
    a: "Open the details page for the program that interests you, or contact the WikiClub Tech team at wikitech@indicwiki.org for guidance.",
  },
];

export default function ProgramsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* The grid and gradient are intentionally limited to this hero section. */}
      <section
        className="relative isolate overflow-hidden border-b border-slate-200/70"
        style={{ backgroundColor: "#f8fcfa" }}
      >
        {/* Pastel hero colors fade gradually into the plain page background. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 10%, rgba(210, 238, 250, 0.75) 0%, rgba(210, 238, 250, 0) 42%), radial-gradient(circle at 85% 10%, rgba(215, 250, 225, 0.8) 0%, rgba(215, 250, 225, 0) 45%), radial-gradient(circle at 80% 90%, rgba(255, 245, 235, 0.65) 0%, rgba(255, 245, 235, 0) 40%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 12%, rgba(0, 0, 0, 0.92) 28%, rgba(0, 0, 0, 0.72) 48%, rgba(0, 0, 0, 0.42) 68%, rgba(0, 0, 0, 0.16) 86%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, black 0%, black 45%, transparent 100%)",
          }}
        />
        {/* The grid fades out smoothly toward the bottom of the hero. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(100, 116, 139, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(100, 116, 139, 0.12) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
            backgroundPosition: "center center",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 12%, rgba(0, 0, 0, 0.9) 28%, rgba(0, 0, 0, 0.68) 48%, rgba(0, 0, 0, 0.4) 68%, rgba(0, 0, 0, 0.14) 86%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-200/90 bg-white/75 px-4 py-2 text-sm font-semibold text-sky-800 shadow-sm shadow-sky-900/[0.04] backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-sky-600" aria-hidden="true" />
              WikiClub Tech UU · Programs
            </span>

            <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-[#10243A] sm:text-5xl sm:leading-[1.1] lg:text-6xl">
              Learn. Contribute.{" "}
              <span className="bg-gradient-to-r from-[#168BC4] via-[#168BC4] to-[#209E75] bg-clip-text text-transparent">
                Grow together.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Discover programs that help students explore open knowledge, build
              practical skills, and take their next step into the Wikimedia and
              open-source community.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#programs"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#102A43] px-6 py-3 font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-[#183B5B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
              >
                Explore programs <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="mailto:wikitech@indicwiki.org"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300/80 bg-white/75 px-6 py-3 font-semibold text-[#102A43] transition hover:border-sky-300 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
              >
                <Mail className="h-4 w-4" /> Contact the team
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* All sections below the hero use a plain background with no grid or gradient. */}
      <section
        id="programs"
        className="mx-auto max-w-7xl scroll-mt-24 bg-white px-5 py-14 sm:px-6 sm:py-20 lg:px-8"
      >
        <div className="mb-8 max-w-2xl sm:mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#168BC4] sm:text-sm">
            Our programs
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#10243A] sm:text-4xl">
            Find your way into open source
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            Start with community-led discovery or follow a more structured path
            toward contribution.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 md:gap-6">
          {programs.map((program) => {
            const Icon = program.icon;
            const isBlue = program.accent === "blue";

            return (
              <article
                key={program.id}
                id={program.id}
                className={`group relative isolate overflow-hidden rounded-3xl border bg-white p-6 shadow-sm shadow-slate-900/[0.04] transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/[0.08] sm:p-8 ${isBlue ? "border-sky-200/90 hover:border-sky-300" : "border-emerald-200/90 hover:border-emerald-300"}`}
              >
                <div
                  aria-hidden="true"
                  className={`absolute inset-x-0 top-0 h-1 ${isBlue ? "bg-[#1595D0]" : "bg-[#209E75]"}`}
                />
                <div
                  aria-hidden="true"
                  className={`absolute -right-12 -top-12 h-36 w-36 rounded-full border ${isBlue ? "border-sky-200/50" : "border-emerald-200/60"}`}
                />

                <div className="relative flex items-start justify-between gap-4">
{!isBlue && (
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-[#18835F]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                  )}
                  <span
                    className={`rounded-full border px-3 py-1.5 text-[10px] font-bold tracking-[0.12em] sm:text-xs ${isBlue ? "border-sky-200 bg-sky-50 text-sky-800" : "border-emerald-200 bg-emerald-50 text-emerald-800"}`}
                  >
                    {program.eyebrow}
                  </span>
                </div>

                <h3 className="relative mt-6 text-2xl font-bold tracking-tight text-[#10243A] sm:text-3xl">
                  {program.title}
                </h3>
                <p className="relative mt-3 max-w-xl text-sm leading-7 text-slate-600 sm:min-h-[5.25rem] sm:text-base">
                  {program.description}
                </p>

                <div className="relative mt-6 border-t border-slate-200/80 pt-5">
                  <a
                    href={program.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={"View more details about " + program.title}
                    className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${isBlue ? "bg-[#168BC4] hover:bg-[#1175A6] focus-visible:ring-sky-500" : "bg-[#18835F] hover:bg-[#126B4D] focus-visible:ring-emerald-500"}`}
                  >
                    View program details <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-5xl bg-white px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#18835F] sm:text-sm">
            FAQ
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#10243A] sm:text-4xl">
            Questions, answered
          </h2>
        </div>

        <div className="mt-8 divide-y divide-slate-200/80 overflow-hidden rounded-2xl border border-slate-200/80 bg-white px-5 shadow-sm shadow-slate-900/[0.03] sm:mt-10 sm:px-7">
          {faqs.map((faq) => (
            <details key={faq.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[#10243A] transition hover:text-[#168BC4] [&::-webkit-details-marker]:hidden">
                <span>{faq.q}</span>
                <span
                  aria-hidden="true"
                  className="text-xl font-normal text-slate-400 transition group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-3xl pr-2 text-sm leading-7 text-slate-600 sm:text-base">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="bg-white px-5 pb-14 sm:px-6 sm:pb-20 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-md shadow-slate-900/[0.04] sm:p-10 lg:p-12">
          <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-[#168BC4]">
                <BookOpen className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#10243A] sm:text-3xl lg:text-4xl">
                Ready to start contributing?
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                Connect with WikiClub Tech UU and turn your curiosity into
                practical open-source experience.
              </p>
            </div>
            <Link
              href="https://forms.gle/FGoyrEHC1CuP9hPSA"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#102A43] px-6 py-3 font-bold text-white shadow-md shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-[#183B5B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
            >
              Join the community <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

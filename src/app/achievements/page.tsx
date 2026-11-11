// FILE: src/app/achievements/page.tsx   (route: /achievements)
"use client";

import {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  GitPullRequest,
  ExternalLink,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Medal,
} from "lucide-react";
import { achievements } from "../../data/achievements/achievements";

/* =========================================================
   CONTRIBUTOR TYPES
========================================================= */
type Contributor = {
  id: string;
  name: string;
  merged?: number;
  links: string[];
  image?: string;
  description?: string;
};

/* =========================================================
   CONTRIBUTION CHAMPIONS
   First 10 = verified contribution records.
   NOTE: photos live in public/team/team/ so paths start with /team/team/
========================================================= */
const contributors: Contributor[] = [
  {
    id: "mohd-shadab",
    name: "Mohd Shadab",
    merged: 4,
    links: [],
    image: "/team/team/Mohd Shadab.jpg",
    description:
      "Contributed to WikiClub Tech through open-source project contributions and community development.",
  },
  {
    id: "kavaljeet-singh",
    name: "Kavaljeet Singh",
    merged: 3,
    links: [],
    image: "/team/team/KAVALJEET SINGH.jpg",
    description:
      "Contributed to WikiClub Tech through collaborative project and open-source contribution activities.",
  },
  {
    id: "pushpit-saluja",
    name: "Pushpit Saluja",
    merged: 2,
    links: [],
    image: "/team/team/Pushpit Saluja.jpg",
    description:
      "Contributed to WikiClub Tech projects and collaborative community development.",
  },
  {
    id: "hemant-ojha",
    name: "Hemant Ojha",
    merged: 2,
    links: [],
    image: "/team/team/Hemant Ojha.png",
    description:
      "Contributed to WikiClub Tech through open-source collaboration and project development.",
  },
  {
    id: "vratej-diwedi",
    name: "Vratej Diwedi",
    merged: 1,
    links: [],
    image: "/team/team/Vratej Dwivedi.png",
    description:
      "Participated in WikiClub Tech contribution activities and collaborative project development.",
  },
  {
    id: "vaishnavi-mishra",
    name: "Vaishnavi Mishra",
    merged: 1,
    links: [],
    image: "", // no photo file exists for her, so the initials badge is shown
    description:
      "Contributed to WikiClub Tech community projects and collaborative activities.",
  },
  {
    id: "shresth-srivastava",
    name: "Shresth Srivastava",
    merged: 1,
    links: [],
    image: "", // no photo assigned, so the initials badge is shown
    description:
      "Contributed to WikiClub Tech through collaborative project work and community contributions.",
  },
  {
    id: "rehan-khan",
    name: "Rehan Khan",
    merged: 1,
    links: [],
    image: "/team/team/Rehan Khan.jpg",
    description:
      "Contributed to WikiClub Tech projects and community contribution activities.",
  },
  {
    id: "shrey-jaiswal",
    name: "Shrey Jaiswal",
    merged: 1,
    links: [],
    image: "/team/team/Shrey.jpg",
    description:
      "Contributed to WikiClub Tech through collaborative development and open-source activities.",
  },
  {
    id: "tejash-yadav",
    name: "Tejash Yadav",
    merged: 1,
    links: [],
    image: "/team/team/Tejash Yadav.jpg",
    description:
      "Contributed to WikiClub Tech projects and open-source community activities.",
  },
];

/* =========================================================
   CONTRIBUTOR AVATAR
   Shows the photo; if it is missing or fails to load, shows the initials badge.
========================================================= */
const ContributorAvatar = memo(function ContributorAvatar({
  name,
  image,
  size = "small",
}: {
  name: string;
  image?: string | null;
  size?: "small" | "large";
}) {
  const [imageError, setImageError] = useState(false);
  const initials = useMemo(() => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [name]);
  const isLarge = size === "large";

  // No photo (or it failed to load): show the initials badge
  if (!image || imageError) {
    return (
      <div
        className={`flex shrink-0 items-center justify-center rounded-full bg-[#F5F7FA] font-bold text-[#045797] ring-1 ring-slate-200 ${
          isLarge ? "h-20 w-20 text-xl" : "h-12 w-12 text-sm"
        }`}
      >
        {initials}
      </div>
    );
  }

  return (
    // "relative" is required because <Image fill> positions itself inside this box
    <div
      className={`relative shrink-0 overflow-hidden rounded-full border-2 border-white bg-slate-100 shadow-sm ring-1 ring-slate-200 ${
        isLarge ? "h-20 w-20" : "h-12 w-12"
      }`}
    >
      <Image
        src={image}
        alt={`${name} profile`}
        fill
        sizes={isLarge ? "80px" : "48px"}
        className="object-cover"
        onError={() => setImageError(true)}
      />
    </div>
  );
});

/* =========================================================
   MEDAL
========================================================= */
const RankBadge = memo(function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <div
        className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-yellow-300 bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-400 shadow-md shadow-yellow-200/50"
        title="1st Place"
      >
        <Medal className="h-6 w-6 text-yellow-700" strokeWidth={2.2} />
        <span className="absolute -bottom-2 rounded-full border border-yellow-300 bg-white px-1.5 py-0.5 text-[9px] font-extrabold text-yellow-700 shadow-sm">
          #1
        </span>
      </div>
    );
  }

  if (rank === 2) {
    return (
      <div
        className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-300 bg-gradient-to-br from-slate-100 via-slate-200 to-slate-400 shadow-md shadow-slate-200/50"
        title="2nd Place"
      >
        <Medal className="h-6 w-6 text-slate-600" strokeWidth={2.2} />
        <span className="absolute -bottom-2 rounded-full border border-slate-300 bg-white px-1.5 py-0.5 text-[9px] font-extrabold text-slate-600 shadow-sm">
          #2
        </span>
      </div>
    );
  }

  if (rank === 3) {
    return (
      <div
        className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-orange-300 bg-gradient-to-br from-orange-100 via-orange-200 to-orange-400 shadow-md shadow-orange-200/50"
        title="3rd Place"
      >
        <Medal className="h-6 w-6 text-orange-700" strokeWidth={2.2} />
        <span className="absolute -bottom-2 rounded-full border border-orange-300 bg-white px-1.5 py-0.5 text-[9px] font-extrabold text-orange-700 shadow-sm">
          #3
        </span>
      </div>
    );
  }

  return <span className="contributor-rank">#{rank}</span>;
});

type HighlightSlide = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link?: string;
  linkText?: string;
};

const highlightSections: {
  id: string;
  heading: string;
  description: string;
  slides: HighlightSlide[];
}[] = [
  {
    id: "global-opportunities",
    heading: "Global Achievements & Opportunities",
    description:
      "Explore global scholarships, travel grants, international events and open-source opportunities for students and contributors.",
    slides: [
      {
        id: "wikiconference-india-2026",
        title: "WikiConference India 2026",
        subtitle: "Kochi, Kerala · September 4–6, 2026",
        description:
          "WikiConference India 2026 brought together Wikimedians from across India for sessions, workshops and community collaboration. Explore the official Meta-Wiki page for programme details, reports and community highlights.",
        image: "/achievements/wikiconference.jpg",
        link: "https://meta.wikimedia.org/wiki/WikiConference_India_2026",
        linkText: "View WikiConference India 2026",
      },
      {
        id: "language-diversity-conference",
        title: "Language Diversity Conference (LDC)",
        subtitle: "Language Diversity · Wikimedia Movement",
        description:
          "The Language Diversity Conference brings together people working to support linguistic diversity, multilingual knowledge and underrepresented languages across Wikimedia projects. Explore the conference resource to learn more about language communities and their initiatives.",
        image: "/achievements/LDC 3.jpg",
        link: "https://share.google/Ia1pvT1gVZwbgfrF8",
        linkText: "Explore Language Diversity Conference",
      },
      {
        id: "train-a-wikipedian",
        title: "Train a Wikipedian (TaW)",
        subtitle: "Deoband Community Wikimedia",
        description:
          "Train a Wikipedian is an initiative by Deoband Community Wikimedia that empowers volunteers and emerging community leaders with Wikimedia knowledge, leadership skills and opportunities to contribute to open knowledge ecosystems.",
        image: "/achievements/taw26.jpg",
        link: "https://meta.wikimedia.org/wiki/Deoband_Community_Wikimedia/Train_a_Wikipedian",
        linkText: "Explore Train a Wikipedian",
      },
      {
        id: "shadab-global-achievement",
        title: "Shadab's Global Achievement",
        subtitle: "Mohd Shadab · Wikimedia Hackathon",
        description:
          "Mohd Shadab represented WikiClub Tech UU at a global Wikimedia event, participating alongside Wikimedians from around the world. This milestone highlights the community's growing presence at international open-knowledge platforms.",
        image: "/achievements/shadab-global-achievement.jpg",
        link: "https://lnkd.in/p/gXwMk4MC",
        linkText: "View Achievement",
      },
    ],
  },
  {
    id: "awards",
    heading: "Awards & Recognition",
    description:
      "Celebrating achievements, hackathons and open-source contributions.",
    slides: [
      {
        id: "clip2commons",
        title: "Open-Source Contributions",
        subtitle: "Kavaljeet Singh · Clip2Commons",
        description:
          "Kavaljeet shared his open-source contribution journey, including improvements related to accessibility, keyboard navigation and the upload workflow.",
        image: "/achievements/open-source-contributions.png",
        link: "https://www.linkedin.com/posts/kavaljeet-singh-dev_opensource-wikimedia-mediawiki-activity-7482391525847601152-CZNr",
        linkText: "View LinkedIn Post",
      },
      {
        id: "genai-hackathon",
        title: "GenAI Hackathon Achievement",
        subtitle: "Team Nimbus · UIT Prayagraj",
        description:
          "A team achievement highlighting innovation, collaboration and problem-solving during a GenAI hackathon.",
        image: "/achievements/gen ai hackathon.jpg",
        link: "https://in.linkedin.com/in/kavaljeet-singh-dev",
        linkText: "View Contributor Profile",
      },
      {
        id: "uhack",
        title: "UHack 4.0 — First Runner-Up",
        subtitle: "Team Achievement · ₹30,000 Prize",
        description:
          "The WikiClub Tech UU team secured first runner-up at UHack 4.0. Team members Ayush Tiwari, Anshuman Rai, Saumya Agrahari and Unnati Kesarwani celebrated collaborative problem-solving and innovation under hackathon conditions.",
        image: "/achievements/uhack-4.jpg",
        link: "https://lnkd.in/p/g68nPqBE",
        linkText: "View UHack 4.0 Post",
      },
      {
        id: "anshuman-unnati-research",
        title: "A Stacked Learning Approach to Intrusion Detection",
        subtitle: "Anshuman Rai & Unnati Kesarwani · AICCT-2025",
        description:
          "Anshuman Rai and co-author Unnati Kesarwani presented their research paper, 'A Stacked Learning Approach to Intrusion Detection for Robust Network Protection', at the 1st International Conference on Advances in Intelligent Computing and Communication Technology (AICCT-2025) at United University, Prayagraj, addressing critical gaps in network security.",
        image: "/achievements/anshuman-unnati-research.jpg",
        link: "https://lnkd.in/p/gr6gVk_3",
        linkText: "View Research Post",
      },
      {
        id: "ayush-saumya-research",
        title: "International Conference Research Presentation",
        subtitle: "Ayush Tiwari & Saumya Agrahari · AICCT-2025",
        description:
          "Ayush Tiwari and co-author Saumya Agrahari presented their international conference paper at the 1st International Conference on Advances in Intelligent Computing and Communication Technology (AICCT-2025), organized by United University, Prayagraj, contributing to research in intelligent computing and communication technologies.",
        image: "/achievements/ayush-saumya-research.jpg",
        link: "https://lnkd.in/p/gCUqqBDR",
        linkText: "View Research Post",
      },
    ],
  },
];

const HighlightSlideshow = memo(function HighlightSlideshow({
  section,
}: {
  section: (typeof highlightSections)[number];
}) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const totalSlides = section.slides.length;
  const current = section.slides[index];

  // Observe visibility in viewport to only tick slideshow when actually visible
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Preload next slide's image in the background
  useEffect(() => {
    if (typeof window === "undefined" || totalSlides <= 1) return;
    const nextIndex = (index + 1) % totalSlides;
    const nextImgSrc = section.slides[nextIndex]?.image;
    if (nextImgSrc) {
      const img = new window.Image();
      img.src = encodeURI(nextImgSrc);
    }
  }, [index, section.slides, totalSlides]);

  // Auto-advance slideshow every 10 seconds:
  // - Only when in view
  // - Only when not hovered/paused
  // - Only when tab is visible
  // - Respect reduced motion
  useEffect(() => {
    if (!isInView || isPaused || shouldReduceMotion || totalSlides <= 1) return;

    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        setIndex((previous) => (previous + 1) % totalSlides);
      }
    }, 10000);

    return () => window.clearInterval(timer);
  }, [isInView, isPaused, shouldReduceMotion, totalSlides]);

  const previous = useCallback(() => {
    setIndex((previousIndex) => (previousIndex - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const next = useCallback(() => {
    setIndex((previousIndex) => (previousIndex + 1) % totalSlides);
  }, [totalSlides]);

  const goToSlide = useCallback((targetIndex: number) => {
    setIndex(targetIndex);
  }, []);

  const slideTransition = useMemo(
    () => ({
      duration: shouldReduceMotion ? 0.1 : 0.35,
      ease: "easeInOut" as const,
    }),
    [shouldReduceMotion],
  );

  return (
    <section
      ref={sectionRef}
      className="mb-16"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mb-6">
        <p className="achievement-label">Community achievements</p>
        <h3 className="achievement-section-title mt-2 text-2xl font-bold sm:text-3xl">
          {section.heading}
        </h3>
        <p className="achievement-section-description mt-2 max-w-2xl">
          {section.description}
        </p>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 25 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -25 }}
            transition={slideTransition}
            style={{ willChange: "transform, opacity" }}
            className="grid min-h-[420px] lg:grid-cols-2"
          >
            <div className="relative min-h-[280px] overflow-hidden bg-[#F7FAFC] sm:min-h-[380px]">
              <Image
                src={current.image}
                alt={current.title}
                fill
                sizes="(min-width: 1280px) 640px, (min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              <span className="absolute bottom-6 left-6 rounded-full bg-white/95 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#045797]">
                {section.heading}
              </span>
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
              <p className="text-sm font-semibold text-[#045797]">
                {current.subtitle}
              </p>

              <h4 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {current.title}
              </h4>

              <p className="mt-5 text-base leading-7 text-slate-600">
                {current.description}
              </p>

              {current.link && (
                <Link
                  href={current.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-lg bg-[#045797] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#034576]"
                >
                  {current.linkText || "View Source"}
                  <ExternalLink className="h-4 w-4" />
                </Link>
              )}

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={previous}
                  aria-label={`Previous ${section.heading} slide`}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:bg-[#F5F7FA] hover:text-[#045797]"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  onClick={next}
                  aria-label={`Next ${section.heading} slide`}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:bg-[#F5F7FA] hover:text-[#045797]"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                <div className="ml-2 flex items-center gap-2">
                  {section.slides.map((slide, slideIndex) => (
                    <button
                      key={`${section.id}-${slide.id}-${slideIndex}`}
                      type="button"
                      onClick={() => goToSlide(slideIndex)}
                      aria-label={`Go to slide ${slideIndex + 1} in ${section.heading}`}
                      aria-current={slideIndex === index ? "true" : undefined}
                      className={`h-2 rounded-full transition-all ${
                        slideIndex === index
                          ? "w-7 bg-[#045797]"
                          : "w-2 bg-slate-300 hover:bg-slate-400"
                      }`}
                    />
                  ))}
                </div>

                <span className="ml-auto text-sm text-slate-500">
                  {index + 1} / {section.slides.length}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
});

/* =========================================================
   LAZY-LOADED HIGHLIGHT SECTION
   Only renders the slideshow once it is near the viewport.
========================================================= */
const LazyHighlightSlideshow = memo(function LazyHighlightSlideshow({
  section,
}: {
  section: (typeof highlightSections)[number];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "300px 0px",
        threshold: 0.01,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="min-h-[420px]">
      {shouldLoad ? (
        <HighlightSlideshow section={section} />
      ) : (
        <section className="mb-16">
          <div className="mb-6">
            <p className="achievement-label">Community achievements</p>
            <h3 className="achievement-section-title mt-2 text-2xl font-bold sm:text-3xl">
              {section.heading}
            </h3>
            <p className="achievement-section-description mt-2 max-w-2xl">
              {section.description}
            </p>
          </div>
          <div
            className="flex min-h-[420px] animate-pulse flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white sm:flex-row"
            aria-label={`Loading ${section.heading}`}
          >
            <div className="min-h-[280px] bg-slate-100 sm:w-1/2" />
            <div className="flex flex-1 flex-col justify-center gap-4 p-8">
              <div className="h-4 w-2/5 rounded bg-slate-200" />
              <div className="h-8 w-4/5 rounded bg-slate-200" />
              <div className="h-4 w-full rounded bg-slate-200" />
              <div className="h-4 w-3/4 rounded bg-slate-200" />
            </div>
          </div>
        </section>
      )}
    </div>
  );
});

/* =========================================================
   CONTRIBUTOR TABLE ROW
   Memoized row to prevent re-rendering unaffected rows when expanding details.
========================================================= */
interface ContributorTableRowProps {
  contributor: Contributor;
  rank: number;
  localIndex: number;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

const ContributorTableRow = memo(function ContributorTableRow({
  contributor,
  rank,
  localIndex,
  isSelected,
  onToggle,
}: ContributorTableRowProps) {
  const handleToggle = useCallback(() => {
    onToggle(contributor.id);
  }, [onToggle, contributor.id]);

  return (
    <Fragment>
      <motion.tr
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.25,
          delay: localIndex * 0.025,
        }}
        style={{ willChange: "transform, opacity" }}
        className={`border-b transition-colors ${
          isSelected ? "bg-[#F8FAFC]" : "hover:bg-slate-50/70"
        }`}
      >
        {/* RANK */}
        <td className="px-6 py-5">
          <RankBadge rank={rank} />
        </td>

        {/* CONTRIBUTOR */}
        <td className="px-6 py-5">
          <div className="flex items-center gap-3">
            <ContributorAvatar
              name={contributor.name}
              image={contributor.image}
            />
            <div>
              <p className="font-bold text-slate-900">{contributor.name}</p>
              <p className="mt-0.5 text-xs text-slate-400">
                {contributor.merged !== undefined
                  ? "WikiClub Tech Contributor"
                  : "Featured Community Member"}
              </p>
            </div>
          </div>
        </td>

        {/* CONTRIBUTION */}
        <td className="px-6 py-5">
          {contributor.merged !== undefined ? (
            <div className="flex items-center gap-2">
              <GitPullRequest className="h-4 w-4 text-[#35A06A]" />
              <span className="font-bold text-[#35A06A]">
                {contributor.merged}
              </span>
              <span className="text-sm text-slate-400">
                {contributor.merged === 1 ? "contribution" : "contributions"}
              </span>
            </div>
          ) : (
            <span className="inline-flex rounded-full bg-[#045797]/10 px-3 py-1.5 text-xs font-bold text-[#045797]">
              Featured
            </span>
          )}
        </td>

        {/* DETAILS */}
        <td className="px-6 py-5">
          <button
            type="button"
            onClick={handleToggle}
            aria-expanded={isSelected}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-[#045797]/30 hover:bg-[#F5F7FA] hover:text-[#045797]"
          >
            {isSelected ? "Hide Details" : "View Details"}
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                isSelected ? "rotate-180" : ""
              }`}
            />
          </button>
        </td>
      </motion.tr>

      {/* EXPANDED DETAILS */}
      <AnimatePresence initial={false}>
        {isSelected && (
          <motion.tr
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <td colSpan={4} className="border-b bg-[#F8FAFC] px-6 py-6">
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                style={{ willChange: "transform, opacity" }}
                className="rounded-xl border bg-white p-5 shadow-sm"
              >
                {/* PROFILE */}
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <ContributorAvatar
                    name={contributor.name}
                    image={contributor.image}
                    size="large"
                  />
                  <div>
                    <p className="text-xl font-bold text-slate-900">
                      {contributor.name}
                    </p>
                    <p className="mt-1 text-sm font-medium text-[#045797]">
                      {contributor.merged !== undefined
                        ? "WikiClub Tech Contributor"
                        : "Featured Community Member"}
                    </p>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                      {contributor.description}
                    </p>
                  </div>
                </div>

                {/* STATS */}
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-lg border bg-[#F8FAFC] p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Community Rank
                    </p>
                    <p className="mt-1 text-lg font-bold text-[#045797]">
                      #{rank}
                    </p>
                  </div>

                  <div className="rounded-lg border bg-[#F8FAFC] p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Contribution Record
                    </p>
                    <p className="mt-1 text-lg font-bold text-[#35A06A]">
                      {contributor.merged !== undefined
                        ? contributor.merged
                        : "Featured"}
                    </p>
                  </div>

                  <div className="rounded-lg border bg-[#F8FAFC] p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Status
                    </p>
                    <p className="mt-1 text-lg font-bold text-[#35A06A]">
                      Active
                    </p>
                  </div>
                </div>

                {/* CONTRIBUTION DETAILS */}
                <div className="mt-6 border-t pt-5">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        Contribution Details
                      </p>
                      <p className="text-xs text-slate-400">
                        WikiClub Tech community record
                      </p>
                    </div>
                    <span className="rounded-full bg-[#35A06A]/10 px-3 py-1 text-xs font-bold text-[#35A06A]">
                      {contributor.merged !== undefined
                        ? `Total: ${contributor.merged}`
                        : "Featured Member"}
                    </span>
                  </div>

                  <div className="rounded-lg border bg-[#F8FAFC] p-4">
                    <div className="flex items-center gap-3">
                      <GitPullRequest className="h-5 w-5 text-[#35A06A]" />
                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {contributor.merged !== undefined
                            ? `${contributor.merged} merged ${
                                contributor.merged === 1
                                  ? "contribution"
                                  : "contributions"
                              }`
                            : "Featured community member"}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {contributor.merged !== undefined
                            ? "Recognized contribution count for WikiClub Tech."
                            : "Featured here for community participation. A verified contribution count can be added later."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </td>
          </motion.tr>
        )}
      </AnimatePresence>
    </Fragment>
  );
});

/* =========================================================
   STATIC PAGE CONSTANTS
========================================================= */
const CONTRIBUTORS_PER_PAGE = 10;
const TOTAL_CONTRIBUTIONS = contributors.reduce(
  (total, contributor) => total + (contributor.merged || 0),
  0,
);
const TOTAL_ACHIEVEMENTS = achievements.length;
const TOTAL_CONTRIBUTOR_PAGES = Math.ceil(
  contributors.length / CONTRIBUTORS_PER_PAGE,
);

/* =========================================================
   PAGE
========================================================= */
export default function AchievementsPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [contributorPage, setContributorPage] = useState(0);

  const visibleContributors = useMemo(() => {
    const start = contributorPage * CONTRIBUTORS_PER_PAGE;
    return contributors.slice(start, start + CONTRIBUTORS_PER_PAGE);
  }, [contributorPage]);

  const handleToggleSelect = useCallback((id: string) => {
    setSelected((current) => (current === id ? null : id));
  }, []);

  const handlePrevPage = useCallback(() => {
    setContributorPage((page) => Math.max(0, page - 1));
    setSelected(null);
  }, []);

  const handleNextPage = useCallback(() => {
    setContributorPage((page) =>
      Math.min(TOTAL_CONTRIBUTOR_PAGES - 1, page + 1),
    );
    setSelected(null);
  }, []);

  // Memoize static Hero & Milestones so they never re-render during table interaction
  const heroSection = useMemo(
    () => (
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-16 pt-28 lg:px-8">
        <div className="max-w-4xl">
          <p className="achievement-label mb-4">
            WikiClub Tech UU · Achievements
          </p>

          <h1 className="text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl">
            Celebrating
            <span className="achievement-blue"> Ideas, Impact </span>&
            Achievement.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            A record of the milestones, achievements and contributions that
            define the WikiClub Tech community at United University.
          </p>
        </div>
      </section>
    ),
    [],
  );

  const milestonesSection = useMemo(
    () => (
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-16 lg:px-8">
        <div className="mb-8">
          <p className="achievement-label">By the numbers</p>
          <h2 className="achievement-section-title mt-2 text-3xl font-bold">
            Our Milestones
          </h2>
          <p className="achievement-section-description mt-2 max-w-2xl">
            A quick look at the community&apos;s contribution and achievement
            milestones.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* CONTRIBUTORS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ willChange: "transform, opacity" }}
            className="milestone-card"
          >
            <div className="milestone-line milestone-line-green" />
            <p className="milestone-number">{contributors.length}</p>
            <p className="milestone-label">Featured Contributors</p>
          </motion.div>

          {/* VERIFIED CONTRIBUTIONS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            style={{ willChange: "transform, opacity" }}
            className="milestone-card"
          >
            <div className="milestone-line milestone-line-blue" />
            <p className="milestone-number">{TOTAL_CONTRIBUTIONS}</p>
            <p className="milestone-label">Recorded Contributions</p>
          </motion.div>

          {/* ACHIEVEMENTS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ willChange: "transform, opacity" }}
            className="milestone-card"
          >
            <div className="milestone-line milestone-line-maroon" />
            <p className="milestone-number">{TOTAL_ACHIEVEMENTS}</p>
            <p className="milestone-label">Community Achievements</p>
          </motion.div>
        </div>
      </section>
    ),
    [],
  );

  const joinCta = useMemo(
    () => (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ willChange: "transform, opacity" }}
        className="mt-8 flex flex-col gap-4 rounded-2xl border bg-white p-6 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-start gap-4">
          <div className="achievement-icon shrink-0">
            <GitPullRequest className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">
              Want to become a contributor?
            </h3>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Join WikiClub Tech and contribute to open knowledge,
              documentation and community projects.
            </p>
          </div>
        </div>

        <Link
          href="https://docs.google.com/forms/d/e/1FAIpQLSd0VADKBrLPGOxYuLbLyZXa9EAYjbWZ4HWctRnYecpn-XpLXw/viewform"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#045797] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#034576]"
        >
          Join WikiClub Tech
          <ExternalLink className="h-4 w-4" />
        </Link>
      </motion.div>
    ),
    [],
  );

  return (
    <main className="achievement-page relative isolate min-h-screen">
      {/* Pastel gradient background with GPU acceleration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          transform: "translateZ(0)",
          background: `
        radial-gradient(circle at 15% 10%, rgba(210, 238, 250, 0.75) 0%, rgba(210, 238, 250, 0) 42%),
        radial-gradient(circle at 85% 10%, rgba(215, 250, 225, 0.8) 0%, rgba(215, 250, 225, 0) 45%),
        radial-gradient(circle at 80% 90%, rgba(255, 245, 235, 0.65) 0%, rgba(255, 245, 235, 0) 40%),
        #f8fcfa
      `,
        }}
      />

      {/* Hero & Milestones section with scoped background grid */}
      <div className="relative isolate">
        {/* Grid background — scoped to Hero through Our Milestones with GPU acceleration */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            transform: "translateZ(0)",
            backgroundImage: `
          linear-gradient(rgba(100, 116, 139, 0.12) 1px, transparent 1px),
          linear-gradient(90deg, rgba(100, 116, 139, 0.12) 1px, transparent 1px)
        `,
            backgroundSize: "52px 52px",
            backgroundPosition: "center center",
            maskImage: "linear-gradient(to bottom, black 80%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 80%, transparent)",
          }}
        />

        {/* HERO */}
        {heroSection}

        {/* =====================================================
            OUR MILESTONES
        ===================================================== */}
        {milestonesSection}
      </div>

      {/* =====================================================
          CONTRIBUTION CHAMPIONS
      ===================================================== */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <div className="mb-8">
          <p className="achievement-label">Community contribution</p>
          <h2 className="achievement-section-title mt-2 text-3xl font-bold">
            Contribution Champions
          </h2>
          <p className="achievement-section-description mt-2 max-w-2xl">
            Recognizing contributors and community members who are helping
            build, improve and grow WikiClub Tech.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] border-collapse">
              <thead>
                <tr className="border-b bg-[#F5F7FA] text-left">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Rank
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Contributor
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Contribution
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Details
                  </th>
                </tr>
              </thead>

              <tbody>
                {visibleContributors.map((contributor, localIndex) => {
                  const globalIndex =
                    contributorPage * CONTRIBUTORS_PER_PAGE + localIndex;
                  const rank = globalIndex + 1;
                  const isSelected = selected === contributor.id;

                  return (
                    <ContributorTableRow
                      key={contributor.id}
                      contributor={contributor}
                      rank={rank}
                      localIndex={localIndex}
                      isSelected={isSelected}
                      onToggle={handleToggleSelect}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* ===================================================
              PAGINATION
          =================================================== */}
          <div className="flex flex-col gap-4 border-t bg-[#F8FAFC] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {contributorPage * CONTRIBUTORS_PER_PAGE + 1}–
                {Math.min(
                  (contributorPage + 1) * CONTRIBUTORS_PER_PAGE,
                  contributors.length,
                )}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-700">
                {contributors.length}
              </span>{" "}
              featured contributors
            </p>

            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={handlePrevPage}
                disabled={contributorPage === 0}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-[#045797]/30 hover:text-[#045797] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>

              <span className="rounded-lg bg-[#045797] px-4 py-2 text-sm font-bold text-white">
                {contributorPage + 1} / {TOTAL_CONTRIBUTOR_PAGES}
              </span>

              <button
                type="button"
                onClick={handleNextPage}
                disabled={contributorPage === TOTAL_CONTRIBUTOR_PAGES - 1}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-[#045797]/30 hover:text-[#045797] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* =====================================================
            JOIN WIKICLUB CTA
        ===================================================== */}
        {joinCta}
      </section>

      {/* =====================================================
          ACHIEVEMENT HIGHLIGHTS
      ===================================================== */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="mb-10">
          <p className="achievement-label">WikiClub Tech Community</p>
          <h2 className="achievement-section-title mt-2 text-3xl font-bold">
            Achievement Highlights
          </h2>
        </div>

        {highlightSections.map((section) => (
          <LazyHighlightSlideshow key={section.id} section={section} />
        ))}
      </section>
    </main>
  );
}

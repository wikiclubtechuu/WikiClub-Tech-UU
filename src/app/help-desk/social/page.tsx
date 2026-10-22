// FILE: src/app/help-desk/social/page.tsx   (route: /help-desk/social; the folder must be named "social" in lowercase)
// PURPOSE: Social Media tool - links to the club's accounts, with live post previews for the first row.
// A 3 x 2 grid.
//   Row 1 (with a live preview of a featured post): LinkedIn, X (Twitter), Instagram
//   Row 2 (link only, with a highlighted icon):      Facebook, Pinterest, Threads
// Clicking anywhere on a box opens that page in a new tab.

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { FaInstagram, FaPinterest, FaFacebook, FaLinkedin } from "react-icons/fa";
import { ArrowUpRight, AtSign, Play } from "lucide-react";
import PageShell from "@/components/help-desk/PageShell";
import Reveal from "@/components/help-desk/Reveal";

export const metadata: Metadata = {
  title: "Social Media | Help Desk | WikiClub Tech",
  description: "Follow UU Wiki Club on LinkedIn, X, Instagram, Facebook, Pinterest and Threads.",
};

// ===== EDIT THESE =====================================================================
const CLUB_NAME = "UU Wiki Club";

// The page or post each box opens. Replace a link to feature something newer.
const LINKS = {
  linkedin:
    "https://www.linkedin.com/posts/wikiclubtechuu_wikiclubtechuu-opensource-hacktoberfest-activity-7514359599639048192-5gp8",
  twitter: "https://x.com/wikiclubtechuu/status/2108597948410106164",
  instagram: "https://www.instagram.com/reel/DeR42AUTsrd/",
  facebook: "https://www.facebook.com/share/r/19ihhs9mUJ/",
  pinterest: "https://pin.it/7c4HjJIUH",
  threads: "https://www.threads.com/share/BAaw9ZvDL-/",
};
// =======================================================================================

/* ---------- Building the live-preview address from a post link ---------- */

function instagramEmbed(url: string): string | undefined {
  try {
    const parts = new URL(url).pathname.split("/").filter(Boolean);
    if (parts.length >= 2) return `https://www.instagram.com/${parts[0]}/${parts[1]}/embed/`; // reel / post
    if (parts.length === 1) return `https://www.instagram.com/${parts[0]}/embed/`; // profile
  } catch {}
  return undefined;
}

function twitterEmbed(url: string): string | undefined {
  const id = url.match(/status\/(\d+)/)?.[1];
  return id ? `https://platform.twitter.com/embed/Tweet.html?id=${id}&theme=light&dnt=true` : undefined;
}

function linkedinEmbed(url: string): string | undefined {
  const m = url.match(/(activity|share|ugcPost)-(\d+)/);
  return m ? `https://www.linkedin.com/embed/feed/update/urn:li:${m[1]}:${m[2]}` : undefined;
}

function twitterHandle(url: string): string {
  try {
    const h = new URL(url).pathname.split("/").filter(Boolean)[0];
    return h ? `@${h}` : "Featured post";
  } catch {
    return "Featured post";
  }
}

/* ---------- The six platforms ---------- */

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true">
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

type Platform = {
  name: string;
  url: string;
  line: string;
  cta: string;
  icon: ReactNode;
  accent: string;
  embed?: string; // live preview address (row 1 only)
  video?: boolean; // shows a play button on the card preview
};

// Row 1: boxes with a preview.
const PREVIEW_PLATFORMS: Platform[] = [
  {
    name: "LinkedIn",
    url: LINKS.linkedin,
    line: "Featured post",
    cta: "View on LinkedIn",
    icon: <FaLinkedin />,
    accent: "hd-accent-blue",
    embed: linkedinEmbed(LINKS.linkedin),
  },
  {
    name: "X (Twitter)",
    url: LINKS.twitter,
    line: twitterHandle(LINKS.twitter),
    cta: "View on X",
    icon: <XIcon />,
    accent: "hd-accent-navy",
    embed: twitterEmbed(LINKS.twitter),
  },
  {
    name: "Instagram",
    url: LINKS.instagram,
    line: "Featured reel",
    cta: "Watch on Instagram",
    icon: <FaInstagram />,
    accent: "hd-accent-green",
    embed: instagramEmbed(LINKS.instagram),
    video: true,
  },
];

// Row 2: link-only boxes with a highlighted icon.
const LINK_PLATFORMS: Platform[] = [
  {
    name: "Facebook",
    url: LINKS.facebook,
    line: "Watch our latest reel and follow the page.",
    cta: "Visit Facebook",
    icon: <FaFacebook />,
    accent: "hd-accent-blue",
  },
  {
    name: "Pinterest",
    url: LINKS.pinterest,
    line: "Browse our pins and ideas.",
    cta: "Visit Pinterest",
    icon: <FaPinterest />,
    accent: "hd-accent-teal",
  },
  {
    name: "Threads",
    url: LINKS.threads,
    line: "Join the conversation with us.",
    cta: "Visit Threads",
    icon: <AtSign size="1em" />,
    accent: "hd-accent-green",
  },
];

export default function SocialPage() {
  return (
    <PageShell title="Social Media" full>
      <Reveal className="-mt-3 mb-8">
        <p className="hd-muted text-lg">Stay in the loop with the club. Tap any box to open it on that platform.</p>
      </Reveal>

      {/* 3 columns x 2 rows on a large screen. 2 columns on a tablet, 1 on a phone. */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {PREVIEW_PLATFORMS.map((p, i) => (
          <PreviewBox key={p.name} index={i} platform={p}>
            {p.embed ? (
              <iframe
                src={p.embed}
                title={`${CLUB_NAME} on ${p.name}`}
                loading="lazy"
                scrolling="no"
                tabIndex={-1}
                className="h-full w-full border-0 bg-white"
              />
            ) : (
              <CardPreview platform={p} />
            )}
          </PreviewBox>
        ))}

        {LINK_PLATFORMS.map((p, i) => (
          <LinkBox key={p.name} index={i + 3} platform={p} />
        ))}
      </div>
    </PageShell>
  );
}

/** Row 1: a box with a header, a preview of a post, and a button. The whole box is one big link. */
function PreviewBox({ index, platform: p, children }: { index: number; platform: Platform; children: ReactNode }) {
  return (
    <Reveal delay={Math.min(index, 5) * 0.08} className="h-full">
      <div className={`hd-card hd-social relative flex h-full flex-col overflow-hidden ${p.accent}`}>
        <div className="flex items-center gap-3 p-4">
          <div className="hd-icon grid h-11 w-11 place-items-center rounded-xl text-xl">{p.icon}</div>
          <div className="min-w-0">
            <h2 className="hd-title font-bold">{p.name}</h2>
            <p className="hd-muted truncate text-sm">{p.line}</p>
          </div>
          <ArrowUpRight className="ml-auto h-5 w-5 shrink-0" style={{ color: "var(--accent)" }} />
        </div>

        <div className="hd-edge-y relative h-[460px] overflow-hidden">
          {children}
          <span className="hd-social-hint">
            Open {p.name} <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>

        <div className="p-4">
          <span className="hd-btn w-full">{p.cta}</span>
        </div>

        {/* Invisible link stretched over the whole box, so a click anywhere opens the post.
            It also sits above the preview, so the embedded frame can't swallow the click. */}
        <a
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${p.name} in a new tab`}
          className="hd-social-link absolute inset-0 z-10"
        />
      </div>
    </Reveal>
  );
}

/** Row 2: no preview, just a big highlighted icon, the name, and a button. */
function LinkBox({ index, platform: p }: { index: number; platform: Platform }) {
  return (
    <Reveal delay={Math.min(index, 5) * 0.08} className="h-full">
      <div
        className={`hd-card hd-social relative flex h-full flex-col items-center justify-center gap-5 px-6 py-10 text-center ${p.accent}`}
      >
        {/* The highlighted figure: the icon in a glowing, ringed circle. */}
        <div className="relative grid h-32 w-32 place-items-center" aria-hidden="true">
          <span className="absolute inset-0 rounded-full" style={{ background: "var(--accent-soft)" }} />
          <span className="absolute inset-3 rounded-full" style={{ background: "var(--accent-line)" }} />
          <span
            className="relative grid h-[72px] w-[72px] place-items-center rounded-full text-4xl text-white shadow-lg"
            style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-strong))" }}
          >
            {p.icon}
          </span>
        </div>

        <div>
          <h2 className="hd-title text-xl font-bold">{p.name}</h2>
          <p className="hd-muted mx-auto mt-1 max-w-xs text-sm">{p.line}</p>
        </div>

        <span className="hd-btn">
          {p.cta} <ArrowUpRight className="h-4 w-4" />
        </span>

        <a
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${p.name} in a new tab`}
          className="hd-social-link absolute inset-0 z-10"
        />
      </div>
    </Reveal>
  );
}

/** Styled stand-in for a post (used when a live preview can't be built): banner, avatar, media block. */
function CardPreview({ platform: p }: { platform: Platform }) {
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="hd-banner h-24 shrink-0" />
      <div className="-mt-9 flex items-end gap-3 px-5">
        <div className="hd-avatar grid h-[72px] w-[72px] shrink-0 place-items-center rounded-full border-4 border-white text-3xl text-white">
          {p.icon}
        </div>
        <div className="pb-1">
          <p className="hd-title font-bold leading-tight">{CLUB_NAME}</p>
          <p className="hd-muted text-sm">{p.line} on {p.name}</p>
        </div>
      </div>

      <div className="mt-6 flex-1 space-y-3 px-5 pb-5">
        <div className="h-3 w-11/12 rounded-full bg-gray-100" />
        <div className="h-3 w-3/4 rounded-full bg-gray-100" />
        <div
          className="mt-4 grid h-44 place-items-center rounded-xl"
          style={{ background: "color-mix(in srgb, var(--accent) 12%, white)" }}
        >
          {p.video && (
            <span
              className="grid h-14 w-14 place-items-center rounded-full text-white"
              style={{ background: "var(--accent)" }}
            >
              <Play className="h-6 w-6 translate-x-0.5" fill="currentColor" />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
// FILE: src/components/help-desk/FaqGrid.tsx
// FAQ list: categories on the left (stacked vertically), questions and answers on the right.
// Long answers are truncated with a "Read More" button.
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { FAQ_CATEGORIES, type Faq } from "@/lib/faq-data";
import Reveal from "@/components/help-desk/Reveal";

type Tile = Faq & { n: number; cat: number; accent: string };

// One flat list of all questions, numbered 1..50 in order.
const TILES: Tile[] = (() => {
  let n = 0;
  return FAQ_CATEGORIES.flatMap((c, ci) =>
    c.items.map((f): Tile => ({ ...f, n: ++n, cat: ci, accent: c.accent }))
  );
})();

const ANSWER_TRUNCATE_LENGTH = 200; // characters to show before "Read More"

export default function FaqGrid() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<number>(0); // default to first category
  const [expandedN, setExpandedN] = useState<Set<number>>(new Set());

  const q = query.trim().toLowerCase();

  const tiles = useMemo(
    () =>
      TILES.filter(
        (t) =>
          t.cat === cat &&
          (!q || t.q.toLowerCase().includes(q) || t.a.toLowerCase().includes(q))
      ),
    [q, cat]
  );

  const toggleExpand = (n: number) => {
    const next = new Set(expandedN);
    if (next.has(n)) next.delete(n);
    else next.add(n);
    setExpandedN(next);
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr] lg:gap-8">
      {/* LEFT: category filters, stacked vertically */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="hd-panel p-3">
          <p className="hd-muted mb-2 px-2 text-xs font-semibold uppercase tracking-wide">Categories</p>
          <div className="flex flex-col gap-1" role="group" aria-label="Filter by category">
            {FAQ_CATEGORIES.map((c, ci) => (
              <button
                key={c.title}
                type="button"
                onClick={() => {
                  setCat(ci);
                  setExpandedN(new Set());
                }}
                aria-pressed={cat === ci}
                className={`${c.accent} flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors duration-200 ${
                  cat === ci ? "hd-pill font-bold" : "hd-ghost font-medium"
                }`}
              >
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ background: "var(--accent)" }}
                  aria-hidden="true"
                />
                <span className="flex-1">{c.title}</span>
                <span className="hd-muted text-xs">{c.items.length}</span>
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* RIGHT: search and questions */}
      <div className="min-w-0">
        <Reveal>
          <div className="hd-panel mb-6 flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search questions..."
                aria-label="Search the questions"
                className="hd-field w-full rounded-xl py-2.5 pl-9 pr-3"
              />
            </div>
            <p className="hd-muted text-sm">
              <b>{tiles.length}</b> of {FAQ_CATEGORIES[cat].items.length}
            </p>
          </div>
        </Reveal>

        {tiles.length === 0 ? (
          <div className="hd-panel hd-muted border-dashed py-12 text-center">
            <b className="hd-title">No questions match your search.</b>
            <br />
            Try different words, or email us from the Contact page.
          </div>
        ) : (
          <Reveal>
            <div className="space-y-3">
              {tiles.map((t) => (
                <FaqItem
                  key={t.n}
                  tile={t}
                  expanded={expandedN.has(t.n)}
                  onToggle={() => toggleExpand(t.n)}
                />
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );
}

function FaqItem({
  tile,
  expanded,
  onToggle,
}: {
  tile: Tile;
  expanded: boolean;
  onToggle: () => void;
}) {
  const isLong = tile.a.length > ANSWER_TRUNCATE_LENGTH;
  const displayAnswer =
    isLong && !expanded ? tile.a.substring(0, ANSWER_TRUNCATE_LENGTH).trimEnd() + "..." : tile.a;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className={`hd-card p-5 ${tile.accent}`}
    >
      <div className="flex items-start gap-3">
        <span className="hd-chip shrink-0 rounded-md px-1.5 py-0.5 text-xs font-bold">
          {String(tile.n).padStart(2, "0")}
        </span>
        <h3 className="hd-title flex-1 text-sm font-semibold leading-snug">{tile.q}</h3>
      </div>

      <div className="mt-3">
        <p className="hd-muted text-sm leading-relaxed">{displayAnswer}</p>

        {isLong && (
          <button
            type="button"
            onClick={onToggle}
            className="mt-2 inline-block text-sm font-semibold transition-colors duration-200 hover:opacity-80"
            style={{ color: "var(--accent-strong)" }}
          >
            {expanded ? "Show Less" : "Read More"}
          </button>
        )}

        {tile.link && (
          <Link
            href={tile.link.href}
            className="mt-3 block text-sm font-semibold transition-colors duration-200 hover:underline"
            style={{ color: "var(--accent-strong)" }}
          >
            {tile.link.label} →
          </Link>
        )}
      </div>
    </motion.div>
  );
}
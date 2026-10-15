"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Images, ArrowLeft } from "lucide-react";

export default function GalleryPage() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#f7fbff] px-5 py-20">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl text-center"
      >
        <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#e5f4ff] text-[#1689d8]">
          <Images size={38} strokeWidth={1.7} />
        </div>

        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#19b99a]">
          Our Memories
        </p>

        <h1 className="text-3xl font-extrabold tracking-tight text-[#0b2540] sm:text-4xl">
          More Memories
          <span className="mt-2 block text-[#1689d8]">
            Coming Soon!
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-md text-base leading-7 text-[#607087]">
          Every event creates a memory worth sharing. We’re getting
          more moments, events, and community highlights ready for you.
          Stay tuned!
        </p>

        <div className="mx-auto mt-7 h-1 w-16 rounded-full bg-gradient-to-r from-[#19b99a] to-[#1689d8]" />

        <Link
          href="/"
          className="mt-9 inline-flex items-center justify-center gap-2 rounded-full bg-[#1689d8] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#0b6eae] hover:shadow-md"
        >
          <ArrowLeft size={17} />
          Back to Home
        </Link>
      </motion.div>
    </main>
  );
}

"use client";

// FILE: src/components/help-desk/Reveal.tsx
// The same entrance as the home page: the block fades in and slides up as it scrolls into view.
// Wrap anything with it:  <Reveal delay={0.1}> ... </Reveal>
// People who turned on "reduce motion" in their system just see the content, with no movement.

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number; // seconds
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
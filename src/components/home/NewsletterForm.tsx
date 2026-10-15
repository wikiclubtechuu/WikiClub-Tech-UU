"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";
import { toast } from "sonner";

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Subscription failed");
      }

      toast.success(
        "Thanks for subscribing! You'll hear from us soon."
      );
      setEmail("");
    } catch (error) {
      console.error(error);
      toast.error(
        "Something went wrong. Please try again later."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      className="relative w-full overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 via-gray-900 to-slate-800 p-3 shadow-sm sm:p-4"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-sky-500/10 blur-2xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-2.5">
          <motion.div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-sky-400"
            whileHover={{ scale: 1.05 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          >
            <FaEnvelope className="text-lg" />
          </motion.div>

          <div className="min-w-0">
            <h3 className="text-sm font-bold leading-tight text-white sm:text-base">
              Subscribe to our Newsletter
            </h3>

            <p className="mt-1 text-xs leading-4 text-gray-400">
              Get the latest updates from our community.
            </p>
          </div>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          className="mt-3 flex w-full flex-col gap-2 sm:flex-row"
        >
          <label
            htmlFor="newsletter-email"
            className="sr-only"
          >
            Email address
          </label>

          <input
            id="newsletter-email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            autoComplete="email"
            required
            disabled={submitting}
            className="box-border min-w-0 w-full flex-1 rounded-lg border border-gray-700 bg-gray-800/80 px-3 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-gray-500 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 disabled:cursor-not-allowed disabled:opacity-60"
          />

          <motion.button
            type="submit"
            disabled={submitting}
            className="w-full shrink-0 rounded-lg bg-gradient-to-r from-cyan-500 to-sky-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:from-cyan-400 hover:to-sky-400 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            whileHover={{
              scale: submitting ? 1 : 1.02,
            }}
            whileTap={{
              scale: submitting ? 1 : 0.98,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          >
            {submitting ? "Subscribing..." : "Subscribe"}
          </motion.button>
        </motion.form>

        <p className="mt-2 text-[11px] leading-4 text-gray-500">
          Stay updated without the noise.
        </p>
      </div>
    </motion.div>
  );
};

export default NewsletterForm;

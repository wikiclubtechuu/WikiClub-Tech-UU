"use client";

import React, { MouseEvent, useState } from "react";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaLinkedin,
  FaWikipediaW,
} from "react-icons/fa";
import type { IconType } from "react-icons";
import Link from "next/link";
import NewsletterForm from "./NewsletterForm";

type SocialCard = {
  title: string;
  description: string;
  href: string;
  action: string;
  Icon: IconType;
  iconStyle: string;
};

const socialCards: SocialCard[] = [
  {
    title: "Instagram",
    description:
      "Explore community events, activities, and stories from WikiClub Tech.",
    href: "https://www.instagram.com/wikiclubtech.uu/",
    action: "Follow us",
    Icon: FaInstagram,
    iconStyle:
      "bg-pink-50 text-pink-600 group-hover:bg-pink-600",
  },
  {
    title: "LinkedIn",
    description:
      "Connect with our community and discover the latest club updates.",
    href: "https://www.linkedin.com/company/wikiclubtechuu/",
    action: "Connect with us",
    Icon: FaLinkedin,
    iconStyle:
      "bg-blue-50 text-blue-600 group-hover:bg-blue-600",
  },
  {
    title: "Meta-Wiki",
    description:
      "Explore our Wikimedia page and open-source community work.",
    href: "https://meta.wikimedia.org/wiki/WikiClub_Tech_UU",
    action: "Visit Meta-Wiki",
    Icon: FaWikipediaW,
    iconStyle:
      "bg-slate-100 text-slate-700 group-hover:bg-slate-700",
  },
];

const Socials = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const [mousePositions, setMousePositions] = useState<
    Record<number, { x: number; y: number }>
  >({});

  const handleMouseMove = (
    event: MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();

    setMousePositions((previous) => ({
      ...previous,
      [index]: {
        x: ((event.clientX - rect.left) / rect.width) * 100,
        y: ((event.clientY - rect.top) / rect.height) * 100,
      },
    }));
  };

  const glowStyle = (index: number) => ({
    opacity: hoveredCard === index ? 1 : 0,
    background: `radial-gradient(220px circle at ${
      mousePositions[index]?.x ?? 50
    }% ${mousePositions[index]?.y ?? 50}%, rgba(96, 165, 250, 0.14), transparent 72%)`,
  });

  const cardClassName =
    "group relative h-full min-w-0 overflow-hidden rounded-xl border border-[#e4edf5] bg-[#f7fbff] p-3 shadow-sm transition-shadow duration-300 hover:shadow-lg sm:rounded-2xl sm:p-5 lg:p-6";

  return (
    <section className="relative overflow-hidden bg-white py-10 sm:py-16 md:py-20">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto mb-7 max-w-3xl text-center sm:mb-11"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-3 flex items-center justify-center gap-2 sm:mb-4 sm:gap-3">
            <span className="h-[2px] w-6 bg-[#1689d8] sm:w-8" />

            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#1689d8] sm:text-sm sm:tracking-[0.16em]">
              Stay Connected
            </p>

            <span className="h-[2px] w-6 bg-[#1689d8] sm:w-8" />
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-[#0b2540] sm:text-4xl md:text-5xl">
            Join the{" "}
            <span className="text-[#1689d8]">Conversation</span>
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#607087] sm:mt-4 sm:text-base sm:leading-7 md:text-lg">
            Follow WikiClub Tech for community updates, events,
            learning opportunities, and open-source activities.
          </p>

          <div className="mx-auto mt-4 h-1 w-14 rounded-full bg-gradient-to-r from-[#19b99a] to-[#1689d8] sm:mt-5 sm:w-16" />
        </motion.div>

        <div className="grid grid-cols-2 items-stretch gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-5">
          {socialCards.map(
            (
              {
                title,
                description,
                href,
                action,
                Icon,
                iconStyle,
              },
              index
            ) => (
              <motion.div
                key={href}
                className={`${cardClassName} ${
                  index === 2 ? "col-span-2 lg:col-span-1" : ""
                }`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.08,
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseMove={(event) =>
                  handleMouseMove(event, index)
                }
                onMouseLeave={() => setHoveredCard(null)}
                whileHover={{ y: -4 }}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-200 sm:rounded-2xl"
                  style={glowStyle(index)}
                />

                <div className="relative z-10 flex h-full min-w-0 flex-col">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 group-hover:text-white sm:h-11 sm:w-11 sm:rounded-xl ${iconStyle}`}
                  >
                    <Icon className="text-lg sm:text-xl" />
                  </div>

                  <h3 className="mt-3 break-words text-sm font-bold leading-snug text-[#0b2540] sm:mt-4 sm:text-lg">
                    {title}
                  </h3>

                  <p className="mt-2 flex-1 text-xs leading-5 text-[#607087] sm:text-sm sm:leading-6">
                    {description}
                  </p>

                  <Link
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${action}: ${title}`}
                    className="mt-3 inline-flex w-fit max-w-full items-center gap-1 text-xs font-semibold text-[#1689d8] transition-colors hover:text-[#0b6eae] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1689d8] focus-visible:ring-offset-2 sm:mt-4 sm:gap-2 sm:text-sm"
                  >
                    <span>{action}</span>
                    <span
                      aria-hidden="true"
                      className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                </div>
              </motion.div>
            )
          )}
        </div>

        <motion.div
          className="relative mx-auto mt-4 w-full max-w-4xl overflow-hidden rounded-xl border border-[#dceaf6] bg-[#f4f9ff] shadow-sm transition-shadow duration-300 hover:shadow-lg sm:mt-5"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.45 }}
        >
          <div className="grid items-center gap-3 p-3 sm:grid-cols-2 sm:gap-5 sm:p-4 md:p-5">
            <div className="text-center sm:text-left">
              <span className="inline-flex rounded-full border border-blue-100 bg-white px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#1689d8]">
                Newsletter
              </span>

              <h3 className="mt-1.5 text-lg font-extrabold leading-tight text-[#0b2540] sm:text-xl">
                Stay in the Loop
              </h3>

              <p className="mx-auto mt-1 max-w-md text-xs leading-5 text-[#607087] sm:mx-0 sm:text-sm">
                Get updates about events, activities, and the latest from
                WikiClub Tech.
              </p>
            </div>

            <div className="w-full min-w-0 rounded-lg border border-[#e4edf5] bg-white p-2 sm:p-3">
              <NewsletterForm />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Socials;

"use client";

import React, { MouseEvent, useState } from "react";
import { motion } from "framer-motion";
import { Code2, Users, Trophy, ArrowRight } from "lucide-react";

const stats = [
  {
    value: "70+",
    label: "Contributions",
    icon: Code2,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50",
  },
  {
    value: "600+",
    label: "Community Members",
    icon: Users,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50",
  },
  {
    value: "20+",
    label: "Achievements",
    icon: Trophy,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-50",
  },
];

const WhoWeAre = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-emerald-500" />
              <span className="text-xs font-bold tracking-[0.16em] uppercase text-slate-500">
                About WikiClub Tech
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight text-[#0b2540]">
              More Than Just a
              <br />
              <span className="text-[#1689d8]">Tech Club.</span>
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
              WikiClub Tech at United University is a student-driven community
              that empowers learners to explore open-source technologies,
              contribute to the Wikimedia ecosystem and build real-world
              projects together.
            </p>

            <a
              href="https://meta.wikimedia.org/wiki/WikiClub_Tech_UU"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 mt-6 text-sm font-semibold text-[#1689d8] hover:text-[#0b6eae] transition-colors"
            >
              Learn More
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </motion.div>

          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              className="pointer-events-none absolute inset-0 z-0 rounded-3xl transition-opacity duration-200"
              style={{
                opacity: isHovered ? 1 : 0,
                background:
                  "radial-gradient(260px circle at " +
                  mousePosition.x +
                  "% " +
                  mousePosition.y +
                  "%, rgba(96, 165, 250, 0.10), transparent 72%)",
              }}
            />

            <div className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="rounded-2xl border border-slate-100 bg-[#f7fbff] px-4 py-5 text-center shadow-sm sm:px-3 sm:py-6 lg:px-8 lg:py-7"
                >
                  <div
                    className={
                      "mx-auto flex h-12 w-12 items-center justify-center rounded-full " +
                      stat.iconBg +
                      " " +
                      stat.iconColor
                    }
                  >
                    <stat.icon size={23} strokeWidth={2} />
                  </div>

                  <h3 className="mt-3 text-3xl font-extrabold text-[#0b2540] sm:text-2xl lg:text-4xl">
                    {stat.value}
                  </h3>

                  <p className="mt-2 text-xs font-medium text-slate-500 sm:text-[11px] lg:text-sm">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;

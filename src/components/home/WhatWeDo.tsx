
"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  BookOpen,
  CalendarDays,
  Lightbulb,
  GitBranch,
} from "lucide-react";

const activities = [
  {
    icon: Code2,
    title: "Open Source",
    description:
      "Explore real open-source projects, make contributions and learn collaborative development.",
    iconColor: "text-sky-500",
    iconBg: "bg-sky-50",
  },
  {
    icon: BookOpen,
    title: "Workshops & Sessions",
    description:
      "Take part in practical workshops, technical sessions and hands-on learning activities.",
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50",
  },
  {
    icon: CalendarDays,
    title: "Technical Events",
    description:
      "Participate in hackathons, coding activities, community events and technology-focused programs.",
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50",
  },
  {
    icon: Lightbulb,
    title: "Projects",
    description:
      "Turn ideas into practical projects and experiment with technologies that solve real problems.",
    iconColor: "text-amber-500",
    iconBg: "bg-amber-50",
  },
  {
    icon: GitBranch,
    title: "Community Programs",
    description:
      "Join initiatives that encourage knowledge sharing, participation and contribution within the community.",
    iconColor: "text-cyan-600",
    iconBg: "bg-cyan-50",
  },
];

const WhatWeDo = () => {
  return (
    <section
      id="what-we-do"
      className="bg-[#f0f8ff] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center sm:mb-12"
        >
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-[2px] w-8 bg-[#1689d8]" />
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
              What We Do
            </span>
            <span className="h-[2px] w-8 bg-[#19b99a]" />
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-[#0b2540] sm:text-4xl">
            What We Do
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Discover the activities, opportunities and initiatives that help
            our community learn, build and contribute together.
          </p>
        </motion.div>

        {/* Activity Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {activities.map((activity, index) => {
            const Icon = activity.icon;

            return (
              <motion.div
                key={activity.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: (index % 3) * 0.08,
                }}
                whileHover={{ y: -4 }}
                className="
                  min-h-[220px]
                  rounded-2xl
                  border border-slate-100
                  bg-white
                  p-6
                  shadow-sm
                  transition-shadow duration-300
                  hover:shadow-md
                  sm:p-7
                "
              >
                <div
                  className={`
                    flex h-12 w-12 items-center justify-center
                    rounded-xl ${activity.iconBg} ${activity.iconColor}
                  `}
                >
                  <Icon size={23} strokeWidth={1.9} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-[#0b2540]">
                  {activity.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {activity.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Text */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 text-center text-sm text-slate-500 sm:mt-12 sm:text-base"
        >
          Explore technology. Build projects. Contribute to the community.
        </motion.p>
      </div>
    </section>
  );
};

export default WhatWeDo;

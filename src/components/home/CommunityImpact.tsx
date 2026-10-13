"use client";

import React, { MouseEvent, useState } from "react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaCodeBranch,
  FaLaptopCode,
  FaHandsHelping,
} from "react-icons/fa";

const impactItems = [
  {
    icon: FaUsers,
    title: "Student Participation",
    description:
      "Creating a space where students can take part, share ideas, and become active members of the technology community.",
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50",
  },
  {
    icon: FaCodeBranch,
    title: "Skills & Growth",
    description:
      "Helping students gain practical experience, strengthen technical skills, and grow through hands-on opportunities.",
    iconColor: "text-sky-600",
    iconBg: "bg-sky-50",
  },
  {
    icon: FaLaptopCode,
    title: "Student Contributions",
    description:
      "Encouraging students to turn their knowledge into meaningful contributions, projects, and open knowledge.",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
  },
  {
    icon: FaHandsHelping,
    title: "Connections & Mentorship",
    description:
      "Building connections between students through peer support, knowledge sharing, teamwork, and mentorship.",
    iconColor: "text-amber-500",
    iconBg: "bg-amber-50",
  },
];

const CommunityImpact = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePositions, setMousePositions] = useState<Record<number, { x: number; y: number }>>({});
  const [valuesHovered, setValuesHovered] = useState(false);
  const [valuesMousePosition, setValuesMousePosition] = useState({ x: 50, y: 50 });
  const handleMouseMove = (event: MouseEvent<HTMLElement>, index: number) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMousePositions((previous) => ({ ...previous, [index]: { x: ((event.clientX - rect.left) / rect.width) * 100, y: ((event.clientY - rect.top) / rect.height) * 100 } }));
  };
  const handleValuesMouseMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setValuesMousePosition({ x: ((event.clientX - rect.left) / rect.width) * 100, y: ((event.clientY - rect.top) / rect.height) * 100 });
  };
  return (
    <section className="relative bg-[#effbf8] py-20 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* =========================
            SECTION HEADING
        ========================== */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-14 md:mb-16"
          initial={{
            opacity: 0,
            y: 18,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* Section Label */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-[#19b99a]" />

            <p className="text-sm font-semibold uppercase tracking-wider text-[#19b99a]">
              Our Impact
            </p>

            <span className="w-8 h-[2px] bg-[#19b99a]" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0b2540]">
            Growing Through{" "}
            <span className="text-[#1689d8]">Community</span>
          </h2>

          {/* Description */}
          <p className="mt-4 text-base sm:text-lg text-[#607087] leading-relaxed">
            Our community creates an environment where students can
            participate, develop skills, contribute their knowledge,
            and build meaningful connections.
          </p>

          {/* Accent */}
          <motion.div
            className="mt-5 mx-auto h-1 rounded-full bg-gradient-to-r from-[#19b99a] to-[#1689d8]"
            initial={{
              width: 0,
              opacity: 0,
            }}
            whileInView={{
              width: 64,
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </motion.div>

        {/* =========================
            IMPACT CARDS
        ========================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {impactItems.map((item, index) => {
            const Icon = item.icon;
            const position = mousePositions[index] || { x: 50, y: 50 };

            return (
              <motion.article
                key={item.title}
                className="
                  group
                  relative
                  bg-white
                  rounded-2xl
                  border
                  border-[#e1f0ec]
                  p-7
                  shadow-sm
                  transition-transform
                  duration-300
                  overflow-hidden
                "
                initial={{
                  opacity: 0,
                  y: 22,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseMove={(event) => handleMouseMove(event, index)}
                onMouseLeave={() => setHoveredCard(null)}
                whileHover={{ y: -6 }}
              >
                <div className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-200" style={{ opacity: hoveredCard === index ? 1 : 0, background: "radial-gradient(190px circle at " + position.x + "% " + position.y + "%, rgba(96, 165, 250, 0.11), transparent 72%)" }} />

                {/* Icon */}
                <div className={`flex items-center justify-center w-14 h-14 rounded-2xl ${item.iconBg} ${item.iconColor} mb-6`}>
                  <Icon className="text-2xl" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-[#0b2540] mb-3">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-6 text-[#607087]">
                  {item.description}
                </p>
              </motion.article>
            );
          })}
        </div>

        {/* =========================
            COMMUNITY VALUES
        ========================== */}
        <motion.div
          className="
            relative
            mt-8
            overflow-hidden
            rounded-2xl
            border
            border-[#cfeee6]
            bg-white
            p-7
            md:p-9
            shadow-sm
          "
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.7,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          onMouseEnter={() => setValuesHovered(true)}
          onMouseMove={handleValuesMouseMove}
          onMouseLeave={() => setValuesHovered(false)}
          whileHover={{ y: -6 }}
        >
          <div className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-200" style={{ opacity: valuesHovered ? 1 : 0, background: "radial-gradient(190px circle at " + valuesMousePosition.x + "% " + valuesMousePosition.y + "%, rgba(96, 165, 250, 0.11), transparent 72%)" }} />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">

            {/* Text */}
            <div className="text-center md:text-left">

              <p className="text-sm font-semibold uppercase tracking-wider text-[#19b99a] mb-2">
                Community Values
              </p>

              <h3 className="text-2xl md:text-3xl font-bold text-[#0b2540]">
                Learn. Contribute. Collaborate. Grow.
              </h3>

              <p className="mt-2 text-[#607087] max-w-2xl">
                WikiClub Tech brings students together to exchange knowledge,
                support one another, contribute to open knowledge, and grow
                through shared experiences.
              </p>

            </div>

            {/* Community Icon */}
            <motion.div
              className="
                shrink-0
                flex
                items-center
                justify-center
                w-16
                h-16
                rounded-2xl
                bg-[#effbf8]
                border
                border-[#cfeee6]
              "

            >
              <FaUsers className="text-2xl text-[#19b99a]" />
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default CommunityImpact;
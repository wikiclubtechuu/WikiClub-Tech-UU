
"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const HeroContent = () => {
  return (
    <div className="relative z-10 w-full">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div
          className="
            min-h-[620px]
            lg:min-h-[700px]
            flex
            flex-col
            items-center
            justify-center
            text-center
            py-20
            lg:py-24
          "
        >
          {/* WikiClub Tech Logo */}
          <motion.div
            initial={{
              opacity: 0,
              y: -15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
            className="mb-8"
          >
            <Image
              src="/wikiNewLogo.png"
              alt="WikiClub Tech - United University"
              width={865}
              height={289}
              priority
              className="
                w-auto
                h-auto
                max-w-[220px]
                sm:max-w-[280px]
                lg:max-w-[320px]
                object-contain
              "
            />
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.25,
              ease: "easeOut",
            }}
            className="
              max-w-full
              text-3xl
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
              font-extrabold
              tracking-[-0.04em]
              leading-[0.95]
              text-[#071827]
              break-words
            "
          >
            Build
            <span className="text-[#1689d8]"> Learn</span>
            <span className="text-[#19a36f]"> Contribute</span>
          </motion.h1>

          {/* Welcome Description */}
          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.45,
              ease: "easeOut",
            }}
            className="
              mt-7
              max-w-3xl
              text-base
              sm:text-lg
              lg:text-xl
              font-bold
              leading-relaxed
              text-[#3f5265]
            "
          >
            A student-driven tech community at United University, where we learn, build, and contribute together.
          </motion.p>

          {/* Call-to-Action Buttons */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.6,
              ease: "easeOut",
            }}
            className="
              mt-9
              flex
              flex-col
              sm:flex-row
              items-center
              justify-center
              gap-4
            "
          >
            {/* Join Community Button */}
            <motion.a
              href="https://forms.gle/FGoyrEHC1CuP9hPSA"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.04,
                y: -2,
              }}
              whileTap={{
                scale: 0.98,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
              }}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-full
                bg-[#0b2540]
                px-7
                py-3.5
                text-sm
                font-bold
                text-white
                shadow-lg
                shadow-slate-400/20
                transition-all
                duration-300
                hover:bg-[#1689d8]
              "
            >
              <span>Join the Community</span>

              <ArrowRight
                size={17}
                className="transition-transform duration-300"
              />
            </motion.a>

            {/* Explore What We Do Button */}
            <motion.a
              href="#what-we-do"
              whileHover={{
                scale: 1.04,
                y: -2,
              }}
              whileTap={{
                scale: 0.98,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
              }}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-full
                border
                border-[#0b2540]/20
                bg-white/60
                px-7
                py-3.5
                text-sm
                font-bold
                text-[#0b2540]
                backdrop-blur-sm
                transition-all
                duration-300
                hover:bg-white
                hover:border-[#1689d8]
                hover:text-[#1689d8]
              "
            >
              <span>Explore What We Do</span>

              <ArrowRight size={17} />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;

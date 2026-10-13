"use client";

import React from "react";
import HeroContent from "./HeroContent";

const Hero = () => {
  return (
    <section
      className="relative min-h-[620px] lg:min-h-[700px] overflow-hidden"
      style={{
        background: `
          radial-gradient(
            circle at 15% 20%,
            rgba(219, 239, 255, 0.95) 0%,
            rgba(219, 239, 255, 0) 42%
          ),
          radial-gradient(
            circle at 85% 20%,
            rgba(238, 234, 255, 0.95) 0%,
            rgba(238, 234, 255, 0) 44%
          ),
          linear-gradient(
            180deg,
            #f7fbff 0%,
            #ffffff 55%,
            #fbfcff 100%
          )
        `,
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(100, 116, 139, 0.10) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(100, 116, 139, 0.10) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "52px 52px",
          backgroundPosition: "center center",
          maskImage: "linear-gradient(to bottom, black 75%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 75%, transparent)",
        }}
      />

      <HeroContent />
    </section>
  );
};

export default Hero;
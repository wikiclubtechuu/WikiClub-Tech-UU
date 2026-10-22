"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Images from "@/data/gallery/images";

const images = Images;

const Gallery = () => {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  const [cursorPosition, setCursorPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (e: globalThis.MouseEvent) => {
      setCursorPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="bg-[#f7fbff] py-10 sm:py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          className="mx-auto mb-7 max-w-3xl text-center sm:mb-12 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#19b99a] sm:mb-3 sm:text-sm">
            Our Memories
          </p>

          <h2 className="mb-3 text-3xl font-bold tracking-tight text-[#0b2540] sm:mb-4 sm:text-4xl md:text-5xl">
            Gallery
          </h2>

          <p className="text-sm leading-relaxed text-[#607087] sm:text-base md:text-lg">
            A glimpse into our community events, workshops, and activities.
          </p>

          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#19b99a] to-[#1689d8] sm:mt-5" />
        </motion.div>

        {/* Responsive Masonry Gallery */}
        <motion.div
          className="columns-2 [column-gap:12px] sm:[column-gap:20px] md:columns-3 lg:columns-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8 }}
        >
          {images.map((image, index) => (
            <motion.div
              key={`${image.src}-${index}`}
              className="
                group
                relative
                mb-3
                break-inside-avoid
                overflow-hidden
                rounded-2xl
                border
                border-[#e4edf5]
                bg-white
                shadow-sm
                sm:mb-5
              "
              onMouseEnter={() => setHoveredImage(image.src)}
              onMouseLeave={() => setHoveredImage(null)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={800}
                  height={600}
                  sizes="(max-width: 639px) 48vw, (max-width: 767px) 45vw, (max-width: 1023px) 30vw, 25vw"
                  className="
                    h-auto
                    w-full
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-105
                  "
                />

                {/* Hover Overlay */}
                <div
                  aria-hidden="true"
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-[#0b2540]/45
                    via-transparent
                    to-transparent
                    opacity-0
                    transition-opacity
                    duration-300
                    group-hover:opacity-100
                  "
                />

                {/* Gallery Icon */}
                <div
                  aria-hidden="true"
                  className="
                    absolute
                    bottom-2
                    right-2
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    bg-white/95
                    text-[#1689d8]
                    opacity-0
                    shadow-md
                    transition-all
                    duration-300
                    group-hover:opacity-100
                    sm:bottom-4
                    sm:right-4
                    sm:h-9
                    sm:w-9
                  "
                >
                  <span className="text-lg">+</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* See More Button */}
        <motion.div
          className="mt-6 flex justify-center sm:mt-8"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/gallery"
            className="
              group
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-full
              bg-[#1689d8]
              px-6
              py-3
              text-sm
              font-semibold
              text-white
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-[#0b6eae]
              hover:shadow-md
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#1689d8]
              focus-visible:ring-offset-2
              sm:px-7
            "
          >
            See More

            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Floating Image Preview — Desktop Only */}
      <AnimatePresence>
        {hoveredImage && (
          <motion.div
            className="pointer-events-none fixed left-0 top-0 z-50 hidden lg:block"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: cursorPosition.x + 20,
              y: cursorPosition.y - 150,
            }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 25,
            }}
          >
            <Image
              src={hoveredImage}
              alt="Gallery preview"
              width={300}
              height={200}
              className="rounded-xl border-2 border-white object-cover shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;

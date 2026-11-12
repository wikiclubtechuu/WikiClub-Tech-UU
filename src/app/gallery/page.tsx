"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Events from "@/data/gallery/Event";
import Images from "@/data/gallery/eventImages";
import Footer from "@/components/layout/Footer";

export default function GalleryPage() {
  /* =========================================================
     FEATURED MEMORIES
  ========================================================= */

  // Choose which images from images.ts appear in Featured Memories.
  // These are zero-based indexes: 0 = first image, 2 = third image, etc.
  // Change this list whenever you want to feature different photos.
  const featuredImageIndexes = [0, 2, 4, 6, 8];
  const featuredImages = featuredImageIndexes
    .map((imageIndex) => Images[imageIndex])
    .filter(Boolean);

  const [activeIndex, setActiveIndex] = useState(0);
  const totalImages = featuredImages.length;

  const previousIndex =
    totalImages > 0 ? (activeIndex - 1 + totalImages) % totalImages : 0;

  const nextIndex = totalImages > 0 ? (activeIndex + 1) % totalImages : 0;

  const goNext = () => {
    if (totalImages > 0) {
      setActiveIndex((current) => (current + 1) % totalImages);
    }
  };

  const goPrevious = () => {
    if (totalImages > 0) {
      setActiveIndex(
        (current) => (current - 1 + totalImages) % totalImages
      );
    }
  };

  const featuredCaptions = [
    {
      title: "Freshers' Event",
      description: "Welcoming new faces and creating new memories.",
    },
    {
      title: "Campus Memories",
      description: "Moments that make our college journey special.",
    },
    {
      title: "Team Spirit",
      description: "Growing, connecting, and learning together.",
    },
    {
      title: "Hackathon",
      description: "Turning creative ideas into innovative solutions.",
    },
    {
      title: "Coding in Action",
      description: "Building projects and solving real challenges.",
    },
    {
      title: "Problem Solving",
      description: "Collaborating to tackle challenging problems.",
    },
    {
      title: "Innovation",
      description: "Exploring technology and thinking beyond limits.",
    },
    {
      title: "Workshop",
      description: "Learning new skills through hands-on experience.",
    },
    {
      title: "Learning Together",
      description: "Sharing knowledge and growing as a community.",
    },
    {
      title: "New Skills, New Ideas",
      description: "Discovering new possibilities with technology.",
    },
  ];

  /* =========================================================
     PHOTO GALLERY
  ========================================================= */

  const featuredEvents = Events.slice(0, 3);
  const moreEvents = Events.slice(3);

  const [expandedEvents, setExpandedEvents] = useState<
    Record<string, boolean>
  >({});

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  const toggleEvent = (eventId: string) => {
    setExpandedEvents((current) => ({
      ...current,
      [eventId]: !current[eventId],
    }));
  };

  /* =========================================================
     VIDEO DATA
  ========================================================= */

  // Add new full-length YouTube videos here. Keep each video as one object
  // with its YouTube ID and a title; the View More button updates automatically.
  const standardVideos = [
    {
      id: "DYAI0UbNPzo",
      title: "Hacktoberfest - Trick or Commit Webinar",
    },
    {
      id: "xmEUNCzLK-Q",
      title: "Mastering Generative AI",
    },
    {
      id: "orSQ8SvMX9U",
      title: "DSA Decode",
    },
  ];

  const INITIAL_VISIBLE_VIDEOS = 2;
  const [showAllVideos, setShowAllVideos] = useState(false);
  const visibleStandardVideos = showAllVideos
    ? standardVideos
    : standardVideos.slice(0, INITIAL_VISIBLE_VIDEOS);

  const highlightVideos = [
    {
      id: "ZLPscXdb5k0",
      title: "WikiClub Tech Short",
    },
  ];

  const instagramVideos = [
    {
      id: "DXbjqlojJpZ",
      title: "WikiClub Tech Reel",
    },
  ];

  const allHighlights = [
    ...highlightVideos.map((video) => ({
      ...video,
      platform: "youtube" as const,
    })),
    ...instagramVideos.map((video) => ({
      ...video,
      platform: "instagram" as const,
    })),
  ];

  /* =========================================================
     FEATURED HIGHLIGHTS AUTOPLAY + AUTO-SCROLL
  ========================================================= */

  const [hoveredHighlight, setHoveredHighlight] = useState<string | null>(
    null
  );

  const highlightsTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = highlightsTrackRef.current;

    if (!track || allHighlights.length <= 1) return;

    const interval = window.setInterval(() => {
      if (hoveredHighlight !== null) return;

      const firstCard = track.querySelector<HTMLElement>("a");

      if (!firstCard) return;

      const cardWidth = firstCard.getBoundingClientRect().width + 16;
      const maxScroll = track.scrollWidth - track.clientWidth;

      if (maxScroll <= 5) return;

      if (track.scrollLeft >= maxScroll - 5) {
        track.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        track.scrollBy({
          left: cardWidth,
          behavior: "smooth",
        });
      }
    }, 3000);

    return () => window.clearInterval(interval);
  }, [allHighlights.length, hoveredHighlight]);

  /* =========================================================
     YOUTUBE HOVER VIDEO
  ========================================================= */

  const HoverVideo = ({
    id,
    title,
    aspect = "16/9",
  }: {
    id: string;
    title: string;
    aspect?: "16/9" | "9/16";
  }) => {
    const [isHovered, setIsHovered] = useState(false);
    const thumbnail = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

    return (
      <div
        className={`group relative overflow-hidden rounded-2xl bg-black shadow-lg ${
          aspect === "9/16" ? "aspect-[9/16]" : "aspect-video"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={thumbnail}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`object-cover transition-all duration-500 ${
            isHovered ? "scale-105 opacity-0" : "scale-100 opacity-100"
          }`}
        />

        {isHovered && (
          <iframe
            className="pointer-events-none absolute inset-0 h-full w-full border-0"
            src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}&playsinline=1&rel=0`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            tabIndex={-1}
          />
        )}

        {!isHovered && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 shadow-xl transition-transform duration-300 group-hover:scale-110">
              <svg
                className="ml-1 h-6 w-6 text-black"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 pt-16">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>

        {isHovered && (
          <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
            Playing preview
          </div>
        )}
      </div>
    );
  };

  return (
    <main className="relative isolate overflow-hidden bg-transparent">
      {/* =====================================================
          PASTEL GRADIENT + FADING GRID BACKGROUND
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{ backgroundColor: "#f8fcfa" }}
      >
        {/* Soft pastel gradients with a gradual fade */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(
                circle at 15% 10%,
                rgba(210, 238, 250, 0.75) 0%,
                rgba(210, 238, 250, 0.42) 24%,
                rgba(210, 238, 250, 0) 48%
              ),
              radial-gradient(
                circle at 85% 10%,
                rgba(215, 250, 225, 0.8) 0%,
                rgba(215, 250, 225, 0.42) 26%,
                rgba(215, 250, 225, 0) 50%
              ),
              radial-gradient(
                circle at 80% 90%,
                rgba(255, 245, 235, 0.65) 0%,
                rgba(255, 245, 235, 0.3) 22%,
                rgba(255, 245, 235, 0) 44%
              )
            `,
            maskImage:
              "linear-gradient(to bottom, black 0%, black 58%, rgba(0,0,0,0.65) 78%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 58%, rgba(0,0,0,0.65) 78%, transparent 100%)",
          }}
        />

        {/* Subtle grid with fading effect */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(100, 116, 139, 0.12) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(100, 116, 139, 0.12) 1px,
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
      </div>

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <section className="relative z-10 px-6 pb-8 pt-28 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            WikiClub Tech UU
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Gallery
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            Explore our events, memories, videos, and highlights from WikiClub
            Tech.
          </p>
        </div>
      </section>

      {/* =====================================================
          FEATURED MEMORIES
      ===================================================== */}

      <section className="relative z-10 px-6 py-14 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Featured Memories
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-gray-600">
              A few special moments from WikiClub Tech.
            </p>
          </div>

          <div className="relative mx-auto h-[360px] max-w-6xl overflow-hidden sm:h-[450px] lg:h-[510px]">
            {featuredImages.map((image: any, index: number) => {
              let position: "left" | "center" | "right" | "hidden" = "hidden";

              if (index === activeIndex) {
                position = "center";
              } else if (index === previousIndex) {
                position = "left";
              } else if (index === nextIndex) {
                position = "right";
              }

              return (
                <motion.div
                  key={`featured-${index}`}
                  drag={index === activeIndex ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    if (Math.abs(info.offset.x) > 70) {
                      if (info.offset.x < 0) goNext();
                      else goPrevious();
                    }
                  }}
                  initial={false}
                  animate={{
                    x:
                      position === "left"
                        ? "-140%"
                        : position === "right"
                          ? "40%"
                          : "-50%",
                    scale:
                      position === "center"
                        ? 1
                        : position === "left" || position === "right"
                          ? 0.72
                          : 0.5,
                    opacity:
                      position === "center"
                        ? 1
                        : position === "left" || position === "right"
                          ? 0.65
                          : 0,
                    filter: position === "center" ? "blur(0px)" : "blur(5px)",
                    zIndex:
                      position === "center"
                        ? 20
                        : position === "left" || position === "right"
                          ? 10
                          : 0,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute left-1/2 top-1/2 h-[300px] w-[72%] -translate-y-1/2 overflow-hidden rounded-3xl shadow-2xl sm:h-[390px] sm:w-[65%] lg:h-[450px] lg:w-[62%]"
                >
                  <Image
                    src={image.src}
                    alt={image.alt || `Featured memory ${index + 1}`}
                    fill
                    priority={index === activeIndex}
                    sizes="(max-width: 768px) 90vw, 65vw"
                    className="select-none object-cover"
                    draggable={false}
                  />

                  {position === "center" && (
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/90 via-black/45 to-transparent px-5 pb-6 pt-20 sm:px-8 sm:pb-8">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="max-w-2xl"
                      >
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300 sm:text-sm">
                          Featured Memory
                        </p>

                        <h3 className="text-xl font-bold leading-tight text-white drop-shadow-lg sm:text-2xl md:text-3xl">
                          {featuredCaptions[index]?.title ||
                            image.alt ||
                            `Featured Memory ${index + 1}`}
                        </h3>

                        <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/85 drop-shadow sm:text-base">
                          {featuredCaptions[index]?.description ||
                            "A special moment from the WikiClub Tech community."}
                        </p>
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              );
            })}

            <button
              type="button"
              onClick={goPrevious}
              aria-label="Previous memory"
              className="absolute left-2 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl text-gray-800 shadow-lg backdrop-blur transition hover:scale-110 sm:left-6"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next memory"
              className="absolute right-2 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl text-gray-800 shadow-lg backdrop-blur transition hover:scale-110 sm:right-6"
            >
              ›
            </button>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {featuredImages.map((_: any, index: number) => (
              <button
                key={`dot-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to memory ${index + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  index === activeIndex
                    ? "w-8 bg-blue-600"
                    : "w-2.5 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          PHOTO GALLERY
      ===================================================== */}

      <section className="relative z-10 px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Photo Gallery
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-gray-600">
              Explore memories organized by event.
            </p>
          </div>

          <div className="space-y-14">
            {featuredEvents.map((event: any) => {
              const isExpanded = expandedEvents[event.id] ?? false;
              const visibleImages = isExpanded
                ? event.images
                : event.images.slice(0, 3);
              const remainingCount = event.images.length - 3;

              return (
                <div
                  key={event.id}
                  className="overflow-hidden rounded-3xl border border-gray-100 bg-white/80 p-5 shadow-sm backdrop-blur sm:p-7"
                >
                  <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex gap-4">
                      <div className="mt-1 h-14 w-1.5 shrink-0 rounded-full bg-blue-600" />

                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {event.title}
                        </h3>

                        <p className="mt-1 max-w-2xl text-gray-600">
                          {event.subtitle}
                        </p>
                      </div>
                    </div>

                    <span className="w-fit shrink-0 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
                      {event.date}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {visibleImages.map((image: any, imageIndex: number) => (
                      <button
                        key={`${event.id}-${imageIndex}`}
                        type="button"
                        onClick={() => setSelectedImage(image.src)}
                        className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 text-left"
                      >
                        <Image
                          src={image.src}
                          alt={image.alt || `${event.title} ${imageIndex + 1}`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition duration-500 group-hover:scale-110"
                        />

                        <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
                      </button>
                    ))}
                  </div>

                  {event.images.length > 3 && (
                    <div className="mt-6 text-center">
                      <button
                        type="button"
                        onClick={() => toggleEvent(event.id)}
                        className="rounded-full border border-blue-200 bg-white px-5 py-2.5 text-sm font-semibold text-blue-600 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white"
                      >
                        {isExpanded
                          ? "Show Less"
                          : `See More Images (${remainingCount})`}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          MORE EVENTS
      ===================================================== */}

      {moreEvents.length > 0 && (
        <section className="relative z-10 px-6 py-16 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                More Events
              </h2>

              <p className="mt-3 text-gray-600">
                Discover more moments from WikiClub Tech.
              </p>
            </div>

            <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-5 [scrollbar-width:thin]">
              {moreEvents.map((event: any) => (
                <button
                  key={event.id}
                  type="button"
                  onClick={() => setSelectedEvent(event)}
                  className="group w-[280px] shrink-0 snap-start overflow-hidden rounded-3xl border border-gray-100 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl sm:w-[320px]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={event.images[0].src}
                      alt={event.images[0].alt || event.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition duration-500 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white">
                        {event.title}
                      </h3>

                      <p className="mt-1 text-sm text-white/80">
                        {event.date}
                      </p>
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="line-clamp-2 text-sm text-gray-600">
                      {event.subtitle}
                    </p>

                    <p className="mt-4 text-sm font-semibold text-blue-600">
                      View Event →
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          VIDEOS
      ===================================================== */}

      <section className="relative z-10 px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
              Watch
            </p>

            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Videos
            </h2>

            <p className="mt-3 max-w-2xl text-gray-600">
              Watch our events and memorable moments. Hover over a video to
              start a preview.
            </p>
          </div>

          <div className="grid gap-7 md:grid-cols-2">
            {visibleStandardVideos.map((video) => (
              <HoverVideo
                key={video.id}
                id={video.id}
                title={video.title}
              />
            ))}
          </div>

          {standardVideos.length > INITIAL_VISIBLE_VIDEOS && (
            <div className="mt-9 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAllVideos((current) => !current)}
                className="rounded-full border border-blue-200 bg-white/90 px-6 py-3 text-sm font-semibold text-blue-700 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                aria-expanded={showAllVideos}
              >
                {showAllVideos ? "Show Less" : "View More Videos"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          FEATURED HIGHLIGHTS
      ===================================================== */}

      <section className="relative z-10 px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
              Shorts &amp; Reels
            </p>

            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Featured Highlights
            </h2>

            <p className="mt-3 max-w-2xl text-gray-600">
              Quick highlights and short moments from WikiClub Tech.
            </p>
          </div>

          <div className="relative">
            <div
              ref={highlightsTrackRef}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-5 [scrollbar-width:thin]"
            >
              {allHighlights.map((video) => (
                <a
                  key={video.id}
                  href={
                    video.platform === "youtube"
                      ? `https://www.youtube.com/shorts/${video.id}`
                      : `https://www.instagram.com/reel/${video.id}/`
                  }
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => {
                    if (video.platform === "youtube") {
                      setHoveredHighlight(video.id);
                    }
                  }}
                  onMouseLeave={() => setHoveredHighlight(null)}
                  onFocus={() => {
                    if (video.platform === "youtube") {
                      setHoveredHighlight(video.id);
                    }
                  }}
                  onBlur={() => setHoveredHighlight(null)}
                  className="group w-[150px] shrink-0 snap-start overflow-hidden rounded-xl border border-gray-200/80 bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:w-[180px]"
                >
                  <div className="relative aspect-[3/5] overflow-hidden bg-gray-100">
                    {video.platform === "youtube" ? (
                      <>
                        <Image
                          src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                          alt={video.title}
                          fill
                          sizes="(max-width: 640px) 150px, 180px"
                          className={`object-cover transition duration-300 ${
                            hoveredHighlight === video.id
                              ? "opacity-0"
                              : "opacity-100 group-hover:scale-105"
                          }`}
                        />

                        {hoveredHighlight === video.id && (
                          <iframe
                            key={`highlight-preview-${video.id}`}
                            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${video.id}&playsinline=1&rel=0`}
                            title={`${video.title} preview`}
                            allow="autoplay; encrypted-media; picture-in-picture"
                            className="pointer-events-none absolute inset-0 h-full w-full border-0"
                            tabIndex={-1}
                          />
                        )}
                      </>
                    ) : (
                      <iframe
                        src={`https://www.instagram.com/reel/${video.id}/embed`}
                        title={video.title}
                        loading="lazy"
                        className="pointer-events-none absolute inset-0 h-full w-full border-0 bg-white"
                        scrolling="no"
                      />
                    )}

                    <span className="pointer-events-none absolute left-2 top-2 z-20 rounded bg-black/75 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                      {video.platform === "youtube" ? "Short" : "Reel"}
                    </span>

                    {hoveredHighlight !== video.id && (
                      <span className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-black/10 transition group-hover:bg-black/20">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-lg text-gray-900 shadow-lg transition group-hover:scale-110">
                          ▶
                        </span>
                      </span>
                    )}
                  </div>

                  <div className="p-3">
                    <h3 className="truncate text-sm font-semibold text-gray-900">
                      {video.title}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                      {video.platform === "youtube"
                        ? "YouTube Short"
                        : "Instagram Reel"}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            <p className="mt-1 text-right text-xs text-gray-500">Scroll →</p>
          </div>
        </div>
      </section>

      {/* =====================================================
          PHOTO LIGHTBOX
      ===================================================== */}

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white backdrop-blur transition hover:bg-white/20"
              aria-label="Close image"
            >
              ×
            </button>

            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              transition={{ duration: 0.25 }}
              className="relative h-[85vh] w-full max-w-6xl"
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Gallery preview"
                fill
                sizes="100vw"
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          MORE EVENT MODAL
      ===================================================== */}

      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] overflow-y-auto bg-black/70 p-4 backdrop-blur-sm sm:p-8"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ y: 30, scale: 0.97 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 30, scale: 0.97 }}
              className="mx-auto mt-10 max-w-6xl rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-7 flex items-start justify-between gap-5">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    {selectedEvent.title}
                  </h2>

                  <p className="mt-1 text-sm font-medium text-blue-600">
                    {selectedEvent.date}
                  </p>

                  <p className="mt-3 text-gray-600">
                    {selectedEvent.subtitle}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedEvent(null)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xl text-gray-700 transition hover:bg-gray-200"
                  aria-label="Close event"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {selectedEvent.images.map(
                  (image: any, index: number) => (
                    <button
                      key={`${selectedEvent.id}-modal-${index}`}
                      type="button"
                      onClick={() => setSelectedImage(image.src)}
                      className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
                    >
                      <Image
                        src={image.src}
                        alt={
                          image.alt ||
                          `${selectedEvent.title} ${index + 1}`
                        }
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-110"
                      />
                    </button>
                  )
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </main>
  );
}
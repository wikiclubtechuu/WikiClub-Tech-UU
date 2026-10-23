// FILE: src/components/events/EventsHero.tsx
// Hero section with Live / Upcoming / Past quick-link dropdowns.
// Background now matches the Teams page (no decorative shapes).
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FaBroadcastTower,
  FaCalendarAlt,
  FaChevronDown,
  FaChevronRight,
  FaHistory,
} from 'react-icons/fa';
import type { ClubEvent, EventStatus } from '@/data/events/events';
import { formatDateRange, statusStyles } from './eventUtils';

interface EventsHeroProps {
  events: Record<EventStatus, ClubEvent[]>;
  onSelect: (event: ClubEvent, status: EventStatus) => void;
}

// The three pill buttons under the hero text
const quickLinks = [
  {
    status: 'live' as const,
    label: 'Live',
    icon: FaBroadcastTower,
    className: 'from-[#ef5b5b] to-[#f27878]',
  },
  {
    status: 'upcoming' as const,
    label: 'Upcoming',
    icon: FaCalendarAlt,
    className: 'from-[#1689d8] to-[#16b8c4]',
  },
  {
    status: 'past' as const,
    label: 'Past',
    icon: FaHistory,
    className: 'from-[#19b99a] to-[#19a36f]',
  },
];

// Same pastel background as the Teams page hero
// (blue top-left, green top-right, faint peach bottom-right)
const heroBackground: React.CSSProperties = {
  background: `
    radial-gradient(circle at 15% 10%, rgba(210, 238, 250, 0.75) 0%, rgba(210, 238, 250, 0) 42%),
    radial-gradient(circle at 85% 10%, rgba(215, 250, 225, 0.8) 0%, rgba(215, 250, 225, 0) 45%),
    radial-gradient(circle at 80% 90%, rgba(255, 245, 235, 0.65) 0%, rgba(255, 245, 235, 0) 40%),
    #f8fcfa`,
};

// Same grid lines as the Teams page hero (52px squares)
const gridOverlay: React.CSSProperties = {
  backgroundImage: `
    linear-gradient(rgba(100, 116, 139, 0.12) 1px, transparent 1px),
    linear-gradient(90deg, rgba(100, 116, 139, 0.12) 1px, transparent 1px)`,
  backgroundSize: '52px 52px',
  backgroundPosition: 'center center',
};

const EventsHero = ({ events, onSelect }: EventsHeroProps) => {
  const [openStatus, setOpenStatus] = useState<EventStatus | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close the dropdown on outside click or Escape
  useEffect(() => {
    if (!openStatus) return;

    const handleClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpenStatus(null);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenStatus(null);
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [openStatus]);

  const openEvents = openStatus ? events[openStatus] : [];

  return (
    <section
      // mask-image fades the whole hero out at the bottom, like the Teams page
      className='relative text-[#0b2540] overflow-hidden [mask-image:linear-gradient(to_bottom,black_75%,transparent)]'
      style={heroBackground}
    >
      {/* Grid lines (no decorative shapes) */}
      <div className='absolute inset-0 pointer-events-none' style={gridOverlay} />
      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 z-10'>
        <motion.div
          className='text-center'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            className='flex items-center justify-center gap-3 mb-5'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <span className='h-[2px] w-8 bg-[#1689d8]' />
            <span className='text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#0b2540]'>
              WikiClub Tech Events
            </span>
            <span className='h-[2px] w-8 bg-[#19b99a]' />
          </motion.div>

          <motion.h1
            className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.04em] leading-[1.05] mb-7'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className='text-[#071827]'>Discover </span>
            <span className='bg-gradient-to-r from-[#1689d8] to-[#19a36f] bg-clip-text text-transparent'>
              Events
            </span>
          </motion.h1>

          <motion.p
            className='text-base sm:text-lg lg:text-xl font-medium text-[#3f5265] max-w-3xl mx-auto mb-10 leading-relaxed'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Workshops, meetups, hackathons and Wikimedia programs — find what is
            happening now, what is coming next, and catch up on what you missed.
          </motion.p>

          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <div className='flex flex-wrap justify-center gap-4'>
              {quickLinks.map(({ status, label, icon: Icon, className }) => {
                const isOpen = openStatus === status;
                return (
                  <motion.button
                    key={status}
                    type='button'
                    onClick={() => setOpenStatus(isOpen ? null : status)}
                    aria-expanded={isOpen}
                    aria-controls='events-hero-dropdown'
                    className={`inline-flex items-center gap-3 px-6 py-3 text-sm font-bold text-white bg-gradient-to-r ${className} rounded-full shadow-lg shadow-slate-400/20 ${
                      isOpen ? 'ring-4 ring-offset-2 ring-[#1689d8]/25' : ''
                    }`}
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <Icon />
                    <span>{label}</span>
                    <span className='px-2 py-0.5 text-sm bg-white/25 rounded-full'>
                      {events[status].length}
                    </span>
                    <FaChevronDown
                      className={`text-xs transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </motion.button>
                );
              })}
            </div>

            <AnimatePresence>
              {openStatus && (
                <motion.div
                  id='events-hero-dropdown'
                  key={openStatus}
                  className='mx-auto mt-6 w-full max-w-lg text-left bg-white rounded-2xl border border-[#e4edf5] shadow-xl shadow-slate-400/20 overflow-hidden'
                  initial={{ opacity: 0, y: -10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className='px-4 pt-4 pb-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-500'>
                    {statusStyles[openStatus].title}
                  </p>
                  {openEvents.length > 0 ? (
                    <ul className='max-h-80 overflow-y-auto pb-2'>
                      {openEvents.map((event) => (
                        <li key={event.id}>
                          <button
                            type='button'
                            onClick={() => {
                              onSelect(event, openStatus);
                              setOpenStatus(null);
                            }}
                            className='group flex items-center gap-3 w-full px-4 py-3 hover:bg-[#f0f8ff] transition-colors'
                          >
                            <div className='relative w-14 h-14 shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-[#eaf6ff] to-[#effbf8]'>
                              {event.image && (
                                <Image
                                  src={event.image}
                                  alt=''
                                  fill
                                  unoptimized
                                  className='object-cover'
                                />
                              )}
                            </div>
                            <div className='flex-1 min-w-0 text-left'>
                              <p className='font-bold text-[#0b2540] truncate'>
                                {event.title}
                              </p>
                              <p className='text-sm text-[#607087] truncate'>
                                {formatDateRange(event)}
                              </p>
                            </div>
                            <FaChevronRight className='text-xs text-[#9db0c3] group-hover:text-[#1689d8] group-hover:translate-x-1 transition-transform' />
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className='px-4 pb-4 text-sm text-[#607087]'>
                      {statusStyles[openStatus].empty}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default EventsHero;
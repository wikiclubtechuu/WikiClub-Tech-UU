// FILE: src/components/events/EventSection.tsx
// One section (Live / Upcoming / Past) with a "Show all" toggle.
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import EventCard from './EventCard';
import type { ClubEvent, EventStatus } from '@/data/events/events';

// Number of events shown before the "Show all" button
const INITIAL_VISIBLE = 2;

// Small label shown above each section title
const eyebrows: Record<EventStatus, string> = {
  live: 'Happening Now',
  upcoming: 'Coming Up',
  past: 'Look Back',
};

interface EventSectionProps {
  id: string;
  status: EventStatus;
  title: string;
  subtitle: string;
  emptyMessage: string;
  events: ClubEvent[];
  onSelect: (event: ClubEvent, status: EventStatus) => void;
}

const EventSection = ({
  id,
  status,
  title,
  subtitle,
  emptyMessage,
  events,
  onSelect,
}: EventSectionProps) => {
  const [showAll, setShowAll] = useState(false);
  const visibleEvents = showAll ? events : events.slice(0, INITIAL_VISIBLE);
  const hiddenCount = events.length - INITIAL_VISIBLE;

  return (
    <section id={id} className='scroll-mt-24'>
      <motion.div
        className='text-center mb-10 sm:mb-12'
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className='mb-3 flex items-center justify-center gap-3'>
          <span className='h-[2px] w-8 bg-[#1689d8]' />
          <span className='text-xs font-bold uppercase tracking-[0.16em] text-slate-500'>
            {eyebrows[status]}
          </span>
          <span className='h-[2px] w-8 bg-[#19b99a]' />
        </div>
        <h2 className='text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0b2540] mb-4'>
          {title}
        </h2>
        <p className='text-base sm:text-lg leading-7 text-slate-600 max-w-2xl mx-auto'>
          {subtitle}
        </p>
      </motion.div>

      {events.length > 0 ? (
        <>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
            {visibleEvents.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                status={status}
                index={index}
                onSelect={onSelect}
              />
            ))}
          </div>
          {hiddenCount > 0 && (
            <div className='flex justify-center mt-10'>
              <button
                type='button'
                onClick={() => setShowAll((value) => !value)}
                aria-expanded={showAll}
                className='inline-flex items-center gap-2 px-7 py-3 text-sm font-bold text-[#0b2540] bg-white/60 border border-[#0b2540]/20 rounded-full backdrop-blur-sm transition-all duration-300 hover:bg-white hover:border-[#1689d8] hover:text-[#1689d8]'
              >
                {showAll ? 'Show less' : `Show all (${events.length})`}
                <FaChevronDown
                  className={`text-xs transition-transform ${showAll ? 'rotate-180' : ''}`}
                />
              </button>
            </div>
          )}
        </>
      ) : (
        <motion.div
          className='max-w-2xl mx-auto text-center border-2 border-dashed border-[#cfe0ee] rounded-2xl py-12 px-6 bg-white'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className='text-[#607087]'>{emptyMessage}</p>
        </motion.div>
      )}
    </section>
  );
};

export default EventSection;
// FILE: src/components/events/EventCard.tsx
// Single event card; clicking it opens the detail modal.
'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import type { ClubEvent, EventStatus } from '@/data/events/events';
import { formatDateRange, statusStyles } from './eventUtils';

interface EventCardProps {
  event: ClubEvent;
  status: EventStatus;
  index: number;
  onSelect: (event: ClubEvent, status: EventStatus) => void;
}

const EventCard = ({ event, status, index, onSelect }: EventCardProps) => {
  const { label, badge } = statusStyles[status];

  return (
    <motion.article
      className='h-full'
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <button
        type='button'
        onClick={() => onSelect(event, status)}
        className='group flex flex-col w-full h-full text-left bg-white border border-[#e4edf5] rounded-2xl shadow-sm hover:shadow-xl hover:shadow-slate-400/20 hover:border-[#1689d8]/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1689d8]'
      >
        <div className='relative w-full h-48 bg-gradient-to-br from-[#eaf6ff] to-[#effbf8]'>
          {event.image && (
            <Image
              src={event.image}
              alt={event.title}
              fill
              unoptimized
              className={`object-cover ${status === 'past' ? 'grayscale-[30%]' : ''}`}
            />
          )}
          <span
            className={`absolute top-3 left-3 inline-flex items-center gap-2 px-3 py-1 text-xs font-bold rounded-full shadow-sm ${badge}`}
          >
            {/* Pulsing dot only for live events */}
            {status === 'live' && (
              <span className='relative flex h-2 w-2'>
                <span className='absolute inline-flex h-full w-full rounded-full bg-white opacity-75 animate-ping' />
                <span className='relative inline-flex h-2 w-2 rounded-full bg-white' />
              </span>
            )}
            {label}
          </span>
        </div>
        <div className='flex flex-col flex-1 p-6'>
          <div className='flex items-center gap-2 text-sm text-[#607087] mb-1'>
            <FaCalendarAlt className='shrink-0 text-[#1689d8]' />
            <time dateTime={event.startDate}>{formatDateRange(event)}</time>
          </div>
          <div className='flex items-center gap-2 text-sm text-[#607087] mb-3'>
            <FaMapMarkerAlt className='shrink-0 text-[#19b99a]' />
            <span>{event.location}</span>
          </div>
          <h3 className='text-xl font-bold text-[#0b2540] mb-2'>{event.title}</h3>
          <p className='text-[#607087] leading-7 mb-4 flex-1 line-clamp-3'>
            {event.description}
          </p>
          {event.tags && (
            <div className='flex flex-wrap gap-2 mb-4'>
              {event.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className='px-3 py-1 bg-[#eaf6ff] text-[#1689d8] text-xs font-semibold rounded-full'
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <span className='inline-flex items-center gap-2 text-sm font-bold text-[#1689d8] group-hover:text-[#0b6eae]'>
            Know more
            <FaArrowRight className='text-xs transition-transform group-hover:translate-x-1' />
          </span>
        </div>
      </button>
    </motion.article>
  );
};

export default EventCard;
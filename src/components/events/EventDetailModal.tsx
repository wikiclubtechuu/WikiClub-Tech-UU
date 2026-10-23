// FILE: src/components/events/EventDetailModal.tsx
// Full-screen detail modal: image carousel, tabs, key info and action buttons.
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import type { IconType } from 'react-icons';
import {
  FaArrowRight,
  FaBuilding,
  FaCalendarAlt,
  FaCalendarPlus,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
  FaClipboardList,
  FaExternalLinkAlt,
  FaLaptop,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaQuestionCircle,
  FaThLarge,
  FaTimes,
  FaTrophy,
  FaUsers,
} from 'react-icons/fa';
import {
  isRegistrationOpen,
  type ClubEvent,
  type EventStatus,
} from '@/data/events/events';
import {
  formatDate,
  formatDateRange,
  googleCalendarUrl,
  statusStyles,
} from './eventUtils';

type TabKey = 'overview' | 'schedule' | 'prizes' | 'guidelines' | 'faqs' | 'contact';

// Tabs shown on the left side of the modal
const tabs: { key: TabKey; label: string; icon: IconType }[] = [
  { key: 'overview', label: 'Overview', icon: FaThLarge },
  { key: 'schedule', label: 'Schedule', icon: FaCalendarAlt },
  { key: 'prizes', label: 'Prizes', icon: FaTrophy },
  { key: 'guidelines', label: 'Guidelines', icon: FaClipboardList },
  { key: 'faqs', label: 'FAQs', icon: FaQuestionCircle },
  { key: 'contact', label: 'Contact', icon: FaPhoneAlt },
];

// Fallback text when an event has no data for a tab
const ComingSoon = ({ what }: { what: string }) => (
  <p className='text-sm text-[#607087]'>
    {what} will be announced soon. Stay tuned!
  </p>
);

// Content of the currently selected tab
const TabPanel = ({ tab, event }: { tab: TabKey; event: ClubEvent }) => {
  switch (tab) {
    case 'overview':
      return (
        <>
          <h3 className='text-base font-bold text-[#0b2540] mb-2'>
            About the Event
          </h3>
          <p className='text-sm text-[#607087] leading-relaxed mb-4'>
            {event.about ?? event.description}
          </p>
          {event.highlights && (
            <ul className='space-y-2'>
              {event.highlights.map((item) => (
                <li key={item} className='flex items-start gap-2 text-sm text-[#3f5265]'>
                  <FaCheckCircle className='mt-0.5 shrink-0 text-[#1689d8]' />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </>
      );
    case 'schedule':
      return event.schedule?.length ? (
        <ol className='relative border-l-2 border-[#cfe8fa] ml-2 space-y-4'>
          {event.schedule.map((item) => (
            <li key={`${item.time}-${item.title}`} className='relative pl-4'>
              <span className='absolute -left-[7px] top-0.5 w-3 h-3 rounded-full bg-[#1689d8]' />
              <p className='text-xs font-semibold text-[#0b6eae]'>{item.time}</p>
              <p className='text-sm font-medium text-[#0b2540]'>{item.title}</p>
              {item.description && (
                <p className='text-sm text-[#607087]'>{item.description}</p>
              )}
            </li>
          ))}
        </ol>
      ) : (
        <ComingSoon what='The schedule' />
      );
    case 'prizes':
      return event.prizes?.length ? (
        <ul className='space-y-3'>
          {event.prizes.map((prize) => (
            <li
              key={prize.title}
              className='flex items-center justify-between gap-4 p-3 rounded-lg bg-[#fff8df] border border-[#f6e6a8]'
            >
              <span className='flex items-center gap-2 text-sm font-medium text-[#0b2540]'>
                <FaTrophy className='text-[#e0a800]' />
                {prize.title}
              </span>
              <span className='text-sm font-semibold text-[#3f5265]'>{prize.reward}</span>
            </li>
          ))}
        </ul>
      ) : (
        <ComingSoon what='Prize details' />
      );
    case 'guidelines':
      return event.guidelines?.length ? (
        <ul className='space-y-2'>
          {event.guidelines.map((item) => (
            <li key={item} className='flex items-start gap-2 text-sm text-[#3f5265]'>
              <FaCheckCircle className='mt-0.5 shrink-0 text-[#1689d8]' />
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <ComingSoon what='Guidelines' />
      );
    case 'faqs':
      return event.faqs?.length ? (
        <div className='space-y-2'>
          {event.faqs.map((faq) => (
            <details
              key={faq.question}
              className='group rounded-lg border border-[#e4edf5] bg-white px-4 py-3'
            >
              <summary className='cursor-pointer text-sm font-medium text-[#0b2540] list-none flex justify-between items-center gap-2'>
                {faq.question}
                <FaChevronRight className='text-xs text-[#9db0c3] transition-transform group-open:rotate-90' />
              </summary>
              <p className='mt-2 text-sm text-[#607087]'>{faq.answer}</p>
            </details>
          ))}
        </div>
      ) : (
        <ComingSoon what='FAQs' />
      );
    case 'contact':
      return event.contacts?.length ? (
        <ul className='space-y-3'>
          {event.contacts.map((contact) => (
            <li key={contact.name} className='text-sm'>
              <p className='font-medium text-[#0b2540]'>{contact.name}</p>
              {contact.role && <p className='text-[#607087]'>{contact.role}</p>}
              {contact.email && (
                <a href={`mailto:${contact.email}`} className='text-[#1689d8] hover:underline'>
                  {contact.email}
                </a>
              )}
              {contact.phone && <p className='text-[#607087]'>{contact.phone}</p>}
            </li>
          ))}
        </ul>
      ) : (
        <ComingSoon what='Contact details' />
      );
  }
};

interface ModalContentProps {
  event: ClubEvent;
  status: EventStatus;
  onClose: () => void;
}

const ModalContent = ({ event, status, onClose }: ModalContentProps) => {
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [imageIndex, setImageIndex] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Main image first, then the extra gallery images
  const images = [event.image, ...(event.gallery ?? [])].filter(
    (src): src is string => Boolean(src)
  );
  const registrationOpen = isRegistrationOpen(event);
  const { label, badge } = statusStyles[status];

  // Focus the close button when the modal opens (keyboard accessibility)
  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  // Move the carousel forward/back, wrapping around at the ends
  const showImage = (step: number) =>
    setImageIndex((index) => (index + step + images.length) % images.length);

  // The four small info boxes (date, location, mode, eligibility)
  const infoTiles: {
    icon: IconType;
    title: string;
    detail?: string;
    href?: string;
    hrefLabel?: string;
  }[] = [
    {
      icon: FaCalendarAlt,
      title: formatDateRange(event),
      detail: event.time ? `Starts ${event.time}` : undefined,
    },
    {
      icon: FaMapMarkerAlt,
      title: event.location,
      href: event.mapLink,
      hrefLabel: 'View on Map',
    },
    {
      icon: event.mode === 'Online' ? FaLaptop : FaBuilding,
      title: `${event.mode ?? 'Offline'} Event`,
      detail:
        event.mode === 'Online'
          ? 'Join remotely'
          : event.mode === 'Hybrid'
            ? 'On campus & online'
            : 'On campus',
    },
    {
      icon: FaUsers,
      title: event.eligibility ?? 'Open for all',
    },
  ];

  return (
    <div className='relative grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 sm:p-6'>
      <button
        ref={closeButtonRef}
        type='button'
        onClick={onClose}
        aria-label='Close event details'
        className='absolute top-3 right-3 z-20 p-2 rounded-full text-[#607087] bg-white/90 hover:bg-[#eaf1f8] hover:text-[#0b2540] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1689d8]'
      >
        <FaTimes />
      </button>

      {/* Left: image carousel + tabbed details */}
      <div className='rounded-xl border border-[#e4edf5] overflow-hidden bg-white'>
        <div className='relative h-52 sm:h-64 bg-gradient-to-br from-[#eaf6ff] to-[#effbf8]'>
          {images.length > 0 && (
            <Image
              key={images[imageIndex]}
              src={images[imageIndex]}
              alt={`${event.title} image ${imageIndex + 1}`}
              fill
              unoptimized
              className='object-cover'
            />
          )}
          {images.length > 1 && (
            <>
              <button
                type='button'
                onClick={() => showImage(-1)}
                aria-label='Previous image'
                className='absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 text-[#0b2540] hover:bg-white shadow'
              >
                <FaChevronLeft />
              </button>
              <button
                type='button'
                onClick={() => showImage(1)}
                aria-label='Next image'
                className='absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 text-[#0b2540] hover:bg-white shadow'
              >
                <FaChevronRight />
              </button>
              <div className='absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5'>
                {images.map((src, index) => (
                  <span
                    key={src}
                    className={`h-1.5 rounded-full transition-all ${
                      index === imageIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className='flex flex-col sm:flex-row'>
          <nav
            className='flex sm:flex-col gap-1 p-2 overflow-x-auto sm:w-40 shrink-0 border-b sm:border-b-0 sm:border-r border-[#e4edf5]'
            aria-label='Event details sections'
          >
            {tabs.map(({ key, label: tabLabel, icon: Icon }) => (
              <button
                key={key}
                type='button'
                onClick={() => setActiveTab(key)}
                aria-current={activeTab === key}
                className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md whitespace-nowrap transition-colors ${
                  activeTab === key
                    ? 'bg-[#eaf6ff] text-[#0b6eae] font-semibold sm:border-l-4 sm:border-[#1689d8]'
                    : 'text-[#607087] hover:bg-[#eaf1f8]'
                }`}
              >
                <Icon className='shrink-0' />
                {tabLabel}
              </button>
            ))}
          </nav>
          <div className='flex-1 p-4 sm:p-5 min-h-[14rem]'>
            <TabPanel tab={activeTab} event={event} />
          </div>
        </div>
      </div>

      {/* Right: summary, key info and actions */}
      <div className='flex flex-col'>
        <span
          className={`self-start inline-flex items-center gap-2 px-3 py-1 text-xs font-bold uppercase tracking-wide rounded-full ${badge}`}
        >
          {status === 'live' && (
            <span className='relative flex h-2 w-2'>
              <span className='absolute inline-flex h-full w-full rounded-full bg-white opacity-75 animate-ping' />
              <span className='relative inline-flex h-2 w-2 rounded-full bg-white' />
            </span>
          )}
          {label}
        </span>
        <h2 id='event-modal-title' className='mt-3 text-2xl sm:text-3xl font-extrabold text-[#0b2540] pr-8'>
          {event.title}
        </h2>
        {event.subtitle && <p className='text-[#607087] mt-1'>{event.subtitle}</p>}
        <p className='mt-4 text-[#3f5265] leading-relaxed'>{event.description}</p>

        <div className='mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3'>
          {infoTiles.map(({ icon: Icon, title, detail, href, hrefLabel }) => (
            <div
              key={title}
              className='flex flex-col items-center text-center gap-1 p-3 rounded-lg border border-[#e4edf5] bg-[#f7fbff]'
            >
              <Icon className='text-xl text-[#1689d8] mb-1' />
              <p className='text-xs font-semibold text-[#0b2540]'>{title}</p>
              {detail && <p className='text-xs text-[#607087]'>{detail}</p>}
              {href && (
                <a
                  href={href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-1 text-xs text-[#1689d8] hover:underline'
                >
                  <FaMapMarkerAlt className='text-[10px]' />
                  {hrefLabel}
                </a>
              )}
            </div>
          ))}
        </div>

        <div className='mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4'>
          <div>
            <p className='text-xs text-[#607087] mb-2'>Event Category</p>
            <span className='inline-block px-3 py-1 text-sm font-medium text-[#0b6eae] bg-[#eaf6ff] rounded-full'>
              {event.category ?? 'Event'}
            </span>
          </div>
          <div>
            <p className='text-xs text-[#607087] mb-2'>Registration Status</p>
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 text-sm font-medium rounded-full ${
                registrationOpen
                  ? 'text-[#0f8f76] bg-[#effbf8]'
                  : 'text-[#607087] bg-[#eaf1f8]'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${registrationOpen ? 'bg-[#19b99a]' : 'bg-[#9db0c3]'}`}
              />
              {registrationOpen
                ? 'Registration Open'
                : status === 'upcoming'
                  ? 'Opening Soon'
                  : 'Registration Closed'}
            </span>
          </div>
          {event.registrationDeadline && (
            <div>
              <p className='text-xs text-[#607087] mb-2'>Last Date to Register</p>
              <p className='flex items-center gap-2 text-sm font-bold text-[#0b2540]'>
                <FaCalendarAlt className='text-[#607087]' />
                {formatDate(event.registrationDeadline, {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
          )}
        </div>

        {/* Action buttons: Register / Learn more / Add to calendar */}
        <div className='mt-auto pt-8 grid grid-cols-1 sm:grid-cols-2 gap-3'>
          {registrationOpen && event.registrationLink ? (
            <a
              href={event.registrationLink}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center justify-center gap-2 px-6 py-3 font-bold text-white bg-[#0b2540] rounded-full shadow-lg shadow-slate-400/20 hover:bg-[#1689d8] hover:-translate-y-0.5 transition-all duration-300'
            >
              Register Now
              <FaExternalLinkAlt className='text-xs' />
            </a>
          ) : event.link ? (
            <Link
              href={event.link}
              target={event.link.startsWith('http') ? '_blank' : '_self'}
              rel={event.link.startsWith('http') ? 'noopener noreferrer' : undefined}
              className='inline-flex items-center justify-center gap-2 px-6 py-3 font-bold text-white bg-[#0b2540] rounded-full shadow-lg shadow-slate-400/20 hover:bg-[#1689d8] hover:-translate-y-0.5 transition-all duration-300'
            >
              {event.linkLabel ?? 'Learn more'}
              <FaArrowRight className='text-xs' />
            </Link>
          ) : (
            <span className='inline-flex items-center justify-center px-6 py-3 font-bold text-[#607087] bg-[#eaf1f8] rounded-full'>
              {status === 'past' ? 'Event completed' : 'Registration opening soon'}
            </span>
          )}
          {status !== 'past' && (
            <a
              href={googleCalendarUrl(event)}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center justify-center gap-2 px-6 py-3 font-bold text-[#0b2540] bg-white border border-[#0b2540]/20 rounded-full hover:border-[#1689d8] hover:text-[#1689d8] transition-all duration-300'
            >
              <FaCalendarPlus />
              Add to Calendar
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

interface EventDetailModalProps {
  selected: { event: ClubEvent; status: EventStatus } | null;
  onClose: () => void;
}

const EventDetailModal = ({ selected, onClose }: EventDetailModalProps) => {
  // While open: lock page scroll and close on Escape
  useEffect(() => {
    if (!selected) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selected, onClose]);

  return (
    <AnimatePresence>
      {selected && (
        <motion.div
          className='fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 bg-[#0b2540]/60 backdrop-blur-sm'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role='dialog'
            aria-modal='true'
            aria-labelledby='event-modal-title'
            className='w-full max-w-6xl max-h-full overflow-y-auto bg-white rounded-2xl shadow-2xl'
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ModalContent
              key={selected.event.id}
              event={selected.event}
              status={selected.status}
              onClose={onClose}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EventDetailModal;
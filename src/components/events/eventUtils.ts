// FILE: src/components/events/eventUtils.ts
// Shared styles + date helpers used by the events components.
import type { ClubEvent, EventStatus } from '@/data/events/events';

// Badge colours and labels for each event status
export const statusStyles: Record<
  EventStatus,
  { label: string; badge: string; title: string; empty: string }
> = {
  live: {
    label: 'Live now',
    badge: 'bg-[#ef5b5b] text-white',
    title: 'Live Events',
    empty: 'No events are live right now.',
  },
  upcoming: {
    label: 'Upcoming',
    badge: 'bg-[#1689d8] text-white',
    title: 'Upcoming Events',
    empty: 'New events are being planned. Stay tuned!',
  },
  past: {
    label: 'Completed',
    badge: 'bg-[#0b2540] text-white',
    title: 'Past Events',
    empty: 'Past events will appear here.',
  },
};

// Formats a date string, e.g. "October 11, 2026"
export const formatDate = (
  value: string,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
) => new Date(value).toLocaleDateString('en-US', options);

// Single date, or "Oct 1 – Oct 31, 2026" for multi-day events
export const formatDateRange = (event: ClubEvent) =>
  event.endDate && event.endDate !== event.startDate
    ? `${formatDate(event.startDate, { month: 'short', day: 'numeric' })} – ${formatDate(event.endDate, { month: 'short', day: 'numeric', year: 'numeric' })}`
    : formatDate(event.startDate);

// Converts a Date to the YYYYMMDD format Google Calendar expects
const toCalendarDate = (date: Date) =>
  date.toISOString().slice(0, 10).replace(/-/g, '');

// Google Calendar "add event" link for an all-day event
export const googleCalendarUrl = (event: ClubEvent) => {
  const start = new Date(event.startDate.slice(0, 10));
  const end = new Date((event.endDate ?? event.startDate).slice(0, 10));
  end.setDate(end.getDate() + 1);

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${toCalendarDate(start)}/${toCalendarDate(end)}`,
    details: event.description,
    location: event.location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};
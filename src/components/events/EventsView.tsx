// FILE: src/components/events/EventsView.tsx
// Client wrapper: hero + Live/Upcoming/Past sections + the detail modal.
'use client';

import React, { useCallback, useState } from 'react';
import EventsHero from './EventsHero';
import EventSection from './EventSection';
import EventDetailModal from './EventDetailModal';
import CursorGlow from '@/components/team/CursorGlow'; // CursorGlow: same mouse glow as Teams page (optional)
import type { ClubEvent, EventStatus } from '@/data/events/events';

interface EventsViewProps {
  events: Record<EventStatus, ClubEvent[]>;
}

// One entry per section rendered on the page
const sections: {
  status: EventStatus;
  id: string;
  title: string;
  subtitle: string;
  emptyMessage: string;
}[] = [
  {
    status: 'live',
    id: 'live-events',
    title: 'Live Events',
    subtitle: 'Happening right now — jump in and be part of it.',
    emptyMessage: 'No events are live right now. Check out what is coming up next!',
  },
  {
    status: 'upcoming',
    id: 'upcoming-events',
    title: 'Upcoming Events',
    subtitle: 'Mark your calendar for what is coming next.',
    emptyMessage: 'New events are being planned. Stay tuned!',
  },
  {
    status: 'past',
    id: 'past-events',
    title: 'Past Events',
    subtitle: 'A look back at the sessions our community has hosted.',
    emptyMessage: 'Past events will appear here.',
  },
];

const EventsView = ({ events }: EventsViewProps) => {
  // Currently opened event (null = modal closed)
  const [selected, setSelected] = useState<{
    event: ClubEvent;
    status: EventStatus;
  } | null>(null);

  const handleSelect = useCallback(
    (event: ClubEvent, status: EventStatus) => setSelected({ event, status }),
    []
  );
  const handleClose = useCallback(() => setSelected(null), []);

  return (
    <>
      <CursorGlow /> {/* CursorGlow: remove this line if you don't want the glow */}
      <EventsHero events={events} onSelect={handleSelect} />
      <div className='bg-[#f0f8ff]'>
        <div className='max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24 space-y-20 sm:space-y-24'>
          {sections.map((section) => (
            <EventSection
              key={section.status}
              {...section}
              events={events[section.status]}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>
      <EventDetailModal selected={selected} onClose={handleClose} />
    </>
  );
};

export default EventsView;
// FILE: src/app/events/page.tsx
// Events page (server component). Replaces the old "coming soon" placeholder.
import type { Metadata } from 'next';
import EventsView from '@/components/events/EventsView';
import { groupEventsByStatus } from '@/data/events/events';

export const metadata: Metadata = {
  title: 'Events | WikiClub Tech',
  description:
    'Discover live, upcoming and past events from WikiClub Tech - United University.',
};

// Re-evaluate event status (live / upcoming / past) at most once an hour
export const revalidate = 3600;

export default function EventsPage() {
  return (
    <div className='bg-white min-h-screen'>
      <EventsView events={groupEventsByStatus()} />
    </div>
  );
}
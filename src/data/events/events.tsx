// FILE: src/data/events/events.ts
// Event data + helpers. Edit the `events` array to add/edit/remove events.

export type EventStatus = 'live' | 'upcoming' | 'past';

export interface EventScheduleItem {
  time: string;
  title: string;
  description?: string;
}

export interface EventPrize {
  title: string;
  reward: string;
}

export interface EventFaq {
  question: string;
  answer: string;
}

export interface EventContact {
  name: string;
  role?: string;
  email?: string;
  phone?: string;
}

export interface ClubEvent {
  id: string;
  title: string;
  // Short line shown under the title, e.g. "National Level Hackathon"
  subtitle?: string;
  description: string;
  // Longer text for the "About the Event" panel; falls back to description
  about?: string;
  // ISO date strings (YYYY-MM-DD or full ISO timestamp)
  startDate: string;
  endDate?: string;
  // Human readable start time, e.g. "9:00 AM"
  time?: string;
  location: string;
  mapLink?: string;
  mode?: 'Offline' | 'Online' | 'Hybrid';
  eligibility?: string;
  category?: string;
  image?: string;
  // Extra images for the detail view carousel (image is shown first)
  gallery?: string[];
  tags?: string[];
  highlights?: string[];
  registrationLink?: string;
  registrationDeadline?: string;
  schedule?: EventScheduleItem[];
  prizes?: EventPrize[];
  guidelines?: string[];
  faqs?: EventFaq[];
  contacts?: EventContact[];
  link?: string;
  linkLabel?: string;
}

const LOCATION = 'United University, Prayagraj';
const MAP_LINK = 'https://maps.google.com/?q=United+University+Prayagraj';

// Add, edit or remove events here. Each event is placed in the
// Live / Upcoming / Past section automatically based on its dates.
// Entries marked PLACEHOLDER should be replaced with real event details.
export const events: ClubEvent[] = [
  // PLACEHOLDER: live events
  {
    id: 'road-to-wiki-2026',
    title: 'Road to Wiki Program',
    subtitle: 'Wikimedia Contributor Program',
    description:
      'An ongoing program guiding students through their first steps as Wikimedia contributors — editing, citing sources and building open knowledge together.',
    about:
      'Road to Wiki is a month-long program by WikiClub Tech, United University. Through weekly sessions and hands-on editing drives, students learn how Wikipedia and its sister projects work and make their first meaningful contributions under the guidance of experienced Wikimedians.',
    startDate: '2026-10-01',
    endDate: '2026-10-31',
    time: '10:00 AM',
    location: LOCATION,
    mapLink: MAP_LINK,
    mode: 'Offline',
    eligibility: 'Open for all students',
    category: 'Program',
    image: 'https://i.ibb.co/Z1JwmMXq/g14.jpg',
    gallery: [
      'https://i.ibb.co/jvMLqNDD/g16.jpg',
      'https://i.ibb.co/23gH165X/g17.jpg',
    ],
    tags: ['wikimedia', 'program'],
    highlights: [
      'Open to all students',
      'Hands-on Wikipedia editing',
      'Mentorship from experienced Wikimedians',
      'Networking with the open knowledge community',
      'Certificates for all participants',
    ],
    registrationLink: 'https://forms.gle/FGoyrEHC1CuP9hPSA',
    registrationDeadline: '2026-10-20T23:59:00',
    schedule: [
      { time: 'Week 1', title: 'Introduction to Wikimedia projects' },
      { time: 'Week 2', title: 'Editing basics and citing sources' },
      { time: 'Week 3', title: 'Edit-a-thon drive' },
      { time: 'Week 4', title: 'Showcase and certificates' },
    ],
    guidelines: [
      'Create a Wikipedia account before the first session.',
      'Bring your own laptop.',
      'Follow Wikimedia community guidelines and code of conduct.',
    ],
    faqs: [
      {
        question: 'Do I need prior experience?',
        answer: 'No. The program starts from the basics.',
      },
      {
        question: 'Is there a fee?',
        answer: 'No, participation is completely free.',
      },
    ],
    contacts: [{ name: 'WikiClub Tech UU', role: 'Organising team' }],
    link: 'https://meta.wikimedia.org/wiki/Road_to_wiki_program_UU',
    linkLabel: 'Learn more',
  },
  {
    id: 'wiki-edit-a-thon-2026',
    title: 'Wiki Edit-a-thon',
    subtitle: 'Campus Editing Drive',
    description:
      'A day-long editing drive to improve Wikipedia articles about Prayagraj, its history and its people.',
    startDate: '2026-10-11',
    time: '9:00 AM',
    location: LOCATION,
    mapLink: MAP_LINK,
    mode: 'Hybrid',
    eligibility: 'Open for all students',
    category: 'Edit-a-thon',
    image: 'https://i.ibb.co/BVxqZMqW/g3.jpg',
    tags: ['wikimedia', 'edit-a-thon'],
    highlights: [
      'Improve articles on local history',
      'Guidance from mentors throughout the day',
      'Certificates for all participants',
    ],
    registrationLink: 'https://forms.gle/FGoyrEHC1CuP9hPSA',
  },
  // PLACEHOLDER: upcoming events
  {
    id: 'open-source-workshop',
    title: 'Open Source Contribution Workshop',
    subtitle: 'Hands-on Workshop',
    description:
      'A hands-on session on Git, GitHub and making your first open-source pull request. Details will be announced soon.',
    startDate: '2026-11-15',
    time: '11:00 AM',
    location: LOCATION,
    mapLink: MAP_LINK,
    mode: 'Offline',
    eligibility: 'Open for all students',
    category: 'Workshop',
    image: 'https://i.ibb.co/TzZHrtn/g1.jpg',
    tags: ['open-source', 'workshop'],
    highlights: [
      'Learn Git and GitHub from scratch',
      'Make your first pull request',
      'Certificates for all participants',
    ],
  },
  {
    id: 'chai-with-wiki-2',
    title: 'Chai with Wiki — Edition 2',
    subtitle: 'Community Meetup',
    description:
      'Our community meetup is back. Join us over a cup of chai to talk about Wikimedia projects and open knowledge.',
    startDate: '2026-12-05',
    time: '4:00 PM',
    location: LOCATION,
    mapLink: MAP_LINK,
    mode: 'Offline',
    eligibility: 'Open for all',
    category: 'Meetup',
    image: 'https://i.ibb.co/fYgVkCBj/g2.jpg',
    tags: ['wikimedia', 'community'],
    link: 'https://meta.wikimedia.org/wiki/Chai_with_Wiki',
    linkLabel: 'About Chai with Wiki',
  },
  {
    id: 'ai-study-jam-2027',
    title: 'AI Study Jam',
    subtitle: 'Learning Series',
    description:
      'A guided study jam on AI fundamentals and tools, in collaboration with the developer community in Prayagraj.',
    startDate: '2027-01-20',
    time: '10:00 AM',
    location: LOCATION,
    mapLink: MAP_LINK,
    mode: 'Hybrid',
    eligibility: 'Open for all students',
    category: 'Study Jam',
    image: 'https://i.ibb.co/LzhtDZYX/g12.jpg',
    tags: ['AI', 'study-jam'],
  },
  // Past events
  {
    id: 'chai-with-wiki-1',
    title: 'Chai with Wiki',
    subtitle: 'Community Meetup',
    description:
      "Our first 'Chai with Wiki' session brought together curious minds to explore the universe of Wikimedia over a cup of tea.",
    startDate: '2024-10-15',
    location: LOCATION,
    mapLink: MAP_LINK,
    mode: 'Offline',
    category: 'Meetup',
    image: 'https://i.ibb.co/fYgVkCBj/g2.jpg',
    tags: ['wikimedia', 'community'],
    link: '/blogs/chaiwithwiki',
    linkLabel: 'Read the recap',
  },
  {
    id: 'geminixplore',
    title: 'Geminixplore – CLI & AI Paper Reading',
    subtitle: 'AI Session',
    description:
      'Exploring Gemini CLI and AI research papers with TensorFlow User Group Prayagraj, supported by Google for Developers.',
    startDate: '2024-10-12',
    location: LOCATION,
    mapLink: MAP_LINK,
    mode: 'Offline',
    category: 'Session',
    image: 'https://i.ibb.co/yxbrRvB/geminix-CLI.png',
    tags: ['AI', 'gemini', 'google'],
    link: '/blogs/GeminixCLI',
    linkLabel: 'Read the recap',
  },
];

// Start of the day (00:00:00) unless the value already has a time part
const startOfDay = (value: string) => {
  const date = new Date(value);
  if (!value.includes('T')) date.setHours(0, 0, 0, 0);
  return date;
};

// End of the day (23:59:59) unless the value already has a time part
const endOfDay = (value: string) => {
  const date = new Date(value);
  if (!value.includes('T')) date.setHours(23, 59, 59, 999);
  return date;
};

// Decides whether an event is live / upcoming / past based on its dates
export const getEventStatus = (
  event: ClubEvent,
  now: Date = new Date()
): EventStatus => {
  const start = startOfDay(event.startDate);
  const end = endOfDay(event.endDate ?? event.startDate);

  if (now < start) return 'upcoming';
  if (now > end) return 'past';
  return 'live';
};

// Registration is open until the deadline (or until the event ends)
export const isRegistrationOpen = (
  event: ClubEvent,
  now: Date = new Date()
) => {
  if (!event.registrationLink) return false;
  if (event.registrationDeadline) {
    return now <= endOfDay(event.registrationDeadline);
  }
  return now <= endOfDay(event.endDate ?? event.startDate);
};

// Groups events into live / upcoming / past and sorts each group
export const groupEventsByStatus = (now: Date = new Date()) => {
  const grouped: Record<EventStatus, ClubEvent[]> = {
    live: [],
    upcoming: [],
    past: [],
  };

  for (const event of events) {
    grouped[getEventStatus(event, now)].push(event);
  }

  const byStart = (a: ClubEvent, b: ClubEvent) =>
    new Date(a.startDate).getTime() - new Date(b.startDate).getTime();

  grouped.live.sort(byStart);
  grouped.upcoming.sort(byStart);
  grouped.past.sort((a, b) => byStart(b, a)); // newest past event first

  return grouped;
};
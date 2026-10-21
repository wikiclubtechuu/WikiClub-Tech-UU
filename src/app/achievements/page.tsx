"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  UserRound,
  GraduationCap,
  GitPullRequest,
  ExternalLink,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Medal,
  Play,
  Quote,
} from "lucide-react";
import { achievements } from "../../data/achievements/achievements";

/* =========================================================
   CONTRIBUTOR TYPES
========================================================= */
type Contributor = {
  id: string;
  name: string;
  merged?: number;
  links: string[];
  image?: string;
  description?: string;
};

/* =========================================================
   CONTRIBUTION CHAMPIONS
   First 10 = verified contribution records.
   Next 10 = featured contributors from the team screenshots.
========================================================= */
const contributors: Contributor[] = [
  {
    id: "mohd-shadab",
    name: "Mohd Shadab",
    merged: 4,
    links: [],
    image: "/team/Mohd Shadab.jpg",
    description:
      "Contributed to WikiClub Tech through open-source project contributions and community development.",
  },
  {
    id: "kavaljeet-singh",
    name: "Kavaljeet Singh",
    merged: 3,
    links: [],
    image: "/team/KAVALJEET SINGH.jpg",
    description:
      "Contributed to WikiClub Tech through collaborative project and open-source contribution activities.",
  },
  {
    id: "pushpit-saluja",
    name: "Pushpit Saluja",
    merged: 2,
    links: [],
    image: "/team/Pushpit Saluja.jpg",
    description:
      "Contributed to WikiClub Tech projects and collaborative community development.",
  },
  {
    id: "hemant-ojha",
    name: "Hemant Ojha",
    merged: 2,
    links: [],
    image: "/team/Hemant Ojha.png",
    description:
      "Contributed to WikiClub Tech through open-source collaboration and project development.",
  },
  {
    id: "vratej-diwedi",
    name: "Vratej Diwedi",
    merged: 1,
    links: [],
    image: "/team/Vratej Dwivedi.png",
    description:
      "Participated in WikiClub Tech contribution activities and collaborative project development.",
  },
  {
    id: "vaishnavi-mishra",
    name: "Vaishnavi Mishra",
    merged: 1,
    links: [],
    image: "",
    description:
      "Contributed to WikiClub Tech community projects and collaborative activities.",
  },
  {
    id: "shresth-srivastava",
    name: "Shresth Srivastava",
    merged: 1,
    links: [],
    image: "",
    description:
      "Contributed to WikiClub Tech through collaborative project work and community contributions.",
  },
  {
    id: "rehan-khan",
    name: "Rehan Khan",
    merged: 1,
    links: [],
    image: "/team/Rehan Khan.jpg",
    description:
      "Contributed to WikiClub Tech projects and community contribution activities.",
  },
  {
    id: "shrey-jaiswal",
    name: "Shrey Jaiswal",
    merged: 1,
    links: [],
    image: "/team/Shrey.jpg",
    description:
      "Contributed to WikiClub Tech through collaborative development and open-source activities.",
  },
  {
    id: "tejash-yadav",
    name: "Tejash Yadav",
    merged: 1,
    links: [],
    image: "/team/Tejash Yadav.jpg",
    description:
      "Contributed to WikiClub Tech projects and open-source community activities.",
  },
  /* =======================================================
     ADDITIONAL FEATURED CONTRIBUTORS (11 to 20)
     Commented out — only top 10 verified contributors shown
  =======================================================
  {
    id: "anupam-yadav",
    name: "Anupam Yadav",
    merged: undefined,
    links: [],
    image: "/team/Anupam Yadav.jpg",
    description:
      "Featured WikiClub Tech community member recognized for participation and contribution to the community.",
  },
  {
    id: "harshit-pandey",
    name: "Harshit Pandey",
    merged: undefined,
    links: [],
    image: "/team/Harshit Pandey.jpg",
    description:
      "Featured WikiClub Tech community member contributing to collaborative community activities.",
  },
  {
    id: "sanya-gupta",
    name: "Sanya Gupta",
    merged: undefined,
    links: [],
    image: "/team/Sanya Gupta.jpg",
    description:
      "Featured WikiClub Tech community member participating in collaborative activities.",
  },
  {
    id: "sejal-kesarwani",
    name: "Sejal Kesarwani",
    merged: undefined,
    links: [],
    image: "/team/Sejal Kesarwani.jpg",
    description:
      "Featured WikiClub Tech community member participating in community initiatives.",
  },
  {
    id: "akhilesh-tiwari",
    name: "Akhilesh Tiwari",
    merged: undefined,
    links: [],
    image: "/team/Akhilesh Tiwari.jpg",
    description:
      "Featured WikiClub Tech community member contributing to community activities.",
  },
  {
    id: "saumya-rawat",
    name: "Saumya Rawat",
    merged: undefined,
    links: [],
    image: "/team/Saumya Rawat.jpg",
    description:
      "Featured WikiClub Tech community member participating in collaborative initiatives.",
  },
  {
    id: "saumya-agrahari",
    name: "Saumya Agrahari",
    merged: undefined,
    links: [],
    image: "/team/Saumya Agrahari.jpg",
    description:
      "Featured WikiClub Tech community member contributing to community activities.",
  },
  {
    id: "ayush-tiwari",
    name: "Ayush Tiwari",
    merged: undefined,
    links: [],
    image: "/team/Ayush Tiwari.jpg",
    description:
      "Featured WikiClub Tech community member participating in collaborative activities.",
  },
  {
    id: "shami-verma",
    name: "Shami Verma",
    merged: undefined,
    links: [],
    image: "/team/Shami Verma.jpg",
    description:
      "Featured WikiClub Tech community member participating in WikiClub initiatives.",
  },
  {
    id: "syed-sohrab-haider-rizvi",
    name: "Syed Sohrab Haider Rizvi",
    merged: undefined,
    links: [],
    image: "/team/Syed Sohrab Haider Rizvi.jpg",
    description:
      "Featured WikiClub Tech community member contributing through collaborative participation.",
  },
  ======================================================= */
];

/* =========================================================
   ACHIEVEMENT HIGHLIGHT TYPES
========================================================= */
type Highlight = {
  id: string;
  type: "Awards & Recognition" | "Alumni Achievement" | "Testimonials";
  title: string;
  subtitle: string;
  description: string;
  image: string;
  secondaryImage?: string;
  video?: boolean;
  link?: string;
};

/* =========================================================
   ACHIEVEMENT HIGHLIGHTS
   Replace the four temporary online photo URLs when ready.
========================================================= */
const achievementHighlights: Highlight[] = [
  {
    id: "indic-wikimedia-2026",
    type: "Awards & Recognition",
    title: "Indic Wikimedia Hackathon 2026",
    subtitle: "Kavaljeet Singh · Open Source Contributions · Hyderabad",
    description:
      "Kavaljeet Singh contributed improvements to Clip2Commons, including Author Override, accessibility enhancements such as keyboard navigation and ARIA support, and improvements to the upload workflow. These contributions were reviewed and merged as part of the open-source development process.",
    image: "/achievements/open-source-contributions.png",
    secondaryImage: "/achievements/open-source-contributions.png",
    link:
      "https://www.linkedin.com/posts/kavaljeet-singh-dev_opensource-wikimedia-mediawiki-activity-7482391525847601152-CZNr",
  },
  {
    id: "genai-hackathon-2025",
    type: "Awards & Recognition",
    title: "GenAI Hackathon 2025 — First Position",
    subtitle: "Team Nimbus · UIT Prayagraj",
    description:
      "Kavaljeet Singh's Team Nimbus secured first position in a seven-hour Generative AI hackathon at UIT Prayagraj, competing against more than 30 teams. This achievement highlights teamwork, rapid prototyping and practical application of generative AI.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85",
    secondaryImage:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=85",
    link: "https://in.linkedin.com/in/kavaljeet-singh-dev",
  },
  {
    id: "wikipedia-25-shadab",
    type: "Awards & Recognition",
    title: "Wikipedia 25th Birthday Celebration",
    subtitle: "Mohd Shadab · Wikimedia Community",
    description:
      "Mohd Shadab shared his Wikimedia journey and delivered a ‘Why I Wiki?’ session at WikiClub Tech UU. The celebration brought students closer to open knowledge, Wikimedia projects and the importance of improving representation in online knowledge resources.",
    image: "/achievements/wikipedia-25.png",
    secondaryImage: "/achievements/wikipedia-25.png",
    link:
      "https://diff.wikimedia.org/2026/04/12/wikipedia-25th-birthday-celebration-at-wikiclub-tech-united-university/",
  },
  {
    id: "uhack-4-runner-up",
    type: "Awards & Recognition",
    title: "UHack 4.0 — First Runner-Up",
    subtitle: "National Hackathon · ₹30,000 Prize",
    description:
      "The WikiClub Tech UU team secured first runner-up at UHack 4.0. The announced team members were Ayush Tiwari, Anshuman Rai, Saumya Agrahari and Unnati Kesarwani. The achievement celebrates collaborative problem-solving and building under hackathon conditions.",
    image: "/achievements/uhack-4.jpg",
    secondaryImage: "/achievements/uhack-4.jpg",
    link: "https://lnkd.in/p/g68nPqBE",
  },
  {
    id: "tedx-united-university",
    type: "Awards & Recognition",
    title: "TEDx United University",
    subtitle: "Technical & Social Media Team",
    description:
      "A highlight of student participation in technical setup and social media coordination at TEDx United University.",
    image: "/achievements/tedx-united-university.jpg",
    secondaryImage: "/achievements/tedx-united-university-2.jpg",
  },
  {
    id: "anshuman-unnati-research",
    type: "Awards & Recognition",
    title: "A Stacked Learning Approach to Intrusion Detection",
    subtitle: "Anshuman Rai & Unnati Kesarwani · AICCT-2025",
    description:
      "Anshuman Rai and co-author Unnati Kesarwani presented their research paper, 'A Stacked Learning Approach to Intrusion Detection for Robust Network Protection', at the 1st International Conference on Advances in Intelligent Computing and Communication Technology (AICCT-2025) at United University, Prayagraj, addressing critical gaps in network security.",
    image: "/achievements/anshuman-unnati-research.jpg",
    secondaryImage: "/achievements/anshuman-unnati-research.jpg",
    link: "https://lnkd.in/p/gr6gVk_3",
  },
  {
    id: "ayush-saumya-research",
    type: "Awards & Recognition",
    title: "International Conference Research Presentation",
    subtitle: "Ayush Tiwari & Saumya Agrahari · AICCT-2025",
    description:
      "Ayush Tiwari and co-author Saumya Agrahari presented their international conference paper at the 1st International Conference on Advances in Intelligent Computing and Communication Technology (AICCT-2025), organized by United University, Prayagraj, contributing to research in intelligent computing and communication technologies.",
    image: "/achievements/ayush-saumya-research.jpg",
    secondaryImage: "/achievements/ayush-saumya-research.jpg",
    link: "https://lnkd.in/p/gCUqqBDR",
  },
  /* =========================================================
     ALUMNI ACHIEVEMENT & TESTIMONIALS (Commented out per request)
  =========================================================
  {
    id: "alumni-achievement",
    type: "Alumni Achievement",
    title: "Alumni Achievement",
    subtitle: "WikiClub Tech Alumni",
    description:
      "Celebrating the academic, professional and entrepreneurial journeys of WikiClub Tech alumni beyond the university.",
    image: "/achievements/alumni-achievement.jpg",
    secondaryImage: "/achievements/alumni-achievement-2.jpg",
  },
  {
    id: "alumni-journey",
    type: "Alumni Achievement",
    title: "From Campus to Career",
    subtitle: "Alumni Spotlight",
    description:
      "Highlighting alumni journeys and the impact of skills, collaboration and experiences developed during their time with the community.",
    image: "/achievements/alumni-journey.jpg",
    secondaryImage: "/achievements/alumni-journey-2.jpg",
  },
  {
    id: "member-testimonial",
    type: "Testimonials",
    title: "Community Experience",
    subtitle: "Member Testimonial",
    description:
      "Hear directly from members about their experiences, learning opportunities and collaborative journey with WikiClub Tech.",
    image: "/achievements/testimonial.jpg",
    secondaryImage: "/achievements/testimonial-2.jpg",
    video: true,
  },
  ========================================================= */
];

/* =========================================================
   CONTRIBUTOR AVATAR
========================================================= */
function ContributorAvatar({
  name,
  image,
  size = "small",
}: {
  name: string;
  image?: string | null;
  size?: "small" | "large";
}) {
  const [imageError, setImageError] = useState(false);
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const isLarge = size === "large";

  if (!image || imageError) {
    return (
      <div
        className={`flex shrink-0 items-center justify-center rounded-full bg-[#F5F7FA] font-bold text-[#045797] ring-1 ring-slate-200 ${
          isLarge ? "h-20 w-20 text-xl" : "h-12 w-12 text-sm"
        }`}
      >
        {initials}
      </div>
    );
  }

  return (
    <div
      className={`shrink-0 overflow-hidden rounded-full border-2 border-white bg-slate-100 shadow-sm ring-1 ring-slate-200 ${
        isLarge ? "h-20 w-20" : "h-12 w-12"
      }`}
    >
      <img
        src={encodeURI(image)}
        alt={`${name} profile`}
        className="h-full w-full object-cover"
        loading="lazy"
        onError={() => setImageError(true)}
      />
    </div>
  );
}

/* =========================================================
   HIGHLIGHT IMAGE
========================================================= */
function HighlightImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-[#DFF7EC] via-[#EAF5FF] to-[#F5F7FA] ${className}`}
      >
        <Trophy className="h-12 w-12 text-[#045797]/30" />
      </div>
    );
  }

  return (
    <img
      src={encodeURI(src)}
      alt={alt}
      className={className}
      onError={() => setImageError(true)}
    />
  );
}

/* =========================================================
   MEDAL
========================================================= */
function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <div
        className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-yellow-300 bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-400 shadow-md shadow-yellow-200/50"
        title="1st Place"
      >
        <Medal
          className="h-6 w-6 text-yellow-700"
          strokeWidth={2.2}
        />
        <span className="absolute -bottom-2 rounded-full border border-yellow-300 bg-white px-1.5 py-0.5 text-[9px] font-extrabold text-yellow-700 shadow-sm">
          #1
        </span>
      </div>
    );
  }

  if (rank === 2) {
    return (
      <div
        className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-300 bg-gradient-to-br from-slate-100 via-slate-200 to-slate-400 shadow-md shadow-slate-200/50"
        title="2nd Place"
      >
        <Medal
          className="h-6 w-6 text-slate-600"
          strokeWidth={2.2}
        />
        <span className="absolute -bottom-2 rounded-full border border-slate-300 bg-white px-1.5 py-0.5 text-[9px] font-extrabold text-slate-600 shadow-sm">
          #2
        </span>
      </div>
    );
  }

  if (rank === 3) {
    return (
      <div
        className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-orange-300 bg-gradient-to-br from-orange-100 via-orange-200 to-orange-400 shadow-md shadow-orange-200/50"
        title="3rd Place"
      >
        <Medal
          className="h-6 w-6 text-orange-700"
          strokeWidth={2.2}
        />
        <span className="absolute -bottom-2 rounded-full border border-orange-300 bg-white px-1.5 py-0.5 text-[9px] font-extrabold text-orange-700 shadow-sm">
          #3
        </span>
      </div>
    );
  }

  return <span className="contributor-rank">#{rank}</span>;
}

type HighlightSlide = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link?: string;
  linkText?: string;
};

const highlightSections: {
  id: string;
  heading: string;
  description: string;
  slides: HighlightSlide[];
}[] = [
  
  {
    id: "global-opportunities",
    heading: "Global Achievements & Opportunities",
    description:
      "Explore global scholarships, travel grants, international events and open-source opportunities for students and contributors.",
    slides: [
// Removed existing slides for brevity; see comments below for preserved code.
/*
  {
    id: "wikimedia-scholarships",
    title: "Wikimedia Scholarships & Travel Grants",
    subtitle: "Scholarships · Travel Support",
    description:
      "Explore funding opportunities that may support eligible community members attending Wikimedia events and conferences. Check the official program page for eligibility, deadlines and application requirements.",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85",
    link: "https://meta.wikimedia.org/wiki/Grants:Programs",
    linkText: "Explore Wikimedia Grants",
  },
  {
    id: "international-conferences",
    title: "Global Conferences & Events",
    subtitle: "International Events · Community",
    description:
      "Discover Wikimedia events and international community gatherings. Check official event pages for registration, participation and funding details.",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=85",
    link: "https://meta.wikimedia.org/wiki/Events",
    linkText: "Explore Wikimedia Events",
  },
  {
    id: "open-source-programs",
    title: "Open-Source Programs & Fellowships",
    subtitle: "Open Source · Learning Opportunities",
    description:
      "Explore open-source projects, collaborative development and learning opportunities. Verify program availability, eligibility and deadlines on official websites.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85",
    link: "https://www.wikimedia.org/",
    linkText: "Explore Wikimedia",
  },
*/
{
  id: "wikiconference-india-2026",
  title: "WikiConference India 2026",
  subtitle: "Kochi, Kerala · September 4–6, 2026",
  description:
    "WikiConference India 2026 brought together Wikimedians from across India for sessions, workshops and community collaboration. Explore the official Meta-Wiki page for programme details, reports and community highlights.",
  image: "/achievements/wikiconference.jpg",
  link: "https://meta.wikimedia.org/wiki/WikiConference_India_2026",
  linkText: "View WikiConference India 2026",
},
{
  id: "language-diversity-conference",
  title: "Language Diversity Conference (LDC)",
  subtitle: "Language Diversity · Wikimedia Movement",
  description:
    "The Language Diversity Conference brings together people working to support linguistic diversity, multilingual knowledge and underrepresented languages across Wikimedia projects. Explore the conference resource to learn more about language communities and their initiatives.",
  image: "/achievements/LDC 3.jpg",
  link: "https://share.google/Ia1pvT1gVZwbgfrF8",
  linkText: "Explore Language Diversity Conference",
},
{
  id: "train-a-wikipedian",
  title: "Train a Wikipedian (TaW)",
  subtitle: "Deoband Community Wikimedia",
  description:
    "Train a Wikipedian is an initiative by Deoband Community Wikimedia that empowers volunteers and emerging community leaders with Wikimedia knowledge, leadership skills and opportunities to contribute to open knowledge ecosystems.",
  image: "/achievements/taw26.jpg",
  link: "https://meta.wikimedia.org/wiki/Deoband_Community_Wikimedia/Train_a_Wikipedian",
  linkText: "Explore Train a Wikipedian",
},

{
  id: "shadab-global-achievement",
  title: "Shadab's Global Achievement",
  subtitle: "Mohd Shadab · Wikimedia Hackathon",
  description:
    "Mohd Shadab represented WikiClub Tech UU at a global Wikimedia event, participating alongside Wikimedians from around the world. This milestone highlights the community's growing presence at international open-knowledge platforms.",
  image: "/achievements/shadab-global-achievement.jpg",
  link: "https://lnkd.in/p/gXwMk4MC",
  linkText: "View Achievement",
},
    ],
  },

  {
    id: "awards",
    heading: "Awards & Recognition",
    description:
      "Celebrating achievements, hackathons and open-source contributions.",
    slides: [
      {
        id: "clip2commons",
        title: "Open-Source Contributions",
        subtitle: "Kavaljeet Singh · Clip2Commons",
        description:
          "Kavaljeet shared his open-source contribution journey, including improvements related to accessibility, keyboard navigation and the upload workflow.",
        image: "/achievements/open-source-contributions.png",
        link: "https://www.linkedin.com/posts/kavaljeet-singh-dev_opensource-wikimedia-mediawiki-activity-7482391525847601152-CZNr",
        linkText: "View LinkedIn Post",
      },
      {
        id: "genai-hackathon",
        title: "GenAI Hackathon Achievement",
        subtitle: "Team Nimbus · UIT Prayagraj",
        description:
          "A team achievement highlighting innovation, collaboration and problem-solving during a GenAI hackathon.",
        image:
          "/achievements/gen ai hackathon.jpg",
        link: "https://in.linkedin.com/in/kavaljeet-singh-dev",
        linkText: "View Contributor Profile",
      },
      {
        id: "uhack",
        title: "UHack 4.0 — First Runner-Up",
        subtitle: "Team Achievement · ₹30,000 Prize",
        description:
          "The WikiClub Tech UU team secured first runner-up at UHack 4.0. Team members Ayush Tiwari, Anshuman Rai, Saumya Agrahari and Unnati Kesarwani celebrated collaborative problem-solving and innovation under hackathon conditions.",
        image: "/achievements/uhack-4.jpg",
        link: "https://lnkd.in/p/g68nPqBE",
        linkText: "View UHack 4.0 Post",
      },
      {
        id: "anshuman-unnati-research",
        title: "A Stacked Learning Approach to Intrusion Detection",
        subtitle: "Anshuman Rai & Unnati Kesarwani · AICCT-2025",
        description:
          "Anshuman Rai and co-author Unnati Kesarwani presented their research paper, 'A Stacked Learning Approach to Intrusion Detection for Robust Network Protection', at the 1st International Conference on Advances in Intelligent Computing and Communication Technology (AICCT-2025) at United University, Prayagraj, addressing critical gaps in network security.",
        image: "/achievements/anshuman-unnati-research.jpg",
        link: "https://lnkd.in/p/gr6gVk_3",
        linkText: "View Research Post",
      },
      {
        id: "ayush-saumya-research",
        title: "International Conference Research Presentation",
        subtitle: "Ayush Tiwari & Saumya Agrahari · AICCT-2025",
        description:
          "Ayush Tiwari and co-author Saumya Agrahari presented their international conference paper at the 1st International Conference on Advances in Intelligent Computing and Communication Technology (AICCT-2025), organized by United University, Prayagraj, contributing to research in intelligent computing and communication technologies.",
        image: "/achievements/ayush-saumya-research.jpg",
        link: "https://lnkd.in/p/gCUqqBDR",
        linkText: "View Research Post",
      },
    ],
  },
  /* =========================================================
     ALUMNI ACHIEVEMENTS (Commented out per request)
  =========================================================
  {
    id: "alumni",
    heading: "Alumni Achievements",
    description:
      "Celebrating alumni journeys, knowledge sharing and contributions to the Wikimedia community.",
    slides: [
      {
        id: "shadab-wikipedia25",
        title: "Wikipedia's 25th Birthday Celebration",
        subtitle: "WikiClub Tech · Community Story",
        description:
          "Read about the Wikipedia 25th birthday celebration at WikiClub Tech, including the Why I Wiki session and Wikimedia journey shared during the event.",
        image: "/achievements/wikipedia-25.png",
        link: "https://diff.wikimedia.org/2026/04/12/wikipedia-25th-birthday-celebration-at-wikiclub-tech-united-university/",
        linkText: "Read the Published Article",
      },
      {
        id: "open-source-journey",
        title: "Building an Open-Source Journey",
        subtitle: "Community Contributions",
        description:
          "Open-source participation helps students build practical skills, collaborate with contributors and learn through real projects.",
        image:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85",
      },
      {
        id: "alumni-community",
        title: "Learning Beyond the Classroom",
        subtitle: "Alumni & Community",
        description:
          "A space to feature verified alumni milestones, professional journeys, projects and experiences as more stories are collected.",
        image:
          "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=85",
      },
    ],
  },
  ========================================================= */
  /* =========================================================
     TESTIMONIALS (Commented out per request)
  =========================================================
  {
    id: "testimonials",
    heading: "Testimonials",
    description:
      "Experiences and reflections from members, mentors and collaborators.",
    slides: [
      {
        id: "member-experience",
        title: "A Community That Encourages Learning",
        subtitle: "Member Experience · Sample Card",
        description:
          "Use this space to publish a real member's experience of workshops, teamwork, open-source learning and community participation. Replace this sample text with an approved testimonial.",
        image:
          "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85",
      },
      {
        id: "mentor-experience",
        title: "Learning Through Collaboration",
        subtitle: "Mentor Feedback · Sample Card",
        description:
          "Feature feedback from a mentor or workshop facilitator here. Add the person's name and original source only after the testimonial has been verified.",
        image:
          "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=85",
      },
      {
        id: "community-experience",
        title: "Growing Together as a Community",
        subtitle: "Community Feedback · Sample Card",
        description:
          "Showcase a real community member's experience, highlighting the activities, people or opportunities that made a difference.",
        image:
          "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=85",
      },
    ],
  },
  ========================================================= */
];

function HighlightSlideshow({
  section,
}: {
  section: (typeof highlightSections)[number];
}) {
  const [index, setIndex] = useState(0);
  const current = section.slides[index];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((previous) => (previous + 1) % section.slides.length);
    }, 10000);

    return () => window.clearInterval(timer);
  }, [section.slides.length]);

  const previous = () => {
    setIndex(
      (previousIndex) =>
        (previousIndex - 1 + section.slides.length) %
        section.slides.length,
    );
  };

  const next = () => {
    setIndex((previousIndex) => (previousIndex + 1) % section.slides.length);
  };

  return (
    <section className="mb-16">
      <div className="mb-6">
        <p className="achievement-label">Community achievements</p>
        <h3 className="achievement-section-title mt-2 text-2xl font-bold sm:text-3xl">
          {section.heading}
        </h3>
        <p className="achievement-section-description mt-2 max-w-2xl">
          {section.description}
        </p>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -25 }}
            transition={{ duration: 0.35 }}
            className="grid min-h-[420px] lg:grid-cols-2"
          >
            <div className="relative min-h-[280px] overflow-hidden bg-[#F7FAFC] sm:min-h-[380px]">
              <img
                src={current.image}
                alt={current.title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              <span className="absolute bottom-6 left-6 rounded-full bg-white/95 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#045797]">
                {section.heading}
              </span>
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
              <p className="text-sm font-semibold text-[#045797]">
                {current.subtitle}
              </p>

              <h4 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {current.title}
              </h4>

              <p className="mt-5 text-base leading-7 text-slate-600">
                {current.description}
              </p>

              {current.link && (
                <Link
                  href={current.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-lg bg-[#045797] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#034576]"
                >
                  {current.linkText || "View Source"}
                  <ExternalLink className="h-4 w-4" />
                </Link>
              )}

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={previous}
                  aria-label={`Previous ${section.heading} slide`}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:bg-[#F5F7FA] hover:text-[#045797]"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  onClick={next}
                  aria-label={`Next ${section.heading} slide`}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:bg-[#F5F7FA] hover:text-[#045797]"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                <div className="ml-2 flex items-center gap-2">
                  {section.slides.map((slide, slideIndex) => (
                    <button
                      key={`${section.id}-${slide.id}-${slideIndex}`}
                      type="button"
                      onClick={() => setIndex(slideIndex)}
                      aria-label={`Go to slide ${slideIndex + 1} in ${section.heading}`}
                      aria-current={slideIndex === index ? "true" : undefined}
                      className={`h-2 rounded-full transition-all ${
                        slideIndex === index
                          ? "w-7 bg-[#045797]"
                          : "w-2 bg-slate-300 hover:bg-slate-400"
                      }`}
                    />
                  ))}
                </div>

                <span className="ml-auto text-sm text-slate-500">
                  {index + 1} / {section.slides.length}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* =========================================================
   LAZY-LOADED HIGHLIGHT SECTION
========================================================= */
function LazyHighlightSlideshow({
  section,
}: {
  section: (typeof highlightSections)[number];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "300px 0px",
        threshold: 0.01,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="min-h-[420px]">
      {shouldLoad ? (
        <HighlightSlideshow section={section} />
      ) : (
        <div
          className="mb-16 flex min-h-[420px] animate-pulse flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white sm:flex-row"
          aria-label={`Loading ${section.heading}`}
        >
          <div className="min-h-[280px] bg-slate-100 sm:w-1/2" />
          <div className="flex flex-1 flex-col justify-center gap-4 p-8">
            <div className="h-4 w-2/5 rounded bg-slate-200" />
            <div className="h-8 w-4/5 rounded bg-slate-200" />
            <div className="h-4 w-full rounded bg-slate-200" />
            <div className="h-4 w-3/4 rounded bg-slate-200" />
          </div>
        </div>
      )}
    </div>
  );
}


/* =========================================================
   PAGE
========================================================= */
export default function AchievementsPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [contributorPage, setContributorPage] = useState(0);

  const contributorsPerPage = 10;

  const totalContributorPages = Math.ceil(
    contributors.length / contributorsPerPage
  );

  const visibleContributors = contributors.slice(
    contributorPage * contributorsPerPage,
    contributorPage * contributorsPerPage + contributorsPerPage
  );

  const totalContributions = contributors.reduce(
    (total, contributor) => total + (contributor.merged || 0),
    0
  );

  const verifiedContributors = contributors.filter(
    (contributor) => typeof contributor.merged === "number"
  ).length;

  const totalAchievements = achievements.length;

  return (

      <main className="achievement-page relative isolate min-h-screen">

    {/* Pastel gradient background */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 -z-10"
    style={{
      background: `
        radial-gradient(circle at 15% 10%, rgba(210, 238, 250, 0.75) 0%, rgba(210, 238, 250, 0) 42%),
        radial-gradient(circle at 85% 10%, rgba(215, 250, 225, 0.8) 0%, rgba(215, 250, 225, 0) 45%),
        radial-gradient(circle at 80% 90%, rgba(255, 245, 235, 0.65) 0%, rgba(255, 245, 235, 0) 40%),
        #f8fcfa
      `,
    }}
  />

  {/* Hero & Milestones section with scoped background grid */}
  <div className="relative isolate">
    {/* Grid background — scoped to Hero through Our Milestones */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        backgroundImage: `
          linear-gradient(rgba(100, 116, 139, 0.12) 1px, transparent 1px),
          linear-gradient(90deg, rgba(100, 116, 139, 0.12) 1px, transparent 1px)
        `,
        backgroundSize: "52px 52px",
        backgroundPosition: "center center",
        maskImage: "linear-gradient(to bottom, black 80%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent)",
      }}
    />

    {/* HERO */}
    <section className="relative z-10 mx-auto max-w-7xl px-6 pb-16 pt-28 lg:px-8">
      <div className="max-w-4xl">
        <p className="achievement-label mb-4">
          WikiClub Tech UU · Achievements
        </p>

        <h1 className="text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl">
          Celebrating
          <span className="achievement-blue"> Ideas, Impact </span>
          & Achievement.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          A record of the milestones, achievements and contributions that
          define the WikiClub Tech community at United University.
        </p>
      </div>
    </section>

    {/* =====================================================
        OUR MILESTONES
    ===================================================== */}
    <section className="relative z-10 mx-auto max-w-7xl px-6 pb-16 lg:px-8">
      <div className="mb-8">
        <p className="achievement-label">By the numbers</p>
        <h2 className="achievement-section-title mt-2 text-3xl font-bold">
          Our Milestones
        </h2>
        <p className="achievement-section-description mt-2 max-w-2xl">
          A quick look at the community&apos;s contribution and achievement
          milestones.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* CONTRIBUTORS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="milestone-card"
        >
          <div className="milestone-line milestone-line-green" />
          <p className="milestone-number">{contributors.length}</p>
          <p className="milestone-label">Featured Contributors</p>
        </motion.div>

        {/* VERIFIED CONTRIBUTIONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="milestone-card"
        >
          <div className="milestone-line milestone-line-blue" />
          <p className="milestone-number">{totalContributions}</p>
          <p className="milestone-label">Recorded Contributions</p>
        </motion.div>

        {/* ACHIEVEMENTS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="milestone-card"
        >
          <div className="milestone-line milestone-line-maroon" />
          <p className="milestone-number">{totalAchievements}</p>
          <p className="milestone-label">Community Achievements</p>
        </motion.div>
      </div>
    </section>
  </div>
            {/* =====================================================
          CONTRIBUTION CHAMPIONS
      ===================================================== */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <div className="mb-8">
          <p className="achievement-label">Community contribution</p>
          <h2 className="achievement-section-title mt-2 text-3xl font-bold">
            Contribution Champions
          </h2>
          <p className="achievement-section-description mt-2 max-w-2xl">
            Recognizing contributors and community members who are helping
            build, improve and grow WikiClub Tech.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] border-collapse">
              <thead>
                <tr className="border-b bg-[#F5F7FA] text-left">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Rank
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Contributor
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Contribution
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Details
                  </th>
                </tr>
              </thead>

              <tbody>
                {visibleContributors.map((contributor, localIndex) => {
                  const globalIndex =
                    contributorPage * contributorsPerPage + localIndex;
                  const rank = globalIndex + 1;
                  const isSelected = selected === contributor.id;

                  return (
                    <Fragment key={contributor.id}>
                      <motion.tr
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.25,
                          delay: localIndex * 0.025,
                        }}
                        className={`border-b transition-colors ${
                          isSelected
                            ? "bg-[#F8FAFC]"
                            : "hover:bg-slate-50/70"
                        }`}
                      >
                        {/* RANK */}
                        <td className="px-6 py-5">
                          <RankBadge rank={rank} />
                        </td>

                        {/* CONTRIBUTOR */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <ContributorAvatar
                              name={contributor.name}
                              image={contributor.image}
                            />
                            <div>
                              <p className="font-bold text-slate-900">
                                {contributor.name}
                              </p>
                              <p className="mt-0.5 text-xs text-slate-400">
                                {contributor.merged !== undefined
                                  ? "WikiClub Tech Contributor"
                                  : "Featured Community Member"}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* CONTRIBUTION */}
                        <td className="px-6 py-5">
                          {contributor.merged !== undefined ? (
                            <div className="flex items-center gap-2">
                              <GitPullRequest className="h-4 w-4 text-[#35A06A]" />
                              <span className="font-bold text-[#35A06A]">
                                {contributor.merged}
                              </span>
                              <span className="text-sm text-slate-400">
                                {contributor.merged === 1
                                  ? "contribution"
                                  : "contributions"}
                              </span>
                            </div>
                          ) : (
                            <span className="inline-flex rounded-full bg-[#045797]/10 px-3 py-1.5 text-xs font-bold text-[#045797]">
                              Featured
                            </span>
                          )}
                        </td>

                        {/* DETAILS */}
                        <td className="px-6 py-5">
                          <button
                            type="button"
                            onClick={() =>
                              setSelected(
                                isSelected ? null : contributor.id
                              )
                            }
                            aria-expanded={isSelected}
                            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-[#045797]/30 hover:bg-[#F5F7FA] hover:text-[#045797]"
                          >
                            {isSelected ? "Hide Details" : "View Details"}
                            <ChevronDown
                              className={`h-4 w-4 transition-transform duration-200 ${
                                isSelected ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                        </td>
                      </motion.tr>

                      {/* EXPANDED DETAILS */}
                      <AnimatePresence initial={false}>
                        {isSelected && (
                          <motion.tr
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <td
                              colSpan={4}
                              className="border-b bg-[#F8FAFC] px-6 py-6"
                            >
                              <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.2 }}
                                className="rounded-xl border bg-white p-5 shadow-sm"
                              >
                                {/* PROFILE */}
                                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                                  <ContributorAvatar
                                    name={contributor.name}
                                    image={contributor.image}
                                    size="large"
                                  />
                                  <div>
                                    <p className="text-xl font-bold text-slate-900">
                                      {contributor.name}
                                    </p>
                                    <p className="mt-1 text-sm font-medium text-[#045797]">
                                      {contributor.merged !== undefined
                                        ? "WikiClub Tech Contributor"
                                        : "Featured Community Member"}
                                    </p>
                                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                                      {contributor.description}
                                    </p>
                                  </div>
                                </div>

                                {/* STATS */}
                                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                                  <div className="rounded-lg border bg-[#F8FAFC] p-4">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                      Community Rank
                                    </p>
                                    <p className="mt-1 text-lg font-bold text-[#045797]">
                                      #{rank}
                                    </p>
                                  </div>

                                  <div className="rounded-lg border bg-[#F8FAFC] p-4">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                      Contribution Record
                                    </p>
                                    <p className="mt-1 text-lg font-bold text-[#35A06A]">
                                      {contributor.merged !== undefined
                                        ? contributor.merged
                                        : "Featured"}
                                    </p>
                                  </div>

                                  <div className="rounded-lg border bg-[#F8FAFC] p-4">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                      Status
                                    </p>
                                    <p className="mt-1 text-lg font-bold text-[#35A06A]">
                                      Active
                                    </p>
                                  </div>
                                </div>

                                {/* CONTRIBUTION DETAILS */}
                                <div className="mt-6 border-t pt-5">
                                  <div className="mb-3 flex items-center justify-between">
                                    <div>
                                      <p className="text-sm font-bold text-slate-800">
                                        Contribution Details
                                      </p>
                                      <p className="text-xs text-slate-400">
                                        WikiClub Tech community record
                                      </p>
                                    </div>
                                    <span className="rounded-full bg-[#35A06A]/10 px-3 py-1 text-xs font-bold text-[#35A06A]">
                                      {contributor.merged !== undefined
                                        ? `Total: ${contributor.merged}`
                                        : "Featured Member"}
                                    </span>
                                  </div>

                                  <div className="rounded-lg border bg-[#F8FAFC] p-4">
                                    <div className="flex items-center gap-3">
                                      <GitPullRequest className="h-5 w-5 text-[#35A06A]" />
                                      <div>
                                        <p className="text-sm font-semibold text-slate-800">
                                          {contributor.merged !== undefined
                                            ? `${contributor.merged} merged ${
                                                contributor.merged === 1
                                                  ? "contribution"
                                                  : "contributions"
                                              }`
                                            : "Featured community member"}
                                        </p>
                                        <p className="mt-1 text-xs text-slate-400">
                                          {contributor.merged !== undefined
                                            ? "Recognized contribution count for WikiClub Tech."
                                            : "Featured here for community participation. A verified contribution count can be added later."}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            </td>
                          </motion.tr>
                        )}
                      </AnimatePresence>
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* ===================================================
              PAGINATION
          =================================================== */}
          <div className="flex flex-col gap-4 border-t bg-[#F8FAFC] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {contributorPage * contributorsPerPage + 1}–
                {Math.min(
                  (contributorPage + 1) * contributorsPerPage,
                  contributors.length
                )}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-700">
                {contributors.length}
              </span>{" "}
              featured contributors
            </p>

            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setContributorPage((page) => Math.max(0, page - 1));
                  setSelected(null);
                }}
                disabled={contributorPage === 0}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-[#045797]/30 hover:text-[#045797] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>

              <span className="rounded-lg bg-[#045797] px-4 py-2 text-sm font-bold text-white">
                {contributorPage + 1} / {totalContributorPages}
              </span>

              <button
                type="button"
                onClick={() => {
                  setContributorPage((page) =>
                    Math.min(totalContributorPages - 1, page + 1)
                  );
                  setSelected(null);
                }}
                disabled={contributorPage === totalContributorPages - 1}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-[#045797]/30 hover:text-[#045797] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* =====================================================
            JOIN WIKICLUB CTA
        ===================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 flex flex-col gap-4 rounded-2xl border bg-white p-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-start gap-4">
            <div className="achievement-icon shrink-0">
              <GitPullRequest className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">
                Want to become a contributor?
              </h3>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                Join WikiClub Tech and contribute to open knowledge,
                documentation and community projects.
              </p>
            </div>
          </div>

          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLSd0VADKBrLPGOxYuLbLyZXa9EAYjbWZ4HWctRnYecpn-XpLXw/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#045797] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#034576]"
          >
            Join WikiClub Tech
            <ExternalLink className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>
      
{/* =====================================================
    ACHIEVEMENT HIGHLIGHTS
===================================================== */}
<section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
  <div className="mb-10">
    <p className="achievement-label">WikiClub Tech Community</p>
    <h2 className="achievement-section-title mt-2 text-3xl font-bold">
      Achievement Highlights
    </h2>
  </div>

  {highlightSections.map((section) => (
  <LazyHighlightSlideshow key={section.id} section={section} />
  ))}
</section>
    </main>
  );
}
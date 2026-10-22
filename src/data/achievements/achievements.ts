export interface Achievement {
  id: string;
  category: string;
  title: string;
  description: string;
  date: string;
  image?: string;
  link?: string;
  featured: boolean;
}

export const achievements: Achievement[] = [
  {
    id: "uhack-4-runner-up",
    category: "Hackathon Achievements",
    title: "UHack 4.0 — First Runner-Up",
    description:
      "The WikiClub Tech UU team secured first runner-up at UHack 4.0. Team members Ayush Tiwari, Anshuman Rai, Saumya Agrahari and Unnati Kesarwani received the title and a ₹30,000 prize.",
    date: "2026-03-18",
    image: "/achievements/uhack-4.jpg",
    link: "https://lnkd.in/p/g68nPqBE",
    featured: true,
  },
  {
    id: "clip2commons-contributions",
    category: "Open Source Achievements",
    title: "Clip2Commons — Open-Source Contributions",
    description:
      "Kavaljeet Singh contributed improvements to Clip2Commons, including accessibility enhancements, keyboard navigation, ARIA support and upload workflow improvements.",
    date: "2026-07-01",
    image: "/achievements/open-source-contributions.png",
    link: "https://www.linkedin.com/posts/kavaljeet-singh-dev_opensource-wikimedia-mediawiki-activity-7482391525847601152-CZNr",
    featured: true,
  },
  {
    id: "genai-hackathon-2025",
    category: "Hackathon Achievements",
    title: "GenAI Hackathon 2025 — First Position",
    description:
      "Team Nimbus, featuring Kavaljeet Singh, secured first position in a Generative AI hackathon at UIT Prayagraj. The achievement recognized teamwork, rapid prototyping and practical AI innovation.",
    date: "2025-01-01",
    link: "https://in.linkedin.com/in/kavaljeet-singh-dev",
    featured: true,
  },
  {
    id: "aicct-intrusion-detection",
    category: "Research Achievements",
    title: "Research Presentation — Intrusion Detection",
    description:
      "Anshuman Rai and Unnati Kesarwani presented their research on a stacked learning approach for intrusion detection at the International Conference on Advances in Intelligent Computing and Communication Technology (AICCT-2025), United University, Prayagraj.",
    date: "2025-01-01",
    image: "/achievements/anshuman-unnati-research.jpg",
    link: "https://lnkd.in/p/gr6gVk_3",
    featured: true,
  },
  {
    id: "aicct-intelligent-computing",
    category: "Research Achievements",
    title: "International Conference Research Presentation",
    description:
      "Ayush Tiwari and Saumya Agrahari presented their research at AICCT-2025, contributing to academic discussions around intelligent computing and communication technologies.",
    date: "2025-01-01",
    image: "/achievements/ayush-saumya-research.jpg",
    link: "https://lnkd.in/p/gCUqqBDR",
    featured: true,
  },
  {
    id: "wikipedia-25-celebration",
    category: "Community Achievements",
    title: "Wikipedia's 25th Birthday Celebration",
    description:
      "WikiClub Tech UU celebrated Wikipedia's 25th birthday with a community session highlighting Wikimedia projects, open knowledge and Mohd Shadab's Wikimedia journey.",
    date: "2026-04-12",
    image: "/achievements/wikipedia-25.png",
    link: "https://diff.wikimedia.org/2026/04/12/wikipedia-25th-birthday-celebration-at-wikiclub-tech-united-university/",
    featured: true,
  },
  {
    id: "wikiconference-india-2026",
    category: "International Community",
    title: "WikiConference India 2026",
    description:
      "WikiConference India 2026 brought together Wikimedians for sessions, workshops and community collaboration in Kochi, Kerala. This listing highlights the event and its relevance to the open-knowledge community.",
    date: "2026-09-04",
    image: "/achievements/wikiconference-india-2026.jpg",
    link: "https://meta.wikimedia.org/wiki/WikiConference_India_2026",
    featured: true,
  },
  {
    id: "tedx-united-university",
    category: "University Events",
    title: "TEDx United University",
    description:
      "A highlight of student participation in technical setup and social media coordination at TEDx United University.",
    date: "2026-01-01",
    image: "/achievements/tedx-united-university.jpg",
    featured: false,
  },
  {
    id: "shadab-global-achievement",
    category: "International Community",
    title: "Mohd Shadab — Wikimedia Community Achievement",
    description:
      "A community highlight recognizing Mohd Shadab's Wikimedia-related activities and participation in open-knowledge initiatives.",
    date: "2026-01-01",
    image: "/achievements/shadab-global-achievement.jpg",
    link: "https://lnkd.in/p/gXwMk4MC",
    featured: true,
  },
];
type Founder = {
  id: string;
  name: string;
  role: string;
  roleType: 'founder';
  image: string;
  email?: string;
  linkedin?: string;
  github?: string;
  metaWiki?: string;
  bio?: string;
};

const image = (file: string) => `https://raw.githubusercontent.com/mishraji0519/wikiclubtech-nitin/main/WikiClub-Tech-UU-main/WikiClub-Tech-UU-main/public/team/${encodeURIComponent(file)}`;

export const founders: Founder[] = [
  {
    id: 'founder-anshuman-rai',
    name: 'Anshuman Rai',
    role: 'Founder',
    roleType: 'founder',
    image: image('Anshuman Rai Founder.jpg'),
    email: 'anshuman.wikiclubtech@gmail.com',
    linkedin: 'https://www.linkedin.com/in/anshuman-rai-0433032b9',
    github: 'https://github.com/Anshuman-Rai-1004',
    metaWiki: 'https://meta.wikimedia.org/wiki/User:Anshuman.rai.1004',
    bio: 'Anshuman Rai is the Founder of WikiClub Tech UU, driven by a vision to build a collaborative technology community around open knowledge, open-source, and innovation. He has been actively involved in organizing technical events, hackathons, workshops, and community initiatives that help students learn, build, and contribute beyond the classroom.\n\nThrough WikiClub Tech-UU, he focuses on creating opportunities for students to explore technology, collaborate on real-world projects, and contribute to the wider open-knowledge ecosystem.',
  },
  {
    id: 'founder-mohd-shadab',
    name: 'Mohd Shadab',
    role: 'Founder',
    roleType: 'founder',
    image: image('SHADAB-FOUNDER.jpeg'),
    email: 'shadab.wikiclubtech@gmail.com',
    linkedin: 'https://www.linkedin.com/in/mohdshadabdev',
    github: 'https://github.com/mohdshadabdev',
    metaWiki: 'https://meta.wikimedia.org/wiki/WikiClub_Tech_UU/Members',
    bio: 'Mohd Shadab is a Founder of WikiClub Tech UU and played a pivotal role in turning the initial idea of a technology-focused community into a growing student movement. From the very beginning, he contributed to shaping the club’s vision, building its foundation, and creating an environment where students could come together to learn, collaborate, and explore technology.\n\nHis early leadership, ideas, and commitment were instrumental in establishing the identity and direction of WikiClub Tech UU. Alongside the founding team, he helped lay the groundwork for a community built around technology, open knowledge, collaboration, and student-driven innovation.',
  },
];

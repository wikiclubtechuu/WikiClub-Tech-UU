import type { TeamMember } from './teamMembers';

export type CurrentTeamMember = TeamMember & { team?: string; metaWiki?: string; website?: string };

const image = (file: string) => `https://raw.githubusercontent.com/mishraji0519/wikiclubtech-nitin/main/WikiClub-Tech-UU-main/WikiClub-Tech-UU-main/public/team/${encodeURIComponent(file)}`;

export const currentRoster: CurrentTeamMember[] = [
  { id: 'current-anshuman-envoy', name: 'Anshuman Rai', role: 'Envoy', roleType: 'envoy', image: image('ANSHUMAN-ENVOY.jpeg'), email: 'anshuman.wikiclubtech@gmail.com', linkedin: 'https://www.linkedin.com/in/anshuman-rai-0433032b9', github: 'https://github.com/Anshuman-Rai-1004' },
  { id: 'current-sohrab-envoy', name: 'Syed Sohrab Haider Rizvi', role: 'Co-Envoy', roleType: 'envoy', image: image('SOHRAB-COENVOY.jpeg'), email: 'sohrab.wikiclubtech@gmail.com', linkedin: 'https://www.linkedin.com/in/syed-sohrab-haider-rizvi', github: 'https://github.com/StormZShr' },
  { id: 'current-sanskar-mentor', name: 'Sanskar Dubey', role: 'Mentor', roleType: 'mentor', image: image('SANSKAR.jpeg'), email: 'sanskardubeydev@gmail.com' },
  { id: 'current-zaid-mentor', name: 'Zaid Sayyad', role: 'Mentor', roleType: 'mentor', image: image('ZAID.jpeg'), metaWiki: 'https://meta.wikimedia.org/wiki/User:Zaidusyy', website: 'https://zaidsayyed.in/' },
  { id: 'current-shadab-mentor', name: 'Mohd Shadab', role: 'Mentor', roleType: 'mentor', image: image('Mohd Shadab.jpg'), email: 'shadab.wikiclubtech@gmail.com', linkedin: 'https://www.linkedin.com/in/mohdshadabdev', github: 'https://github.com/mohdshadabdev' },
  { id: 'current-vratej-lead', name: 'Vratej Dwivedi', role: 'Team Lead', roleType: 'lead', team: 'Graphics & Design', image: image('VRATEJ.jpeg'), email: 'vratej.wikiclubtech@gmail.com', linkedin: 'https://www.linkedin.com/in/vratej-dwivedi-740957286/', github: 'https://github.com/VRATEJDWIVEDI/' },
  { id: 'current-amit-lead', name: 'Amit Yadav', role: 'Team Lead', roleType: 'lead', team: 'Social Media & Promotion', image: image('AMIT.jpeg'), email: 'amit.wikiclubtech@gmail.com', linkedin: 'https://www.linkedin.com/in/amit-yadav-3388bb3a7?utm_source=share_via&utm_content=profile&utm_medium=member_android', github: 'https://github.com/AMIT3949P' },
  { id: 'current-khushi-lead', name: 'Khushi Verma', role: 'Team Lead', roleType: 'lead', team: 'Outreach & Documentation', image: image('KHUSHI.jpeg'), email: 'khushi.wikiclubtech@gmail.com', linkedin: 'https://www.linkedin.com/in/khushi-verma-818023322', github: 'https://github.com/khushi0753' },
  { id: 'current-manvi-lead', name: 'Manvi Keshari', role: 'Team Lead', roleType: 'lead', team: 'Management & Operation', image: image('MANVI.jpeg'), email: 'manvi.wikiclubtech@gmail.com', linkedin: 'https://www.linkedin.com/in/manvi-keshari-287aa2321', github: 'https://github.com/manvikeshari' },
  { id: 'current-aditya-lead', name: 'Aditya Gaurav', role: 'Team Lead', roleType: 'lead', team: 'Development', image: image('Aditya Gaurav.jpg'), email: 'aditya.wikiclubtech@gmail.com', linkedin: 'https://www.linkedin.com/in/aditya-gaurav-973aa7321?utm_source=share_via&utm_content=profile&utm_medium=member_android', github: 'https://github.com/Aditya-CS-ui' },
];

'use client';

// WikiClub Tech-UU 2026–27 Teams page — redeploy marker for the current production page.
import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Archive, ArrowDown, ArrowUp, Crown, Users } from 'lucide-react';
import TeamMemberCard from '@/components/team/TeamMemberCard';
import { previousTeamMembers } from '@/data/team_data/previousTeamMembers';
import { currentRoster, type CurrentTeamMember } from '@/data/team_data/currentRoster';
import { currentVolunteerDemoMembers } from '@/data/team_data/currentVolunteerDemoMembers';
import { founders } from '@/data/team_data/founders';
import { facultyCoordinator } from '@/data/team_data/facultyCoordinator';
import { Button } from '@/components/ui/button';
import WikimediaBackground from '@/components/team/WikimediaBackground';
import CursorGlow from '@/components/team/CursorGlow';
import Image from 'next/image';

type RoleFilter = 'mentor' | 'envoy' | 'lead' | 'volunteer';
const roleLabels: Record<RoleFilter, string> = { mentor: 'Mentors', envoy: 'Campus Envoys', lead: 'Team Leads', volunteer: 'Volunteers' };
const sectionOrder: RoleFilter[] = ['envoy', 'mentor', 'lead', 'volunteer'];
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';
const assetPath = (src: string) => src.startsWith('http') || src.startsWith('data:') || src.startsWith(BASE_PATH) ? src : `${BASE_PATH}${src.startsWith('/') ? src : `/${src}`}`;

const groupMembersByRole = (members: CurrentTeamMember[]): Record<RoleFilter, CurrentTeamMember[]> => members.reduce((acc, member) => {
  const role = member.roleType.trim().toLowerCase() as RoleFilter;
  if (role in acc) acc[role].push(member);
  return acc;
}, { mentor: [], envoy: [], lead: [], volunteer: [] } as Record<RoleFilter, CurrentTeamMember[]>);

const TeamSections = ({ members, idPrefix }: { members: CurrentTeamMember[]; idPrefix: string }) => {
  const membersByRole = useMemo(() => groupMembersByRole(members), [members]);
  return <div className='space-y-20'>
    {sectionOrder.map((role) => {
      const roleMembers = membersByRole[role];
      if (!roleMembers?.length) return null;
      const gridClass = role === 'mentor'
        ? 'mx-auto max-w-5xl space-y-6'
        : role === 'envoy'
        ? 'mx-auto flex max-w-7xl flex-wrap justify-center gap-8'
        : role === 'volunteer'
        ? 'mx-auto grid max-w-7xl grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5'
        : 'grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3';
      return <section key={`${idPrefix}-${role}`} id={`${idPrefix}-${role}`} className='scroll-mt-32'>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className='mb-10 text-center'><h2 className='text-3xl font-bold md:text-4xl'>{roleLabels[role]}</h2></motion.div>
        <motion.div className={gridClass}>{roleMembers.map((member, index) => <motion.div key={member.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.32) }} className={role === 'envoy' ? 'w-full md:w-[calc((100%-2rem)/2)] lg:w-[calc((100%-4rem)/3)]' : 'w-full'}><TeamMemberCard {...member} /></motion.div>)}</motion.div>
      </section>;
    })}
  </div>;
};

const RoleNavigation = ({ members, activeSection, onNavigate, idPrefix }: { members: CurrentTeamMember[]; activeSection: RoleFilter; onNavigate: (id: string) => void; idPrefix: string }) => {
  const membersByRole = useMemo(() => groupMembersByRole(members), [members]);
  return <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className='sticky top-16 z-40 mb-10 flex flex-wrap justify-center gap-3 rounded-2xl border border-white/30 bg-white/80 px-4 py-4 shadow-lg backdrop-blur-xl'>
    {sectionOrder.map((role, index) => membersByRole[role]?.length ? <motion.div key={role} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.08 }}><Button onClick={() => onNavigate(`${idPrefix}-${role}`)} variant={activeSection === role ? 'default' : 'outline'} className={`rounded-full px-6 py-3 text-sm font-bold transition-all duration-300 ${activeSection === role ? 'scale-105 border-0 bg-gradient-to-r from-blue-400 to-cyan-500 text-white shadow-xl' : 'bg-white hover:scale-105 hover:text-primary'}`}>{roleLabels[role]}</Button></motion.div> : null)}
  </motion.div>;
};

const FoundersSection = () => {
  const projectCoordinator = previousTeamMembers.find((member) => member.roleType === 'coordinator');
  return <section aria-labelledby='founders-heading'>
    <div className='mx-auto mb-10 max-w-3xl text-center'><div className='mb-4 inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-bold text-amber-700 ring-1 ring-amber-200'><Crown className='h-4 w-4' />The Beginning</div><h2 id='founders-heading' className='text-4xl font-black tracking-tight md:text-5xl'>Our Founders</h2><p className='mt-4 text-muted-foreground'>The people who started the journey and helped shape the vision of Wikiclub Tech-UU.</p></div>
    <div className='mx-auto max-w-5xl space-y-6'>{founders.map((member) => <TeamMemberCard key={member.id} {...member} />)}</div>
    {projectCoordinator && <><div className='mx-auto my-10 max-w-5xl text-center'><h3 className='text-4xl font-black tracking-tight text-slate-900 md:text-5xl'>Wikiclub Tech India (Part of OKI-IIITH)</h3></div><div className='mx-auto max-w-5xl'><TeamMemberCard {...projectCoordinator} /></div></>}
  </section>;
};

const FacultyCoordinatorSection = () => <section aria-labelledby='faculty-coordinator-heading'><div className='mx-auto mb-10 max-w-3xl text-center'><h2 id='faculty-coordinator-heading' className='text-4xl font-black tracking-tight md:text-5xl'>Our Faculty Coordinator</h2></div><div className='mx-auto max-w-5xl'><TeamMemberCard {...facultyCoordinator} /></div></section>;

const Index = () => {
  const [showPreviousTeam, setShowPreviousTeam] = useState(false);
  const displayedCurrentMembers = [...currentRoster, ...currentVolunteerDemoMembers];
  const displayedPreviousMembers = previousTeamMembers.filter((member) => member.roleType !== 'coordinator').map((member) => member.name === 'Anshuman Rai' && member.role === 'Co-Envoy' ? { ...member, github: 'https://github.com/Anshuman-Rai-1004' } : member) as CurrentTeamMember[];
  const manviIndex = displayedPreviousMembers.findIndex((member) => member.name === 'Manvi Keshari');
  const khushiIndex = displayedPreviousMembers.findIndex((member) => member.name === 'Khushi Verma');
  const rishangIndex = displayedPreviousMembers.findIndex((member) => member.name === 'Rishang mishra');
  if (manviIndex !== -1 && khushiIndex === manviIndex + 1 && rishangIndex !== -1) [displayedPreviousMembers[khushiIndex], displayedPreviousMembers[rishangIndex]] = [displayedPreviousMembers[rishangIndex], displayedPreviousMembers[khushiIndex]];
  const [activeSection, setActiveSection] = useState<RoleFilter>('envoy');
  const [activePreviousSection, setActivePreviousSection] = useState<RoleFilter>('envoy');
  const scrollToSection = (id: string) => { const element = document.getElementById(id); if (!element) return; const offsetPosition = element.getBoundingClientRect().top + window.scrollY - 120; window.scrollTo({ top: offsetPosition, behavior: 'smooth' }); };
  useEffect(() => { const sections = sectionOrder.map((role) => document.getElementById(`current-${role}`)).filter((section): section is HTMLElement => Boolean(section)); if (!sections.length) return; const observer = new IntersectionObserver((entries) => { const visibleSection = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]; if (visibleSection) setActiveSection(visibleSection.target.id.replace('current-', '') as RoleFilter); }, { rootMargin: '-140px 0px -55% 0px', threshold: [0.1, 0.25, 0.5] }); sections.forEach((section) => observer.observe(section)); return () => observer.disconnect(); }, [displayedCurrentMembers.length]);
  useEffect(() => { if (!showPreviousTeam) return; const sections = sectionOrder.map((role) => document.getElementById(`previous-${role}`)).filter((section): section is HTMLElement => Boolean(section)); if (!sections.length) return; const observer = new IntersectionObserver((entries) => { const visibleSection = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]; if (visibleSection) setActivePreviousSection(visibleSection.target.id.replace('previous-', '') as RoleFilter); }, { rootMargin: '-140px 0px -55% 0px', threshold: [0.1, 0.25, 0.5] }); sections.forEach((section) => observer.observe(section)); return () => observer.disconnect(); }, [showPreviousTeam]);
  const handlePreviousTeamToggle = () => { const next = !showPreviousTeam; setShowPreviousTeam(next); if (next) window.setTimeout(() => document.getElementById('previous-team')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80); };
  return <div className='min-h-screen bg-background'>
    <CursorGlow />
    <header className='relative overflow-hidden bg-[#fbfdfc] px-6 py-24 [mask-image:linear-gradient(to_bottom,black_75%,transparent)]'><WikimediaBackground /><div aria-hidden='true' className='pointer-events-none absolute inset-0 z-[1] opacity-90' style={{ backgroundImage: 'linear-gradient(rgba(100, 116, 139, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(100, 116, 139, 0.12) 1px, transparent 1px)', backgroundSize: '52px 52px', backgroundPosition: 'center center' }} /><div className='container relative z-10 mx-auto max-w-6xl'><motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className='text-center'><div className='mb-8 flex justify-center'><Image src={assetPath('/wikiclubtechuu.png')} width={1058} height={262} alt='WikiClub Tech-UU' className='h-auto w-[min(34rem,92vw)] object-contain' priority /></div><p className='mb-4 text-sm font-bold uppercase tracking-[0.28em] text-black/70'>Wikiclub Tech-UU • 2026–27</p><h1 className='mb-6 text-5xl font-black tracking-tight text-black drop-shadow-lg md:text-7xl'>Our Mission, Our People</h1><p className='mx-auto max-w-3xl text-xl font-medium text-black/95 drop-shadow md:text-2xl'>More than a team page — discover the people, story, and community behind Wikiclub Tech-UU.</p></motion.div></div></header>
    <main className='container mx-auto max-w-7xl space-y-20 px-6 py-16'>
      <FoundersSection /><FacultyCoordinatorSection />
      <section aria-labelledby='current-team-heading' className='scroll-mt-32'>
        <div className='mx-auto mb-10 max-w-3xl text-center'><div className='mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-bold text-primary'><Users className='h-4 w-4' />Current Team • 2026–27</div><h2 id='current-team-heading' className='whitespace-nowrap text-[clamp(1.15rem,4.5vw,3rem)] font-black tracking-tight'>Team Wikiclub Tech-UU 2026-27</h2><p className='mt-4 text-muted-foreground'>Meet the current 2026–27 team and the people leading each team.</p></div>
        <RoleNavigation members={displayedCurrentMembers} activeSection={activeSection} onNavigate={scrollToSection} idPrefix='current' /><TeamSections members={displayedCurrentMembers} idPrefix='current' />
      </section>
      <section aria-labelledby='previous-team-heading' className='border-t border-border/60 pt-16'>
        <div className='mx-auto max-w-3xl text-center'><div className='mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-4 py-2 text-sm font-bold text-muted-foreground'><Archive className='h-4 w-4' />Team Archive</div><h2 id='previous-team-heading' className='text-3xl font-black tracking-tight md:text-4xl'>Wikiclub Tech-UU 2025-26</h2><p className='mt-4 text-muted-foreground'>Explore the people who contributed to Wikiclub Tech-UU before the current team.</p><Button type='button' onClick={handlePreviousTeamToggle} aria-expanded={showPreviousTeam} aria-controls='previous-team' className='mt-7 rounded-full px-7 py-3 font-bold shadow-lg'>{showPreviousTeam ? <><span>Hide Wikiclub Tech-UU 2025-26</span><ArrowUp className='ml-2 h-4 w-4' /></> : <><span>View Wikiclub Tech-UU 2025-26</span><ArrowDown className='ml-2 h-4 w-4' /></>}</Button></div>
        <AnimatePresence initial={false}>{showPreviousTeam && <motion.div id='previous-team' initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.45, ease: 'easeInOut' }} className='-mt-4 overflow-hidden'><RoleNavigation members={displayedPreviousMembers} activeSection={activePreviousSection} onNavigate={scrollToSection} idPrefix='previous' /><div className='pt-20'><TeamSections members={displayedPreviousMembers} idPrefix='previous' /></div></motion.div>}</AnimatePresence>
      </section>
    </main>
  </div>;
};

export default Index;

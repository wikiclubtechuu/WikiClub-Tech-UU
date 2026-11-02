'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TeamMemberCard from '@/components/team/TeamMemberCard';
import { facultyCoordinator } from '@/data/team_data/facultyCoordinator';
import { currentRoster } from '@/data/team_data/currentRoster';
import { currentVolunteerDemoMembers } from '@/data/team_data/currentVolunteerDemoMembers';
import { Button } from '@/components/ui/button';
import WikimediaBackground from '@/components/team/WikimediaBackground';
import Image from 'next/image';

type RoleFilter = 'coordinator' | 'mentor' | 'envoy' | 'lead' | 'volunteer';

const roleLabels: Record<RoleFilter, string> = {
  coordinator: 'Project Coordinators',
  mentor: 'Mentors',
  envoy: 'Campus Envoys',
  lead: 'Team Leads',
  volunteer: 'Volunteers',
};

const sectionOrder: RoleFilter[] = [
  'coordinator',
  'mentor',
  'envoy',
  'lead',
  'volunteer',
];

const Index = () => {
  const [activeSection, setActiveSection] = useState<RoleFilter>(sectionOrder[0]);

  const membersByRole = {
    coordinator: [facultyCoordinator],
    mentor: currentRoster.filter((member) => member.roleType === 'mentor'),
    envoy: currentRoster.filter((member) => member.roleType === 'envoy'),
    lead: currentRoster.filter((member) => member.roleType === 'lead'),
    volunteer: currentVolunteerDemoMembers,
  };

  const handleNavClick = (id: RoleFilter) => {
    const element = document.getElementById(id);
    if (!element) return;

    const headerOffset = 120;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = sectionOrder.map((id) => document.getElementById(id));
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        if (section && scrollPosition >= section.offsetTop) {
          setActiveSection(section.id as RoleFilter);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='min-h-screen bg-background'>
      <header className='relative overflow-hidden py-24 px-6 [mask-image:linear-gradient(to_bottom,black_75%,transparent)]'>
        <div className='absolute inset-0 bg-gradient-to-br from-blue-100 via-green-100 to-red-100' />
        <WikimediaBackground />

        <div className='container mx-auto max-w-6xl relative z-10'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center'
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              className='inline-block mb-8'
            >
              <div className='relative w-24 h-24 rounded-3xl flex items-center justify-center'>
                <Image
                  src='/borderless_logo.svg'
                  width={80}
                  height={80}
                  alt='Wikimedia Logo'
                  className='absolute w-20 h-20 object-contain'
                />
                <motion.img
                  src='/logo.svg'
                  alt='Rotating Ring'
                  className='absolute w-20 h-20 object-contain'
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  style={{ maskImage: 'radial-gradient(circle, transparent 60%, black 61%)' }}
                />
              </div>
            </motion.div>

            <h1 className='text-5xl md:text-7xl font-black text-black mb-6 tracking-tight drop-shadow-lg'>
              Our Mission, Our People
            </h1>
            <p className='text-xl md:text-2xl text-black/95 max-w-3xl mx-auto font-medium drop-shadow'>
              Passionate contributors dedicated to making knowledge accessible to everyone
            </p>
          </motion.div>
        </div>
      </header>

      <main className='container mx-auto max-w-7xl px-6 py-16'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='flex flex-wrap justify-center gap-4 mb-20 sticky top-16 z-40 bg-white/10 backdrop-blur-lg border border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)] py-4 px-6 rounded-2xl'
        >
          {sectionOrder.map((filter, index) => (
            <motion.div
              key={filter}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                onClick={() => handleNavClick(filter)}
                variant={activeSection === filter ? 'default' : 'outline'}
                className={`px-8 py-3 rounded-full font-bold transition-all duration-300 text-base ${
                  activeSection === filter
                    ? 'bg-gradient-to-r from-blue-300 to-cyan-500 text-white shadow-xl scale-110 border-0'
                    : 'hover:text-primary hover:scale-105'
                }`}
              >
                {roleLabels[filter]}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        <div className='space-y-24'>
          {sectionOrder.map((role) => {
            const members = membersByRole[role];
            if (!members.length) return null;

            const gridClass =
              role === 'coordinator'
                ? 'mx-auto max-w-xl grid grid-cols-1 gap-8'
                : role === 'mentor'
                  ? 'mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8'
                  : role === 'envoy'
                    ? 'mx-auto max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-8 justify-items-center'
                    : role === 'lead'
                      ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                      : 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5';

            return (
              <section key={role} id={role}>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className='text-3xl md:text-4xl font-bold mb-12 text-center'
                >
                  {roleLabels[role]}
                </motion.h2>

                <motion.div className={gridClass}>
                  {members.map((member) => (
                    <TeamMemberCard key={member.id} {...member} />
                  ))}
                </motion.div>
              </section>
            );
          })}
        </div>

        <div className='mt-24 border-t border-slate-200 pt-10 text-center'>
          <h2 className='text-2xl md:text-3xl font-bold text-slate-900'>Wikiclubtech-UU 2025-26</h2>
        </div>
      </main>
    </div>
  );
};

export default Index;

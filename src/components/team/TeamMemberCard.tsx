import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Linkedin, Github, Globe } from 'lucide-react';

interface TeamMemberCardProps {
  name: string;
  role: string;
  roleType: 'founder' | 'coordinator' | 'envoy' | 'lead' | 'mentor' | 'volunteer';
  image: string;
  email?: string;
  linkedin?: string;
  github?: string;
  metaWiki?: string;
  website?: string;
  bio?: string;
  team?: string;
}

const uploadedPhotoOverrides: Record<string, string> = {
  'Mohd Shadab|Envoy': 'https://raw.githubusercontent.com/mishraji0519/wikiclubtech-nitin/main/WikiClub-Tech-UU-main/WikiClub-Tech-UU-main/public/team/SHADAB-PREVIOUS-YEAR-ENVOY.jpeg',
  'Shreshth Srivastava|Graphics & Design Team Lead': 'https://raw.githubusercontent.com/mishraji0519/wikiclubtech-nitin/main/WikiClub-Tech-UU-main/WikiClub-Tech-UU-main/public/team/SHRESHTH.jpeg',
  'Ankit Kumar Verma|Project Coordinator Wiki@IIIT Hyderabad': 'https://raw.githubusercontent.com/mishraji0519/wikiclubtech-nitin/main/WikiClub-Tech-UU-main/WikiClub-Tech-UU-main/public/team/Ankit Verma.jpeg',
};

const SocialLink = ({ href, icon: Icon, label }: { href: string; icon: React.ComponentType<{ className?: string }>; label: string }) => (
  <motion.a href={href} target='_blank' rel='noopener noreferrer' aria-label={label} whileHover={{ scale: 1.12, y: -2 }} className='flex h-9 w-9 items-center justify-center rounded-full bg-black/5 text-slate-900 transition-colors hover:bg-black/10' onClick={(e) => e.stopPropagation()}>
    <Icon className='h-4 w-4 text-slate-900' aria-hidden='true' />
  </motion.a>
);

const TeamMemberCard = ({ name, role, roleType, image, email, linkedin, github, metaWiki, website, bio, team }: TeamMemberCardProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const isFeatureCard = roleType === 'founder' || roleType === 'coordinator' || roleType === 'mentor';
  const isCompactCard = roleType === 'volunteer';
  const displayImage = uploadedPhotoOverrides[`${name}|${role}`] || image;

  const socialLinks = <div className='flex flex-wrap gap-2'>
    {email && <SocialLink href={`mailto:${email}`} icon={Mail} label='Email' />}
    {linkedin && <SocialLink href={linkedin} icon={Linkedin} label='LinkedIn' />}
    {github && <SocialLink href={github} icon={Github} label='GitHub' />}
    {metaWiki && <SocialLink href={metaWiki} icon={Globe} label='Meta-Wiki' />}
    {website && <SocialLink href={website} icon={Globe} label='Website' />}
  </div>;

  const roleBadge = <span className='rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700'>{team ? `${team} ${role}` : role}</span>;

  return <>
    <motion.article whileHover={{ y: -6, scale: 1.008 }} whileTap={{ scale: 0.995 }} transition={{ type: 'spring', stiffness: 280, damping: 22 }} className={`group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-[0_10px_35px_rgba(15,23,42,0.08)] ring-1 ring-black/5 ${isFeatureCard ? 'min-h-[28rem] rounded-3xl' : isCompactCard ? 'rounded-xl' : ''}`} onClick={() => setModalOpen(true)}>
      {isFeatureCard ? (
        <div className='flex min-h-[28rem] flex-col items-stretch sm:flex-row'>
          <div className='relative min-h-56 w-full shrink-0 overflow-hidden bg-gradient-to-br from-slate-200 to-slate-500 sm:min-h-64 sm:w-2/5'>
            {displayImage ? <Image src={displayImage} alt={name} width={600} height={600} unoptimized className='h-full min-h-56 w-full object-cover object-[center_28%] transition-transform duration-700 ease-out group-hover:scale-105 sm:min-h-64' /> : <div className='flex min-h-56 h-full items-center justify-center'><span className='text-6xl font-black text-slate-400'>{name.charAt(0)}</span></div>}
          </div>
          <div className='flex min-h-56 flex-1 flex-col justify-center p-6 sm:min-h-64 sm:p-8'>
            <div className='mb-3'>{roleBadge}</div>
            <h3 className='text-2xl font-black tracking-tight text-slate-900 sm:text-3xl'>{name}</h3>
            {bio && <p className='mt-3 line-clamp-3 max-w-2xl whitespace-pre-line text-sm leading-6 text-slate-600 sm:text-base'>{bio}</p>}
            <div className='mt-5'>{socialLinks}</div>
          </div>
        </div>
      ) : (
        <>
          <div className={`relative overflow-hidden bg-gradient-to-br from-slate-200 to-slate-500 ${isCompactCard ? 'aspect-[5/4]' : 'aspect-[4/3]'}`}>
            {displayImage ? <Image src={displayImage} alt={name} width={500} height={500} unoptimized className='h-full w-full object-cover object-[center_28%] transition-transform duration-700 ease-out group-hover:scale-105' /> : <div className='flex h-full items-center justify-center'><span className='text-6xl font-black text-slate-400'>{name.charAt(0)}</span></div>}
          </div>
          <div className={isCompactCard ? 'p-3' : 'p-5'}>
            <div>{roleBadge}</div>
            <h3 className={isCompactCard ? 'mt-2 text-base font-black text-slate-900' : 'mt-3 text-xl font-black text-slate-900'}>{name}</h3>
            {bio && <p className={isCompactCard ? 'mt-1 line-clamp-2 text-xs leading-5 text-slate-600' : 'mt-2 line-clamp-2 text-sm leading-6 text-slate-600'}>{bio}</p>}
            <div className={isCompactCard ? 'mt-3 border-t border-slate-200 pt-3' : 'mt-4 border-t border-slate-200 pt-4'}>{socialLinks}</div>
          </div>
        </>
      )}
    </motion.article>

    <AnimatePresence>
      {isModalOpen && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm' onClick={() => setModalOpen(false)}>
        <motion.div initial={{ opacity: 0, scale: 0.96, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 12 }} transition={{ type: 'spring', stiffness: 260, damping: 24 }} className='max-h-[90vh] w-full max-w-3xl overflow-auto rounded-3xl bg-white shadow-2xl' onClick={(e) => e.stopPropagation()}>
          <div className='flex flex-col sm:flex-row'>
            <div className='relative h-64 shrink-0 bg-slate-200 sm:h-auto sm:w-2/5'>{displayImage ? <Image src={displayImage} alt={name} width={600} height={600} unoptimized className='h-full min-h-64 w-full object-cover object-[center_28%]' /> : <div className='flex h-full min-h-64 items-center justify-center bg-gradient-to-br from-slate-200 to-slate-500'><span className='text-7xl font-black text-white/80'>{name.charAt(0)}</span></div>}</div>
            <div className='p-7 sm:p-9'><div>{roleBadge}</div><h2 className='mt-4 text-3xl font-black text-slate-900'>{name}</h2>{bio && <p className='mt-5 whitespace-pre-line leading-7 text-slate-600'>{bio}</p>}<div className='mt-7'>{socialLinks}</div></div>
          </div>
        </motion.div>
      </motion.div>}
    </AnimatePresence>
  </>;
};

export default TeamMemberCard;

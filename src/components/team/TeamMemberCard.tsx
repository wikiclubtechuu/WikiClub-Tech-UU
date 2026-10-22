import React, { useEffect, useRef, useState } from 'react';
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
  imagePosition?: string; // simple crop shift, e.g. 'center top' or '30% center'
  imageFocus?: string; // exact face point in the photo, e.g. '75% 47%' (x% y%) -> centered automatically
}

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';
const withBasePath = (src: string) => (src.startsWith('/') ? `${BASE_PATH}${src}` : src);

const parseFocus = (focus?: string) => {
  if (!focus) return null;
  const [x, y] = focus.trim().split(/\s+/).map((v) => parseFloat(v) / 100);
  if (Number.isNaN(x) || Number.isNaN(y)) return null;
  return { x, y };
};

// Centers the given focus point (the face) inside the frame, zooming in only as much as needed to avoid empty edges.
const FocusedPhoto = ({ src, alt, focus }: { src: string; alt: string; focus: { x: number; y: number } }) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<{ w: number; h: number } | null>(null);
  const [nat, setNat] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const update = () => setBox({ w: el.clientWidth, h: el.clientHeight });
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  let style: React.CSSProperties = { width: '100%', height: '100%', objectFit: 'cover' };
  if (box && nat && box.w > 0 && box.h > 0) {
    const cover = Math.max(box.w / nat.w, box.h / nat.h);
    const baseW = nat.w * cover;
    const baseH = nat.h * cover;
    const zoomX = box.w / 2 / (Math.max(Math.min(focus.x, 1 - focus.x), 0.01) * baseW);
    const zoomY = box.h / 2 / (Math.max(Math.min(focus.y, 1 - focus.y), 0.01) * baseH);
    const zoom = Math.max(1, zoomX, zoomY);
    const w = baseW * zoom;
    const h = baseH * zoom;
    const left = Math.min(0, Math.max(box.w - w, box.w / 2 - focus.x * w));
    const top = Math.min(0, Math.max(box.h - h, box.h / 2 - focus.y * h));
    style = { position: 'absolute', left, top, width: w, height: h, maxWidth: 'none' };
  }

  return (
    <div ref={boxRef} className='absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105'>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} style={style} onLoad={(e) => setNat({ w: e.currentTarget.naturalWidth, h: e.currentTarget.naturalHeight })} />
    </div>
  );
};

const SocialLink = ({ href, icon: Icon, label }: { href: string; icon: React.ComponentType<{ className?: string }>; label: string }) => (
  <motion.a href={href} target='_blank' rel='noopener noreferrer' aria-label={label} whileHover={{ scale: 1.12, y: -2 }} className='flex h-9 w-9 items-center justify-center rounded-full bg-black/5 text-slate-900 transition-colors hover:bg-black/10' onClick={(e) => e.stopPropagation()}>
    <Icon className='h-4 w-4 text-slate-900' aria-hidden='true' />
  </motion.a>
);

const TeamMemberCard = ({ name, role, roleType, image, email, linkedin, github, metaWiki, website, bio, team, imagePosition, imageFocus }: TeamMemberCardProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const isFeatureCard = roleType === 'founder' || roleType === 'coordinator' || roleType === 'mentor';
  const isCompactCard = roleType === 'volunteer';
  const displayImage = image ? withBasePath(image) : '';
  const focus = parseFocus(imageFocus);

  const renderPhoto = () => {
    if (!displayImage) {
      return (
        <div className='flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-200 to-slate-500'>
          <span className='text-6xl font-black text-white/80'>{name.charAt(0)}</span>
        </div>
      );
    }
    if (focus) return <FocusedPhoto src={displayImage} alt={name} focus={focus} />;
    return <Image src={displayImage} alt={name} fill sizes='(min-width: 640px) 18rem, 100vw' unoptimized style={{ objectPosition: imagePosition || 'center' }} className='object-cover transition-transform duration-700 ease-out group-hover:scale-105' />;
  };

  const socialLinks = <div className='flex flex-wrap gap-2'>
    {email && <SocialLink href={`mailto:${email}`} icon={Mail} label='Email' />}
    {linkedin && <SocialLink href={linkedin} icon={Linkedin} label='LinkedIn' />}
    {github && <SocialLink href={github} icon={Github} label='GitHub' />}
    {metaWiki && <SocialLink href={metaWiki} icon={Globe} label='Meta-Wiki' />}
    {website && <SocialLink href={website} icon={Globe} label='Website' />}
  </div>;

  const roleBadge = <span className='rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700'>{team ? `${team} ${role}` : role}</span>;

  return <>
    <motion.article whileHover={{ y: -6, scale: 1.008 }} whileTap={{ scale: 0.995 }} transition={{ type: 'spring', stiffness: 280, damping: 22 }} className={`group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-[0_10px_35px_rgba(15,23,42,0.08)] ring-1 ring-black/5 ${isFeatureCard ? 'rounded-3xl' : isCompactCard ? 'rounded-xl' : ''}`} onClick={() => setModalOpen(true)}>
      {isFeatureCard ? (
        <div className='flex flex-col sm:flex-row sm:items-stretch'>
          <div className='relative aspect-square w-full shrink-0 overflow-hidden bg-gradient-to-br from-slate-200 to-slate-500 sm:aspect-auto sm:min-h-[20rem] sm:w-72'>{renderPhoto()}</div>
          <div className='flex flex-1 flex-col justify-center p-6 sm:p-8'>
            <div className='mb-3'>{roleBadge}</div>
            <h3 className='text-2xl font-black tracking-tight text-slate-900 sm:text-3xl'>{name}</h3>
            {bio && <p className='mt-3 line-clamp-3 max-w-2xl whitespace-pre-line text-sm leading-6 text-slate-600 sm:text-base'>{bio}</p>}
            <div className='mt-5'>{socialLinks}</div>
          </div>
        </div>
      ) : (
        <>
          <div className='relative aspect-square w-full overflow-hidden bg-gradient-to-br from-slate-200 to-slate-500'>{renderPhoto()}</div>
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
          <div className='flex flex-col sm:flex-row sm:items-stretch'>
            <div className='relative aspect-square w-full shrink-0 overflow-hidden bg-slate-200 sm:aspect-auto sm:min-h-[22rem] sm:w-72'>{renderPhoto()}</div>
            <div className='p-7 sm:p-9'><div>{roleBadge}</div><h2 className='mt-4 text-3xl font-black text-slate-900'>{name}</h2>{bio && <p className='mt-5 whitespace-pre-line leading-7 text-slate-600'>{bio}</p>}<div className='mt-7'>{socialLinks}</div></div>
          </div>
        </motion.div>
      </motion.div>}
    </AnimatePresence>
  </>;
};

export default TeamMemberCard;
import React, { useState } from 'react';
import type { ComponentType } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Linkedin, Github } from 'lucide-react';
import Image from 'next/image';

interface TeamMemberCardProps {
  name: string;
  role: string;
  roleType: 'coordinator' | 'envoy' | 'lead' | 'mentor' | 'volunteer';
  image: string;
  email?: string;
  linkedin?: string;
  github?: string;
  bio?: string;
}
// Social Icon Component for reuse
type SocialLinkProps = {
  href: string;
  icon: ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  colorClass?: string;
};

const SocialLink: React.FC<SocialLinkProps> = ({
  href,
  icon: Icon,
  label,
  colorClass,
}) => (
  <motion.a
    href={href}
    target='_blank'
    rel='noopener noreferrer'
    aria-label={label}
    whileHover={{ scale: 1.2, y: -2 }}
    className={`p-2 rounded-full bg-white/20 hover:bg-white ${colorClass} transition-colors`}
    onClick={(e) => e.stopPropagation()}
  >
    <Icon className='w-4 h-4' />
  </motion.a>
);

const TeamMemberCard = ({
  name,
  role,
  roleType,
  image,
  email,
  linkedin,
  github,
  bio,
}: TeamMemberCardProps) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const isVolunteer = roleType === 'volunteer';

  // Card background styles based on role - UPDATED FOR VOLUNTEERS
  const cardStyle = isVolunteer
    ? 'bg-gradient-to-br from-green-300 to-emerald-200 border-green-400/50 text-gray-800' // Lighter green for volunteers
    : 'bg-gradient-to-br from-gray-300 to-stone-100 border-border/30 text-black'; // Original for others

  // Social links component for reuse in card and modal
  const socialLinks = (
    <div className='flex gap-2 items-center'>
      {email && (
        <SocialLink
          href={`mailto:${email}`}
          icon={Mail}
          label='Email'
          colorClass={isVolunteer ? 'hover:text-red-600' : 'hover:text-red-500'}
        />
      )}
      {linkedin && (
        <SocialLink
          href={linkedin}
          icon={Linkedin}
          label='LinkedIn'
          colorClass={
            isVolunteer ? 'hover:text-blue-700' : 'hover:text-blue-600'
          }
        />
      )}
      {github && (
        <SocialLink
          href={github}
          icon={Github}
          label='GitHub'
          colorClass={
            isVolunteer ? 'hover:text-gray-900' : 'hover:text-gray-800'
          }
        />
      )}
    </div>
  );
  return (
    <>
      {/* ===== Card Layout ===== */}
      <motion.div
        layoutId={`card-${name}`}
        whileHover={{ scale: 1.03, y: -5 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`relative rounded-xl ${cardStyle} border shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer ${
          isVolunteer ? 'text-gray-800' : ''
        }`}
        onClick={() => setModalOpen(true)}
      >
        {isVolunteer ? (
          // --- Volunteer Card Layout (More Vertical/Square) ---
          <div className='flex flex-col items-center p-4 text-center'>
            {image ? (
              <div className='relative w-20 h-20 mb-3'>
                <Image
                  src={image}
                  alt={name}
                  width={80}
                  height={80}
                  className='object-cover w-20 h-20 rounded-full border-2 border-white/70 shadow-md'
                />
              </div>
            ) : (
              <div className='w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-3'>
                <span className='text-2xl font-bold text-white/60 select-none'>
                  {name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <h3 className='text-lg font-bold'>{name}</h3>
            <p className='text-sm font-semibold opacity-90 mb-3'>{role}</p>
            {bio && (
              <p className='text-xs text-gray-700 line-clamp-2 mb-4'>{bio}</p>
            )}
            {socialLinks}
          </div>
        ) : (
          // --- Standard Card Layout (Vertical) ---
          <div className='flex flex-col'>
            <div className='relative overflow-hidden aspect-square'>
              {image ? (
                <img
                  src={image}
                  alt={name}
                  className='w-full h-full object-cover rounded-xl'
                />
              ) : (
                <div className='w-full h-full bg-muted flex items-center justify-center'>
                  <span className='text-5xl font-bold text-white/60 select-none'>
                    {name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent' />
            </div>{' '}
            <div className='p-5 flex flex-col flex-grow'>
              <p className='text-xs font-semibold bg-white/20 px-3 py-1 rounded-full self-start mb-3'>
                {role}
              </p>
              <h3 className='text-lg font-bold'>{name}</h3>
              {bio && (
                <p className='mt-2 text-sm text-black/90 line-clamp-2 flex-grow'>
                  {bio}
                </p>
              )}
              <div className='mt-4 pt-4 border-t border-black/90'>
                {socialLinks}
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* ===== Modal Pop-up ===== */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4'
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              layoutId={`card-${name}`}
              className={`relative max-w-lg w-full rounded-2xl ${cardStyle} border-2 shadow-2xl overflow-hidden ${
                isVolunteer ? 'text-gray-800' : 'text-black'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className='p-8'>
                <div className='flex flex-col sm:flex-row items-center gap-6'>
                  <motion.img
                    src={image}
                    alt={name}
                    className='w-28 h-28 object-cover rounded-full border-4 border-white/80 shadow-lg'
                  />
                  <div>
                    <h2 className='text-3xl font-bold'>{name}</h2>
                    <p className='text-md font-semibold text-current opacity-90'>
                      {role}
                    </p>
                  </div>
                </div>

                {bio && (
                  <p className='mt-6 text-base text-current opacity-90'>
                    {bio}
                  </p>
                )}

                <div className='mt-6 pt-6 border-t border-current/20 flex justify-between items-center'>
                  <p className='text-sm font-semibold'>Connect:</p>
                  {socialLinks}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TeamMemberCard;

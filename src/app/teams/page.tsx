"use client";

import React from "react";
import { motion } from "framer-motion";
import { Linkedin } from 'lucide-react';

import Image from "next/image";

const teamMembers = [
  {
    name: 'Ankit Kumar Verma',
    role: 'Project Coordinator Wiki@IIIT Hyderabad',
    description:
      'A multi-talented student leader and community builder with a passion for technology and organizing.',
    image: '/team/ankitsir.png',
    linkedin: 'https://www.linkedin.com/in/ankit-kumar-verma-081804160',
  },
  {
    name: 'Mohd. Shadab',
    role: 'Envoy',
    description:
      'Assists the president and manages internal affairs. Expert in Managing and directing Club.',
    image: '/wikiclubtechuu.png',
    linkedin: 'https://www.linkedin.com/in/mohd-shadab/',
  },
  {
    name: 'Charlie Brown',
    role: 'Treasurer',
    description:
      "Manages the club's finances and resources. Frontend developer with a keen eye for design.",
    image: '/wikiclubtechuu.png',
    linkedin: 'https://www.linkedin.com/in/charlie-brown/',
  },
  {
    name: 'Diana Miller',
    role: 'Events Coordinator',
    description:
      'Organizes workshops, talks, and other events. Full-stack developer and a great mentor.',
    image: '/wikiclubtechuu.png',
    linkedin: 'https://www.linkedin.com/in/diana-miller/',
  },
];

const TeamsPage = () => {
  return (
    <div className='bg-white min-h-screen'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className='text-4xl md:text-5xl font-extrabold text-gray-900 mb-12 text-center'>
            Our Team
          </h1>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className='bg-gray-50 p-8 rounded-lg shadow-md text-center'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  width={128}
                  height={128}
                  className='rounded-full mx-auto mb-4'
                />
                <h2 className='text-2xl font-bold text-gray-900 mb-2'>
                  {member.name}
                </h2>
                <p className='text-lg text-blue-600 font-semibold mb-4'>
                  {member.role}
                </p>
                <p className='text-gray-600 mb-4'>{member.description}</p>
                {member.linkedin && (
                  <motion.a
                    href={member.linkedin}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-300 group'
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Linkedin
                      size={20}
                      className='group-hover:text-blue-600 transition-colors duration-300'
                    />
                    <span className='text-sm font-medium'>LinkedIn</span>
                  </motion.a>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TeamsPage;

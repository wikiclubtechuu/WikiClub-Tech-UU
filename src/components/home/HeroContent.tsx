'use client'
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const HeroContent = () => {
  return (
    <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10'>
      <motion.div
        className='text-center relative'
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.div
          className='flex justify-center mb-6'
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className='flex justify-center mb-4'>
            <Image
              src='/logo.svg'
              alt='WikiClub Tech Logo'
              width={150}
              height={150}
              priority
            />
          </div>
        </motion.div>

        <motion.h1
          className='text-2xl md:text-7xl font-extrabold tracking-tight mb-6'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className='text-gray-600'>
            WikiClub Tech
          </span>
        </motion.h1>

        <motion.div
          className='flex justify-center mb-6'
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className='flex justify-center mb-4'>
            <Image
              src='/uniteduniversity.png'
              alt='United University Logo'
              width={150}
              height={150}
            />
          </div>
        </motion.div>

        <motion.p
          className='text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Welcome to the official page of the WikiClub Tech - United
          University.
          <br />
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.button
            className='inline-flex items-center justify-center px-10 py-5 font-bold text-white bg-gradient-to-r from-cyan-500 to-sky-500 rounded-full shadow-xl group relative overflow-hidden'
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <div className='absolute inset-0 bg-gradient-to-r from-sky-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
            <span className='relative flex items-center text-lg'>
              <motion.svg
                className='w-6 h-6 mr-3'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                whileHover={{ rotate: 90, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                />
              </motion.svg>
              Join Our Community
            </span>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroContent;

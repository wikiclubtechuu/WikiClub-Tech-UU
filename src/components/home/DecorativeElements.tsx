'use client'
import React from 'react';
import { motion } from 'framer-motion';

const DecorativeElements = () => {
  return (
    <>
      {/* Left Side Decorative Elements */}
      <div className='absolute left-0 top-0 w-1/2 h-full pointer-events-none md:opacity-100 opacity-10'>
        {/* Large Rotating Arc System */}
        <motion.div
          className='absolute top-20 left-20'
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        >
          <svg
            width='300'
            height='300'
            viewBox='0 0 300 300'
            className='opacity-20'
          >
            <circle
              cx='150'
              cy='150'
              r='140'
              fill='none'
              stroke='url(#gradient1)'
              strokeWidth='2'
              strokeDasharray='20 10'
            />
            <defs>
              <linearGradient
                id='gradient1'
                x1='0%'
                y1='0%'
                x2='100%'
                y2='100%'
              >
                <stop offset='0%' stopColor='#10B981' />
                <stop offset='100%' stopColor='#3B82F6' />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Medium Arc with Counter Rotation */}
        <motion.div
          className='absolute top-32 left-8'
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <svg
            width='200'
            height='200'
            viewBox='0 0 200 200'
            className='opacity-30'
          >
            <path
              d='M 40 100 A 60 60 0 1 1 160 100'
              fill='none'
              stroke='#10B981'
              strokeWidth='4'
              strokeLinecap='round'
            />
            <path
              d='M 160 100 A 60 60 0 1 1 40 100'
              fill='none'
              stroke='#059669'
              strokeWidth='2'
              strokeLinecap='round'
              strokeDasharray='15 5'
            />
          </svg>
        </motion.div>

        {/* Floating Geometric Cluster */}
        <motion.div
          className='absolute top-1/2 left-12'
          animate={{
            y: [0, -15, 0],
            x: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <svg width='120' height='100' viewBox='0 0 120 100'>
            <motion.circle
              cx='30'
              cy='30'
              r='20'
              fill='#10B981'
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.rect
              x='60'
              y='15'
              width='50'
              height='15'
              rx='7'
              fill='#3B82F6'
              animate={{ x: [60, 65, 60] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <motion.circle
              cx='35'
              cy='70'
              r='8'
              fill='#DC2626'
              animate={{ scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </svg>
        </motion.div>

        {/* Orbital System */}
        <motion.div
          className='absolute bottom-40 left-16'
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          <svg width='180' height='180' viewBox='0 0 180 180'>
            <circle
              cx='90'
              cy='90'
              r='70'
              fill='none'
              stroke='#E5E7EB'
              strokeWidth='1'
              strokeDasharray='5 5'
            />
            <motion.circle
              cx='160'
              cy='90'
              r='12'
              fill='#1E40AF'
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.circle
              cx='90'
              cy='20'
              r='8'
              fill='#059669'
              animate={{ scale: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            />
          </svg>
        </motion.div>
      </div>

      {/* Right Side Decorative Elements */}
      <div className='absolute right-0 top-0 w-1/2 h-full pointer-events-none md:opacity-100 opacity-10'>
        {/* Hexagonal Network System */}
        <motion.div
          className='absolute top-16 right-20'
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 120, 240, 360],
          }}
          transition={{
            scale: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 18, repeat: Infinity, ease: 'linear' },
          }}
        >
          <svg
            width='250'
            height='250'
            viewBox='0 0 250 250'
            className='opacity-30'
          >
            <motion.polygon
              points='125,30 200,80 200,170 125,220 50,170 50,80'
              fill='none'
              stroke='#3B82F6'
              strokeWidth='2'
              strokeDasharray='15 5'
              animate={{ strokeDasharray: ['15 5', '30 10', '15 5'] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.circle
              cx='125'
              cy='125'
              r='40'
              fill='none'
              stroke='url(#gradient2)'
              strokeWidth='3'
              animate={{ r: [40, 50, 40] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <motion.circle
              cx='125'
              cy='80'
              r='8'
              fill='#10B981'
              animate={{
                cx: [125, 170, 170, 125, 80, 80, 125],
                cy: [80, 80, 170, 170, 170, 80, 80],
              }}
              transition={{ duration: 12, repeat: Infinity }}
            />
            <defs>
              <radialGradient id='gradient2' cx='50%' cy='50%' r='50%'>
                <stop offset='0%' stopColor='transparent' />
                <stop offset='70%' stopColor='#DC2626' stopOpacity='0.3' />
                <stop offset='100%' stopColor='#3B82F6' stopOpacity='0.1' />
              </radialGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Rotating Plus with Orbiting Elements */}
        <motion.div
          className='absolute top-1/3 right-12'
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        >
          <svg width='100' height='100' viewBox='0 0 100 100'>
            <motion.path
              d='M50 10 L50 90 M10 50 L90 50'
              stroke='#DC2626'
              strokeWidth='6'
              strokeLinecap='round'
              animate={{ strokeWidth: [6, 8, 6] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.circle
              cx='80'
              cy='50'
              r='6'
              fill='#10B981'
              animate={{
                cx: [80, 50, 20, 50, 80],
                cy: [50, 20, 50, 80, 50],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
          </svg>
        </motion.div>

        {/* Dynamic Wave Pattern */}
        <motion.div
          className='absolute top-1/2 right-8'
          animate={{
            y: [0, -20, 0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <svg width='150' height='120' viewBox='0 0 150 120'>
            <motion.path
              d='M 20 60 Q 50 20 80 60 Q 110 100 140 60'
              fill='none'
              stroke='#B91C1C'
              strokeWidth='4'
              strokeLinecap='round'
              animate={{
                d: [
                  'M 20 60 Q 50 20 80 60 Q 110 100 140 60',
                  'M 20 60 Q 50 100 80 60 Q 110 20 140 60',
                  'M 20 60 Q 50 20 80 60 Q 110 100 140 60',
                ],
              }}
              transition={{ duration: 6, repeat: Infinity }}
            />
          </svg>
        </motion.div>

        {/* Interconnected Nodes */}
        <motion.div
          className='absolute bottom-32 right-16'
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <svg width='140' height='100' viewBox='0 0 140 100'>
            <motion.line
              x1='30'
              y1='30'
              x2='110'
              y2='70'
              stroke='#3B82F6'
              strokeWidth='2'
              animate={{ strokeDasharray: ['5 5', '10 0', '5 5'] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.circle
              cx='30'
              cy='30'
              r='15'
              fill='#10B981'
              animate={{ r: [15, 18, 15] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.rect
              x='95'
              y='55'
              width='30'
              height='30'
              rx='5'
              fill='#DC2626'
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 12, repeat: Infinity }}
              style={{ transformOrigin: '110px 70px' }}
            />
            <motion.circle
              cx='70'
              cy='20'
              r='8'
              fill='#2563EB'
              animate={{ cy: [20, 80, 20] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
          </svg>
        </motion.div>

        {/* Elegant Corner Accent */}
        <motion.div
          className='absolute bottom-16 right-8'
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        >
          <svg
            width='80'
            height='80'
            viewBox='0 0 80 80'
            className='opacity-40'
          >
            <circle
              cx='40'
              cy='40'
              r='35'
              fill='none'
              stroke='#2563EB'
              strokeWidth='2'
              strokeDasharray='10 5'
            />
            <motion.circle
              cx='40'
              cy='5'
              r='5'
              fill='#1D4ED8'
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </svg>
        </motion.div>
      </div>
    </>
  );
};

export default DecorativeElements;

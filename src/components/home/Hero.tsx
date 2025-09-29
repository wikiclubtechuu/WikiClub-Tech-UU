'use client'
import React from 'react';
import DecorativeElements from './DecorativeElements';
import HeroContent from './HeroContent';

const Hero = () => {
  return (
    <section className='relative text-gray-900 bg-gradient-to-br from-gray-50 to-white overflow-hidden'>
      <DecorativeElements />
      <HeroContent />
      {/* Subtle Background Overlay */}
      <div className='absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-green-50/20 pointer-events-none' />
    </section>
  );
};

export default Hero;

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Images from '@/data/gallery/images';
const images = Images;


const Gallery = () => {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className='bg-gray-50 py-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-12'>
          Gallery
        </h2>
        <div className='grid grid-cols-3 md:grid-cols-5 gap-4'>
          {images.map((image, index) => (
            <motion.div
              key={index}
              className={`relative rounded-lg overflow-hidden shadow-md ${
                index === 0 || index === 5 ? 'md:col-span-2' : ''
              } ${index === 2 || index === 6 ? 'md:row-span-2' : ''}`}
              onMouseEnter={() => setHoveredImage(image.src)}
              onMouseLeave={() => setHoveredImage(null)}
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={800}
                height={800}
                className='w-full h-full object-cover'
              />
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {hoveredImage && (
          <motion.div
            className='fixed top-0 left-0 z-50 pointer-events-none'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: cursorPosition.x + 20,
              y: cursorPosition.y - 150,
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          >
            <Image
              src={hoveredImage}
              alt='Hovered image'
              width={300}
              height={200}
              className='rounded-lg shadow-xl'
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;

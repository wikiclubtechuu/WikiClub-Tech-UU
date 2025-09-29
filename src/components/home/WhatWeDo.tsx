"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const WhatWeDo = () => {
  const activities = [
    {
      title: 'Open Source Contribution',
      description:
        'We actively contribute to open-source projects, believing in the power of community-driven development.',
      image: "https://picsum.photos/seed/WhatWeDo1/400/300",
    },
    {
      title: 'Community Events',
      description:
        'We organize workshops, hackathons, and meetups to foster a vibrant and collaborative learning environment.',
      image: "https://picsum.photos/seed/WhatWeDo2/400/300",
    },
    {
      title: 'Tech Workshops',
      description:
        'We host workshops on various technologies, from web development to machine learning, to help members learn new skills.',
      image: "https://picsum.photos/seed/WhatWeDo3/400/300",
    },
    {
      title: 'Industry Collaboration & Mentorship',
      description:
        'We are proudly affiliated with GDG Prayagraj and receive mentorship from experts at IIIT Hyderabad, connecting our members with the broader tech community.',
      image: "https://picsum.photos/seed/WhatWeDo4/400/300",
    },
    {
      title: 'Project Incubator',
      description:
        'We provide a platform for members to pitch, build, and launch their own tech projects with mentorship and support.',
      image: "https://picsum.photos/seed/WhatWeDo5/400/300",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-12">
            What We Do
          </h2>
          {/* Desktop Timeline */}
          <div className="hidden md:block relative">
            <div className="border-l-2 border-blue-600 absolute h-full left-1/2 transform -translate-x-1/2"></div>
            {activities.map((activity, index) => (
              <motion.div
                key={index}
                className={`mb-8 flex justify-between items-center w-full ${
                  index % 2 === 0 ? 'flex-row-reverse' : ''
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-5/12">
                  <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden">
                    <div className="md:flex items-stretch">
                      <div className="md:w-1/3">
                        <Image
                          className="h-full w-full object-cover"
                          src={activity.image}
                          alt={activity.title}
                          width={400}
                          height={400}
                        />
                      </div>
                      <div className="md:w-2/3 p-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{activity.title}</h3>
                        <p className="text-gray-600">{activity.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="z-10 flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full">
                  <span className="text-white font-bold">{index + 1}</span>
                </div>
                <div className="w-5/12"></div>
              </motion.div>
            ))}
          </div>
          {/* Mobile Layout */}
          <div className="md:hidden">
            {activities.map((activity, index) => (
              <motion.div
                key={index}
                className="mb-8"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden">
                  <Image
                    className="h-48 w-full object-cover"
                    src={activity.image}
                    alt={activity.title}
                    width={400}
                    height={300}
                  />
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{activity.title}</h3>
                    <p className="text-gray-600">{activity.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeDo;
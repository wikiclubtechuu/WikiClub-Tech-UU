"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaExternalLinkAlt } from "react-icons/fa";

const WhoWeAre = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              About The Community
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              What do we do and provide?
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 max-w-lg mx-auto">
              <Image src="/vectorart.png" alt="Collaboration Illustration" width={500} height={500} className="w-full h-auto" />
            </div>
            <div className="md:w-1/2 md:pl-12">
              <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">
                What is WikiClub Tech?
              </h3>
              <p className="text-lg md:text-xl text-gray-600">
                WikiClub Tech at United University is a student-driven community that empowers learners to explore open-source technologies and contribute to the Wikimedia ecosystem.
              </p>
              <motion.a
                href="/about"
                className="inline-flex items-center mt-6 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg"
                whileHover={{ scale: 1.05, y: -5, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Learn More
                <FaExternalLinkAlt className="ml-2" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhoWeAre;

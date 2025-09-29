"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";

const NewsletterForm = () => {
  return (
    <motion.div
      className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-6 flex flex-col items-start lg:col-span-2"
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="mb-4">
        <FaEnvelope className="text-white text-4xl" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">Subscribe to our Newsletter</h3>
      <p className="text-gray-400 mb-4 flex-grow">Get the latest news and updates from our community.</p>
      <form className="w-full">
        <div className="flex items-center space-x-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 border-2 border-gray-700 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-base"
          />
          <motion.button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            Subscribe
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default NewsletterForm;
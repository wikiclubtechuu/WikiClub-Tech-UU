"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";
import { toast } from "sonner";


const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      setTimeout(() => {
        toast.success("Thanks for subscribing! You'll hear from us soon.");
        setEmail("");
        setSubmitting(false);
      }, 2000);
    } catch (error) {
      console.error("Error submitting newsletter form:", error);
      toast.error("Something went wrong. Please try again later.");
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-6 flex flex-col items-start lg:col-span-2"
      whileHover={{ y: -3, scale: 1.009 }}
      transition={{ type: "spring", stiffness: 300 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="mb-4">
        <FaEnvelope className="text-white text-4xl" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">Subscribe to our Newsletter</h3>
      <p className="text-gray-400 mb-4 flex-grow">Get the latest news and updates from our community.</p>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex items-center space-x-2">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 border-2 border-gray-700 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-base"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={submitting}
          />
          <motion.button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            disabled={submitting}
          >
            {submitting ? "Subscribing..." : "Subscribe"}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default NewsletterForm;
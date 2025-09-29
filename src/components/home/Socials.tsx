"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import NewsletterForm from "./NewsletterForm";

const Socials = () => {
  const socialLinks = [
    {
      icon: <FaInstagram className="text-pink-600 text-4xl" />,
      title: "Follow on Instagram",
      description: "Follow and discover developer resources, community events, and inspirational stories.",
      linkText: "Learn more",
      href: "#",
    },
    {
      icon: <FaLinkedin className="text-blue-700 text-4xl" />,
      title: "Join on LinkedIn",
      description: "Join a community of creative developers and learn how to use the latest in technology.",
      linkText: "Learn more",
      href: "#",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="bg-gray-100 rounded-2xl p-8 md:p-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8">
            Follow Us on Social Media
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {socialLinks.map((social, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg p-6 flex flex-col items-start"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="mb-4">{social.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{social.title}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{social.description}</p>
                <Link href={social.href} className="text-blue-600 font-semibold hover:underline">
                  {social.linkText}
                </Link>
              </motion.div>
            ))}
            <NewsletterForm />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Socials;
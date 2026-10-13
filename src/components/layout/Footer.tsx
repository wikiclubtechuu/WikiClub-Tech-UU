"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaLink,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0b2540] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Footer */}
        <div className="py-14 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

            {/* Brand / Logo */}
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-3"
              >
                <Image
                  src="/logo.svg"
                  alt="WikiClub Tech Logo"
                  width={48}
                  height={48}
                  className="h-12 w-12 object-contain"
                />

                <div>
                  <h2 className="text-xl font-bold text-white">
                    WikiClub Tech
                  </h2>

                  <p className="text-sm text-slate-300">
                    United University
                  </p>
                </div>
              </Link>

              <p className="mt-5 max-w-xs text-sm leading-6 text-slate-300">
                A community of tech enthusiasts and learners building,
                learning, and contributing together.
              </p>

              {/* Login */}
              <Link
                href="#"
                className="
                  inline-flex
                  items-center
                  justify-center
                  mt-5
                  rounded-xl
                  bg-[#1689d8]
                  px-5
                  py-3
                  text-sm
                  font-bold
                  text-white
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#0f78c0]
                  hover:shadow-md
                "
              >
                Login
              </Link>
            </div>

            {/* Quick Links */}
            <div>
              <h3
                className="
                  text-sm
                  font-bold
                  uppercase
                  tracking-wider
                  text-white
                "
              >
                Quick Links
              </h3>

              <div className="mt-5 flex flex-col gap-3">

                <Link
                  href="/"
                  className="text-sm font-medium text-slate-300 transition-colors hover:text-cyan-300"
                >
                  Home
                </Link>

                <Link
                  href="/blogs"
                  className="text-sm font-medium text-slate-300 transition-colors hover:text-cyan-300"
                >
                  Blogs
                </Link>

                <Link
                  href="/teams"
                  className="text-sm font-medium text-slate-300 transition-colors hover:text-cyan-300"
                >
                  Teams
                </Link>

                <Link
                  href="/members"
                  className="text-sm font-medium text-slate-300 transition-colors hover:text-cyan-300"
                >
                  Members
                </Link>

                <Link
                  href="/validator"
                  className="text-sm font-medium text-slate-300 transition-colors hover:text-cyan-300"
                >Certify</Link>

                <Link
                  href="/contributors"
                  className="text-sm font-medium text-slate-300 transition-colors hover:text-cyan-300"
                >
                  Achievements
                </Link>

              </div>
            </div>

            {/* Resources */}
            <div>
              <h3
                className="
                  text-sm
                  font-bold
                  uppercase
                  tracking-wider
                  text-white
                "
              >
                Resources
              </h3>

              <div className="mt-5 flex flex-col gap-3">

                <Link
                  href="/pyq"
                  className="text-sm font-medium text-slate-300 transition-colors hover:text-cyan-300"
                >
                  PYQ
                </Link>

                <Link
                  href="/programs"
                  className="text-sm font-medium text-slate-300 transition-colors hover:text-cyan-300"
                >
                  Programs
                </Link>

                <Link
                  href="/events"
                  className="text-sm font-medium text-slate-300 transition-colors hover:text-cyan-300"
                >
                  Events
                </Link>

              </div>
            </div>

            {/* Contact & Follow */}
            <div>
              <h3
                className="
                  text-sm
                  font-bold
                  uppercase
                  tracking-wider
                  text-white
                "
              >
                Contact & Follow
              </h3>

              {/* Email */}
              <a
                href="mailto:wikiclub@united.edu.in"
                className="
                  mt-5
                  inline-flex
                  items-center
                  gap-3
                  text-sm
                  font-medium
                  text-slate-300
                  transition-colors
                  hover:text-cyan-300
                "
              >
                <FaEnvelope />
                <span>wikiclub@united.edu.in</span>
              </a>

              {/* Social Icons */}
              <div className="flex items-center gap-3 mt-6">

                <a
                  href="https://www.instagram.com/wikiclubtech.uu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-[#163a5c]
                    text-slate-300
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-pink-600
                    hover:text-white
                  "
                >
                  <FaInstagram className="text-lg" />
                </a>

                <a
                  href="https://www.linkedin.com/company/wikiclubtechuu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-[#163a5c]
                    text-slate-300
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-blue-600
                    hover:text-white
                  "
                >
                  <FaLinkedin className="text-lg" />
                </a>

                <a
                  href="https://linktr.ee/wikiclubtech"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Linktree"
                  title="Linktree"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#163a5c] text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-600 hover:text-white"
                >
                  <FaLink className="text-lg" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-[#234563] py-6">
          <div className="flex items-center justify-center">
            <p className="text-sm text-slate-400 text-center">
              © 2026 WikiClub Tech. All rights reserved.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
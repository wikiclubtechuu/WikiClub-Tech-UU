import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/logo.svg" alt="WikiClub Tech Logo" width={48} height={48} className="h-12 w-auto" />
              <div>
                <h1 className="text-xl font-bold text-white">WikiClub Tech</h1>
                <p className="text-sm text-gray-400">United University</p>
              </div>
            </Link>
            <p className="text-gray-400">
              A community of tech enthusiasts and learners.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-gray-300">
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/teams" className="hover:text-gray-300">
                  Teams
                </Link>
              </li>
              <li>
                <Link href="/join-us" className="hover:text-gray-300">
                  Join Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/privacy-policy" className="hover:text-gray-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-gray-300">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Contact & Follow</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="mailto:wikiclub@united.edu.in"
                  className="hover:text-gray-300"
                >
                  wikiclub@united.edu.in
                </a>
              </li>
            </ul>
            <div className="flex mt-4 space-x-4">
              <a
                href="https://www.instagram.com/wikiclub.tech.uu/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transform hover:scale-110 transition-transform duration-200"
              >
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/company/wikiclub-tech-uu/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transform hover:scale-110 transition-transform duration-200"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} WikiClub Tech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
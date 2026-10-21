"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Teams",
    href: "/teams",
  },
  {
    label: "Blogs",
    href: "/blogs",
  },
  {
    label: "Achievements",
    href: "/achievements",
  },
  {
    label: "Certify",
    href: "/validator",
  },
  {
    label: "Help Desk",
    href: "/pyq",
  },
];

const menuItems = [
  {
    label: "Programs",
    href: "/programs",
  },
  {
    label: "Join Us",
    href: "https://forms.gle/FGoyrEHC1CuP9hPSA",
    external: true,
  },
];

const Navbar = () => {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile navigation when the user scrolls.
  useEffect(() => {
    const handleScroll = () => {
      setMobileOpen(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const closeMenus = () => {
    setMobileOpen(false);
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <Link
            href="/"
            onClick={closeMenus}
            className="group flex items-center shrink-0"
          >
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 20,
              }}
            >
              <Image
                src="/WikiClub_New.png"
                alt="WikiClub Tech Logo"
                width={240}
                height={80}
                priority
                className="h-14 sm:h-16 w-auto object-contain"
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeMenus}
                  className={`group relative rounded-lg px-3.5 py-2 text-[14px] font-semibold transition-all duration-200 ease-out ${
                    active
                      ? "bg-sky-50 text-sky-600"
                      : "text-gray-600 hover:bg-sky-50 hover:text-sky-600 hover:-translate-y-[1px]"
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>

                  {active && (
                    <motion.span
                      layoutId="active-nav-indicator"
                      className="absolute left-1/2 bottom-0 h-[3px] w-5 -translate-x-1/2 rounded-full bg-sky-500"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}

            {/* Desktop Overflow Menu */}
            <div className="ml-2 flex items-center gap-1">
              <div className="relative">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => setMenuOpen((prev) => !prev)}
                  className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 ${
                    menuOpen
                      ? "bg-sky-50 text-sky-600"
                      : "text-gray-600 hover:bg-sky-50 hover:text-sky-600"
                  }`}
                  aria-label="Open menu"
                  aria-expanded={menuOpen}
                >
                  <AnimatePresence mode="wait">
                    {menuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FaTimes className="text-base" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FaBars className="text-base" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>

                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 top-full mt-2 w-52 overflow-hidden rounded-xl border border-gray-100 bg-white p-1.5 shadow-xl shadow-gray-200/50"
                    >
                      {menuItems.map((item) => {
                        const itemClass = `block rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                          isActive(item.href)
                            ? "bg-sky-50 text-sky-600"
                            : "text-gray-600 hover:bg-sky-50 hover:text-sky-600 hover:translate-x-1"
                        }`;

                        if (item.external) {
                          return (
                            <a
                              key={item.label}
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={closeMenus}
                              className={itemClass}
                            >
                              {item.label}
                            </a>
                          );
                        }

                        return (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={closeMenus}
                            className={itemClass}
                          >
                            {item.label}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition-all duration-200 hover:bg-sky-50 hover:text-sky-600"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaTimes />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaBars />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden border-t border-gray-100"
            >
              <div className="py-4">
                {navItems.map((item) => {
                  const active = isActive(item.href);

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={closeMenus}
                      className={`relative block rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                        active
                          ? "bg-sky-50 text-sky-600 translate-x-1"
                          : "text-gray-600 hover:bg-sky-50 hover:text-sky-600 hover:translate-x-1"
                      }`}
                    >
                      {item.label}

                      {active && (
                        <motion.span
                          layoutId="mobile-active-indicator"
                          className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-sky-500"
                        />
                      )}
                    </Link>
                  );
                })}

                <div className="mt-2 border-t border-gray-100 pt-2">
                  {menuItems.map((item) => {
                    const itemClass =
                      "block rounded-lg px-4 py-3 text-sm font-semibold text-gray-600 transition-all duration-200 hover:bg-sky-50 hover:text-sky-600 hover:translate-x-1";

                    if (item.external) {
                      return (
                        <a
                          key={item.label}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={closeMenus}
                          className={itemClass}
                        >
                          {item.label}
                        </a>
                      );
                    }

                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={closeMenus}
                        className={itemClass}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;




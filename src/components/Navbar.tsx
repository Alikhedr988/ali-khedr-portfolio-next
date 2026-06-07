"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "00 Films",   href: "#films",   id: "films"   },
  { label: "01 About",   href: "#about",   id: "about"   },
  { label: "02 Work",    href: "#work",     id: "work"    },
  { label: "03 Press",   href: "#press",    id: "press"   },
  { label: "04 Contact", href: "#contact",  id: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  // Blur bar on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    const observers = navLinks.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-45% 0px -45% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "border-b border-cream/5 bg-ink/90 backdrop-blur-md" : ""
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-12">
        {/* Wordmark */}
        <a
          href="#"
          className="font-display italic text-cream text-lg tracking-tight transition-colors duration-200 hover:text-ochre"
        >
          Ali AlSheikh
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map(({ label, href, id }) => (
            <li key={id} className="relative">
              <a
                href={href}
                className={`font-mono text-xs tracking-widest transition-colors duration-200 ${
                  active === id ? "text-ochre" : "text-cream-2 hover:text-ochre"
                }`}
              >
                {label}
              </a>
              {/* Active underline */}
              {active === id && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-px bg-ochre"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col gap-[6px] p-2 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className="block h-px w-6 bg-cream"
          />
          <motion.span
            animate={{ opacity: menuOpen ? 0 : 1 }}
            transition={{ duration: 0.15 }}
            className="block h-px w-6 bg-cream"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className="block h-px w-6 bg-cream"
          />
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
            className="overflow-hidden border-b border-cream/5 bg-ink-2 md:hidden"
          >
            <ul className="flex flex-col gap-6 px-6 py-8">
              {navLinks.map(({ label, href, id }, i) => (
                <motion.li
                  key={id}
                  initial={{ x: -16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.07, duration: 0.3 }}
                >
                  <a
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={`font-mono text-sm tracking-widest transition-colors ${
                      active === id ? "text-ochre" : "text-cream hover:text-ochre"
                    }`}
                  >
                    {label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

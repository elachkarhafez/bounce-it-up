'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';

const navLinks = [
  { label: 'Open Play', href: '#open-play' },
  { label: 'Party Packages', href: '#party-packages' },
  { label: 'Memberships', href: '#memberships' },
  { label: 'Gallery', href: '#gallery' },
  {
    label: 'More',
    children: [
      { label: 'About Us', href: '#about' },
      { label: 'Menu / Concessions', href: '#contact' },
      { label: 'Fundraisers', href: '#contact' },
      { label: 'FAQs', href: '#faq' },
      { label: 'Safety Rules', href: '#faq' },
    ],
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href) => {
    setMobileOpen(false);
    setDropdown(null);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass-strong shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 group"
            >
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-orange to-brand-amber rounded-xl rotate-6 group-hover:rotate-12 transition-transform duration-300" />
                <div className="relative flex items-center justify-center w-10 h-10 text-2xl font-black text-white">
                  B
                </div>
              </div>
              <div className="text-left leading-tight">
                <div className="font-black text-xl text-white font-display tracking-tight">
                  Bounce <span className="gradient-text">It Up</span>
                </div>
                <div className="text-[10px] text-white/50 tracking-widest uppercase">
                  Livonia, MI
                </div>
              </div>
            </motion.button>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label} className="relative">
                    <button
                      onMouseEnter={() => setDropdown(link.label)}
                      onMouseLeave={() => setDropdown(null)}
                      className="flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold text-white/80 hover:text-white hover:bg-white/5 transition-all duration-200"
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${dropdown === link.label ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <AnimatePresence>
                      {dropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                          onMouseEnter={() => setDropdown(link.label)}
                          onMouseLeave={() => setDropdown(null)}
                          className="absolute top-full left-0 mt-2 w-52 glass-strong rounded-2xl overflow-hidden shadow-card py-2"
                        >
                          {link.children.map((child) => (
                            <button
                              key={child.label}
                              onClick={() => handleNav(child.href)}
                              className="block w-full text-left px-5 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                            >
                              {child.label}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <button
                    key={link.label}
                    onClick={() => handleNav(link.href)}
                    className="px-4 py-2 rounded-full text-sm font-semibold text-white/80 hover:text-white hover:bg-white/5 transition-all duration-200"
                  >
                    {link.label}
                  </button>
                )
              )}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:7345222000"
                className="flex items-center gap-2 text-sm text-white/70 hover:text-brand-orange transition-colors"
              >
                <Phone size={14} />
                <span className="font-semibold">(734) 522-2000</span>
              </a>
              <motion.button
                onClick={() => handleNav('#booking')}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="btn-primary text-sm py-2.5 px-5"
              >
                <span>Book a Party</span>
              </motion.button>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <div className="absolute right-0 top-0 bottom-0 w-72 glass-strong flex flex-col pt-24 pb-8 px-6 overflow-y-auto">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label} className="mb-1">
                    <div className="px-3 py-2 text-xs uppercase tracking-widest text-white/40 font-semibold mt-4 mb-1">
                      {link.label}
                    </div>
                    {link.children.map((child) => (
                      <button
                        key={child.label}
                        onClick={() => handleNav(child.href)}
                        className="block w-full text-left px-3 py-2.5 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-colors text-sm font-semibold"
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <button
                    key={link.label}
                    onClick={() => handleNav(link.href)}
                    className="px-3 py-3 rounded-xl text-base font-semibold text-white/80 hover:text-white hover:bg-white/5 transition-colors text-left"
                  >
                    {link.label}
                  </button>
                )
              )}
              <div className="mt-auto pt-6 flex flex-col gap-3">
                <a
                  href="tel:7345222000"
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-brand-orange"
                >
                  <Phone size={14} />
                  (734) 522-2000
                </a>
                <button
                  onClick={() => handleNav('#booking')}
                  className="btn-primary justify-center"
                >
                  <span>Book a Party</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

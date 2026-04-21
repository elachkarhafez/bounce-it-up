'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Open Play', href: '/open-play' },
  { label: 'Party Packages', href: '/party-packages' },
  { label: 'Memberships', href: '/memberships' },
  { label: 'Waiver', href: '/waiver' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
  { label: 'Careers', href: '/careers' },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50">
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="glass-strong backdrop-blur-lg border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-orange to-brand-amber flex items-center justify-center font-black text-white">
                B
              </div>
              <div className="hidden sm:block">
                <div className="font-black text-lg text-slate-800">
                  Bounce <span className="gradient-text">It Up</span>
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA + Mobile Menu */}
            <div className="flex items-center gap-3">
              <a
                href="tel:7345222000"
                className="hidden sm:flex items-center gap-2 text-sm font-semibold text-brand-orange hover:text-brand-amber transition-colors"
              >
                <Phone size={16} />
                <span>(734) 522-2000</span>
              </a>
              <Link
                href="/party-packages"
                className="hidden md:block btn-primary py-2 px-4 text-sm"
              >
                Book Party
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-xl hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden glass-strong border-b border-white/10"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors font-semibold"
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-white/5 pt-2 mt-2">
                <a
                  href="tel:7345222000"
                  className="block px-4 py-2.5 rounded-lg text-brand-orange hover:bg-white/5 transition-colors font-semibold"
                >
                  📞 (734) 522-2000
                </a>
                <Link
                  href="/party-packages"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 rounded-lg btn-primary text-center text-sm mt-2"
                >
                  Book Party
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

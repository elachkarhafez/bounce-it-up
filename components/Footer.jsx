'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Heart } from 'lucide-react';

const quickLinks = [
  { label: 'Open Play', href: '/open-play' },
  { label: 'Party Packages', href: '/party-packages' },
  { label: 'Memberships', href: '/memberships' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'FAQ', href: '/faq' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 mt-16 sm:mt-24 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-brand-orange/5 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-orange to-brand-amber flex items-center justify-center font-black text-white">
                B
              </div>
              <div>
                <div className="font-black text-slate-800 font-display">
                  Bounce <span className="gradient-text">It Up</span>
                </div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest">
                  Livonia, MI
                </div>
              </div>
            </Link>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              The cleanest bounce houses and indoor fun center in Michigan.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {[
                { icon: <Facebook size={16} />, href: 'https://facebook.com', label: 'Facebook' },
                { icon: <Instagram size={16} />, href: 'https://instagram.com', label: 'Instagram' },
                { icon: <Twitter size={16} />, href: 'https://twitter.com', label: 'Twitter' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl glass flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-xs text-slate-600 uppercase tracking-widest font-semibold mb-5">
              Explore
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-xs text-slate-600 uppercase tracking-widest font-semibold mb-5">
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:7345222000" className="flex items-center gap-3 group text-sm">
                  <Phone size={14} className="text-brand-orange group-hover:text-brand-amber transition-colors" />
                  <span className="text-slate-600 group-hover:text-slate-900 transition-colors">
                    (734) 522-2000
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:office@bounceituplivonia.com"
                  className="flex items-start gap-3 group text-sm"
                >
                  <Mail size={14} className="text-brand-cyan group-hover:text-blue-400 transition-colors mt-0.5 shrink-0" />
                  <span className="text-slate-600 group-hover:text-slate-900 transition-colors break-all">
                    office@bounceituplivonia.com
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=30276+Plymouth+Rd,+Livonia,+MI+48150"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 group text-sm"
                >
                  <MapPin size={14} className="text-brand-purple group-hover:text-pink-400 transition-colors mt-0.5 shrink-0" />
                  <span className="text-slate-600 group-hover:text-slate-900 transition-colors">
                    30276 Plymouth Rd<br />Livonia, MI 48150
                  </span>
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} Bounce It Up Party. All rights reserved.</span>
          <span className="flex items-center gap-1">
            Made with <Heart size={12} className="text-brand-orange fill-brand-orange" /> in Livonia, MI
          </span>
        </div>
      </div>
    </footer>
  );
}

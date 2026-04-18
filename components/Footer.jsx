'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Heart } from 'lucide-react';

const links = {
  Explore: [
    { label: 'Open Play', href: '#open-play' },
    { label: 'Party Packages', href: '#party-packages' },
    { label: 'Memberships', href: '#memberships' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Fundraisers', href: '#contact' },
  ],
  Info: [
    { label: 'About Us', href: '#about' },
    { label: 'FAQs', href: '#faq' },
    { label: 'Safety Rules', href: '#faq' },
    { label: 'Sign Waiver', href: '#contact' },
    { label: 'Book a Party', href: '#booking' },
  ],
};

export default function Footer() {
  const handleNav = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/5">
      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-brand-orange/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="py-16 grid grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-orange to-brand-amber flex items-center justify-center font-black text-white text-xl">
                  B
                </div>
                <div>
                  <div className="font-black text-xl text-white font-display">
                    Bounce <span className="gradient-text">It Up</span>
                  </div>
                  <div className="text-[10px] text-white/30 uppercase tracking-widest">Livonia, Michigan</div>
                </div>
              </div>
              <p className="text-white/40 text-sm leading-relaxed">
                Livonia&apos;s premier indoor fun center — bounce houses, parties & memberships for kids of all ages.
              </p>
            </motion.div>

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
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl glass flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([title, items], i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i + 1) * 0.1 }}
            >
              <h4 className="text-xs text-white/40 uppercase tracking-widest font-semibold mb-5">{title}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={() => handleNav(item.href)}
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-xs text-white/40 uppercase tracking-widest font-semibold mb-5">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:7345222000" className="flex items-start gap-3 group">
                  <Phone size={14} className="text-brand-orange mt-0.5 shrink-0" />
                  <span className="text-sm text-white/50 group-hover:text-white transition-colors">(734) 522-2000</span>
                </a>
              </li>
              <li>
                <a href="mailto:office@bounceituplivonia.com" className="flex items-start gap-3 group">
                  <Mail size={14} className="text-brand-cyan mt-0.5 shrink-0" />
                  <span className="text-sm text-white/50 group-hover:text-white transition-colors break-all">
                    office@bounceituplivonia.com
                  </span>
                </a>
              </li>
              <li>
                <a href="https://maps.google.com/?q=30276+Plymouth+Rd,+Livonia,+MI+48150" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group">
                  <MapPin size={14} className="text-brand-purple mt-0.5 shrink-0" />
                  <span className="text-sm text-white/50 group-hover:text-white transition-colors">
                    30276 Plymouth Rd<br />Livonia, MI 48150
                  </span>
                </a>
              </li>
            </ul>

            {/* Hours mini */}
            <div className="mt-6 glass rounded-xl p-4">
              <div className="text-xs text-white/40 uppercase tracking-wide mb-2">Quick Hours</div>
              <div className="space-y-1 text-xs text-white/50">
                <div className="flex justify-between"><span>Mon–Thu</span><span>12–8 PM</span></div>
                <div className="flex justify-between"><span>Friday</span><span>12–9 PM</span></div>
                <div className="flex justify-between"><span>Saturday</span><span>10–9 PM</span></div>
                <div className="flex justify-between"><span>Sunday</span><span>10–8 PM</span></div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/25">
          <span>© {new Date().getFullYear()} Bounce It Up Party. All rights reserved.</span>
          <span className="flex items-center gap-1">
            Made with <Heart size={12} className="text-brand-orange fill-brand-orange" /> in Livonia, MI
          </span>
        </div>
      </div>
    </footer>
  );
}

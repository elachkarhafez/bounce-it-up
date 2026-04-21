'use client';

import { motion } from 'framer-motion';
import { Clock, CheckCircle2, Phone, MapPin, AlertCircle } from 'lucide-react';

const hours = [
  { day: 'Monday – Thursday', time: '12:00 PM – 8:00 PM' },
  { day: 'Friday', time: '12:00 PM – 9:00 PM' },
  { day: 'Saturday', time: '10:00 AM – 9:00 PM' },
  { day: 'Sunday', time: '10:00 AM – 8:00 PM' },
];

const includes = [
  'Tri-level playground adventure',
  'Bounce houses with slides',
  'Basketball hoops & trampolines',
  'Obstacle courses',
  'Toddler zone (ages 3 & under)',
  'All-day play, no time limit!',
];

const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

function isOpen() {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const mins = h * 60 + m;
  const day = now.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
  if (day === 1 || day === 2 || day === 3 || day === 4) return mins >= 720 && mins < 1200; // M-Th 12-8
  if (day === 5) return mins >= 720 && mins < 1260; // Fri 12-9
  if (day === 6) return mins >= 600 && mins < 1260; // Sat 10-9
  if (day === 0) return mins >= 600 && mins < 1200; // Sun 10-8
  return false;
}

export default function OpenPlay() {
  const open = isOpen();

  return (
    <section id="open-play" className="relative section-pad overflow-hidden">
      {/* Glowing blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-cyan/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 text-xs uppercase tracking-widest font-semibold text-brand-cyan"
          >
            <Zap size={12} />
            Walk-Ins Welcome
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white mb-4"
          >
            Open <span className="gradient-text-cyan">Play</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-lg mx-auto text-white/55 text-lg"
          >
            Just show up and jump in. All-day access to everything in the facility.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Hours Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass rounded-3xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-brand-cyan/20 flex items-center justify-center">
                <Clock size={20} className="text-brand-cyan" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-white">Hours of Operation</h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`w-2 h-2 rounded-full ${open ? 'bg-brand-green animate-pulse' : 'bg-red-400'}`} />
                  <span className={`text-xs font-semibold ${open ? 'text-brand-green' : 'text-red-400'}`}>
                    {open ? 'Open Now' : 'Currently Closed'}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {hours.map((h) => {
                const isToday = h.day.includes(today) || (h.day.includes('–') && isCurrentDayRange(h.day, today));
                return (
                  <div
                    key={h.day}
                    className={`flex justify-between items-center px-4 py-3 rounded-xl transition-colors ${
                      isToday ? 'bg-brand-orange/15 border border-brand-orange/30' : 'hover:bg-white/3'
                    }`}
                  >
                    <span className={`text-sm font-semibold ${isToday ? 'text-brand-orange' : 'text-white/70'}`}>
                      {h.day}
                    </span>
                    <span className={`text-sm font-bold ${isToday ? 'text-brand-amber' : 'text-white/90'}`}>
                      {h.time}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex items-start gap-3 bg-white/3 rounded-xl p-4">
              <AlertCircle size={16} className="text-brand-yellow mt-0.5 shrink-0" />
              <p className="text-xs text-white/50 leading-relaxed">
                No outside food or drinks during open play. Concessions available on-site.
              </p>
            </div>
          </motion.div>

          {/* What's Included */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Included features */}
            <div className="glass rounded-3xl p-8">
              <h3 className="font-display font-bold text-xl text-white mb-6">
                What&apos;s Included
              </h3>
              <div className="space-y-3">
                {includes.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 size={18} className="text-brand-green shrink-0" />
                    <span className="text-white/80 text-sm font-semibold">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Pricing note + CTA */}
            <div className="gradient-border rounded-3xl p-8 text-center">
              <div className="text-5xl font-black gradient-text font-display mb-1">Call Us</div>
              <div className="text-white/50 text-sm mb-5">For current pricing &amp; group rates</div>
              <a
                href="tel:7345222000"
                className="btn-primary w-full justify-center"
              >
                <Phone size={18} />
                <span>(734) 522-2000</span>
              </a>
              <div className="mt-4 flex items-center justify-center gap-2 text-white/40 text-xs">
                <MapPin size={12} />
                <span>30276 Plymouth Rd, Livonia MI 48150</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function isCurrentDayRange(rangeStr, today) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const parts = rangeStr.split('–').map((s) => s.trim());
  if (parts.length !== 2) return false;
  const startIdx = days.indexOf(parts[0]);
  const endIdx = days.indexOf(parts[1]);
  const todayIdx = days.indexOf(today);
  if (startIdx === -1 || endIdx === -1 || todayIdx === -1) return false;
  return todayIdx >= startIdx && todayIdx <= endIdx;
}

function Zap({ size, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { CheckCircle2, Clock, Phone } from 'lucide-react';

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

export default function OpenPlayPage() {
  return (
    <div className="min-h-screen pt-32 sm:pt-40 pb-20">
      {/* Hero */}
      <section className="relative py-12 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-cyan/10 blur-[100px]" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-block glass px-4 py-2 rounded-full mb-4 text-xs uppercase tracking-widest font-semibold">
              Walk-Ins Welcome
            </div>
            <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-white mb-4">
              Open <span className="gradient-text-cyan">Play</span>
            </h1>
            <p className="max-w-2xl mx-auto text-white/60 text-lg">
              Just show up and jump in. All-day access to everything.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-3xl overflow-hidden h-64 sm:h-96 order-2 lg:order-1"
            >
              <Image
                src="https://images.unsplash.com/photo-1596848212624-753bb62dc066?w=600&h=400&fit=crop"
                alt="Kids playing"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="order-1 lg:order-2 space-y-8"
            >
              {/* Hours Card */}
              <div className="glass rounded-3xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Clock size={24} className="text-brand-cyan" />
                  <h3 className="font-display font-bold text-2xl text-white">Hours</h3>
                </div>
                <div className="space-y-3">
                  {hours.map((h) => (
                    <div key={h.day} className="flex justify-between items-center hover:bg-white/3 px-3 py-2 rounded-lg transition-colors">
                      <span className="text-white/70 font-semibold">{h.day}</span>
                      <span className="text-brand-amber font-bold">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* What's Included */}
              <div className="glass rounded-3xl p-6 sm:p-8">
                <h3 className="font-display font-bold text-xl text-white mb-4">What's Included</h3>
                <div className="space-y-3">
                  {includes.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 size={18} className="text-brand-green shrink-0" />
                      <span className="text-white/80 text-sm font-semibold">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <a
                href="tel:7345222000"
                className="btn-primary w-full justify-center py-4 text-base"
              >
                <Phone size={18} />
                <span>(734) 522-2000</span>
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

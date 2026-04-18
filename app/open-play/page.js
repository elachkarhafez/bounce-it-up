'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { CheckCircle2, Clock, Phone, ArrowRight } from 'lucide-react';
import ParticleCanvas from '@/components/ParticleCanvas';

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
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="min-h-screen pt-32 sm:pt-40 pb-20">
      {/* Hero */}
      <section ref={heroRef} className="relative py-12 sm:py-20 overflow-hidden min-h-screen flex items-center">
        {/* Parallax Background */}
        <motion.div style={{ y: bgY }} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />
          <ParticleCanvas />
          <div className="absolute inset-0 grid-overlay opacity-40" />
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-brand-cyan/10 blur-[120px]" />
          <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-brand-orange/5 blur-[120px]" />
        </motion.div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            style={{ y: bgY, opacity }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 text-sm font-semibold"
            >
              <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
              Walk-Ins Welcome
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="font-display font-black leading-[0.9] mb-6"
            >
              <span className="block text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white/90">
                Open Play
              </span>
              <span className="block gradient-text-cyan text-4xl sm:text-6xl lg:text-7xl mt-2">
                All Day
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-2xl mx-auto text-lg sm:text-xl text-white/60 leading-relaxed mb-10"
            >
              Just show up and jump in. All-day access to everything.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid lg:grid-cols-2 gap-8 items-center"
          >
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="rounded-3xl overflow-hidden h-64 sm:h-96 order-2 lg:order-1 relative group"
            >
              <Image
                src="https://images.unsplash.com/photo-1596848212624-753bb62dc066?w=600&h=400&fit=crop"
                alt="Kids playing"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-40" />
            </motion.div>

            {/* Content */}
            <div className="order-1 lg:order-2 space-y-6">
              {/* Hours Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="glass rounded-3xl p-6 sm:p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Clock size={24} className="text-brand-cyan" />
                  <h3 className="font-display font-bold text-2xl text-white">Hours</h3>
                </div>
                <div className="space-y-3">
                  {hours.map((h, idx) => (
                    <motion.div
                      key={h.day}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + idx * 0.05 }}
                      className="flex justify-between items-center hover:bg-white/5 px-3 py-2 rounded-lg transition-colors"
                    >
                      <span className="text-white/70 font-semibold">{h.day}</span>
                      <span className="text-brand-amber font-bold">{h.time}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* What's Included */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="glass rounded-3xl p-6 sm:p-8"
              >
                <h3 className="font-display font-bold text-xl text-white mb-4">What's Included</h3>
                <div className="space-y-3">
                  {includes.map((item, idx) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.05 + idx * 0.05 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle2 size={18} className="text-brand-green shrink-0" />
                      <span className="text-white/80 text-sm font-semibold">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.15 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <a
                  href="tel:7345222000"
                  className="btn-primary w-full justify-center py-4 text-base glow-cyan inline-flex"
                >
                  <Phone size={18} />
                  <span>(734) 522-2000</span>
                </a>
              </motion.div>
            </div>
          </motion.div>

        {/* Floating Decorative Elements */}
        <div className="absolute left-8 top-1/3 hidden xl:block">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-3xl"
          >
            🎈
          </motion.div>
        </div>
        <div className="absolute right-12 top-1/4 hidden xl:block">
          <motion.div
            whileHover={{ scale: 1.2, rotate: 12 }}
            className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-2xl cursor-pointer"
          >
            ⭐
          </motion.div>
        </div>
        </div>
      </section>
    </div>
  );
}

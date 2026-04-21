'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const reviews = [
  {
    name: 'Sarah M.',
    avatar: 'SM',
    color: 'from-brand-orange to-brand-amber',
    rating: 5,
    date: 'March 2024',
    text: 'We had my daughter\'s 7th birthday here and it was absolutely perfect! The staff was so helpful and fun. The kids had a blast on the bounce houses and obstacle course. Will definitely be back!',
    source: 'Google',
  },
  {
    name: 'James K.',
    avatar: 'JK',
    color: 'from-brand-cyan to-blue-500',
    rating: 5,
    date: 'February 2024',
    text: 'Best indoor play place in the area, hands down. Clean, well-maintained, and the staff is super friendly. My 3-year-old loved the toddler zone and my 8-year-old didn\'t want to leave the bounce houses!',
    source: 'Google',
  },
  {
    name: 'Michelle R.',
    avatar: 'MR',
    color: 'from-brand-purple to-pink-500',
    rating: 5,
    date: 'January 2024',
    text: 'Hosted a fundraiser here and they were amazing to work with. Very professional, great communication, and the facility was spotless. Our organization raised over $2,000 in one afternoon!',
    source: 'Google',
  },
  {
    name: 'David T.',
    avatar: 'DT',
    color: 'from-brand-green to-teal-400',
    rating: 5,
    date: 'December 2023',
    text: 'This place is a gem in Livonia. We have the family membership and come almost every weekend. Kids are always tired by the time we leave — best investment we\'ve made for weekend activities!',
    source: 'Google',
  },
  {
    name: 'Lisa P.',
    avatar: 'LP',
    color: 'from-yellow-400 to-brand-amber',
    rating: 5,
    date: 'November 2023',
    text: 'Took our school field trip here and every single child had an amazing time. The staff managed 40+ kids like pros. Safe, clean, and genuinely the best field trip destination we\'ve tried.',
    source: 'Google',
  },
];

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const timer = setInterval(() => setIdx((i) => (i + 1) % reviews.length), 5000);
    return () => clearInterval(timer);
  }, [auto]);

  const prev = () => { setAuto(false); setIdx((i) => (i === 0 ? reviews.length - 1 : i - 1)); };
  const next = () => { setAuto(false); setIdx((i) => (i + 1) % reviews.length); };

  return (
    <section className="relative section-pad overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-purple/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1 mb-6"
          >
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} className="text-brand-yellow fill-brand-yellow" />
            ))}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-5xl text-white mb-4"
          >
            Parents <span className="gradient-text">Love Us</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/55 text-lg"
          >
            5-star reviews from real Livonia families on Google.
          </motion.p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 60, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -60, scale: 0.97 }}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="glass rounded-3xl p-8 sm:p-10 relative overflow-hidden"
            >
              {/* Gradient top bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${reviews[idx].color}`} />

              {/* Quote icon */}
              <div className="absolute top-6 right-8 opacity-10">
                <Quote size={64} className="text-white" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(reviews[idx].rating)].map((_, i) => (
                  <Star key={i} size={18} className="text-brand-yellow fill-brand-yellow" />
                ))}
              </div>

              {/* Text */}
              <p className="text-white/80 text-lg leading-relaxed mb-8 relative">
                &ldquo;{reviews[idx].text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${reviews[idx].color} flex items-center justify-center font-bold text-white text-sm shrink-0`}>
                  {reviews[idx].avatar}
                </div>
                <div>
                  <div className="font-bold text-white">{reviews[idx].name}</div>
                  <div className="text-sm text-white/40">{reviews[idx].source} · {reviews[idx].date}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-3 rounded-full glass hover:bg-white/10 text-white/60 hover:text-white transition-all"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setAuto(false); setIdx(i); }}
                  className={`transition-all duration-300 rounded-full ${
                    i === idx ? 'w-6 h-2 bg-brand-orange' : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-3 rounded-full glass hover:bg-white/10 text-white/60 hover:text-white transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Google badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <div className="inline-flex items-center gap-3 glass px-6 py-3 rounded-full">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="text-brand-yellow fill-brand-yellow" />
              ))}
            </div>
            <span className="text-white/70 text-sm font-semibold">5.0 on Google · 100+ reviews</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

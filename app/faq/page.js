'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import ParticleCanvas from '@/components/ParticleCanvas';

const faqs = [
  { q: 'Do I need a reservation for open play?', a: 'No! Just walk in during hours. We recommend arriving early on weekends.' },
  { q: 'What is the age range?', a: 'All ages welcome! We have a toddler zone for ages 3 & under, and attractions for older kids.' },
  { q: 'Do parents need to pay?', a: 'No, supervising parents are free. Only children playing need admission.' },
  { q: 'How far in advance for parties?', a: 'We recommend 2-4 weeks, especially for weekends. Holiday season books even further.' },
  { q: 'Is a deposit required?', a: 'Yes, 25% deposit holds your date. Balance due on event day. We accept Stripe & Authorized.net.' },
  { q: 'Can I bring my own food?', a: 'Outside food not allowed during open play. Party packages may bring cake. Concessions available.' },
  { q: 'What are the safety rules?', a: 'Socks required, signed waiver, children must be supervised. Staff on floor for safety.' },
  { q: 'Do you host fundraisers?', a: 'Absolutely! We support schools & organizations. Custom pricing & scheduling available.' },
];

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className={`glass rounded-2xl overflow-hidden transition-all ${open ? 'ring-1 ring-brand-orange/30' : ''}`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 sm:p-6 text-left group"
      >
        <span className={`font-semibold text-base sm:text-lg pr-4 transition-colors ${open ? 'text-brand-orange' : 'text-white/90'}`}>
          {faq.q}
        </span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-white/40 group-hover:text-white/70 transition-all duration-300 ${open ? 'rotate-180 text-brand-orange' : ''}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-white/60 text-sm leading-relaxed border-t border-white/5 pt-4">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="min-h-screen pt-32 sm:pt-40 pb-20">
      <section ref={heroRef} className="relative py-12 sm:py-20 overflow-hidden min-h-screen flex flex-col items-center justify-center">
        {/* Parallax Background */}
        <motion.div style={{ y: bgY }} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />
          <ParticleCanvas />
          <div className="absolute inset-0 grid-overlay opacity-40" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-cyan/5 blur-[100px]" />
          <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-brand-purple/5 blur-[120px]" />
        </motion.div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            style={{ y: bgY, opacity }}
            className="text-center mb-14"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 text-sm font-semibold"
            >
              <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
              FAQ
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="font-display font-black leading-[0.9] mb-6"
            >
              <span className="block text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white/90">
                Got Questions
              </span>
              <span className="block gradient-text-cyan text-4xl sm:text-6xl lg:text-7xl mt-2">
                We Got Answers
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg sm:text-xl text-white/60"
            >
              Everything you need to know
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-3"
          >
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12 glass rounded-2xl p-6"
          >
            <p className="text-white/60 mb-4">Still have questions?</p>
            <motion.a
              href="tel:7345222000"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary py-3 px-6 inline-flex glow-cyan"
            >
              Call (734) 522-2000
            </motion.a>
          </motion.div>
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute right-8 top-1/3 hidden xl:block">
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-3xl"
          >
            💡
          </motion.div>
        </div>
      </section>
    </div>
  );
}

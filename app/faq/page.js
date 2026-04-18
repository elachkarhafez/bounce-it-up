'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

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
  return (
    <div className="min-h-screen pt-32 sm:pt-40 pb-20">
      <section className="relative py-12 sm:py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-cyan/5 blur-[100px]" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-14"
          >
            <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-white mb-4">
              Got <span className="gradient-text-cyan">Questions?</span>
            </h1>
            <p className="text-white/60 text-lg">Everything you need to know</p>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12 glass rounded-2xl p-6"
          >
            <p className="text-white/60 mb-4">Still have questions?</p>
            <a href="tel:7345222000" className="btn-primary py-3 px-6">
              Call (734) 522-2000
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

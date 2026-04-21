'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: 'Do I need a reservation for open play?',
    a: 'No reservation needed for open play! Just walk in during our business hours and you\'re good to go. However, we recommend arriving early on weekends as it can get busy.',
  },
  {
    q: 'What is the age range for the facility?',
    a: 'We welcome kids of all ages! We have a dedicated toddler zone for children 3 and under, and all other attractions are suitable for kids 4 and up. Adults are welcome to accompany their children.',
  },
  {
    q: 'Do parents need to pay to enter?',
    a: 'Supervising parents or guardians do not need to pay an admission fee. Only children playing need admission. We love having parents cheering on their little ones!',
  },
  {
    q: 'How far in advance do I need to book a party?',
    a: 'We recommend booking at least 2–4 weeks in advance, especially for weekend dates which fill up fast. Holiday season books even further out — plan early!',
  },
  {
    q: 'Is a deposit required for party bookings?',
    a: 'Yes, we require a deposit to hold your party date and time. The remaining balance is due on the day of the event. We accept all major credit cards, Stripe payments, and Authorized.net.',
  },
  {
    q: 'Can I bring my own food and cake?',
    a: 'Outside food is not permitted during open play. For party packages, you may bring a cake/cupcakes and we will provide the table. All other food and drinks should be purchased from our concession stand.',
  },
  {
    q: 'What are your safety rules?',
    a: 'All guests must sign a waiver before playing. Socks are required at all times. Children must be supervised. No rough-housing, flipping, or double-bouncing. Our staff is always on the floor to ensure a safe and fun experience.',
  },
  {
    q: 'Do you host fundraisers and field trips?',
    a: 'Absolutely! We love supporting schools, churches, and community organizations. Contact us to discuss custom pricing and scheduling for your group or fundraiser event.',
  },
  {
    q: 'How do I sign a waiver?',
    a: 'Waivers can be signed online before your visit or at the facility on a tablet. We recommend signing online in advance to skip the line!',
  },
];

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className={`glass rounded-2xl overflow-hidden transition-all duration-300 ${open ? 'ring-1 ring-brand-orange/30' : ''}`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left group"
      >
        <span className={`font-semibold text-base pr-4 transition-colors ${open ? 'text-brand-orange' : 'text-white/90 group-hover:text-white'}`}>
          {faq.q}
        </span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-white/40 group-hover:text-white/70 transition-all duration-300 ${open ? 'rotate-180 text-brand-orange' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-white/60 text-sm leading-relaxed border-t border-white/5 pt-4">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="relative section-pad overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-cyan/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 text-xs uppercase tracking-widest font-semibold text-brand-cyan"
          >
            <HelpCircle size={12} />
            FAQ
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-5xl text-white mb-4"
          >
            Got <span className="gradient-text-cyan">Questions?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/55 text-lg"
          >
            Everything you need to know before your visit.
          </motion.p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10 glass rounded-2xl p-6"
        >
          <p className="text-white/60 mb-3">Still have questions?</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:7345222000" className="btn-primary py-2.5 px-5 text-sm justify-center">
              <span>Call (734) 522-2000</span>
            </a>
            <a href="mailto:office@bounceituplivonia.com" className="btn-outline py-2.5 px-5 text-sm justify-center">
              <span>Email Us</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

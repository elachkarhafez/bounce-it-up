'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Star, Zap, ChevronRight, X } from 'lucide-react';

const packages = [
  {
    name: 'Starter Bash',
    emoji: '🎈',
    price: 249,
    duration: '2 hours',
    guests: 'Up to 10 kids',
    color: 'from-blue-500 to-cyan-400',
    glow: 'rgba(0,212,255,0.3)',
    features: [
      '2-hour party room rental',
      'Up to 10 children',
      'Open play access included',
      'Party host assistance',
      'Table setup & cleanup',
      'Invitations template',
    ],
    stripeId: 'price_starter_bash',
  },
  {
    name: 'Ultimate Party',
    emoji: '🎉',
    price: 399,
    duration: '2.5 hours',
    guests: 'Up to 20 kids',
    color: 'from-brand-orange to-brand-amber',
    glow: 'rgba(255,107,0,0.4)',
    popular: true,
    features: [
      '2.5-hour party room rental',
      'Up to 20 children',
      'Open play access included',
      'Dedicated party host',
      'Pizza (2 pies) included',
      'Juice boxes for all kids',
      'Table decorations',
      'Priority booking',
    ],
    stripeId: 'price_ultimate_party',
  },
  {
    name: 'VIP Celebration',
    emoji: '👑',
    price: 599,
    duration: '3 hours',
    guests: 'Up to 35 kids',
    color: 'from-brand-purple to-pink-500',
    glow: 'rgba(168,85,247,0.4)',
    features: [
      '3-hour party room rental',
      'Up to 35 children',
      'Open play access included',
      'VIP party coordinator',
      'Pizza (4 pies) + salads',
      'Drinks for all guests',
      'Custom balloon décor',
      'Goodie bags for kids',
      'Photo op station',
      'Priority booking + free rescheduling',
    ],
    stripeId: 'price_vip_celebration',
  },
];

function PackageModal({ pkg, onClose }) {
  const handleStripeCheckout = () => {
    // Redirect to booking section with package pre-selected
    onClose();
    const el = document.querySelector('#booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      // Dispatch custom event to pre-select package
      window.dispatchEvent(new CustomEvent('selectPackage', { detail: pkg }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 40 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative glass-strong rounded-3xl p-8 max-w-md w-full z-10 overflow-hidden"
      >
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${pkg.color}`} />
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-xl hover:bg-white/10 text-white/60 hover:text-white transition-colors">
          <X size={20} />
        </button>

        <div className="text-4xl mb-3">{pkg.emoji}</div>
        <h3 className="font-display font-black text-2xl text-white mb-1">{pkg.name}</h3>
        <p className="text-white/50 text-sm mb-6">{pkg.duration} · {pkg.guests}</p>

        <div className="space-y-2 mb-8">
          {pkg.features.map((f) => (
            <div key={f} className="flex items-center gap-3">
              <Check size={14} className="text-brand-green shrink-0" />
              <span className="text-sm text-white/80">{f}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-4xl font-black text-white">${pkg.price}</span>
            <span className="text-white/40 text-sm ml-2">flat rate</span>
          </div>
          <div className="text-xs text-white/40">+ applicable taxes</div>
        </div>

        <button
          onClick={handleStripeCheckout}
          className="btn-primary w-full justify-center text-base py-4"
          style={{ background: `linear-gradient(135deg, ${pkg.color.replace('from-', '').replace(' to-', ', ')})` }}
        >
          <span>Book This Package</span>
          <ChevronRight size={18} />
        </button>
        <p className="text-center text-xs text-white/30 mt-4">Secure payment · No booking fees</p>
      </motion.div>
    </motion.div>
  );
}

export default function PartyPackages() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="party-packages" className="relative section-pad overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-800/50 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-orange/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 text-xs uppercase tracking-widest font-semibold text-brand-orange"
          >
            <Star size={12} className="fill-brand-orange" />
            Birthday Parties
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white mb-4"
          >
            Party <span className="gradient-text">Packages</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-xl mx-auto text-white/55 text-lg"
          >
            Make their birthday legendary. Choose a package and let us handle everything —
            you just show up and celebrate.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              className={`relative rounded-3xl overflow-hidden ${
                pkg.popular ? 'ring-2 ring-brand-orange shadow-glow-orange' : ''
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-0 left-0 right-0 text-center py-1.5 text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-brand-orange to-brand-amber text-white z-10">
                  Most Popular
                </div>
              )}

              <div className={`glass h-full flex flex-col ${pkg.popular ? 'pt-10' : 'pt-0'}`}>
                {/* Top gradient */}
                <div className={`h-1 bg-gradient-to-r ${pkg.color}`} />

                <div className="p-7 flex flex-col h-full">
                  {/* Icon & name */}
                  <div className="text-4xl mb-4">{pkg.emoji}</div>
                  <h3 className="font-display font-black text-2xl text-white mb-1">{pkg.name}</h3>
                  <div className="text-white/40 text-sm mb-6">
                    {pkg.duration} &middot; {pkg.guests}
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-5xl font-black text-white">${pkg.price}</span>
                    <span className="text-white/40 text-sm ml-1">flat rate</span>
                  </div>

                  {/* Features */}
                  <div className="space-y-2.5 mb-8 flex-1">
                    {pkg.features.map((f) => (
                      <div key={f} className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${pkg.color} flex items-center justify-center shrink-0`}>
                          <Check size={9} className="text-white" />
                        </div>
                        <span className="text-sm text-white/70">{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => setSelected(pkg)}
                    className={`w-full py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-brand-orange to-brand-amber text-white hover:shadow-glow-orange hover:scale-[1.02]'
                        : 'glass border border-white/10 text-white hover:bg-white/5 hover:border-white/20'
                    }`}
                  >
                    Book {pkg.name}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-white/30 text-sm mt-8"
        >
          Need a custom package?{' '}
          <a href="tel:7345222000" className="text-brand-orange hover:underline">
            Call us at (734) 522-2000
          </a>
        </motion.p>
      </div>

      <AnimatePresence>
        {selected && <PackageModal pkg={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}

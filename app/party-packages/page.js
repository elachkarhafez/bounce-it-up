'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { Star, Check, CreditCard, Loader2, ArrowRight, Phone } from 'lucide-react';
import ParticleCanvas from '@/components/ParticleCanvas';

const packages = [
  {
    name: 'Starter Bash',
    price: 249,
    deposit: 100,
    duration: '2 hours',
    guests: 'Up to 10 kids',
    stripeType: 'party-starter-deposit',
    image: 'https://images.unsplash.com/photo-1513161455079-7ef1a827d4af?w=500&h=400&fit=crop',
    color: 'from-blue-500 to-cyan-400',
    features: [
      '2-hour party room rental',
      'Up to 10 children',
      'Open play access included',
      'Party host assistance',
      'Table setup & cleanup',
    ],
  },
  {
    name: 'Ultimate Party',
    price: 399,
    deposit: 100,
    duration: '2.5 hours',
    guests: 'Up to 20 kids',
    stripeType: 'party-ultimate-deposit',
    image: 'https://images.unsplash.com/photo-1596848212624-753bb62dc066?w=500&h=400&fit=crop',
    color: 'from-brand-orange to-brand-amber',
    popular: true,
    features: [
      '2.5-hour party room rental',
      'Up to 20 children',
      'Open play access included',
      'Dedicated party host',
      'Pizza (2 pies) included',
      'Juice boxes for all kids',
      'Table decorations',
    ],
  },
  {
    name: 'VIP Celebration',
    price: 599,
    deposit: 100,
    duration: '3 hours',
    guests: 'Up to 35 kids',
    stripeType: 'party-vip-deposit',
    image: 'https://images.unsplash.com/photo-1576091160550-112173f7f869?w=500&h=400&fit=crop',
    color: 'from-brand-purple to-pink-500',
    features: [
      '3-hour party room rental',
      'Up to 35 children',
      'Open play access included',
      'VIP party coordinator',
      'Pizza (4 pies) + salads',
      'Drinks for all guests',
      'Custom balloon décor',
      'Goodie bags for kids',
    ],
  },
];

function BookButton({ pkg }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleBook = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: pkg.stripeType }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else throw new Error(data.error || 'Could not start checkout');
    } catch (err) {
      setError('Unable to connect. Please try again or call us.');
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <p className="text-red-500 text-xs mb-2 text-center">{error}</p>}
      <motion.button
        onClick={handleBook}
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={`w-full py-3 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
          pkg.popular
            ? 'bg-gradient-to-r from-brand-orange to-brand-amber text-white hover:shadow-glow-orange'
            : 'glass border border-white/10 text-slate-700 hover:bg-orange-50'
        } disabled:opacity-60 disabled:cursor-not-allowed`}
      >
        {loading ? (
          <><Loader2 size={16} className="animate-spin" /><span>Loading...</span></>
        ) : (
          <><CreditCard size={16} /><span>Reserve with $100 Deposit</span><ArrowRight size={14} /></>
        )}
      </motion.button>
      <p className="text-xs text-slate-500 text-center mt-2">Balance of ${pkg.price - 100} due on party day</p>
    </div>
  );
}

export default function PartyPackagesPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="min-h-screen pt-32 sm:pt-40 pb-20">
      <section ref={heroRef} className="relative py-12 sm:py-20 overflow-hidden min-h-screen flex items-center">
        <motion.div style={{ y: bgY }} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />
          <ParticleCanvas />
          <div className="absolute inset-0 grid-overlay opacity-40" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-orange/5 blur-[150px]" />
          <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-brand-purple/5 blur-[120px]" />
        </motion.div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div style={{ y: bgY, opacity }} className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 text-sm font-semibold"
            >
              <Star size={12} className="fill-brand-orange text-brand-orange" />
              $100 Deposit Reserves Your Date
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="font-display font-black leading-[0.9] mb-6"
            >
              <span className="block text-5xl sm:text-7xl lg:text-8xl tracking-tight text-slate-800">Party Time</span>
              <span className="block gradient-text text-4xl sm:text-6xl lg:text-7xl mt-2">Packages</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 leading-relaxed"
            >
              Reserve your date with just a <strong className="text-brand-orange">$100 deposit</strong>. Balance due on the day of the party.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid md:grid-cols-3 gap-6 lg:gap-8"
          >
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className={`glass rounded-3xl overflow-hidden flex flex-col h-full transition-all ${
                  pkg.popular ? 'ring-2 ring-brand-orange shadow-glow-orange' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="bg-gradient-to-r from-brand-orange to-brand-amber text-white text-center py-1.5 text-xs font-bold uppercase tracking-widest">
                    Most Popular
                  </div>
                )}

                <div className="relative h-44 overflow-hidden">
                  <Image src={pkg.image} alt={pkg.name} fill className="object-cover hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <span className="text-white/80 text-xs font-semibold">{pkg.duration} · {pkg.guests}</span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-display font-black text-2xl text-slate-800 mb-4">{pkg.name}</h3>

                  {/* Pricing */}
                  <div className="mb-5 pb-5 border-b border-slate-100">
                    <div className="flex items-end gap-2">
                      <span className="text-4xl font-black text-slate-800">${pkg.price}</span>
                      <span className="text-slate-400 text-sm mb-1">flat rate</span>
                    </div>
                    <div className="mt-2 inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-bold px-2 py-1 rounded-full border border-green-200">
                      ✓ Only $100 to reserve
                    </div>
                  </div>

                  <div className="space-y-2 mb-6 flex-1">
                    {pkg.features.map((f) => (
                      <div key={f} className="flex items-center gap-2">
                        <Check size={14} className="text-brand-green shrink-0" />
                        <span className="text-sm text-slate-600">{f}</span>
                      </div>
                    ))}
                  </div>

                  <BookButton pkg={pkg} />
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="text-center mt-12"
          >
            <div className="glass rounded-2xl p-6 max-w-md mx-auto">
              <p className="text-slate-600 text-sm mb-3">Need a custom package or have questions?</p>
              <a href="tel:7345222000" className="btn-primary py-3 px-6 inline-flex justify-center">
                <Phone size={16} />
                <span>Call (734) 522-2000</span>
              </a>
            </div>
          </motion.div>
        </div>

        <div className="absolute left-8 top-1/2 hidden xl:block">
          <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity }} className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-3xl">🎉</motion.div>
        </div>
        <div className="absolute right-12 bottom-1/3 hidden xl:block">
          <motion.div whileHover={{ scale: 1.2 }} animate={{ rotate: [0, 5, 0] }} transition={{ duration: 3, repeat: Infinity }} className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-2xl cursor-pointer">🎂</motion.div>
        </div>
      </section>
    </div>
  );
}

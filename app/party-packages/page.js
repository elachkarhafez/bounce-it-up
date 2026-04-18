'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Check, Zap } from 'lucide-react';

const packages = [
  {
    name: 'Starter Bash',
    price: 249,
    duration: '2 hours',
    guests: 'Up to 10 kids',
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
    duration: '2.5 hours',
    guests: 'Up to 20 kids',
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
    duration: '3 hours',
    guests: 'Up to 35 kids',
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

export default function PartyPackagesPage() {
  return (
    <div className="min-h-screen pt-32 sm:pt-40 pb-20">
      <section className="relative py-12 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-orange/5 blur-[150px]" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-14"
          >
            <div className="inline-block glass px-4 py-2 rounded-full mb-4 text-xs uppercase tracking-widest font-semibold">
              <Star size={12} className="inline mr-2 fill-brand-orange text-brand-orange" />
              Birthday Parties
            </div>
            <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-white mb-4">
              Party <span className="gradient-text">Packages</span>
            </h1>
            <p className="max-w-2xl mx-auto text-white/60 text-lg">
              Make their birthday legendary.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`glass rounded-3xl overflow-hidden flex flex-col h-full ${
                  pkg.popular ? 'ring-2 ring-brand-orange shadow-glow-orange' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="bg-gradient-to-r from-brand-orange to-brand-amber text-white text-center py-1.5 text-xs font-bold uppercase tracking-widest">
                    Most Popular
                  </div>
                )}

                {/* Image */}
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.name}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-4">
                    <h3 className="font-display font-black text-2xl text-white mb-1">
                      {pkg.name}
                    </h3>
                    <p className="text-white/40 text-sm">
                      {pkg.duration} · {pkg.guests}
                    </p>
                  </div>

                  <div className="mb-6 pb-6 border-b border-white/10">
                    <span className="text-4xl font-black text-white">${pkg.price}</span>
                    <span className="text-white/40 text-sm ml-1">flat rate</span>
                  </div>

                  <div className="space-y-2 mb-6 flex-1">
                    {pkg.features.map((f) => (
                      <div key={f} className="flex items-center gap-2">
                        <Check size={14} className="text-brand-green shrink-0" />
                        <span className="text-sm text-white/70">{f}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    className={`w-full py-3 rounded-2xl font-bold text-sm transition-all ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-brand-orange to-brand-amber text-white hover:shadow-glow-orange'
                        : 'glass border border-white/10 text-white hover:bg-white/5'
                    }`}
                  >
                    Book Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-12"
          >
            <p className="text-white/50 text-sm">
              Need a custom package?{' '}
              <a href="tel:7345222000" className="text-brand-orange hover:underline font-semibold">
                Call (734) 522-2000
              </a>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

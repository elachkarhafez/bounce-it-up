'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Check, Crown, Zap } from 'lucide-react';
import ParticleCanvas from '@/components/ParticleCanvas';

const tiers = [
  {
    name: 'Monthly Fun Pass',
    price: 49,
    period: '/mo per child',
    color: 'from-brand-cyan to-blue-500',
    textColor: 'text-brand-cyan',
    perks: [
      'Unlimited open play visits',
      'Priority check-in',
      '10% off party packages',
      '10% off concessions',
    ],
  },
  {
    name: 'Family Annual Pass',
    price: 349,
    period: '/yr (up to 4 kids)',
    color: 'from-brand-yellow to-brand-amber',
    textColor: 'text-brand-yellow',
    popular: true,
    perks: [
      'Unlimited open play — entire family',
      'Priority check-in',
      '20% off party packages',
      '15% off concessions',
      'Free guest pass each month',
      'Birthday discount (25% off party)',
    ],
  },
  {
    name: 'Group / Corporate',
    price: null,
    period: 'Custom pricing',
    color: 'from-brand-purple to-pink-500',
    textColor: 'text-brand-purple',
    perks: [
      'Field trips & school groups',
      'Corporate team-building',
      'Fundraiser coordination',
      'Custom scheduling',
      'Group discounts',
      'Dedicated coordinator',
    ],
  },
];

export default function MembershipsPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="min-h-screen pt-32 sm:pt-40 pb-20">
      <section ref={heroRef} className="relative py-12 sm:py-20 overflow-hidden min-h-screen flex items-center">
        {/* Parallax Background */}
        <motion.div style={{ y: bgY }} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />
          <ParticleCanvas />
          <div className="absolute inset-0 grid-overlay opacity-40" />
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-purple/5 blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-yellow/5 blur-[100px]" />
        </motion.div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <Crown size={12} />
              Memberships
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="font-display font-black leading-[0.9] mb-6"
            >
              <span className="block text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white/90">
                Fun Club
              </span>
              <span className="block gradient-text-cyan text-4xl sm:text-6xl lg:text-7xl mt-2">
                Memberships
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-2xl mx-auto text-lg sm:text-xl text-white/60 leading-relaxed"
            >
              Unlimited play, exclusive discounts, and priority access.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid md:grid-cols-3 gap-6 lg:gap-8"
          >
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className={`glass rounded-3xl overflow-hidden flex flex-col h-full border transition-all ${
                  tier.popular ? 'ring-2 ring-brand-yellow' : 'border-white/10'
                }`}
              >
                {tier.popular && (
                  <div className="bg-gradient-to-r from-brand-yellow to-brand-amber text-dark-900 text-center py-1.5 text-xs font-bold uppercase tracking-widest">
                    Best Value
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-display font-bold text-2xl text-white mb-2">
                    {tier.name}
                  </h3>

                  <div className="mb-6 pb-6 border-b border-white/10">
                    {tier.price ? (
                      <>
                        <span className={`text-5xl font-black ${tier.textColor}`}>
                          ${tier.price}
                        </span>
                        <span className="text-white/40 text-sm ml-2">{tier.period}</span>
                      </>
                    ) : (
                      <>
                        <div className={`text-2xl font-black ${tier.textColor}`}>
                          Custom
                        </div>
                        <div className="text-white/40 text-sm">{tier.period}</div>
                      </>
                    )}
                  </div>

                  <ul className="space-y-3 mb-6 flex-1">
                    {tier.perks.map((perk) => (
                      <li key={perk} className="flex items-center gap-2">
                        <Check size={14} className="text-brand-green shrink-0" />
                        <span className="text-sm text-white/70">{perk}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="tel:7345222000"
                    className={`block w-full text-center py-3 rounded-2xl font-bold text-sm transition-all bg-gradient-to-r ${tier.color} text-white hover:opacity-90`}
                  >
                    {tier.price ? 'Get Started' : 'Contact Us'}
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>

        {/* Floating Decorative Elements */}
        <div className="absolute left-8 top-1/3 hidden xl:block">
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-3xl"
          >
            ⭐
          </motion.div>
        </div>
        <div className="absolute right-12 top-1/2 hidden xl:block">
          <motion.div
            whileHover={{ scale: 1.2 }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-2xl cursor-pointer"
          >
            💎
          </motion.div>
        </div>
        </div>
      </section>
    </div>
  );
}

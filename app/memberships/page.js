'use client';

import { motion } from 'framer-motion';
import { Check, Crown, Zap } from 'lucide-react';

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
  return (
    <div className="min-h-screen pt-32 sm:pt-40 pb-20">
      <section className="relative py-12 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-purple/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-yellow/5 blur-[100px]" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-14"
          >
            <div className="inline-block glass px-4 py-2 rounded-full mb-4 text-xs uppercase tracking-widest font-semibold">
              <Crown size={12} className="inline mr-2" />
              Memberships
            </div>
            <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-white mb-4">
              Join the <span className="gradient-text-cyan">Fun Club</span>
            </h1>
            <p className="max-w-2xl mx-auto text-white/60 text-lg">
              Unlimited play, exclusive discounts, and priority access.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`glass rounded-3xl overflow-hidden flex flex-col h-full border ${
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
          </div>
        </div>
      </section>
    </div>
  );
}

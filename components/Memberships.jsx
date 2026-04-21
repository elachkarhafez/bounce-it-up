'use client';

import { motion } from 'framer-motion';
import { Check, Infinity, Zap, Crown } from 'lucide-react';

const tiers = [
  {
    name: 'Monthly Fun Pass',
    icon: <Zap size={20} className="text-brand-cyan" />,
    price: 49,
    period: '/mo per child',
    color: 'from-brand-cyan to-blue-500',
    textColor: 'text-brand-cyan',
    borderColor: 'border-brand-cyan/30',
    perks: [
      'Unlimited open play visits',
      'Priority check-in',
      '10% off party packages',
      '10% off concessions',
      'Monthly member newsletter',
    ],
  },
  {
    name: 'Family Annual Pass',
    icon: <Crown size={20} className="text-brand-yellow" />,
    price: 349,
    period: '/yr (up to 4 kids)',
    color: 'from-brand-yellow to-brand-amber',
    textColor: 'text-brand-yellow',
    borderColor: 'border-brand-yellow/30',
    popular: true,
    perks: [
      'Unlimited open play — entire family',
      'Priority check-in',
      '20% off party packages',
      '15% off concessions',
      'Free guest pass each month',
      'Early access to special events',
      'Birthday discount (25% off party)',
    ],
  },
  {
    name: 'Group / Corporate',
    icon: <Infinity size={20} className="text-brand-purple" />,
    price: null,
    period: 'Custom pricing',
    color: 'from-brand-purple to-pink-500',
    textColor: 'text-brand-purple',
    borderColor: 'border-brand-purple/30',
    perks: [
      'Field trips & school groups',
      'Corporate team-building events',
      'Fundraiser coordination',
      'Custom scheduling',
      'Group discounts',
      'Dedicated event coordinator',
    ],
  },
];

export default function Memberships() {
  return (
    <section id="memberships" className="relative section-pad overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-purple/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-yellow/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 text-xs uppercase tracking-widest font-semibold text-brand-purple"
          >
            <Crown size={12} />
            Memberships
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white mb-4"
          >
            Join the{' '}
            <span className="gradient-text-cyan">Fun Club</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-xl mx-auto text-white/55 text-lg"
          >
            Unlimited play, exclusive discounts, and priority access. The more you play,
            the more you save.
          </motion.p>
        </div>

        {/* Tier Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className={`relative glass rounded-3xl overflow-hidden border ${tier.borderColor} ${
                tier.popular ? 'ring-2 ring-brand-yellow shadow-[0_0_40px_rgba(255,215,0,0.2)]' : ''
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 inset-x-0 text-center py-1.5 text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-brand-yellow to-brand-amber text-dark-900">
                  Best Value
                </div>
              )}

              <div className={`h-1 bg-gradient-to-r ${tier.color}`} />
              <div className={`p-7 ${tier.popular ? 'pt-10' : ''}`}>
                {/* Icon + name */}
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tier.color} bg-opacity-20 flex items-center justify-center`}>
                    {tier.icon}
                  </div>
                  <h3 className="font-display font-bold text-lg text-white">{tier.name}</h3>
                </div>

                {/* Price */}
                <div className="mb-7">
                  {tier.price ? (
                    <>
                      <span className={`text-5xl font-black ${tier.textColor}`}>${tier.price}</span>
                      <span className="text-white/40 text-sm ml-2">{tier.period}</span>
                    </>
                  ) : (
                    <div>
                      <div className={`text-2xl font-black ${tier.textColor}`}>Custom</div>
                      <div className="text-white/40 text-sm">{tier.period}</div>
                    </div>
                  )}
                </div>

                {/* Perks */}
                <ul className="space-y-3 mb-8">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${tier.color} flex items-center justify-center shrink-0`}>
                        <Check size={9} className="text-white" />
                      </div>
                      <span className="text-sm text-white/70">{perk}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="tel:7345222000"
                  className={`block w-full text-center py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 bg-gradient-to-r ${tier.color} text-white hover:opacity-90 hover:shadow-lg hover:scale-[1.02]`}
                >
                  {tier.price ? 'Get Started' : 'Contact Us'}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Marquee perks strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-14 overflow-hidden"
        >
          <div className="flex items-center">
            <div className="marquee-inner flex gap-12 whitespace-nowrap">
              {[...Array(2)].map((_, r) => (
                <div key={r} className="flex gap-12">
                  {[
                    '🎈 Unlimited Play', '⭐ Priority Access', '🎉 Party Discounts',
                    '🏆 Member-Only Events', '🎁 Monthly Perks', '💳 No Hidden Fees',
                    '🎈 Unlimited Play', '⭐ Priority Access', '🎉 Party Discounts',
                  ].map((item, j) => (
                    <span key={j} className="text-sm font-semibold text-white/30 hover:text-white/60 transition-colors cursor-default">
                      {item}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Check, Crown, CreditCard, Loader2, ArrowRight, Phone } from 'lucide-react';
import ParticleCanvas from '@/components/ParticleCanvas';

const tiers = [
  {
    name: 'Monthly Fun Pass',
    price: 49,
    period: '/mo per child',
    stripeType: 'membership-monthly',
    color: 'from-brand-cyan to-blue-500',
    textColor: 'text-brand-cyan',
    perks: [
      'Unlimited open play visits',
      'Priority check-in',
      '10% off party packages',
      '10% off concessions',
    ],
    note: 'Cancel anytime',
  },
  {
    name: 'Family Annual Pass',
    price: 349,
    period: '/yr (up to 4 kids)',
    stripeType: 'membership-annual',
    color: 'from-brand-yellow to-brand-amber',
    textColor: 'text-yellow-600',
    popular: true,
    perks: [
      'Unlimited open play — entire family',
      'Priority check-in',
      '20% off party packages',
      '15% off concessions',
      'Free guest pass each month',
      'Birthday discount (25% off party)',
    ],
    note: 'Best value — saves over $200/yr',
  },
  {
    name: 'Group / Corporate',
    price: null,
    period: 'Custom pricing',
    stripeType: null,
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
    note: 'Contact us for a custom quote',
  },
];

function MembershipButton({ tier }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!tier.stripeType) {
    return (
      <a
        href="tel:7345222000"
        className={`block w-full text-center py-3 rounded-2xl font-bold text-sm transition-all bg-gradient-to-r ${tier.color} text-white hover:opacity-90`}
      >
        <Phone size={14} className="inline mr-2" />
        Contact Us for Pricing
      </a>
    );
  }

  const handleCheckout = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: tier.stripeType }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else throw new Error(data.error || 'Checkout unavailable');
    } catch (err) {
      setError('Unable to connect. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <p className="text-red-500 text-xs mb-2 text-center">{error}</p>}
      <motion.button
        onClick={handleCheckout}
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={`w-full py-3 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 bg-gradient-to-r ${tier.color} text-white hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed`}
      >
        {loading ? (
          <><Loader2 size={16} className="animate-spin" /><span>Loading...</span></>
        ) : (
          <><CreditCard size={16} /><span>Get Started</span><ArrowRight size={14} /></>
        )}
      </motion.button>
      <p className="text-xs text-slate-500 text-center mt-2">🔒 Secured by Stripe · Apple Pay &amp; cards accepted</p>
    </div>
  );
}

export default function MembershipsPage() {
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
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-purple/5 blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-yellow/5 blur-[100px]" />
        </motion.div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div style={{ y: bgY, opacity }} className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 text-sm font-semibold"
            >
              <Crown size={12} />
              Memberships · Cancel Anytime
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="font-display font-black leading-[0.9] mb-6"
            >
              <span className="block text-5xl sm:text-7xl lg:text-8xl tracking-tight text-slate-800">Fun Club</span>
              <span className="block gradient-text-cyan text-4xl sm:text-6xl lg:text-7xl mt-2">Memberships</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 leading-relaxed"
            >
              Unlimited play, exclusive discounts, and priority access. Pay with Apple Pay or any card.
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
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className={`glass rounded-3xl overflow-hidden flex flex-col h-full border transition-all ${
                  tier.popular ? 'ring-2 ring-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.3)]' : 'border-white/10'
                }`}
              >
                {tier.popular && (
                  <div className="bg-gradient-to-r from-brand-yellow to-brand-amber text-dark-900 text-center py-1.5 text-xs font-bold uppercase tracking-widest">
                    Best Value
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-display font-bold text-2xl text-slate-800 mb-2">{tier.name}</h3>

                  <div className="mb-5 pb-5 border-b border-slate-100">
                    {tier.price ? (
                      <>
                        <span className={`text-5xl font-black ${tier.textColor}`}>${tier.price}</span>
                        <span className="text-slate-400 text-sm ml-2">{tier.period}</span>
                      </>
                    ) : (
                      <div className={`text-2xl font-black ${tier.textColor}`}>Custom</div>
                    )}
                    {tier.note && (
                      <div className="mt-2 text-xs text-slate-500 font-medium">{tier.note}</div>
                    )}
                  </div>

                  <ul className="space-y-3 mb-6 flex-1">
                    {tier.perks.map((perk) => (
                      <li key={perk} className="flex items-center gap-2">
                        <Check size={14} className="text-brand-green shrink-0" />
                        <span className="text-sm text-slate-600">{perk}</span>
                      </li>
                    ))}
                  </ul>

                  <MembershipButton tier={tier} />
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10 text-sm text-slate-500"
          >
            Questions about membership? <a href="tel:7345222000" className="text-brand-orange hover:underline font-semibold">(734) 522-2000</a>
          </motion.div>
        </div>

        <div className="absolute left-8 top-1/3 hidden xl:block">
          <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity }} className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-3xl">⭐</motion.div>
        </div>
        <div className="absolute right-12 top-1/2 hidden xl:block">
          <motion.div whileHover={{ scale: 1.2 }} animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-2xl cursor-pointer">💎</motion.div>
        </div>
      </section>
    </div>
  );
}

'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { CheckCircle2, Clock, Phone, ShoppingCart, CreditCard, Loader2, Users, Baby, ArrowRight } from 'lucide-react';
import ParticleCanvas from '@/components/ParticleCanvas';

const hours = [
  { day: 'Monday – Thursday', time: '12:00 PM – 8:00 PM' },
  { day: 'Friday', time: '12:00 PM – 9:00 PM' },
  { day: 'Saturday', time: '10:00 AM – 9:00 PM' },
  { day: 'Sunday', time: '10:00 AM – 8:00 PM' },
];

const includes = [
  'Tri-level playground adventure',
  'Bounce houses with slides',
  'Basketball hoops & trampolines',
  'Obstacle courses',
  'Toddler zone (ages 3 & under)',
  'All-day play, no time limit!',
];

function TicketSelector() {
  const [children, setChildren] = useState(1);
  const [toddlers, setToddlers] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const childPrice = 14.00;
  const toddlerPrice = 9.00;
  const total = (children * childPrice + toddlers * toddlerPrice).toFixed(2);

  const handleCheckout = async () => {
    if (children + toddlers === 0) { setError('Please add at least one child.'); return; }
    setLoading(true);
    setError('');
    try {
      // Create sessions for each ticket type
      const sessions = [];
      if (children > 0) {
        const res = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'open-play-child', quantity: children }),
        });
        const data = await res.json();
        if (data.url) sessions.push(data.url);
        else throw new Error(data.error || 'Failed to create session');
      }
      if (children > 0 || toddlers === 0) {
        // Redirect to first session (Stripe handles multiple line items in one session)
        const res = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: children > 0 ? 'open-play-child' : 'open-play-toddler',
            quantity: children > 0 ? children : toddlers,
            childrenCount: children + toddlers,
          }),
        });
        const data = await res.json();
        if (data.url) window.location.href = data.url;
        else throw new Error(data.error || 'Checkout unavailable');
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Actually let's simplify — send both quantities in metadata and calculate server-side
  const handleCheckoutSimple = async () => {
    if (children + toddlers === 0) { setError('Please add at least one child.'); return; }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'open-play-child',
          quantity: children + toddlers,
          childrenCount: children,
          // toddlers handled via note
        }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else throw new Error(data.error || 'Checkout unavailable');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 }}
      className="glass rounded-3xl p-6 sm:p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <ShoppingCart size={22} className="text-brand-orange" />
        <h3 className="font-display font-bold text-xl text-slate-800">Buy Tickets Online</h3>
      </div>

      {/* Ticket types */}
      <div className="space-y-4 mb-6">
        {/* Children */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-orange-50 border border-orange-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-orange to-brand-amber flex items-center justify-center">
              <Users size={18} className="text-white" />
            </div>
            <div>
              <div className="font-bold text-slate-800 text-sm">Child Admission</div>
              <div className="text-xs text-slate-500">Ages 4 and up · All-day access</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-700">${childPrice.toFixed(2)}</span>
            <div className="flex items-center gap-2">
              <button onClick={() => setChildren(Math.max(0, children - 1))} className="w-8 h-8 rounded-full glass border border-slate-200 flex items-center justify-center font-bold text-slate-600 hover:bg-brand-orange hover:text-white transition-all">-</button>
              <span className="w-6 text-center font-bold text-slate-800">{children}</span>
              <button onClick={() => setChildren(children + 1)} className="w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center font-bold hover:bg-brand-amber transition-all">+</button>
            </div>
          </div>
        </div>

        {/* Toddlers */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-cyan-50 border border-cyan-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-cyan to-blue-500 flex items-center justify-center">
              <Baby size={18} className="text-white" />
            </div>
            <div>
              <div className="font-bold text-slate-800 text-sm">Toddler (3 & under)</div>
              <div className="text-xs text-slate-500">Dedicated toddler zone</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-700">${toddlerPrice.toFixed(2)}</span>
            <div className="flex items-center gap-2">
              <button onClick={() => setToddlers(Math.max(0, toddlers - 1))} className="w-8 h-8 rounded-full glass border border-slate-200 flex items-center justify-center font-bold text-slate-600 hover:bg-brand-cyan hover:text-white transition-all">-</button>
              <span className="w-6 text-center font-bold text-slate-800">{toddlers}</span>
              <button onClick={() => setToddlers(toddlers + 1)} className="w-8 h-8 rounded-full bg-brand-cyan text-white flex items-center justify-center font-bold hover:opacity-90 transition-all">+</button>
            </div>
          </div>
        </div>
      </div>

      {/* Total */}
      <div className="flex items-center justify-between py-4 border-t border-slate-200 mb-4">
        <span className="font-bold text-slate-700">Total</span>
        <span className="text-2xl font-black text-slate-800">${(children * childPrice + toddlers * toddlerPrice).toFixed(2)}</span>
      </div>

      {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

      {/* Checkout button — Apple Pay / Google Pay appear automatically in Stripe */}
      <motion.button
        onClick={handleCheckoutSimple}
        disabled={loading || children + toddlers === 0}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="btn-primary w-full justify-center py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <><Loader2 size={18} className="animate-spin" /><span>Loading...</span></>
        ) : (
          <><CreditCard size={18} /><span>Pay ${(children * childPrice + toddlers * toddlerPrice).toFixed(2)} · Apple Pay &amp; Cards</span><ArrowRight size={18} /></>
        )}
      </motion.button>

      <p className="text-xs text-slate-500 text-center mt-3">
        🔒 Secured by Stripe · Apple Pay, Google Pay &amp; all major cards accepted
      </p>
      <p className="text-xs text-slate-400 text-center mt-1">
        Supervising parents are <strong>free</strong> — only children need admission
      </p>
    </motion.div>
  );
}

export default function OpenPlayPage() {
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
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-brand-cyan/10 blur-[120px]" />
          <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-brand-orange/5 blur-[120px]" />
        </motion.div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div style={{ y: bgY, opacity }} className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 text-sm font-semibold"
            >
              <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
              Walk-Ins Welcome · Buy Online & Skip the Line
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="font-display font-black leading-[0.9] mb-6"
            >
              <span className="block text-5xl sm:text-7xl lg:text-8xl tracking-tight text-slate-800">
                Open Play
              </span>
              <span className="block gradient-text-cyan text-4xl sm:text-6xl lg:text-7xl mt-2">
                All Day Fun
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 leading-relaxed"
            >
              Just show up and jump in — or buy tickets online now with Apple Pay.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid lg:grid-cols-2 gap-8 items-start"
          >
            {/* Left: Image + Hours + Includes */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="rounded-3xl overflow-hidden h-64 sm:h-80 relative group"
              >
                <Image
                  src="https://images.unsplash.com/photo-1596848212624-753bb62dc066?w=800&h=500&fit=crop"
                  alt="Kids playing"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-40" />
              </motion.div>

              {/* Hours */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="glass rounded-3xl p-6 sm:p-8"
              >
                <div className="flex items-center gap-3 mb-5">
                  <Clock size={22} className="text-brand-cyan" />
                  <h3 className="font-display font-bold text-xl text-slate-800">Hours</h3>
                </div>
                <div className="space-y-2">
                  {hours.map((h) => (
                    <div key={h.day} className="flex justify-between items-center hover:bg-orange-50 px-3 py-2 rounded-lg transition-colors">
                      <span className="text-slate-600 font-semibold text-sm">{h.day}</span>
                      <span className="text-brand-amber font-bold text-sm">{h.time}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* What's Included */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="glass rounded-3xl p-6 sm:p-8"
              >
                <h3 className="font-display font-bold text-xl text-slate-800 mb-4">What's Included</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {includes.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-brand-green shrink-0" />
                      <span className="text-slate-700 text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right: Ticket Selector + CTA */}
            <div className="space-y-6">
              <TicketSelector />

              {/* Or call */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="glass rounded-2xl p-5 text-center"
              >
                <p className="text-slate-600 text-sm mb-3">Prefer to pay at the door?</p>
                <a
                  href="tel:7345222000"
                  className="btn-outline inline-flex py-3 px-6 justify-center"
                >
                  <Phone size={16} />
                  <span>Call (734) 522-2000</span>
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Floating decorations */}
        <div className="absolute left-8 top-1/3 hidden xl:block">
          <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity }} className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-3xl">🎈</motion.div>
        </div>
        <div className="absolute right-12 top-1/4 hidden xl:block">
          <motion.div whileHover={{ scale: 1.2, rotate: 12 }} className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-2xl cursor-pointer">⭐</motion.div>
        </div>
      </section>
    </div>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

function Counter({ target, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="counter-num">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

const stats = [
  { value: 15, suffix: '+', label: 'Years in Business', icon: '🏆' },
  { value: 50000, suffix: '+', label: 'Happy Kids Served', icon: '👧' },
  { value: 500, suffix: '+', label: 'Parties Hosted', icon: '🎉' },
  { value: 5, suffix: '★', label: 'Google Rating', icon: '⭐' },
];

export default function Stats() {
  return (
    <section id="stats" className="relative py-16 overflow-hidden">
      {/* Background strip */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-orange/10 via-dark-800 to-brand-cyan/10" />
      <div className="absolute inset-0 grid-overlay opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ scale: 1.04, y: -4 }}
              className="glass rounded-2xl p-6 text-center group cursor-default"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl sm:text-4xl font-black gradient-text font-display mb-1">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-white/50 font-semibold uppercase tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

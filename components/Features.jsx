'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const features = [
  {
    icon: '🏀',
    title: 'Tri-Level Playground',
    desc: 'Epic three-story adventure structure with tunnels, slides, and obstacles to conquer.',
    color: 'from-brand-orange to-brand-amber',
    glow: 'rgba(255,107,0,0.4)',
  },
  {
    icon: '🏃',
    title: 'Bounce Houses & Slides',
    desc: 'Giant inflatable attractions — bounce until you drop! Plus basketball hoops and trampolines.',
    color: 'from-brand-cyan to-blue-500',
    glow: 'rgba(0,212,255,0.4)',
  },
  {
    icon: '🎯',
    title: 'Obstacle Courses',
    desc: 'Test your speed and agility through our challenging obstacle course setups.',
    color: 'from-brand-purple to-pink-500',
    glow: 'rgba(168,85,247,0.4)',
  },
  {
    icon: '🎮',
    title: 'Play & Win Games',
    desc: 'Redemption arcade games where kids earn tickets to swap for awesome prizes.',
    color: 'from-brand-green to-teal-400',
    glow: 'rgba(16,233,129,0.4)',
  },
  {
    icon: '👶',
    title: 'Toddler Zone',
    desc: 'Dedicated safe play area for children 3 and under — let the little ones bounce too!',
    color: 'from-yellow-400 to-brand-amber',
    glow: 'rgba(255,215,0,0.4)',
  },
  {
    icon: '🍕',
    title: 'Concession Stand',
    desc: 'Fuel up with pizza, snacks, and refreshments from our full concession menu.',
    color: 'from-red-500 to-brand-orange',
    glow: 'rgba(255,107,0,0.4)',
  },
];

function FeatureCard({ feature, index }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -8;
    const rotY = ((x - cx) / cx) * 8;
    card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(10px)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(600px) rotateX(0) rotateY(0) translateZ(0)';
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'box-shadow 0.3s, transform 0.15s' }}
      className="relative glass rounded-3xl p-7 group cursor-default overflow-hidden"
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${feature.glow} 0%, transparent 70%)` }}
      />
      {/* Top gradient line */}
      <div className={`absolute top-0 left-6 right-6 h-px bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      <div className="relative">
        {/* Icon */}
        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} text-2xl mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          {feature.icon}
        </div>
        <h3 className="font-display font-bold text-xl text-white mb-3 group-hover:gradient-text transition-all">
          {feature.title}
        </h3>
        <p className="text-white/55 text-sm leading-relaxed">{feature.desc}</p>
      </div>
    </motion.div>
  );
}

export default function Features() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section ref={sectionRef} id="about" className="relative section-pad overflow-hidden">
      {/* Parallax blobs */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-purple/5 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-brand-orange/5 blur-[100px]" />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 text-xs uppercase tracking-widest font-semibold text-brand-orange"
          >
            What We Offer
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white mb-5"
          >
            Everything Kids{' '}
            <span className="gradient-text">Dream Of</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-xl mx-auto text-white/55 text-lg"
          >
            We maintain the cleanest bounce houses and indoor fun center in Michigan —
            sanitized daily so your family can play worry-free.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

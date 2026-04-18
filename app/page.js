'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ArrowRight, MapPin, Phone, Clock } from 'lucide-react';
import {
  PlaygroundIcon,
  BounceIcon,
  ObstacleIcon,
  GamesIcon,
  ToddlerIcon,
  FoodIcon,
} from '@/components/Icons';
import { useRef } from 'react';

const features = [
  {
    title: 'Tri-Level Playground',
    desc: 'Epic three-story adventure with tunnels, slides, and challenging obstacles.',
    icon: PlaygroundIcon,
    image: 'https://images.unsplash.com/photo-1513161455079-7ef1a827d4af?w=600&h=400&fit=crop',
    color: 'from-brand-orange to-brand-amber',
  },
  {
    title: 'Bounce Houses & Slides',
    desc: 'Giant inflatable attractions with basketball hoops and trampolines.',
    icon: BounceIcon,
    image: 'https://images.unsplash.com/photo-1596848212624-753bb62dc066?w=600&h=400&fit=crop',
    color: 'from-brand-cyan to-blue-500',
  },
  {
    title: 'Obstacle Courses',
    desc: 'Test your speed and agility through challenging course setups.',
    icon: ObstacleIcon,
    image: 'https://images.unsplash.com/photo-1576091160550-112173f7f869?w=600&h=400&fit=crop',
    color: 'from-brand-purple to-pink-500',
  },
  {
    title: 'Play & Win Games',
    desc: 'Arcade games where kids earn tickets for awesome prizes.',
    icon: GamesIcon,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=400&fit=crop',
    color: 'from-brand-green to-teal-400',
  },
  {
    title: 'Toddler Zone',
    desc: 'Safe dedicated play area for children 3 and under.',
    icon: ToddlerIcon,
    image: 'https://images.unsplash.com/photo-1503454537688-e47a34ff55a7?w=600&h=400&fit=crop',
    color: 'from-yellow-400 to-brand-amber',
  },
  {
    title: 'Concession Stand',
    desc: 'Pizza, snacks, and refreshments from our full menu.',
    icon: FoodIcon,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop',
    color: 'from-red-500 to-brand-orange',
  },
];

function FeatureCard({ feature, idx }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: idx * 0.1 }}
      className="group"
    >
      <div className="glass rounded-3xl overflow-hidden h-full hover:scale-105 transition-transform duration-300">
        {/* Image */}
        <div className="relative h-48 sm:h-56 overflow-hidden bg-dark-800">
          <Image
            src={feature.image}
            alt={feature.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          {/* Icon */}
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} text-white mb-3 text-2xl`}>
            <feature.icon />
          </div>
          <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-2">{feature.title}</h3>
          <p className="text-white/60 text-sm">{feature.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-0"
      >
        <motion.div style={{ y: bgY }} className="absolute inset-0">
          <div className="absolute inset-0 bg-hero-gradient" />
          <div className="absolute inset-0 grid-overlay opacity-40" />
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-brand-orange/10 blur-[120px]" />
          <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-brand-cyan/10 blur-[120px]" />
        </motion.div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 text-sm font-semibold"
          >
            <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
            Livonia's #1 Indoor Fun Center
            <Star size={12} className="text-brand-yellow fill-brand-yellow" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-black text-5xl sm:text-7xl lg:text-8xl leading-tight mb-6"
          >
            <span className="text-white">Everything Kids</span>
            <br />
            <span className="gradient-text">Dream Of</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg sm:text-xl text-white/60 mb-10"
          >
            The cleanest bounce houses and indoor fun center in Michigan. Parties, open play &
            memberships for all ages.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link href="/party-packages" className="btn-primary justify-center text-base py-4">
              <span>Book a Party</span>
              <ArrowRight size={18} />
            </Link>
            <Link href="/open-play" className="btn-outline justify-center text-base py-4">
              <span>Open Play Info</span>
            </Link>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-3 gap-4 sm:gap-8 max-w-md mx-auto"
          >
            {[
              { value: '15+', label: 'Years' },
              { value: '50K+', label: 'Kids' },
              { value: '5★', label: 'Rating' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl sm:text-3xl font-black gradient-text">{stat.value}</div>
                <div className="text-xs text-white/40 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-800/30 to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white mb-4">
              What We Offer
            </h2>
            <p className="text-white/55 text-lg">
              Six amazing attractions all under one roof
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <FeatureCard key={f.title} feature={f} idx={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Info Bar */}
      <section className="relative py-12 sm:py-16 overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: <Clock size={24} className="text-brand-orange" />,
                title: 'Hours',
                text: 'Mon–Thu 12–8 PM\nFri 12–9 PM\nSat 10–9 PM\nSun 10–8 PM',
              },
              {
                icon: <MapPin size={24} className="text-brand-cyan" />,
                title: 'Location',
                text: '30276 Plymouth Rd\nLivonia, MI 48150\nAcross from Walmart',
              },
              {
                icon: <Phone size={24} className="text-brand-purple" />,
                title: 'Contact',
                text: '📞 (734) 522-2000\n📧 office@\nbounceituplivonia.com',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-6 text-center"
              >
                <div className="flex justify-center mb-3">{item.icon}</div>
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-white/60 whitespace-pre-line">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

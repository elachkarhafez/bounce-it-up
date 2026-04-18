'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
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
import ParticleCanvas from '@/components/ParticleCanvas';
import { useScrambleText } from '@/components/useScrambleText';
import { useRef, useState, useEffect } from 'react';

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
  const cardRef = useRef(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    setRotX(((y - cy) / cy) * -8);
    setRotY(((x - cx) / cx) * 8);
  };

  const handleMouseLeave = () => {
    setRotX(0);
    setRotY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(10px)`,
        transition: 'box-shadow 0.3s, transform 0.15s',
      }}
      className="group relative"
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${feature.color.replace('from-', '').replace(' to-', ', ')})`,
        }}
      />

      <div className="glass rounded-3xl overflow-hidden h-full relative z-10 group-hover:ring-2 group-hover:ring-brand-orange/50 transition-all">
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
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} text-white mb-3 flex items-center justify-center`}
          >
            <feature.icon />
          </motion.div>
          <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-2 group-hover:gradient-text transition-all">
            {feature.title}
          </h3>
          <p className="text-white/60 text-sm">{feature.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

function Counter({ target, suffix = '' }) {
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
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const scrambleTitle = useScrambleText('BOUNCE IT UP', 400);

  return (
    <>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-0"
      >
        {/* Parallax Background */}
        <motion.div style={{ y: bgY }} className="absolute inset-0">
          <div className="absolute inset-0 bg-hero-gradient" />
          <div className="absolute inset-0 grid-overlay opacity-40" />
          <ParticleCanvas />
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-brand-orange/10 blur-[120px]" />
          <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-brand-cyan/10 blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-brand-purple/5 blur-[150px]" />
        </motion.div>

        {/* Content */}
        <motion.div
          style={{ y: bgY, opacity }}
          className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 text-sm font-semibold"
          >
            <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
            Livonia's #1 Indoor Fun Center
            <Star size={12} className="text-brand-yellow fill-brand-yellow" />
          </motion.div>

          {/* Scramble Text Title */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="font-display font-black leading-[0.9] mb-6"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            <span className="block text-5xl sm:text-7xl lg:text-9xl tracking-tight text-white/90">
              {scrambleTitle}
            </span>
            <span className="block gradient-text text-4xl sm:text-6xl lg:text-8xl mt-2">
              PARTY
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-2xl mx-auto text-lg sm:text-xl text-white/60 leading-relaxed mb-10"
          >
            Bounce houses, slides, obstacle courses, and endless fun for kids of all ages.
            Birthday parties, open play & memberships — all in{' '}
            <span className="text-brand-orange font-semibold">Livonia, Michigan.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link href="/party-packages" className="btn-primary text-base py-4 px-8 glow-orange inline-flex">
                <span>Book a Party Now</span>
                <ArrowRight size={18} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link href="/open-play" className="btn-outline text-base py-4 px-8 inline-flex">
                <span>Open Play Info</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap justify-center gap-8 sm:gap-16"
          >
            {[
              { value: 15, suffix: '+', label: 'Years of Fun' },
              { value: 50000, suffix: '+', label: 'Happy Kids' },
              { value: 5, suffix: '★', label: 'Google Rating' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <motion.div
                  className="text-3xl sm:text-4xl font-black gradient-text font-display"
                  whileInView={{ scale: [0.9, 1.1, 1] }}
                  viewport={{ once: true }}
                >
                  <Counter target={stat.value} suffix={stat.suffix} />
                </motion.div>
                <div className="text-xs text-white/50 mt-1 uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Floating Decorative Elements */}
        <div className="absolute left-8 top-1/3 hidden xl:block float-anim">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-3xl"
          >
            🎈
          </motion.div>
        </div>
        <div className="absolute right-12 top-1/4 hidden xl:block float-anim-2">
          <motion.div
            whileHover={{ scale: 1.2, rotate: 12 }}
            className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-2xl cursor-pointer"
          >
            ⭐
          </motion.div>
        </div>
        <div className="absolute left-16 bottom-32 hidden xl:block float-anim-3">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-2xl"
          >
            🎉
          </motion.div>
        </div>
        <div className="absolute right-8 bottom-40 hidden xl:block float-anim">
          <motion.div
            whileHover={{ scale: 1.15 }}
            className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-3xl cursor-pointer"
          >
            🎂
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.button
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowRight size={20} className="rotate-90" />
        </motion.button>
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

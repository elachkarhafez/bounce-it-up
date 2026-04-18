'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Star, Zap, Calendar } from 'lucide-react';

/* ── Particle Canvas ────────────────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#FF6B00', '#FF9500', '#FFD700', '#00D4FF', '#A855F7', '#10E981'];
    const particles = Array.from({ length: 80 }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 4 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      alpha: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.02;
        const pulsedAlpha = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse));
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.save();
        ctx.globalAlpha = pulsedAlpha;
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.restore();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

/* ── Scramble Text Hook ─────────────────────────────────────────── */
function useScrambleText(target, delay = 0) {
  const [text, setText] = useState('');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';

  useEffect(() => {
    let timeout;
    let interval;
    let iteration = 0;

    timeout = setTimeout(() => {
      interval = setInterval(() => {
        setText(
          target
            .split('')
            .map((char, idx) => {
              if (idx < iteration) return target[idx];
              if (char === ' ') return ' ';
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );
        if (iteration >= target.length) clearInterval(interval);
        iteration += 0.5;
      }, 40);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [target, delay]);

  return text || target;
}

/* ── Hero ───────────────────────────────────────────────────────── */
export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const scrambleTitle = useScrambleText('BOUNCE IT UP', 400);

  const handleNav = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Parallax Background ───────────────────────────── */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        {/* Deep gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800" />
        {/* Grid */}
        <div className="absolute inset-0 grid-overlay opacity-60" />
        {/* Orange glow */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-brand-orange/10 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-brand-cyan/10 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-brand-purple/5 blur-[150px]" />
        {/* Particles */}
        <ParticleCanvas />
      </motion.div>

      {/* ── Content ───────────────────────────────────────── */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 text-sm font-semibold"
        >
          <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
          <span className="text-white/70">Livonia&apos;s #1 Indoor Fun Center</span>
          <Star size={12} className="text-brand-yellow fill-brand-yellow" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
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
          transition={{ duration: 0.8, delay: 0.5 }}
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
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <motion.button
            onClick={() => handleNav('#booking')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary text-base py-4 px-8 glow-orange"
          >
            <Calendar size={18} />
            <span>Book a Party Now</span>
          </motion.button>
          <motion.button
            onClick={() => handleNav('#open-play')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="btn-outline text-base py-4 px-8"
          >
            <Zap size={18} />
            <span>Open Play Info</span>
          </motion.button>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-wrap justify-center gap-8 sm:gap-16"
        >
          {[
            { value: '15+', label: 'Years of Fun' },
            { value: '50K+', label: 'Happy Kids' },
            { value: '5★', label: 'Google Rating' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-black gradient-text font-display">{stat.value}</div>
              <div className="text-xs text-white/50 mt-1 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Floating Decorative Elements ──────────────────── */}
      <div className="absolute left-8 top-1/3 hidden xl:block float-anim">
        <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-3xl rotate-12">🎈</div>
      </div>
      <div className="absolute right-12 top-1/4 hidden xl:block float-anim-2">
        <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-2xl -rotate-12">⭐</div>
      </div>
      <div className="absolute left-16 bottom-32 hidden xl:block float-anim-3">
        <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-2xl rotate-6">🎉</div>
      </div>
      <div className="absolute right-8 bottom-40 hidden xl:block float-anim">
        <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-3xl -rotate-6">🎂</div>
      </div>

      {/* ── Scroll Indicator ──────────────────────────────── */}
      <motion.button
        onClick={() => handleNav('#stats')}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ArrowDown size={20} />
      </motion.button>
    </section>
  );
}

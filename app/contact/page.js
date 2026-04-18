'use client';

import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Phone, Mail, CheckCircle, Send } from 'lucide-react';
import ParticleCanvas from '@/components/ParticleCanvas';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSent(true);
    setSending(false);
  };

  return (
    <div className="min-h-screen pt-32 sm:pt-40 pb-20">
      <section ref={heroRef} className="relative py-12 sm:py-20 overflow-hidden min-h-screen flex items-center">
        {/* Parallax Background */}
        <motion.div style={{ y: bgY }} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />
          <ParticleCanvas />
          <div className="absolute inset-0 grid-overlay opacity-40" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-orange/5 blur-[120px]" />
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-brand-cyan/5 blur-[120px]" />
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
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
              Contact
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="font-display font-black leading-[0.9] mb-6"
            >
              <span className="block text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white/90">
                Come Visit
              </span>
              <span className="block gradient-text text-4xl sm:text-6xl lg:text-7xl mt-2">
                Us
              </span>
            </motion.h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid lg:grid-cols-2 gap-8 lg:gap-12"
          >
            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-6"
            >
              {/* Map */}
              <div className="rounded-3xl overflow-hidden h-64 sm:h-80 glass">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2950.1!2d-83.352!3d42.378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s30276+Plymouth+Rd%2C+Livonia%2C+MI+48150!5e0!3m2!1sen!2sus!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>

              {/* Details */}
              <div className="glass rounded-3xl p-6 sm:p-8 space-y-6">
                {[
                  {
                    icon: <MapPin size={20} className="text-brand-orange" />,
                    label: 'Address',
                    value: '30276 Plymouth Rd, Livonia, MI 48150',
                    href: 'https://maps.google.com/?q=30276+Plymouth+Rd,+Livonia,+MI+48150',
                  },
                  {
                    icon: <Phone size={20} className="text-brand-cyan" />,
                    label: 'Phone',
                    value: '(734) 522-2000',
                    href: 'tel:7345222000',
                  },
                  {
                    icon: <Mail size={20} className="text-brand-purple" />,
                    label: 'Email',
                    value: 'office@bounceituplivonia.com',
                    href: 'mailto:office@bounceituplivonia.com',
                  },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('https') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 group hover:bg-white/3 p-3 rounded-xl transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl glass flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xs text-white/40 uppercase tracking-wide mb-0.5">
                        {item.label}
                      </div>
                      <div className="text-sm text-white/80 group-hover:text-white transition-colors">
                        {item.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="glass rounded-3xl p-6 sm:p-8 h-full">
                {sent ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12">
                    <CheckCircle size={48} className="text-brand-green mb-4" />
                    <h3 className="font-display font-bold text-2xl text-white mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-white/50 mb-6">
                      We'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }); }}
                      className="btn-outline text-sm py-2"
                    >
                      Send Another
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="font-display font-bold text-2xl text-white mb-6">
                      Send us a Message
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label className="block text-xs text-white/50 mb-1.5 font-semibold uppercase">
                          Name
                        </label>
                        <input
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Your name"
                          className="w-full px-4 py-3 rounded-xl glass border border-white/10 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 text-white placeholder-white/25 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-white/50 mb-1.5 font-semibold uppercase">
                          Email
                        </label>
                        <input
                          required
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 rounded-xl glass border border-white/10 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 text-white placeholder-white/25 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-white/50 mb-1.5 font-semibold uppercase">
                          Message
                        </label>
                        <textarea
                          required
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          placeholder="How can we help?"
                          rows={5}
                          className="w-full px-4 py-3 rounded-xl glass border border-white/10 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 text-white placeholder-white/25 outline-none transition-all resize-none"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={sending}
                        className="btn-primary w-full justify-center py-4 text-base disabled:opacity-60"
                      >
                        <Send size={18} />
                        <span>{sending ? 'Sending...' : 'Send Message'}</span>
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>

        {/* Floating Decorative Elements */}
        <div className="absolute left-8 top-1/3 hidden xl:block">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-3xl"
          >
            📍
          </motion.div>
        </div>
        <div className="absolute right-12 bottom-1/3 hidden xl:block">
          <motion.div
            whileHover={{ scale: 1.2 }}
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-2xl cursor-pointer"
          >
            📧
          </motion.div>
        </div>
        </div>
      </section>
    </div>
  );
}

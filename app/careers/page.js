'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { CheckCircle, Send, Briefcase, Clock, Heart, Loader2 } from 'lucide-react';
import ParticleCanvas from '@/components/ParticleCanvas';

const positions = [
  'Party Host / Event Coordinator',
  'Floor Staff / Play Attendant',
  'Concession Stand Worker',
  'Front Desk / Customer Service',
  'Cleaning & Maintenance',
  'Assistant Manager',
  'Other',
];

const perks = [
  { icon: '🎉', label: 'Fun Work Environment' },
  { icon: '⏰', label: 'Flexible Scheduling' },
  { icon: '🎂', label: 'Free Birthday Parties' },
  { icon: '💰', label: 'Competitive Pay' },
  { icon: '👥', label: 'Great Team Culture' },
  { icon: '📈', label: 'Growth Opportunities' },
];

export default function CareersPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', position: '', experience: '',
    availability: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/hiring', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) setSubmitted(true);
      else throw new Error(data.error || 'Submission failed');
    } catch (err) {
      setError('Something went wrong. Please email us directly at office@bounceituplivonia.com');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-3xl p-10 max-w-lg w-full text-center"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-green to-teal-400 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-white" />
          </div>
          <h2 className="font-display font-black text-3xl text-slate-800 mb-4">Application Sent! 🎉</h2>
          <p className="text-slate-600 mb-8">
            Thanks for your interest, <strong>{form.name}</strong>! We'll review your application and reach out within 3–5 business days.
          </p>
          <a href="/" className="btn-primary inline-flex justify-center py-3 px-6">Back to Home</a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 sm:pt-40 pb-20">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-purple-50/30 to-orange-50/20" />
        <ParticleCanvas />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 text-sm font-semibold">
            <Briefcase size={14} className="text-brand-purple" />
            We're Hiring!
          </div>
          <h1 className="font-display font-black text-5xl sm:text-6xl text-slate-800 mb-4">
            Join Our <span className="gradient-text">Team</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-600 text-lg">
            Work where the fun never stops. Bounce It Up is looking for energetic, friendly people who love making kids happy!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left: Why work here */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass rounded-3xl p-6">
              <h3 className="font-display font-bold text-xl text-slate-800 mb-5 flex items-center gap-2">
                <Heart size={18} className="text-brand-orange" />
                Why Work Here?
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {perks.map((perk) => (
                  <div key={perk.label} className="flex items-center gap-2 bg-orange-50 rounded-xl p-3 border border-orange-100">
                    <span className="text-xl">{perk.icon}</span>
                    <span className="text-xs font-semibold text-slate-700">{perk.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-3xl p-6">
              <h3 className="font-display font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                <Clock size={16} className="text-brand-cyan" />
                Open Positions
              </h3>
              <ul className="space-y-2">
                {positions.slice(0, -1).map((pos) => (
                  <li key={pos} className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                    {pos}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass rounded-3xl p-6 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100">
              <p className="text-sm text-slate-700 font-semibold mb-1">📍 Location</p>
              <p className="text-sm text-slate-600">30276 Plymouth Rd<br />Livonia, MI 48150</p>
              <p className="text-sm text-slate-700 font-semibold mt-3 mb-1">📞 Questions?</p>
              <a href="tel:7345222000" className="text-brand-orange hover:underline text-sm font-bold">(734) 522-2000</a>
            </div>
          </motion.div>

          {/* Right: Application Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-3xl p-6 sm:p-8">
              <h3 className="font-display font-bold text-2xl text-slate-800 mb-6">Apply Now</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name + Email */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-500 mb-1 font-semibold uppercase tracking-wide">Full Name *</label>
                    <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your name" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 text-slate-800 placeholder-slate-300 outline-none transition-all text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1 font-semibold uppercase tracking-wide">Email *</label>
                    <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="you@email.com" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 text-slate-800 placeholder-slate-300 outline-none transition-all text-sm" />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs text-slate-500 mb-1 font-semibold uppercase tracking-wide">Phone Number</label>
                  <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="(555) 555-5555" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 text-slate-800 placeholder-slate-300 outline-none transition-all text-sm" />
                </div>

                {/* Position */}
                <div>
                  <label className="block text-xs text-slate-500 mb-1 font-semibold uppercase tracking-wide">Position Applying For *</label>
                  <select required value={form.position} onChange={e => setForm({...form, position: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 text-slate-800 outline-none transition-all text-sm">
                    <option value="">Select a position...</option>
                    {positions.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-xs text-slate-500 mb-1 font-semibold uppercase tracking-wide">Relevant Experience</label>
                  <input value={form.experience} onChange={e => setForm({...form, experience: e.target.value})} placeholder="e.g. 2 years customer service, childcare experience..." className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 text-slate-800 placeholder-slate-300 outline-none transition-all text-sm" />
                </div>

                {/* Availability */}
                <div>
                  <label className="block text-xs text-slate-500 mb-1 font-semibold uppercase tracking-wide">Availability</label>
                  <input value={form.availability} onChange={e => setForm({...form, availability: e.target.value})} placeholder="e.g. Weekends only, full-time, after 3pm..." className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 text-slate-800 placeholder-slate-300 outline-none transition-all text-sm" />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs text-slate-500 mb-1 font-semibold uppercase tracking-wide">Tell Us About Yourself</label>
                  <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Why do you want to work at Bounce It Up? Anything else we should know?" rows={4} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 text-slate-800 placeholder-slate-300 outline-none transition-all resize-none text-sm" />
                </div>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={{ scale: submitting ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary w-full justify-center py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <><Loader2 size={18} className="animate-spin" /><span>Sending Application...</span></>
                  ) : (
                    <><Send size={18} /><span>Submit Application</span></>
                  )}
                </motion.button>

                <p className="text-xs text-slate-400 text-center">
                  Your application will be sent directly to our hiring team. We'll respond within 3–5 business days.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

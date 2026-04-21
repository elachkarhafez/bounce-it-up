'use client';

import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { CheckCircle, Download, Shield, AlertTriangle, PenLine, ChevronDown } from 'lucide-react';
import ParticleCanvas from '@/components/ParticleCanvas';

const waiverTerms = [
  {
    num: '1',
    title: 'Acknowledgment of Risk',
    text: 'I understand and acknowledge that inflatable bouncing and recreational play activities involve recognized and unforeseen dangers that could result in physical or emotional injury, paralysis, death, or damage to myself, my child(ren), or third parties. Risks include but are not limited to: sprains, fractures, scrapes, bruises, dislocations, and serious head, back, or neck injuries.',
  },
  {
    num: '2',
    title: 'Assumption of Risk',
    text: 'I voluntarily agree to accept and assume all of the risks existing in the activities at Bounce It Up Party. My participation in these activities is purely voluntary and I elect to participate in spite of known and unknown risks.',
  },
  {
    num: '3',
    title: 'Release of Liability',
    text: 'I agree to release, and agree to guarantee and hold Bounce It Up Party, its owners, employees, agents, and all associated parties safe from any and all claims, actions, suits, procedures, costs, expenses, damages, and liabilities, including attorney\'s fees, arising out of or in any way connected with participation in activities at Bounce It Up Party.',
  },
  {
    num: '4',
    title: 'Attorney\'s Fees',
    text: 'In the event Bounce It Up Party is required to enforce this agreement, I agree to pay all attorney\'s fees and costs associated with such enforcement.',
  },
  {
    num: '5',
    title: 'Insurance & Medical Responsibility',
    text: 'I confirm I have sufficient personal insurance or I agree to bear the cost of any injury, medical treatment, or emergency services required during participation. Bounce It Up Party is not responsible for any medical expenses incurred.',
  },
  {
    num: '6',
    title: 'Health & Safety Compliance',
    text: 'I acknowledge risks including contusions, fractures, scrapes, cuts, bumps, paralysis, or death, as well as potential exposure to bacteria, fungus, viruses, and COVID-19. I confirm all participants are in good health. Staff may deny access based on visible symptoms or safety concerns. All participants must wear socks at all times.',
  },
];

export default function WaiverPage() {
  const [childCount, setChildCount] = useState(1);
  const [children, setChildren] = useState([{ name: '' }]);
  const [guardian, setGuardian] = useState({ name: '', phone: '', email: '' });
  const [agreed, setAgreed] = useState(false);
  const [signature, setSignature] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [promo, setPromo] = useState(false);

  const updateChildCount = (n) => {
    const count = Math.min(10, Math.max(1, n));
    setChildCount(count);
    setChildren(Array.from({ length: count }, (_, i) => children[i] || { name: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed || !signature.trim()) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 800));
    setSubmitted(true);
    setSubmitting(false);
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
          <h2 className="font-display font-black text-3xl text-slate-800 mb-4">Waiver Signed! 🎉</h2>
          <p className="text-slate-600 mb-6">
            Thank you, <strong>{guardian.name}</strong>! Your waiver for {childCount} child{childCount > 1 ? 'ren' : ''} has been recorded.
            You're all set to bounce!
          </p>
          <div className="bg-orange-50 rounded-2xl p-4 mb-6 border border-orange-100">
            <p className="text-brand-orange font-semibold text-sm">📧 A copy has been sent to {guardian.email}</p>
          </div>
          <a href="/" className="btn-primary inline-flex justify-center py-3 px-6">
            Back to Home
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 sm:pt-40 pb-20">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-orange-50/30 to-purple-50/30" />
        <ParticleCanvas />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 text-sm font-semibold">
            <Shield size={14} className="text-brand-orange" />
            Digital Liability Waiver
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-slate-800 mb-4">
            Have Fun, <span className="gradient-text">Play Safe</span>
          </h1>
          <p className="text-slate-600">
            Participant Agreement, Release and Assumption of Risk
          </p>
          {/* Download PDF */}
          <a
            href="/docs/waiver.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-sm text-brand-orange hover:underline font-semibold"
          >
            <Download size={14} />
            Download printable PDF version
          </a>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Warning Banner */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4"
          >
            <AlertTriangle size={20} className="text-amber-500 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              <strong>Please read carefully.</strong> This waiver contains important information about assumption of risk and release of liability. All participants must have a signed waiver on file before entering.
            </p>
          </motion.div>

          {/* Waiver Terms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-3xl overflow-hidden"
          >
            <div className="p-6 sm:p-8 max-h-[420px] overflow-y-auto space-y-5 scrollbar-thin">
              {waiverTerms.map((term) => (
                <div key={term.num}>
                  <h3 className="font-bold text-slate-800 mb-1 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-gradient-to-br from-brand-orange to-brand-amber text-white text-xs flex items-center justify-center font-black shrink-0">
                      {term.num}
                    </span>
                    {term.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed pl-8">{term.text}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-100 p-4 bg-slate-50/50 flex items-center gap-2">
              <ChevronDown size={14} className="text-slate-400" />
              <span className="text-xs text-slate-500">Scroll to read all terms</span>
            </div>
          </motion.div>

          {/* Children Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-3xl p-6 sm:p-8"
          >
            <h3 className="font-display font-bold text-xl text-slate-800 mb-6">Participating Children</h3>

            <div className="mb-5">
              <label className="block text-xs text-slate-500 mb-2 font-semibold uppercase tracking-wide">
                Number of Children
              </label>
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => updateChildCount(childCount - 1)} className="w-10 h-10 rounded-xl glass border border-slate-200 flex items-center justify-center font-bold text-slate-600 hover:bg-red-50 transition-all">-</button>
                <span className="text-2xl font-black text-slate-800 w-8 text-center">{childCount}</span>
                <button type="button" onClick={() => updateChildCount(childCount + 1)} className="w-10 h-10 rounded-xl bg-brand-orange text-white flex items-center justify-center font-bold hover:bg-brand-amber transition-all">+</button>
                <span className="text-sm text-slate-500 ml-2">child{childCount > 1 ? 'ren' : ''}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {children.map((child, i) => (
                <div key={i}>
                  <label className="block text-xs text-slate-500 mb-1 font-semibold uppercase tracking-wide">
                    Child {i + 1} Name
                  </label>
                  <input
                    required
                    value={child.name}
                    onChange={(e) => {
                      const updated = [...children];
                      updated[i] = { name: e.target.value };
                      setChildren(updated);
                    }}
                    placeholder={`Child ${i + 1} full name`}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 text-slate-800 placeholder-slate-300 outline-none transition-all text-sm"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Guardian Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-3xl p-6 sm:p-8"
          >
            <h3 className="font-display font-bold text-xl text-slate-800 mb-6">Parent / Guardian Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-slate-500 mb-1 font-semibold uppercase tracking-wide">Full Name *</label>
                <input required value={guardian.name} onChange={e => setGuardian({...guardian, name: e.target.value})} placeholder="Your full legal name" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 text-slate-800 placeholder-slate-300 outline-none transition-all" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-500 mb-1 font-semibold uppercase tracking-wide">Phone *</label>
                  <input required type="tel" value={guardian.phone} onChange={e => setGuardian({...guardian, phone: e.target.value})} placeholder="(555) 555-5555" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 text-slate-800 placeholder-slate-300 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1 font-semibold uppercase tracking-wide">Email *</label>
                  <input required type="email" value={guardian.email} onChange={e => setGuardian({...guardian, email: e.target.value})} placeholder="you@email.com" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 text-slate-800 placeholder-slate-300 outline-none transition-all" />
                </div>
              </div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={promo} onChange={e => setPromo(e.target.checked)} className="mt-1 rounded border-slate-300 text-brand-orange focus:ring-brand-orange" />
                <span className="text-sm text-slate-600">I'd like to receive promotions and event updates from Bounce It Up Party</span>
              </label>
            </div>
          </motion.div>

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass rounded-3xl p-6 sm:p-8"
          >
            <h3 className="font-display font-bold text-xl text-slate-800 mb-2 flex items-center gap-2">
              <PenLine size={20} className="text-brand-orange" />
              Electronic Signature
            </h3>
            <p className="text-sm text-slate-600 mb-5">
              By typing your full name below and checking the box, you are electronically signing this waiver. Your electronic signature is legally binding and equivalent to a handwritten signature.
            </p>
            <div>
              <label className="block text-xs text-slate-500 mb-1 font-semibold uppercase tracking-wide">Type Your Full Name to Sign *</label>
              <input
                required
                value={signature}
                onChange={e => setSignature(e.target.value)}
                placeholder="Your full legal name"
                className="w-full px-4 py-3 rounded-xl border-2 border-brand-orange/30 bg-white focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 text-slate-800 placeholder-slate-300 outline-none transition-all font-semibold text-lg"
                style={{ fontFamily: 'Georgia, serif' }}
              />
            </div>
            <label className="flex items-start gap-3 cursor-pointer mt-4">
              <input
                type="checkbox"
                required
                checked={agreed}
                onChange={e => setAgreed(e.target.checked)}
                className="mt-1 rounded border-slate-300 text-brand-orange focus:ring-brand-orange"
              />
              <span className="text-sm text-slate-700 font-medium">
                I have read, understand, and agree to all terms of this waiver. I confirm I am the parent or legal guardian of the children listed, and I have the authority to sign on their behalf.
              </span>
            </label>
          </motion.div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={submitting || !agreed || !signature.trim()}
            whileHover={{ scale: submitting ? 1 : 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="btn-primary w-full justify-center py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <span>Submitting Waiver...</span>
            ) : (
              <><Shield size={18} /><span>Submit Signed Waiver</span></>
            )}
          </motion.button>

          <p className="text-xs text-slate-400 text-center">
            Submitted {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} ·
            Your information is kept private and used only for liability purposes.
          </p>
        </form>
      </div>
    </div>
  );
}

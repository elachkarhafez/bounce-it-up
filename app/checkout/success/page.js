'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircle, ArrowRight, Phone, Mail } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SuccessContent() {
  const params = useSearchParams();
  const type = params.get('type') || '';

  const isDeposit = type.includes('deposit');
  const isOpenPlay = type.includes('open-play');
  const isMembership = type.includes('membership');

  const getMessage = () => {
    if (isDeposit) return { title: "Party Booked! 🎉", sub: "Your $100 deposit is confirmed. We'll call you within 24 hours to finalize all the details. The remaining balance is due on your party day.", next: "Expect a call from us at (734) 522-2000" };
    if (isOpenPlay) return { title: "You're All Set! 🎈", sub: "Your Open Play admission is confirmed. Just show this confirmation at the door and jump right in!", next: "Save your confirmation email as your ticket" };
    if (isMembership) return { title: "Welcome to the Club! ⭐", sub: "Your membership is active! You can now enjoy unlimited open play and all your exclusive member benefits.", next: "Check your email for your membership details" };
    return { title: "Payment Confirmed! ✅", sub: "Thank you for your payment. You'll receive a confirmation email shortly.", next: "Keep your confirmation email" };
  };

  const msg = getMessage();

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass rounded-3xl p-8 sm:p-12 max-w-lg w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2, damping: 10 }}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-green to-teal-400 flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle size={40} className="text-white" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-display font-black text-3xl sm:text-4xl text-slate-800 mb-4"
        >
          {msg.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-slate-600 text-lg leading-relaxed mb-6"
        >
          {msg.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-brand-orange/10 rounded-2xl p-4 mb-8 border border-brand-orange/20"
        >
          <p className="text-brand-orange font-semibold text-sm">📋 {msg.next}</p>
        </motion.div>

        <div className="space-y-3 mb-8">
          <a href="tel:7345222000" className="flex items-center justify-center gap-2 text-slate-600 hover:text-brand-orange transition-colors">
            <Phone size={16} />
            <span className="text-sm font-semibold">(734) 522-2000</span>
          </a>
          <a href="mailto:office@bounceituplivonia.com" className="flex items-center justify-center gap-2 text-slate-600 hover:text-brand-orange transition-colors">
            <Mail size={16} />
            <span className="text-sm font-semibold">office@bounceituplivonia.com</span>
          </a>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-outline py-3 px-6 text-sm justify-center">
            Back to Home
          </Link>
          <Link href="/party-packages" className="btn-primary py-3 px-6 text-sm justify-center">
            <span>View Packages</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen pt-20">
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-slate-600">Loading...</div></div>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}

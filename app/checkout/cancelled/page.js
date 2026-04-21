'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { XCircle, ArrowLeft, Phone } from 'lucide-react';

export default function CheckoutCancelledPage() {
  return (
    <div className="min-h-screen pt-20 flex items-center justify-center py-20 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-3xl p-8 sm:p-12 max-w-md w-full text-center"
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center mx-auto mb-6">
          <XCircle size={40} className="text-white" />
        </div>

        <h1 className="font-display font-black text-3xl text-slate-800 mb-4">
          Payment Cancelled
        </h1>
        <p className="text-slate-600 mb-8">
          No worries — your payment was not charged. You can try again anytime or give us a call to book over the phone.
        </p>

        <a href="tel:7345222000" className="btn-primary w-full justify-center mb-3 py-3">
          <Phone size={18} />
          <span>Call (734) 522-2000</span>
        </a>
        <Link href="/party-packages" className="btn-outline w-full justify-center py-3 flex">
          <ArrowLeft size={18} />
          <span>Back to Packages</span>
        </Link>
      </motion.div>
    </div>
  );
}

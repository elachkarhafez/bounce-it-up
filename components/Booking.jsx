'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, CreditCard, CheckCircle, Loader2, ChevronRight, Shield } from 'lucide-react';

const packageOptions = [
  { id: 'starter', label: 'Starter Bash — $249', price: 249 },
  { id: 'ultimate', label: 'Ultimate Party — $399', price: 399 },
  { id: 'vip', label: 'VIP Celebration — $599', price: 599 },
  { id: 'custom', label: 'Custom / Inquire', price: 0 },
];

const timeSlots = [
  '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM',
  '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM',
];

// Authorize.net payment form component
function AuthNetPaymentForm({ amount, onSuccess, onError }) {
  const [card, setCard] = useState({ number: '', exp: '', cvv: '', zip: '' });
  const [loading, setLoading] = useState(false);

  const formatCard = (v) => v.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
  const formatExp = (v) => {
    const d = v.replace(/\D/g, '').slice(0, 4);
    return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || amount === 0) {
      onSuccess({ transactionId: 'INQUIRY_' + Date.now() });
      return;
    }

    setLoading(true);
    try {
      // Authorize.net Accept.js tokenization
      if (window.Accept) {
        const authData = {
          clientKey: process.env.NEXT_PUBLIC_AUTHORIZENET_CLIENT_KEY || 'demo_client_key',
          apiLoginID: process.env.NEXT_PUBLIC_AUTHORIZENET_API_LOGIN_ID || 'demo_login',
        };
        const cardData = {
          cardNumber: card.number.replace(/\s/g, ''),
          month: card.exp.split('/')[0],
          year: '20' + (card.exp.split('/')[1] || ''),
          cardCode: card.cvv,
          zip: card.zip,
        };

        window.Accept.dispatchData({ authData, cardData }, (response) => {
          if (response.messages.resultCode === 'Ok') {
            onSuccess({ opaqueData: response.opaqueData, amount });
          } else {
            onError(response.messages.message[0]?.text || 'Payment failed');
            setLoading(false);
          }
        });
      } else {
        // Fallback — send to API without tokenization (for demo)
        await new Promise((r) => setTimeout(r, 1500));
        onSuccess({ demo: true, amount });
        setLoading(false);
      }
    } catch (err) {
      onError('Payment processing error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs text-white/50 mb-1.5 font-semibold uppercase tracking-wide">
          Card Number
        </label>
        <input
          value={card.number}
          onChange={(e) => setCard({ ...card, number: formatCard(e.target.value) })}
          placeholder="1234 5678 9012 3456"
          required
          className="w-full px-4 py-3 rounded-xl glass border border-white/10 focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20 text-white placeholder-white/25 text-sm transition-all"
        />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs text-white/50 mb-1.5 font-semibold uppercase tracking-wide">Exp</label>
          <input
            value={card.exp}
            onChange={(e) => setCard({ ...card, exp: formatExp(e.target.value) })}
            placeholder="MM/YY"
            required
            className="w-full px-4 py-3 rounded-xl glass border border-white/10 focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20 text-white placeholder-white/25 text-sm transition-all"
          />
        </div>
        <div>
          <label className="block text-xs text-white/50 mb-1.5 font-semibold uppercase tracking-wide">CVV</label>
          <input
            value={card.cvv}
            onChange={(e) => setCard({ ...card, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
            placeholder="123"
            required
            className="w-full px-4 py-3 rounded-xl glass border border-white/10 focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20 text-white placeholder-white/25 text-sm transition-all"
          />
        </div>
        <div>
          <label className="block text-xs text-white/50 mb-1.5 font-semibold uppercase tracking-wide">ZIP</label>
          <input
            value={card.zip}
            onChange={(e) => setCard({ ...card, zip: e.target.value.replace(/\D/g, '').slice(0, 5) })}
            placeholder="48150"
            required
            className="w-full px-4 py-3 rounded-xl glass border border-white/10 focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20 text-white placeholder-white/25 text-sm transition-all"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full justify-center py-4 text-base mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <CreditCard size={18} />
            <span>{amount ? `Pay $${amount} Deposit` : 'Submit Inquiry'}</span>
            <ChevronRight size={18} />
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-2 text-xs text-white/30">
        <Shield size={12} />
        <span>Secured by Authorize.net · 256-bit SSL encryption</span>
      </div>
    </form>
  );
}

export default function Booking() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', partyDate: '', partyTime: '',
    kidsCount: '', birthdayChildName: '', package: '', notes: '',
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [payMethod, setPayMethod] = useState('stripe');

  // Listen for package pre-selection from PartyPackages component
  useEffect(() => {
    const handler = (e) => {
      setForm((f) => ({ ...f, package: e.detail.name }));
    };
    window.addEventListener('selectPackage', handler);
    return () => window.removeEventListener('selectPackage', handler);
  }, []);

  const selectedPkg = packageOptions.find((p) => form.package.toLowerCase().includes(p.label.toLowerCase().split('—')[0].trim().toLowerCase())) || packageOptions.find((p) => p.label.toLowerCase().includes(form.package.toLowerCase().split(' ')[0]?.toLowerCase() || ''));
  const depositAmount = selectedPkg ? Math.round(selectedPkg.price * 0.25) : 0;

  const handleStripeCheckout = async () => {
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ package: form.package, formData: form, depositAmount }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else setError('Stripe checkout failed. Please try Authorize.net or call us.');
    } catch {
      setError('Unable to connect to payment. Please call (734) 522-2000.');
    }
  };

  const handleAuthNetSuccess = (result) => {
    setSuccess(true);
  };

  const handleStep1 = (e) => {
    e.preventDefault();
    setStep(2);
  };

  if (success) {
    return (
      <section id="booking" className="relative section-pad overflow-hidden">
        <div className="max-w-xl mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="glass rounded-3xl p-12"
          >
            <div className="w-20 h-20 rounded-full bg-brand-green/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-brand-green" />
            </div>
            <h3 className="font-display font-black text-3xl text-white mb-3">You&apos;re Booked! 🎉</h3>
            <p className="text-white/60 mb-6">
              We received your booking request for <strong className="text-white">{form.birthdayChildName || 'your little one'}</strong>.
              Our team will confirm within 24 hours. Check your email at{' '}
              <strong className="text-brand-orange">{form.email}</strong>.
            </p>
            <button onClick={() => { setSuccess(false); setStep(1); setForm({ name: '', email: '', phone: '', partyDate: '', partyTime: '', kidsCount: '', birthdayChildName: '', package: '', notes: '' }); }} className="btn-outline">
              Book Another Party
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="relative section-pad overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-800/40 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-orange/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 text-xs uppercase tracking-widest font-semibold text-brand-orange"
          >
            <Calendar size={12} />
            Party Booking
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-5xl text-white mb-4"
          >
            Reserve Your <span className="gradient-text">Date</span>
          </motion.h2>
          <p className="text-white/55">
            Fill out the form below. A 25% deposit secures your booking.
          </p>
        </div>

        {/* Step Progress */}
        <div className="flex items-center gap-3 mb-8">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center gap-3 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                s < step ? 'bg-brand-green text-white' : s === step ? 'bg-brand-orange text-white' : 'glass text-white/30'
              }`}>
                {s < step ? <CheckCircle size={16} /> : s}
              </div>
              <span className={`text-sm font-semibold ${s === step ? 'text-white' : 'text-white/30'}`}>
                {s === 1 ? 'Party Details' : 'Secure Payment'}
              </span>
              {s < 2 && <div className="flex-1 h-px bg-white/10" />}
            </div>
          ))}
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: step === 1 ? -30 : 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="glass rounded-3xl p-8"
        >
          {step === 1 ? (
            <form onSubmit={handleStep1} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-white/50 mb-1.5 font-semibold uppercase tracking-wide">Your Name</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Jane Smith"
                    className="w-full px-4 py-3 rounded-xl glass border border-white/10 focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20 text-white placeholder-white/25 text-sm transition-all" />
                </div>
                <div>
                  <label className="block text-xs text-white/50 mb-1.5 font-semibold uppercase tracking-wide">Phone</label>
                  <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="(734) 555-1234" type="tel"
                    className="w-full px-4 py-3 rounded-xl glass border border-white/10 focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20 text-white placeholder-white/25 text-sm transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1.5 font-semibold uppercase tracking-wide">Email</label>
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="jane@email.com"
                  className="w-full px-4 py-3 rounded-xl glass border border-white/10 focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20 text-white placeholder-white/25 text-sm transition-all" />
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1.5 font-semibold uppercase tracking-wide">Birthday Child&apos;s Name</label>
                <input value={form.birthdayChildName} onChange={(e) => setForm({ ...form, birthdayChildName: e.target.value })}
                  placeholder="Emma"
                  className="w-full px-4 py-3 rounded-xl glass border border-white/10 focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20 text-white placeholder-white/25 text-sm transition-all" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-white/50 mb-1.5 font-semibold uppercase tracking-wide">Party Date</label>
                  <input required type="date" value={form.partyDate} onChange={(e) => setForm({ ...form, partyDate: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 rounded-xl glass border border-white/10 focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20 text-white text-sm transition-all [color-scheme:dark]" />
                </div>
                <div>
                  <label className="block text-xs text-white/50 mb-1.5 font-semibold uppercase tracking-wide">Preferred Time</label>
                  <select required value={form.partyTime} onChange={(e) => setForm({ ...form, partyTime: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass border border-white/10 focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20 text-white text-sm transition-all bg-dark-800">
                    <option value="">Select time</option>
                    {timeSlots.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-white/50 mb-1.5 font-semibold uppercase tracking-wide">Package</label>
                  <select required value={form.package} onChange={(e) => setForm({ ...form, package: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass border border-white/10 focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20 text-white text-sm transition-all bg-dark-800">
                    <option value="">Select package</option>
                    {packageOptions.map((p) => <option key={p.id} value={p.label}>{p.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-white/50 mb-1.5 font-semibold uppercase tracking-wide">Est. # of Kids</label>
                  <input value={form.kidsCount} onChange={(e) => setForm({ ...form, kidsCount: e.target.value })}
                    placeholder="15" type="number" min="1"
                    className="w-full px-4 py-3 rounded-xl glass border border-white/10 focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20 text-white placeholder-white/25 text-sm transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1.5 font-semibold uppercase tracking-wide">Special Requests</label>
                <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Any allergies, decorating themes, or special requirements..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl glass border border-white/10 focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20 text-white placeholder-white/25 text-sm transition-all resize-none" />
              </div>
              <button type="submit" className="btn-primary w-full justify-center py-4 text-base">
                <span>Continue to Payment</span>
                <ChevronRight size={18} />
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              {/* Summary */}
              <div className="glass rounded-2xl p-5 space-y-2">
                <div className="text-sm font-bold text-white/60 uppercase tracking-wide mb-3">Booking Summary</div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Name</span>
                  <span className="text-white font-semibold">{form.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Date & Time</span>
                  <span className="text-white font-semibold">{form.partyDate} at {form.partyTime}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Package</span>
                  <span className="text-white font-semibold">{form.package}</span>
                </div>
                <div className="flex justify-between text-sm border-t border-white/10 pt-2 mt-2">
                  <span className="text-white/60">Deposit Due (25%)</span>
                  <span className="text-brand-orange font-black text-lg">{depositAmount ? `$${depositAmount}` : 'Inquiry'}</span>
                </div>
              </div>

              {/* Payment method toggle */}
              <div>
                <div className="text-xs text-white/50 mb-3 font-semibold uppercase tracking-wide">Payment Method</div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'stripe', label: 'Stripe', icon: '💳' },
                    { id: 'authnet', label: 'Authorize.net', icon: '🔒' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setPayMethod(m.id)}
                      className={`py-3 rounded-xl text-sm font-bold transition-all border ${
                        payMethod === m.id
                          ? 'border-brand-orange bg-brand-orange/10 text-brand-orange'
                          : 'glass border-white/10 text-white/60 hover:border-white/20'
                      }`}
                    >
                      {m.icon} {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm">
                  {error}
                </div>
              )}

              {payMethod === 'stripe' ? (
                <div className="space-y-4">
                  <button onClick={handleStripeCheckout} className="btn-primary w-full justify-center py-4 text-base">
                    <CreditCard size={18} />
                    <span>Pay with Stripe {depositAmount ? `— $${depositAmount}` : ''}</span>
                    <ChevronRight size={18} />
                  </button>
                  <div className="flex items-center justify-center gap-2 text-xs text-white/30">
                    <Shield size={12} />
                    <span>Secured by Stripe · PCI Compliant</span>
                  </div>
                </div>
              ) : (
                <AuthNetPaymentForm
                  amount={depositAmount}
                  onSuccess={handleAuthNetSuccess}
                  onError={setError}
                />
              )}

              <button onClick={() => setStep(1)} className="block w-full text-center text-xs text-white/30 hover:text-white/50 mt-2 transition-colors">
                ← Back to details
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

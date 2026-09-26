'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { User, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react';
import WordReveal from '@/components/WordReveal';

const BG_IMG =
  'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1800&auto=format&fit=crop';

const inputCls =
  'w-full rounded-xl border border-white/15 bg-white/10 pl-11 pr-4 py-3.5 text-sm text-cream outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 transition placeholder:text-cream/35';

function Field({ id, label, icon: Icon, children }) {
  return (
    <div>
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-[0.18em] text-cream/55">
        {label}
      </label>
      <div className="relative mt-3">
        <Icon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40" />
        {children}
      </div>
    </div>
  );
}

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (name.trim().length < 2) {
      setError('Please tell us your name.');
      return;
    }
    if (!email.includes('@') || password.length < 4) {
      setError('Please enter a valid email and a password of at least 4 characters.');
      return;
    }
    try {
      localStorage.setItem(
        'vachan_user',
        JSON.stringify({ name: name.trim(), email, phone })
      );
      localStorage.setItem('vachan_token', 'demo-' + Date.now().toString(36));
    } catch {
      setError('Your browser blocked local storage. Please allow it and try again.');
      return;
    }
    router.push('/my-bookings');
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Image src={BG_IMG} alt="Banquet hall" fill priority className="object-cover" />
      <div className="absolute inset-0 bg-night/70" />

      <div className="relative z-10 w-full max-w-md mx-4 my-16">
        <div className="rounded-[32px] bg-[#221B14]/70 backdrop-blur-xl border border-white/10 shadow-luxe p-8 sm:p-10">
          <p className="section-eyebrow mb-3 text-center">Join Us</p>
          <WordReveal as="h1" text="Create your account" className="text-cream text-center mb-2 type-h2" />
          <p className="text-cream/60 text-sm text-center mb-8">
            One account for stays, dining and celebrations.
          </p>

          {error && (
            <p className="rounded-xl bg-red-500/15 border border-red-400/30 px-4 py-3 text-sm text-red-200 mb-5">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <Field id="su-name" label="Full Name" icon={User}>
              <input
                id="su-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Aarav Sharma"
                className={inputCls}
              />
            </Field>

            <Field id="su-email" label="Email" icon={Mail}>
              <input
                id="su-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={inputCls}
              />
            </Field>

            <Field id="su-phone" label="Phone" icon={Phone}>
              <input
                id="su-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className={inputCls}
              />
            </Field>

            <Field id="su-password" label="Password" icon={Lock}>
              <input
                id="su-password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 4 characters"
                className={`${inputCls} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/40 hover:text-cream transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </Field>

            <button type="submit" className="btn-gold w-full uppercase">
              Create account <span className="arr">→</span>
            </button>
          </form>

          <p className="text-center text-sm text-cream/55 mt-8">
            Already a member?{' '}
            <Link href="/login" className="text-gold font-semibold hover:underline">
              Sign in
            </Link>
          </p>

          <p className="text-center text-xs text-cream/35 mt-6 leading-relaxed">
            Demo mode — no real account is created. Your details are stored only
            in this browser.
          </p>
        </div>
      </div>
    </main>
  );
}

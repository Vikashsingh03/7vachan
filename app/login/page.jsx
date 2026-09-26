'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import WordReveal from '@/components/WordReveal';

const BG_IMG =
  '/images/1583939003579-730e3918a45a.jpg';

const inputCls =
  'w-full rounded-xl border border-white/15 bg-white/10 pl-11 pr-4 py-3.5 text-sm text-cream outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 transition placeholder:text-cream/35';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!email.includes('@') || password.length < 4) {
      setError('Please enter a valid email and a password of at least 4 characters.');
      return;
    }
    const name = email
      .split('@')[0]
      .split(/[._-]+/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    try {
      localStorage.setItem('vachan_user', JSON.stringify({ name, email }));
      localStorage.setItem('vachan_token', 'demo-' + Date.now().toString(36));
    } catch {
      setError('Your browser blocked local storage. Please allow it and try again.');
      return;
    }
    router.push('/my-bookings');
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Image src={BG_IMG} alt="Wedding celebration" fill priority className="object-cover" />
      <div className="absolute inset-0 bg-night/70" />

      <div className="relative z-10 w-full max-w-md mx-4 my-16">
        <div className="rounded-[32px] bg-[#221B14]/70 backdrop-blur-xl border border-white/10 shadow-luxe p-8 sm:p-10">
          <p className="section-eyebrow mb-3 text-center">Members</p>
          <WordReveal as="h1" text="Welcome back" className="text-cream text-center mb-2 type-h2" />
          <p className="text-cream/60 text-sm text-center mb-8">
            Sign in to manage your stays, tables and celebrations.
          </p>

          {error && (
            <p className="rounded-xl bg-red-500/15 border border-red-400/30 px-4 py-3 text-sm text-red-200 mb-5">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="login-email" className="text-xs font-semibold uppercase tracking-[0.18em] text-cream/55">
                Email
              </label>
              <div className="relative mt-3">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40" />
                <input
                  id="login-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={inputCls}
                />
              </div>
            </div>

            <div>
              <label htmlFor="login-password" className="text-xs font-semibold uppercase tracking-[0.18em] text-cream/55">
                Password
              </label>
              <div className="relative mt-3">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
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
              </div>
            </div>

            <button type="submit" className="btn-gold w-full uppercase">
              Sign in <span className="arr">→</span>
            </button>
          </form>

          <p className="text-center text-sm text-cream/55 mt-8">
            New to 7 Vachan?{' '}
            <Link href="/signup" className="text-gold font-semibold hover:underline">
              Create an account
            </Link>
          </p>

          <p className="text-center text-xs text-cream/35 mt-6 leading-relaxed">
            Demo mode — any email and a 4+ character password will sign you in.
            Your session is stored only in this browser.
          </p>
        </div>
      </div>
    </main>
  );
}

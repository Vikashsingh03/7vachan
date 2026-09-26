'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  CalendarDays,
  CalendarX,
  Users,
  Moon,
  LogOut,
  ArrowRight,
  Ticket,
} from 'lucide-react';
import { Reveal, Eyebrow, Btn } from '@/components/ui';
import WordReveal from '@/components/WordReveal';

function formatINR(n) {
  return `₹${Number(n).toLocaleString('en-IN')}`;
}

function capitalize(s) {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export default function MyBookingsPage() {
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const u = readJSON('vachan_user', null);
    setUser(u);
    if (u) {
      setBookings(readJSON('vachan_bookings', []));
    }
    setLoaded(true);
  }, []);

  function seedDemo() {
    const demo = [
      {
        ref: 'VH-DEMO01',
        roomName: 'Royal Heritage Suite',
        room: 'Royal Heritage Suite',
        arrival: '12 Dec 2026',
        departure: '14 Dec 2026',
        guests: 2,
        nights: 2,
        total: 24999,
        status: 'confirmed',
      },
    ];
    try {
      localStorage.setItem('vachan_bookings', JSON.stringify(demo));
    } catch {
      return;
    }
    setBookings(demo);
  }

  function signOut() {
    try {
      localStorage.removeItem('vachan_user');
      localStorage.removeItem('vachan_token');
    } catch {
      return;
    }
    window.location.href = '/';
  }

  if (!loaded) {
    return (
      <main className="bg-cream text-ink min-h-screen">
        <div className="container-luxe pt-32 pb-20 text-center text-ink/50">
          Loading your account…
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="bg-cream text-ink min-h-screen">
        <div className="container-luxe pt-32 pb-20 flex justify-center">
          <Reveal>
            <div className="w-full max-w-md bg-white rounded-[32px] shadow-card p-10 text-center">
              <span className="w-16 h-16 rounded-full bg-gold/12 flex items-center justify-center mx-auto mb-6">
                <Ticket size={26} className="text-golddeep" />
              </span>
              <Eyebrow>My Account</Eyebrow>
              <WordReveal as="h1" text="Sign in to view your stays" className="mt-4 mb-3 type-h2" />
              <p className="text-ink/60 text-sm mb-8 leading-relaxed">
                Your upcoming reservations and past visits will appear here once you sign in.
              </p>
              <Btn href="/login" variant="gold" className="w-full">
                Sign in <span className="arr">→</span>
              </Btn>
              <p className="text-sm text-ink/60 mt-6">
                New here?{' '}
                <Link href="/signup" className="text-golddeep font-semibold hover:underline">
                  Create an account
                </Link>
              </p>
            </div>
          </Reveal>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-cream text-ink min-h-screen">
      <div className="container-luxe max-w-4xl pt-28 pb-20">
        <Reveal>
          <div className="flex flex-wrap items-start justify-between gap-4 mb-10">
            <div>
              <Eyebrow align="left">My Account</Eyebrow>
              <WordReveal as="h1" text={`Hello, ${user.name}`} className="mt-3 type-h2" />
              <p className="text-ink/60 text-sm mt-2">{user.email}</p>
            </div>
            <button
              onClick={signOut}
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium hover:border-ink/40 transition-colors"
            >
              <LogOut size={16} /> Sign out
            </button>
          </div>
        </Reveal>

        {bookings.length === 0 ? (
          <Reveal>
            <div className="bg-white rounded-[32px] shadow-card p-10 sm:p-14 text-center">
              <span className="w-20 h-20 rounded-full bg-gold/12 flex items-center justify-center mx-auto mb-7">
                <CalendarX size={34} className="text-golddeep" />
              </span>
              <Eyebrow>No Bookings Yet</Eyebrow>
              <WordReveal as="h2" playOnView text="No bookings yet" className="mt-4 type-h2" />
              <p className="text-ink/60 text-sm mt-3 mb-9 max-w-sm mx-auto leading-relaxed">
                Your confirmed stays, tables and event enquiries will appear here.
                Start by exploring our rooms and suites.
              </p>
              <Btn href="/hotel" variant="gold">
                Book your stay <ArrowRight size={15} />
              </Btn>
              <p className="mt-6">
                <button
                  onClick={seedDemo}
                  className="text-xs uppercase tracking-[0.2em] text-ink/40 hover:text-golddeep transition"
                >
                  Load a sample booking
                </button>
              </p>
            </div>
          </Reveal>
        ) : (
          <div className="space-y-4">
            {bookings.map((b, i) => (
              <Reveal key={b.ref || i} delay={i * 0.08}>
                <div className="bg-white rounded-[24px] shadow-card p-6 sm:p-7 flex flex-wrap items-center gap-6 hover:shadow-luxe transition-shadow duration-500">
                  <div className="flex-1 min-w-[220px]">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/40">
                        {b.ref}
                      </span>
                      <span className="rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1">
                        {capitalize(b.status) || 'Confirmed'}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl">{b.roomName || b.room}</h3>
                    <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-3 text-sm text-ink/60">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays size={14} className="text-gold" />
                        {b.arrival} → {b.departure}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Users size={14} className="text-gold" />
                        {b.guests} {Number(b.guests) === 1 ? 'guest' : 'guests'}
                      </span>
                      {b.nights != null && (
                        <span className="inline-flex items-center gap-1.5">
                          <Moon size={14} className="text-gold" />
                          {b.nights} {Number(b.nights) === 1 ? 'night' : 'nights'}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-[0.2em] text-ink/40 mb-1">Total</p>
                    <p className="font-display text-3xl">{formatINR(b.total)}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

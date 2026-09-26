'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  CalendarDays, Clock, Users, Armchair, Minus, Plus, Check,
  ChevronLeft, ChevronRight, User, Phone, Mail, Gift, MessageSquare,
  BadgeCheck, ArrowRight,
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import PageHero from '@/components/PageHero';

const timeSlots = ['12:00 PM', '1:00 PM', '2:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'];
const seatings = ['Main Dining Hall', 'Private Family Lounge', 'Terrace Evening Seating'];
const occasions = ['None', 'Birthday', 'Anniversary', 'Business Meal', 'Family Gathering', 'Other'];
const stepLabels = ['Date & Table', 'Your Details', 'Confirm'];

function Field({ label, icon: Icon, children }) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.25em] text-ink/50 font-medium mb-2 block">{label}</span>
      <span className="relative block">
        {Icon && <Icon className="absolute left-5 top-1/2 -translate-y-1/2 text-gold pointer-events-none" style={{ width: 18, height: 18 }} />}
        {children}
      </span>
    </label>
  );
}

const inputCls =
  'w-full bg-cream rounded-2xl py-4 text-ink placeholder:text-ink/35 outline-none border border-transparent focus:border-gold/60 focus:bg-white transition-all';
const inputPad = { paddingLeft: '3.25rem', paddingRight: '1.25rem' };

export default function ReservePage() {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(2);
  const [seating, setSeating] = useState(seatings[0]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [occasion, setOccasion] = useState(occasions[0]);
  const [requests, setRequests] = useState('');
  const [reference, setReference] = useState('');
  const [touched, setTouched] = useState(false);

  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);

  const prettyDate = useMemo(() => {
    if (!date) return '—';
    return new Date(date + 'T00:00:00').toLocaleDateString('en-IN', {
      weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
    });
  }, [date]);

  const step1Valid = date !== '' && time !== '' && guests >= 1;
  const step2Valid = name.trim() !== '' && /^[6-9]\d{9}$/.test(phone.trim()) && /.+@.+\..+/.test(email.trim());

  const canNext = step === 1 ? step1Valid : step === 2 ? step2Valid : true;

  const confirm = () => {
    const ref = '7V-' + Math.random().toString(36).slice(2, 8).toUpperCase();
    setReference(ref);
    setStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const summaryRows = [
    { icon: CalendarDays, label: 'Date', value: prettyDate },
    { icon: Clock, label: 'Time', value: time || '—' },
    { icon: Users, label: 'Guests', value: `${guests} ${guests === 1 ? 'guest' : 'guests'}` },
    { icon: Armchair, label: 'Seating', value: seating },
  ];

  if (step === 4) {
    return (
      <main>
        <PageHero eyebrow="Reservation" title="Table reserved" subtitle="We look forward to hosting you." />
        <section className="py-20 md:py-28 bg-cream">
          <div className="container-luxe max-w-2xl mx-auto">
            <Reveal>
              <div className="bg-white rounded-[32px] shadow-luxe p-10 md:p-14 text-center">
                <span className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/12 text-gold mb-6">
                  <BadgeCheck className="w-10 h-10" />
                </span>
                <h2 className="font-display text-4xl text-ink font-medium mb-3">Thank you, {name.split(' ')[0] || 'guest'}.</h2>
                <p className="text-ink/60 leading-relaxed mb-8">
                  Your table for {guests} {guests === 1 ? 'is' : 'is'} booked for {prettyDate} at {time},
                  in the {seating}. We will confirm shortly on {phone}.
                </p>
                <div className="bg-cream rounded-2xl px-6 py-5 mb-8 inline-block">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-ink/50 mb-1">Reservation reference</p>
                  <p className="font-display text-3xl text-gold tracking-widest">{reference}</p>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/restaurant/menu" className="btn-dark uppercase">
                    Browse the Menu <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link href="/restaurant" className="btn-outline-dark uppercase">
                    Back to Restaurant
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <PageHero
        eyebrow="Reserve a Table"
        title="Book your evening"
        subtitle="Three quick steps — no advance payment, no fuss. Open daily 12:00 PM – 11:30 PM."
      />

      <section className="py-16 md:py-20 bg-cream">
        <div className="container-luxe grid lg:grid-cols-[1fr_360px] gap-8 items-start">
          <Reveal>
            <div className="bg-white rounded-[28px] shadow-card p-6 md:p-10">
              <div className="flex items-center mb-10">
                {stepLabels.map((label, i) => {
                  const n = i + 1;
                  const active = step === n;
                  const done = step > n;
                  return (
                    <div key={label} className="flex items-center flex-1 last:flex-none">
                      <div className="flex items-center gap-3">
                        <span className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                          done ? 'bg-gold text-white' : active ? 'bg-ink text-cream' : 'bg-cream text-ink/40'
                        }`}>
                          {done ? <Check className="w-4 h-4" /> : n}
                        </span>
                        <span className={`text-xs uppercase tracking-[0.15em] font-medium hidden sm:block ${active ? 'text-ink' : 'text-ink/40'}`}>
                          {label}
                        </span>
                      </div>
                      {i < stepLabels.length - 1 && (
                        <span className={`flex-1 h-px mx-4 ${step > n ? 'bg-gold' : 'bg-ink/10'}`} />
                      )}
                    </div>
                  );
                })}
              </div>

              {step === 1 && (
                <div className="space-y-8">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <Field label="Date" icon={CalendarDays}>
                      <input
                        type="date"
                        min={todayStr}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className={inputCls}
                        style={inputPad}
                      />
                    </Field>
                    <div>
                      <span className="text-[11px] uppercase tracking-[0.25em] text-ink/50 font-medium mb-2 block">Guests</span>
                      <div className="flex items-center justify-between bg-cream rounded-2xl px-4 py-3">
                        <button
                          onClick={() => setGuests(Math.max(1, guests - 1))}
                          aria-label="Fewer guests"
                          className="w-10 h-10 rounded-full bg-white shadow-card flex items-center justify-center text-ink hover:text-gold transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="flex items-center gap-2 font-display text-2xl text-ink">
                          <Users className="w-5 h-5 text-gold" /> {guests}
                        </span>
                        <button
                          onClick={() => setGuests(Math.min(20, guests + 1))}
                          aria-label="More guests"
                          className="w-10 h-10 rounded-full bg-white shadow-card flex items-center justify-center text-ink hover:text-gold transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      {guests >= 9 && (
                        <p className="text-xs text-ink/50 mt-2">For 9+ guests we may call to arrange seating together.</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] uppercase tracking-[0.25em] text-ink/50 font-medium mb-3 block">Time slot</span>
                    <div className="flex flex-wrap gap-2.5">
                      {timeSlots.map((t) => (
                        <button
                          key={t}
                          onClick={() => setTime(t)}
                          className={`px-5 py-3 rounded-full text-sm font-medium border transition-all ${
                            time === t
                              ? 'bg-ink text-cream border-ink shadow-card'
                              : 'bg-cream text-ink/70 border-transparent hover:border-gold/60'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] uppercase tracking-[0.25em] text-ink/50 font-medium mb-3 block">Seating preference</span>
                    <div className="grid sm:grid-cols-3 gap-3">
                      {seatings.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSeating(s)}
                          className={`rounded-2xl border-2 px-5 py-4 text-left transition-all ${
                            seating === s ? 'border-gold bg-gold/5' : 'border-ink/10 bg-cream hover:border-gold/40'
                          }`}
                        >
                          <Armchair className={`w-5 h-5 mb-2 ${seating === s ? 'text-gold' : 'text-ink/40'}`} />
                          <p className="text-sm font-medium text-ink leading-snug">{s}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <Field label="Full name" icon={User}>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className={inputCls}
                        style={inputPad}
                      />
                    </Field>
                    <Field label="Phone" icon={Phone}>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        placeholder="10-digit mobile number"
                        className={inputCls}
                        style={inputPad}
                      />
                    </Field>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <Field label="Email" icon={Mail}>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className={inputCls}
                        style={inputPad}
                      />
                    </Field>
                    <Field label="Occasion" icon={Gift}>
                      <select value={occasion} onChange={(e) => setOccasion(e.target.value)} className={inputCls} style={inputPad}>
                        {occasions.map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    </Field>
                  </div>
                  <Field label="Special requests" icon={MessageSquare}>
                    <textarea
                      value={requests}
                      onChange={(e) => setRequests(e.target.value)}
                      placeholder="Jain preparations, wheelchair access, a quiet corner…"
                      rows={4}
                      className={`${inputCls} resize-none`}
                      style={inputPad}
                    />
                  </Field>
                  {touched && !step2Valid && (
                    <p className="text-sm text-red-800">Please add your name, a valid 10-digit mobile number and email.</p>
                  )}
                </div>
              )}

              {step === 3 && (
                <div>
                  <h3 className="font-display text-3xl text-ink font-medium mb-6">Review your booking</h3>
                  <div className="bg-cream rounded-[24px] p-6 md:p-8 space-y-5 mb-6">
                    {summaryRows.map((r) => (
                      <div key={r.label} className="flex items-center gap-4">
                        <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-white shadow-card text-gold shrink-0">
                          <r.icon className="w-5 h-5" />
                        </span>
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.25em] text-ink/45">{r.label}</p>
                          <p className="font-display text-xl text-ink">{r.value}</p>
                        </div>
                      </div>
                    ))}
                    <div className="border-t border-ink/10 pt-5 grid sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.25em] text-ink/45 mb-1">Booked by</p>
                        <p className="text-ink font-medium">{name}</p>
                        <p className="text-ink/60">{phone}</p>
                        <p className="text-ink/60">{email}</p>
                      </div>
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.25em] text-ink/45 mb-1">Occasion</p>
                        <p className="text-ink font-medium">{occasion}</p>
                        {requests.trim() && (
                          <>
                            <p className="text-[11px] uppercase tracking-[0.25em] text-ink/45 mb-1 mt-3">Requests</p>
                            <p className="text-ink/70">{requests}</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-ink/50 flex items-start gap-2">
                    <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    No advance payment needed — your table is held for 15 minutes past the slot.
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between mt-10 pt-8 border-t border-ink/10">
                {step > 1 ? (
                  <button onClick={() => { setStep(step - 1); setTouched(false); }} className="btn-outline-dark uppercase">
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                ) : (
                  <span />
                )}
                {step < 3 ? (
                  <button
                    onClick={() => {
                      if (!canNext) { setTouched(true); return; }
                      setTouched(false);
                      setStep(step + 1);
                    }}
                    className={`btn-gold uppercase ${!canNext && touched ? 'opacity-60' : ''}`}
                  >
                    Continue <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button onClick={confirm} className="btn-gold uppercase">
                    Confirm Reservation <Check className="w-4 h-4" />
                  </button>
                )}
              </div>
              {step === 1 && touched && !step1Valid && (
                <p className="text-sm text-red-800 mt-4 text-right">Please pick a date and a time slot.</p>
              )}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <aside className="bg-ink text-cream rounded-[28px] p-8 lg:sticky lg:top-28">
              <p className="section-eyebrow mb-6">Your Table</p>
              <div className="space-y-5">
                {summaryRows.map((r) => (
                  <div key={r.label} className="flex items-center gap-4">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-cream/10 text-gold shrink-0">
                      <r.icon className="w-4 h-4" />
                    </span>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.25em] text-cream/45">{r.label}</p>
                      <p className="font-display text-lg text-cream">{r.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-cream/10 mt-8 pt-6 text-sm text-cream/55 leading-relaxed">
                <p className="mb-2">Prefer to talk? Call <a href="tel:9993542874" className="text-gold hover:underline">9993542874</a></p>
                <p>Open daily · 12:00 PM – 11:30 PM</p>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

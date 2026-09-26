'use client';

import { useMemo, useState } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  Minus,
  Plus,
  CalendarDays,
  Users,
  Info,
  Sparkles,
} from 'lucide-react';
import { Reveal, SectionHeading, Eyebrow, Btn, PageHero } from '@/components/ui';
import WordReveal from '@/components/WordReveal';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const functionTypes = ['Wedding', 'Reception', 'Mehendi', 'Sangeet', 'Engagement', 'Other'];

const spaceOptions = [
  { name: 'Grand Banquet Hall', cap: '600 seated · 900 floating' },
  { name: 'Terrace', cap: '120 seated · 200 floating' },
  { name: 'Garden Lawn', cap: '400 seated · 600 floating' },
  { name: 'Whole Venue', cap: 'All three spaces, full day' },
];

const stepLabels = ['Occasion', 'Date & Guests', 'Your Details', 'Review'];

function statusFor(y, m, d) {
  const h = Math.abs(y * 372 + m * 31 + d * 7) % 10;
  if (h < 6) return 'available';
  if (h < 8) return 'limited';
  return 'booked';
}

const STATUS_META = {
  available: { dot: 'bg-emerald-500', label: 'Available' },
  limited: { dot: 'bg-amber-500', label: 'Limited' },
  booked: { dot: 'bg-ink/25', label: 'Booked' },
};

const inputCls =
  'w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition placeholder:text-ink/30';

function formatDate(iso) {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function AvailabilityPage() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [reference, setReference] = useState('');
  const [form, setForm] = useState({
    functionType: '',
    date: '',
    guests: 300,
    space: 'Grand Banquet Hall',
    name: '',
    phone: '',
    email: '',
    notes: '',
  });

  const set = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const now = new Date();
  const cells = useMemo(() => {
    const y = now.getFullYear();
    const m = now.getMonth();
    const first = new Date(y, m, 1).getDay();
    const days = new Date(y, m + 1, 0).getDate();
    const arr = [];
    for (let i = 0; i < first; i++) arr.push(null);
    for (let d = 1; d <= days; d++) arr.push(d);
    return { arr, y, m };
  }, []);

  const monthLabel = new Date(cells.y, cells.m, 1).toLocaleString('en', {
    month: 'long',
    year: 'numeric',
  });

  const canNext = () => {
    if (step === 1) return form.functionType !== '';
    if (step === 2) return form.date !== '' && form.guests > 0;
    if (step === 3) return form.name.trim() !== '' && form.phone.trim() !== '';
    return true;
  };

  function confirm() {
    const ref =
      'VH-' +
      Date.now().toString(36).toUpperCase().slice(-6) +
      Math.floor(Math.random() * 90 + 10);
    setReference(ref);
    setDone(true);
  }

  const stepHint = [
    'What are we celebrating?',
    'Pick a date, guest count and space.',
    'Where should we call you back?',
    'Check everything, then confirm.',
  ][step - 1];

  return (
    <main className="bg-cream text-ink">
      <PageHero
        eyebrow="Date Availability"
        title="Check Your Date"
        subtitle="Check whether your date is open, tell us a little about the occasion, and we will call you. No payment, no obligation."
      />

      <section className="py-20 sm:py-24">
        <div className="container-luxe">
          <Reveal>
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 flex-wrap">
              {stepLabels.map((label, i) => {
                const n = i + 1;
                const active = n === step;
                const past = n < step;
                return (
                  <div key={label} className="flex items-center gap-2 sm:gap-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                          active
                            ? 'bg-gold text-white shadow-luxe'
                            : past
                              ? 'bg-ink text-cream'
                              : 'bg-white border border-ink/15 text-ink/50'
                        }`}
                      >
                        {past ? <Check size={15} /> : n}
                      </span>
                      <span
                        className={`text-xs uppercase tracking-[0.15em] hidden sm:inline ${
                          active ? 'text-ink font-semibold' : 'text-ink/45'
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                    {n < stepLabels.length && (
                      <span className="w-6 sm:w-10 h-px bg-ink/15" />
                    )}
                  </div>
                );
              })}
            </div>
            <p className="text-center text-sm text-ink/55 mb-12">{stepHint}</p>
          </Reveal>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <Reveal>
                <div className="bg-white rounded-[32px] shadow-card p-8 sm:p-10 min-h-[480px]">
                  {!done && step === 1 && (
                    <div>
                      <Eyebrow align="left">Step 1 · Occasion</Eyebrow>
                      <WordReveal as="h2" playOnView text="What are we celebrating?" className="mt-4 type-h2" />
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-8">
                        {functionTypes.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setForm((f) => ({ ...f, functionType: t }))}
                            className={`rounded-2xl border px-4 py-5 text-sm font-medium transition-all duration-300 ${
                              form.functionType === t
                                ? 'bg-ink text-cream border-ink shadow-luxe'
                                : 'bg-cream border-ink/10 text-ink/70 hover:border-gold hover:text-ink'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {!done && step === 2 && (
                    <div>
                      <Eyebrow align="left">Step 2 · Date &amp; Guests</Eyebrow>
                      <WordReveal as="h2" playOnView text="When, how many, and where?" className="mt-4 type-h2" />
                      <div className="mt-8 space-y-7">
                        <div>
                          <label htmlFor="event-date" className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/55">
                            Event date
                          </label>
                          <input
                            id="event-date"
                            type="date"
                            value={form.date}
                            onChange={set('date')}
                            min={new Date().toISOString().split('T')[0]}
                            className={`${inputCls} mt-3`}
                          />
                        </div>
                        <div>
                          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/55">
                            Expected guests
                          </span>
                          <div className="flex items-center gap-5 mt-3">
                            <button
                              type="button"
                              onClick={() =>
                                setForm((f) => ({ ...f, guests: Math.max(20, f.guests - 50) }))
                              }
                              className="w-11 h-11 rounded-full border border-ink/15 flex items-center justify-center hover:border-gold hover:text-gold transition"
                              aria-label="Fewer guests"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="font-display text-4xl min-w-[120px] text-center">
                              {form.guests.toLocaleString('en-IN')}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setForm((f) => ({ ...f, guests: Math.min(2000, f.guests + 50) }))
                              }
                              className="w-11 h-11 rounded-full border border-ink/15 flex items-center justify-center hover:border-gold hover:text-gold transition"
                              aria-label="More guests"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>
                        <div>
                          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/55">
                            Preferred space
                          </span>
                          <div className="grid sm:grid-cols-2 gap-3 mt-3">
                            {spaceOptions.map((s) => (
                              <button
                                key={s.name}
                                type="button"
                                onClick={() => setForm((f) => ({ ...f, space: s.name }))}
                                className={`rounded-2xl border p-4 text-left transition-all duration-300 ${
                                  form.space === s.name
                                    ? 'bg-ink text-cream border-ink shadow-luxe'
                                    : 'bg-cream border-ink/10 hover:border-gold'
                                }`}
                              >
                                <p className="font-medium text-sm">{s.name}</p>
                                <p
                                  className={`text-xs mt-1 ${
                                    form.space === s.name ? 'text-cream/60' : 'text-ink/50'
                                  }`}
                                >
                                  {s.cap}
                                </p>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {!done && step === 3 && (
                    <div>
                      <Eyebrow align="left">Step 3 · Your Details</Eyebrow>
                      <WordReveal as="h2" playOnView text="Where should we call you back?" className="mt-4 type-h2" />
                      <div className="grid sm:grid-cols-2 gap-5 mt-8">
                        <div>
                          <label htmlFor="bk-name" className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/55">
                            Full name
                          </label>
                          <input
                            id="bk-name"
                            value={form.name}
                            onChange={set('name')}
                            placeholder="Your name"
                            className={`${inputCls} mt-3`}
                          />
                        </div>
                        <div>
                          <label htmlFor="bk-phone" className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/55">
                            Phone
                          </label>
                          <input
                            id="bk-phone"
                            type="tel"
                            value={form.phone}
                            onChange={set('phone')}
                            placeholder="99935 42874"
                            className={`${inputCls} mt-3`}
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label htmlFor="bk-email" className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/55">
                            Email <span className="normal-case font-normal">(optional)</span>
                          </label>
                          <input
                            id="bk-email"
                            type="email"
                            value={form.email}
                            onChange={set('email')}
                            placeholder="you@example.com"
                            className={`${inputCls} mt-3`}
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label htmlFor="bk-notes" className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/55">
                            Anything we should know? <span className="normal-case font-normal">(optional)</span>
                          </label>
                          <textarea
                            id="bk-notes"
                            rows={4}
                            value={form.notes}
                            onChange={set('notes')}
                            placeholder="Functions, themes you love, questions..."
                            className={`${inputCls} mt-3 resize-none`}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {!done && step === 4 && (
                    <div>
                      <Eyebrow align="left">Step 4 · Review</Eyebrow>
                      <WordReveal as="h2" playOnView text="Everything looks right?" className="mt-4 type-h2" />
                      <dl className="mt-8 rounded-2xl bg-cream border border-ink/10 divide-y divide-ink/10 overflow-hidden">
                        {[
                          ['Occasion', form.functionType],
                          ['Date', formatDate(form.date)],
                          ['Guests', form.guests.toLocaleString('en-IN')],
                          ['Space', form.space],
                          ['Name', form.name],
                          ['Phone', form.phone],
                          ['Email', form.email || '—'],
                        ].map(([k, v]) => (
                          <div key={k} className="flex items-center justify-between px-6 py-4">
                            <dt className="text-xs uppercase tracking-[0.18em] text-ink/50">{k}</dt>
                            <dd className="text-sm font-medium text-right">{v}</dd>
                          </div>
                        ))}
                        {form.notes && (
                          <div className="px-6 py-4">
                            <dt className="text-xs uppercase tracking-[0.18em] text-ink/50 mb-2">Notes</dt>
                            <dd className="text-sm text-ink/70">{form.notes}</dd>
                          </div>
                        )}
                      </dl>
                    </div>
                  )}

                  {done && (
                    <div className="text-center py-10">
                      <span className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={40} className="text-emerald-600" />
                      </span>
                      <Eyebrow>Enquiry Confirmed</Eyebrow>
                      <h2 className="font-display text-4xl mt-4">
                        We will call you soon, {form.name.split(' ')[0] || 'friend'}
                      </h2>
                      <p className="text-ink/60 mt-4 max-w-md mx-auto leading-relaxed">
                        Your enquiry for a <strong>{form.functionType}</strong> on{' '}
                        <strong>{formatDate(form.date)}</strong> is with our events team.
                        They will confirm availability on call — no payment taken.
                      </p>
                      <p className="mt-6 inline-block bg-cream border border-ink/10 rounded-full px-6 py-3 text-sm">
                        Reference <span className="font-semibold text-golddeep ml-1">{reference}</span>
                      </p>
                      <div className="mt-8">
                        <Btn href="/marriage-hall" variant="dark">
                          Back to marriage hall
                        </Btn>
                      </div>
                    </div>
                  )}

                  {!done && (
                    <div className="flex items-center justify-between mt-10 pt-8 border-t border-ink/10">
                      <button
                        type="button"
                        onClick={() => setStep((s) => Math.max(1, s - 1))}
                        disabled={step === 1}
                        className="inline-flex items-center gap-2 text-sm font-medium text-ink/60 hover:text-ink disabled:opacity-30 transition"
                      >
                        <ArrowLeft size={16} /> Back
                      </button>
                      {step < 4 ? (
                        <Btn variant="gold" onClick={() => canNext() && setStep((s) => s + 1)} className={!canNext() ? 'opacity-40 pointer-events-none' : ''}>
                          Continue <ArrowRight size={15} />
                        </Btn>
                      ) : (
                        <Btn variant="gold" onClick={confirm} className={!canNext() ? 'opacity-40 pointer-events-none' : ''}>
                          Confirm enquiry <Check size={15} />
                        </Btn>
                      )}
                    </div>
                  )}
                </div>
              </Reveal>
            </div>

            <div className="space-y-6">
              <Reveal delay={0.1}>
                <aside className="bg-ink text-cream rounded-[28px] p-7 sticky top-28">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-gold mb-4">Your enquiry</p>
                  <ul className="space-y-4 text-sm">
                    <li className="flex items-start gap-3">
                      <Sparkles size={15} className="text-gold mt-0.5 shrink-0" />
                      <span className="text-cream/80">{form.functionType || 'Occasion not chosen yet'}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CalendarDays size={15} className="text-gold mt-0.5 shrink-0" />
                      <span className="text-cream/80">{formatDate(form.date)}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Users size={15} className="text-gold mt-0.5 shrink-0" />
                      <span className="text-cream/80">
                        {form.guests.toLocaleString('en-IN')} guests · {form.space}
                      </span>
                    </li>
                  </ul>
                  <div className="h-px bg-cream/15 my-6" />
                  <p className="text-xs text-cream/50 leading-relaxed">
                    No payment is taken until you are ready. Our events team confirms
                    every date personally on call.
                  </p>
                </aside>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="container-luxe">
          <Reveal>
            <SectionHeading
              eyebrow="Indicative Calendar"
              title={`This month — ${monthLabel}`}
              subtitle="A rough sense of the diary. Tap any date above in the enquiry to choose it."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="max-w-3xl mx-auto bg-white rounded-[28px] shadow-card p-6 sm:p-8">
              <div className="grid grid-cols-7 gap-1 mb-2">
                {WEEKDAYS.map((w) => (
                  <div key={w} className="text-center text-xs font-semibold uppercase tracking-widest text-ink/40 py-2">
                    {w}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {cells.arr.map((d, i) =>
                  d === null ? (
                    <div key={`e-${i}`} />
                  ) : (
                    (() => {
                      const today = new Date();
                      const past =
                        new Date(cells.y, cells.m, d) <
                        new Date(today.getFullYear(), today.getMonth(), today.getDate());
                      const meta = STATUS_META[statusFor(cells.y, cells.m, d)];
                      return (
                        <div
                          key={d}
                          className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-1 text-sm ${
                            past ? 'text-ink/25' : 'text-ink'
                          }`}
                        >
                          <span className="font-medium">{d}</span>
                          {!past && <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />}
                        </div>
                      );
                    })()
                  )
                )}
              </div>
              <div className="flex flex-wrap gap-5 mt-6 pt-6 border-t border-ink/10">
                {Object.values(STATUS_META).map((meta) => (
                  <span key={meta.label} className="flex items-center gap-2 text-sm text-ink/60">
                    <span className={`w-2.5 h-2.5 rounded-full ${meta.dot}`} />
                    {meta.label}
                  </span>
                ))}
              </div>
              <p className="flex items-start gap-2 text-sm text-ink/50 mt-5">
                <Info size={16} className="shrink-0 mt-0.5 text-golddeep" />
                Dates shown are indicative — our events team confirms availability on call.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

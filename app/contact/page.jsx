'use client';

import { useState } from 'react';
import { BedDouble, UtensilsCrossed, Sparkles, MapPin, Send, CheckCircle2, Phone, Mail } from 'lucide-react';
import { Reveal, SectionHeading, Eyebrow, PageHero } from '@/components/ui';
import WordReveal from '@/components/WordReveal';

const inputCls =
  'w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition placeholder:text-ink/30';

const departments = [
  {
    icon: BedDouble,
    title: 'Hotel',
    email: 'hotel@7vachan.com',
    desc: 'Reservations, rooms and suites, group stays.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Restaurant',
    email: 'dine@7vachan.com',
    desc: 'Table bookings, private dining, festive menus.',
  },
  {
    icon: Sparkles,
    title: 'Events',
    email: 'events@7vachan.com',
    desc: 'Weddings, receptions, decor and catering.',
  },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', department: 'Hotel', message: '' });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <main className="bg-cream text-ink min-h-screen">
      <PageHero
        eyebrow="Get in Touch"
        title="Contact Us"
        subtitle="Questions about a stay, a table, or a celebration? Write to us — we reply within one working day."
      />

      <section className="py-20 sm:py-24">
        <div className="container-luxe">
          <Reveal>
            <SectionHeading
              eyebrow="Departments"
              title="Reach the right desk"
              subtitle="Every desk answers on the same line — pick the team that knows your question best."
            />
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-6 mt-4">
            {departments.map((d, i) => (
              <Reveal key={d.title} delay={i * 0.1}>
                <div className="bg-white rounded-[28px] shadow-card p-8 h-full text-center hover:shadow-luxe hover:-translate-y-2 transition-all duration-500">
                  <div className="w-14 h-14 rounded-full bg-gold/12 flex items-center justify-center mx-auto mb-5">
                    <d.icon size={24} className="text-golddeep" />
                  </div>
                  <h3 className="font-display text-2xl">{d.title}</h3>
                  <a
                    href={`mailto:${d.email}`}
                    className="inline-flex items-center gap-2 text-golddeep font-medium text-sm mt-2 hover:underline"
                  >
                    <Mail size={14} /> {d.email}
                  </a>
                  <p className="text-sm text-ink/55 mt-3 leading-relaxed">{d.desc}</p>
                  <a
                    href="tel:9993542874"
                    className="inline-flex items-center gap-2 text-sm text-ink/60 mt-4 hover:text-ink transition"
                  >
                    <Phone size={14} className="text-gold" /> 9993542874
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-24">
        <div className="container-luxe max-w-2xl">
          <Reveal>
            <div className="bg-white rounded-[32px] shadow-card p-8 sm:p-10">
              {sent ? (
                <div className="text-center py-8">
                  <span className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={32} className="text-emerald-600" />
                  </span>
                  <Eyebrow>Message Sent</Eyebrow>
                  <h2 className="font-display text-3xl mt-4">Thank you, {form.name.split(' ')[0] || 'friend'}</h2>
                  <p className="text-ink/60 text-sm mt-3 max-w-sm mx-auto leading-relaxed">
                    Your message is on its way to our {form.department} team. We will get
                    back to you at {form.email || 'your email'} within one working day.
                  </p>
                </div>
              ) : (
                <>
                  <WordReveal as="h2" playOnView text="Send a message" className="mb-2 type-h2" />
                  <p className="text-ink/60 text-sm mb-8">
                    Fill in the form and we will take it from there.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="ct-name" className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/55">
                          Name
                        </label>
                        <input
                          id="ct-name"
                          type="text"
                          required
                          value={form.name}
                          onChange={set('name')}
                          placeholder="Your full name"
                          className={`${inputCls} mt-3`}
                        />
                      </div>
                      <div>
                        <label htmlFor="ct-email" className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/55">
                          Email
                        </label>
                        <input
                          id="ct-email"
                          type="email"
                          required
                          value={form.email}
                          onChange={set('email')}
                          placeholder="you@example.com"
                          className={`${inputCls} mt-3`}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="ct-dept" className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/55">
                        Department
                      </label>
                      <select
                        id="ct-dept"
                        value={form.department}
                        onChange={set('department')}
                        className={`${inputCls} mt-3`}
                      >
                        {departments.map((d) => (
                          <option key={d.title}>{d.title}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="ct-msg" className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/55">
                        Message
                      </label>
                      <textarea
                        id="ct-msg"
                        required
                        rows={5}
                        value={form.message}
                        onChange={set('message')}
                        placeholder="Tell us about your stay, event, or question…"
                        className={`${inputCls} mt-3 resize-none`}
                      />
                    </div>
                    <button type="submit" className="btn-gold w-full sm:w-auto uppercase">
                      <Send size={15} /> Send message
                    </button>
                  </form>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="container-luxe">
          <Reveal>
            <div className="rounded-[32px] bg-ink text-cream p-10 sm:p-14 max-w-4xl mx-auto text-center">
              <span className="w-14 h-14 rounded-full bg-gold/15 flex items-center justify-center mx-auto mb-6">
                <MapPin size={24} className="text-gold" />
              </span>
              <Eyebrow>Find Us</Eyebrow>
              <WordReveal as="h2" playOnView text="One address, three experiences" className="mt-4 type-h2" />
              <p className="text-cream/65 mt-5 leading-relaxed max-w-xl mx-auto">
                7 Vachan Marriage Hall, Satna, Kothi Road, near Lovedale School, Bagha,
                Madhya Pradesh 485001
              </p>
              <p className="mt-6">
                <a href="tel:9993542874" className="inline-flex items-center gap-2 text-gold font-medium hover:underline">
                  <Phone size={16} /> 9993542874
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

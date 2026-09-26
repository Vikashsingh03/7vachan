'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, CheckCircle2, Send } from 'lucide-react';
import { Reveal, SectionHeading, Eyebrow, Btn, PageHero } from '@/components/ui';

const infoCards = [
  {
    icon: Phone,
    title: 'Call us',
    lines: ['9993542874'],
    href: 'tel:9993542874',
  },
  {
    icon: Mail,
    title: 'Email us',
    lines: ['events@7vachan.com'],
    href: 'mailto:events@7vachan.com',
  },
  {
    icon: MapPin,
    title: 'Visit us',
    lines: [
      '7 Vachan Marriage Hall, Satna,',
      'Kothi Road, near Lovedale School,',
      'Bagha, Madhya Pradesh 485001',
    ],
  },
  {
    icon: Clock,
    title: 'Hours',
    lines: ['Monday – Sunday', '9:00 AM – 8:00 PM'],
  },
];

const guestOptions = ['Under 200', '200–400', '400–700', '700–1,200', '1,200+'];

const inputCls =
  'w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition placeholder:text-ink/30';

export default function MarriageHallContactPage() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    date: '',
    guests: '200–400',
    message: '',
  });
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  function submit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <main className="bg-cream text-ink">
      <PageHero
        eyebrow="Get In Touch"
        title="Enquire Now"
        subtitle="Tell us about your celebration — our wedding specialists reply within 24 hours."
      />

      <section className="py-20 sm:py-24">
        <div className="container-luxe grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <Reveal>
              {sent ? (
                <div className="bg-white rounded-[28px] shadow-card p-10 sm:p-14 text-center">
                  <span className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} className="text-emerald-600" />
                  </span>
                  <Eyebrow>Enquiry Received</Eyebrow>
                  <h2 className="font-display text-4xl mt-4">
                    Thank you, {form.name.split(' ')[0] || 'friend'}
                  </h2>
                  <p className="text-ink/60 leading-relaxed max-w-md mx-auto mt-4">
                    Our wedding specialist will call you on {form.phone || 'your number'}{' '}
                    shortly about your event
                    {form.date ? ` on ${form.date}` : ''} for {form.guests} guests.
                  </p>
                  <Btn href="/marriage-hall" variant="dark" className="mt-8">
                    Back to marriage hall
                  </Btn>
                </div>
              ) : (
                <form
                  onSubmit={submit}
                  className="bg-white rounded-[28px] shadow-card p-8 sm:p-10 space-y-6"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="mh-name" className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/55">
                        Full name
                      </label>
                      <input
                        id="mh-name"
                        required
                        value={form.name}
                        onChange={set('name')}
                        placeholder="Your name"
                        className={`${inputCls} mt-3`}
                      />
                    </div>
                    <div>
                      <label htmlFor="mh-phone" className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/55">
                        Phone
                      </label>
                      <input
                        id="mh-phone"
                        required
                        value={form.phone}
                        onChange={set('phone')}
                        placeholder="99935 42874"
                        type="tel"
                        className={`${inputCls} mt-3`}
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="mh-date" className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/55">
                        Event date
                      </label>
                      <input
                        id="mh-date"
                        type="date"
                        value={form.date}
                        onChange={set('date')}
                        className={`${inputCls} mt-3`}
                      />
                    </div>
                    <div>
                      <label htmlFor="mh-guests" className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/55">
                        Expected guests
                      </label>
                      <select
                        id="mh-guests"
                        value={form.guests}
                        onChange={set('guests')}
                        className={`${inputCls} mt-3`}
                      >
                        {guestOptions.map((g) => (
                          <option key={g}>{g}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="mh-msg" className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/55">
                      Tell us about your celebration
                    </label>
                    <textarea
                      id="mh-msg"
                      value={form.message}
                      onChange={set('message')}
                      placeholder="Functions, themes you love, questions..."
                      rows={4}
                      className={`${inputCls} mt-3 resize-none`}
                    />
                  </div>
                  <button type="submit" className="btn-gold w-full uppercase">
                    Send enquiry <Send size={15} />
                  </button>
                  <p className="text-xs text-ink/40 text-center">
                    No spam, no sharing — your details stay with our events team.
                  </p>
                </form>
              )}
            </Reveal>
          </div>

          <div className="lg:col-span-2 space-y-4">
            {infoCards.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <div className="bg-white rounded-[24px] shadow-card p-6 flex gap-4 hover:shadow-luxe hover:-translate-y-1 transition-all duration-500">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-gold/12 flex items-center justify-center">
                    <c.icon size={20} className="text-golddeep" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl mb-1.5">{c.title}</h3>
                    {c.lines.map((l) =>
                      c.href ? (
                        <a key={l} href={c.href} className="block text-sm text-golddeep font-medium hover:underline">
                          {l}
                        </a>
                      ) : (
                        <p key={l} className="text-sm text-ink/60">
                          {l}
                        </p>
                      )
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.3}>
              <div className="rounded-[24px] bg-ink text-cream p-7">
                <p className="text-[11px] uppercase tracking-[0.3em] text-gold mb-3">Limited Offer</p>
                <p className="font-display text-xl leading-snug">
                  Book Two Functions — hold your Mehendi and Sangeet with us alongside the
                  wedding and the terrace hire is complimentary.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-luxe">
          <Reveal>
            <SectionHeading
              eyebrow="Prefer To Talk?"
              title="One call is all it takes"
              subtitle="Our events team is happy to walk you through spaces, packages and dates — no obligation."
            />
            <div className="text-center">
              <Btn href="tel:9993542874" variant="gold">
                <Phone size={15} /> Call 9993542874
              </Btn>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

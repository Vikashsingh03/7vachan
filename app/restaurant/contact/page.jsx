'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, BadgeCheck, User, MessageSquare } from 'lucide-react';
import Reveal from '@/components/Reveal';
import PageHero from '@/components/PageHero';
import WordReveal from '@/components/WordReveal';

function Eyebrow({ children }) {
  return (
    <div className="flex items-center gap-4 mb-5">
      <p className="section-eyebrow !mb-0">{children}</p>
      <span className="h-px flex-1 bg-gold/40" />
    </div>
  );
}

const cards = [
  {
    icon: Mail,
    title: 'Email',
    lines: ['dine@7vachan.com'],
    href: 'mailto:dine@7vachan.com',
  },
  {
    icon: Phone,
    title: 'Phone',
    lines: ['9993542874'],
    href: 'tel:9993542874',
  },
  {
    icon: Clock,
    title: 'Hours',
    lines: ['12:00 PM – 11:30 PM', 'Open every day'],
  },
  {
    icon: MapPin,
    title: 'Address',
    lines: ['7 Vachan, Kothi Road, near Lovedale School, Bagha, Satna, Madhya Pradesh 485001'],
  },
];

const inputCls =
  'w-full bg-cream rounded-2xl py-4 text-ink placeholder:text-ink/35 outline-none border border-transparent focus:border-gold/60 focus:bg-white transition-all';
const inputPad = { paddingLeft: '3.25rem', paddingRight: '1.25rem' };

export default function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [touched, setTouched] = useState(false);

  const valid = name.trim() !== '' && message.trim() !== '';

  const submit = (e) => {
    e.preventDefault();
    if (!valid) {
      setTouched(true);
      return;
    }
    setSent(true);
  };

  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Talk to the kitchen"
        subtitle="Bulk orders, private dining, feedback — write to us and we reply within a day."
      />

      <section className="py-16 md:py-24 bg-cream">
        <div className="container-luxe">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {cards.map((c, i) => (
              <Reveal key={c.title} delay={i * 100}>
                <div className="bg-white rounded-[24px] shadow-card p-8 h-full hover:-translate-y-2 transition-transform duration-500">
                  <span className="inline-flex items-center justify-center rounded-full bg-gold/12 text-gold mb-5" style={{ width: 52, height: 52 }}>
                    <c.icon className="w-6 h-6" />
                  </span>
                  <h3 className="font-display text-2xl text-ink font-medium mb-3">{c.title}</h3>
                  {c.lines.map((l) =>
                    c.href ? (
                      <a key={l} href={c.href} className="block text-ink/65 text-sm leading-relaxed hover:text-gold transition-colors">
                        {l}
                      </a>
                    ) : (
                      <p key={l} className="text-ink/65 text-sm leading-relaxed">
                        {l}
                      </p>
                    )
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <Reveal>
              <div className="bg-ink text-cream rounded-[28px] p-10 md:p-12 h-full">
                <p className="section-eyebrow mb-4">Good to know</p>
                <WordReveal as="h2" playOnView text="Before you write" className="mb-6 type-h2" />
                <ul className="space-y-5 text-cream/65 text-sm leading-relaxed">
                  <li className="flex gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2" />
                    For table bookings of 9 or more, call 9993542874 — we seat large groups together.
                  </li>
                  <li className="flex gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2" />
                    Bulk and festive orders (Diwali, weddings, office lunches) need 48 hours notice.
                  </li>
                  <li className="flex gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2" />
                    Jain preparations are available across most of the menu — mention it in your message.
                  </li>
                  <li className="flex gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2" />
                    We reply to every message within one working day, usually much faster.
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="bg-white rounded-[28px] shadow-card p-8 md:p-10">
                {sent ? (
                  <div className="text-center py-10">
                    <span className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/12 text-gold mb-6">
                      <BadgeCheck className="w-10 h-10" />
                    </span>
                    <h2 className="font-display text-3xl text-ink font-medium mb-3">Message received</h2>
                    <p className="text-ink/60 leading-relaxed mb-8">
                      Thank you, {name.split(' ')[0] || 'friend'}. Our team will get back to you within a day —
                      for anything urgent, call <a href="tel:9993542874" className="text-gold hover:underline">9993542874</a>.
                    </p>
                    <button
                      onClick={() => { setSent(false); setName(''); setPhone(''); setMessage(''); setTouched(false); }}
                      className="btn-outline-dark uppercase"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={submit} noValidate>
                    <Eyebrow>Write to Us</Eyebrow>
                    <div className="space-y-5">
                      <label className="block">
                        <span className="text-[11px] uppercase tracking-[0.25em] text-ink/50 font-medium mb-2 block">Name</span>
                        <span className="relative block">
                          <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gold pointer-events-none" style={{ width: 18, height: 18 }} />
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your full name"
                            className={inputCls}
                            style={inputPad}
                          />
                        </span>
                      </label>
                      <label className="block">
                        <span className="text-[11px] uppercase tracking-[0.25em] text-ink/50 font-medium mb-2 block">Phone <span className="text-ink/35 normal-case tracking-normal">(optional)</span></span>
                        <span className="relative block">
                          <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-gold pointer-events-none" style={{ width: 18, height: 18 }} />
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                            placeholder="10-digit mobile number"
                            className={inputCls}
                            style={inputPad}
                          />
                        </span>
                      </label>
                      <label className="block">
                        <span className="text-[11px] uppercase tracking-[0.25em] text-ink/50 font-medium mb-2 block">Message</span>
                        <span className="relative block">
                          <MessageSquare className="absolute left-5 top-6 text-gold pointer-events-none" style={{ width: 18, height: 18 }} />
                          <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Tell us what you need — a private dinner, a bulk order, feedback…"
                            rows={5}
                            className={`${inputCls} resize-none`}
                            style={inputPad}
                          />
                        </span>
                      </label>
                      {touched && !valid && (
                        <p className="text-sm text-red-800">Please add your name and a message.</p>
                      )}
                      <button type="submit" className="btn-gold uppercase w-full">
                        Send Message <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}

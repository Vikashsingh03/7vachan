'use client';

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, BadgeCheck } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { Btn } from "../_ui";
import { CONTACT } from "../_data";
import WordReveal from "@/components/WordReveal";

const inputCls =
  "w-full bg-cream border border-[#E3DACA] rounded-2xl px-5 py-4 text-ink outline-none focus:border-gold transition-colors";

const cards = [
  { icon: Phone, label: "Phone", value: CONTACT.phone, href: CONTACT.phoneHref },
  { icon: Mail, label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { icon: MapPin, label: "Address", value: CONTACT.address },
  { icon: Clock, label: "Reception", value: `${CONTACT.reception} · Check-in ${CONTACT.checkIn} · Check-out ${CONTACT.checkOut}` },
];

export default function HotelContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function submit(e) {
    e.preventDefault();
    if (name.trim().length >= 2 && message.trim().length >= 5) setSent(true);
  }

  return (
    <>
      <section className="pt-36 pb-14 bg-ink text-cream">
        <div className="container-luxe text-center">
          <p className="section-eyebrow on-dark mb-4">Hotel · Contact</p>
          <WordReveal as="h1" text="Talk to the Family" className="page-title mb-4" />
          <p className="text-cream/70 leading-relaxed max-w-2xl mx-auto">
            Reservations, weddings, or just a question — a real person answers, day or night.
          </p>
        </div>
      </section>
      <section className="py-20 md:py-24">
        <div className="container-luxe">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {cards.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.08}>
                <div className="bg-white border border-[#E3DACA] rounded-[24px] p-7 h-full text-center hover:-translate-y-2 hover:shadow-card transition-all duration-500">
                  <span className="w-14 h-14 mx-auto mb-5 rounded-full border-2 border-gold/70 flex items-center justify-center text-gold">
                    <c.icon className="w-6 h-6" />
                  </span>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-gold mb-2">{c.label}</p>
                  {c.href ? (
                    <a href={c.href} className="text-ink font-medium link-sweep break-words">{c.value}</a>
                  ) : (
                    <p className="text-ink/70 text-sm leading-relaxed">{c.value}</p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            <Reveal>
              <div className="bg-[#F3EDE1] border border-[#E3DACA] rounded-[28px] p-8 md:p-12 h-full">
                <SectionHeading eyebrow="Write to us" title="Send a message" />
                {sent ? (
                  <div className="text-center py-10">
                    <span className="w-16 h-16 mx-auto mb-5 rounded-full bg-gold/15 border-2 border-gold flex items-center justify-center text-gold">
                      <BadgeCheck className="w-8 h-8" />
                    </span>
                    <h3 className="font-display text-3xl text-ink mb-3">Message received.</h3>
                    <p className="text-ink/60 leading-relaxed">
                      Thank you, {name.split(" ")[0]}. We reply within a few hours — for anything
                      urgent, call <a href={CONTACT.phoneHref} className="text-gold font-medium">{CONTACT.phone}</a>.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={submit} className="space-y-6">
                    <label className="block">
                      <span className="block text-[11px] uppercase tracking-[0.3em] text-gold mb-2">Your name</span>
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Karan Patel" className={inputCls} required />
                    </label>
                    <label className="block">
                      <span className="block text-[11px] uppercase tracking-[0.3em] text-gold mb-2">Phone (optional)</span>
                      <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value.replace(/[^\d]/g, "").slice(0, 10))} placeholder="10-digit mobile" className={inputCls} />
                    </label>
                    <label className="block">
                      <span className="block text-[11px] uppercase tracking-[0.3em] text-gold mb-2">Message</span>
                      <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} placeholder="How can we help?" className={`${inputCls} resize-none`} required minLength={5} />
                    </label>
                    <Btn type="submit" variant="gold" className="w-full">
                      Send message
                    </Btn>
                  </form>
                )}
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="rounded-[28px] overflow-hidden shadow-card border border-[#E3DACA] h-full min-h-[420px] relative">
                <iframe
                  title="7 Vachan location map"
                  src="https://www.google.com/maps?q=Kothi+Road,+near+Lovedale+School,+Bagha,+Satna,+Madhya+Pradesh+485001&output=embed"
                  className="absolute inset-0 w-full h-full border-0"
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

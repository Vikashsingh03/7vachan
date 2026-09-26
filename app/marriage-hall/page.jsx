'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  CalendarCheck,
  Sparkles,
  X,
  Phone,
  Mail,
} from 'lucide-react';
import { Reveal, SectionHeading, Eyebrow, Btn, Stars } from '@/components/ui';
import WordReveal from '@/components/WordReveal';
import CountUp from '@/components/CountUp';

const HERO_IMG =
  '/images/1583939003579-730e3918a45a.jpg';

const spaces = [
  {
    name: 'Grand Banquet Hall',
    tag: 'Space 01',
    desc: 'Pillarless, air-conditioned, 22ft ceilings with imported chandeliers.',
    seated: '600 Seated',
    floating: '900 Floating',
    img: '/images/1519167758481-83f550bb49b3.jpg',
  },
  {
    name: 'Terrace',
    tag: 'Space 02',
    desc: 'Open-air rooftop made for sangeet and reception evenings under the stars.',
    seated: '120 Seated',
    floating: '200 Floating',
    img: '/images/1514525253161-7a46d19cd819.jpg',
  },
  {
    name: 'Garden Lawn',
    tag: 'Space 03',
    desc: 'Mature landscaping and fairy-lit paths — ideal for Mehendi and Haldi.',
    seated: '400 Seated',
    floating: '600 Floating',
    img: '/images/1464366400600-7168b8af9bc3.jpg',
  },
];

const packages = [
  {
    name: 'Silver',
    price: '₹1,100',
    unit: 'per plate',
    blurb: 'An elegant start. Everything a beautifully run celebration needs, without excess.',
    features: ['Grand Banquet Hall for 6 hours', 'Classic stage decoration', 'Buffet with two live counters'],
  },
  {
    name: 'Gold',
    price: '₹1,450',
    unit: 'per plate',
    blurb: 'Our most loved. Styling and service scaled for multi-function celebrations.',
    features: ['All venue spaces for a full day', 'Designer mandap and ceiling styling', 'Multi-cuisine buffet, six live counters'],
    loved: true,
  },
  {
    name: 'Platinum',
    price: '₹1,900',
    unit: 'per plate',
    blurb: 'Nothing held back. A multi-day wedding hosted end to end.',
    features: ['Exclusive multi-day use of the estate', 'Bespoke set design by our creative director', 'Bespoke menu with our executive chef'],
  },
];

const galleryStrip = [
  '/images/1519225421980-715cb0215aed.jpg',
  '/images/1469371670807-013ccf25f16a.jpg',
  '/images/1606800052052-a08af7148866.jpg',
  '/images/1520854221256-17451cc331bf.jpg',
  '/images/1519741497674-611481863552.jpg',
  '/images/1465495976277-4387d4b0b4c6.jpg',
];

const testimonials = [
  {
    quote:
      'Haldi on the lawn in the morning, pheras in the hall, sangeet on the terrace. Our guests never had to leave — and neither did we.',
    name: 'Aishwarya & Rohan',
    detail: 'Wedding · December 2025',
  },
  {
    quote:
      'The events team thought of things we did not know we needed. The mandap at golden hour looked like a film set.',
    name: 'The Sharma Family',
    detail: 'Mehendi + Wedding · February 2026',
  },
  {
    quote:
      'Food is what our relatives still talk about. The live chaat counter had a queue all evening — in the best way.',
    name: 'Priya & Arjun',
    detail: 'Reception · November 2025',
  },
];

export default function MarriageHallPage() {
  const [showPill, setShowPill] = useState(false);
  const [pillDismissed, setPillDismissed] = useState(false);

  useEffect(() => {
    function onScroll() {
      setShowPill(window.scrollY > window.innerHeight * 0.75);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main className="bg-cream text-ink">
      <section className="relative min-h-[96vh] flex items-center justify-center overflow-hidden">
        <Image
          src={HERO_IMG}
          alt="Wedding decor at 7 Vachan"
          fill
          priority
          className="object-cover animate-kenburns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night/70 via-night/45 to-night/75" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-24">
          <div className="hero-anim d1">
            <Eyebrow dark>Weddings &amp; Celebrations</Eyebrow>
          </div>
          <WordReveal as="h1" text="The wedding your family will talk about for years" delay={0.35} className="type-hero-h1 mt-6" />
          <p className="hero-anim d3 type-hero-sub mt-6 max-w-2xl mx-auto">
            A pillarless banquet hall, a starlit terrace and a fairy-lit garden lawn —
            every ritual of your celebration, in one beautiful address.
          </p>
          <div className="hero-anim d4 flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Btn href="/marriage-hall/availability" variant="gold">
              Check your date <ArrowRight size={16} />
            </Btn>
            <Btn href="#spaces" variant="light">
              See the venue
            </Btn>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/60">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <span className="w-px h-10 bg-cream/40" />
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="container-luxe">
          <Reveal>
            <SectionHeading
              eyebrow="The Venue"
              title="Three spaces, one celebration"
              subtitle="Haldi on the lawn in the morning, the ceremony in the hall, the sangeet on the terrace. Nobody has to travel between venues."
            />
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-6 mt-4">
            {[
              { value: '600+', label: 'Seated in the banquet hall' },
              { value: '1,000', label: 'Floating capacity' },
              { value: '3', label: 'Distinct event spaces' },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 0.12}>
                <div className="text-center py-8 px-4 rounded-3xl bg-[#F3EDE1] border border-[#E3DACA]">
                  <p className="font-display text-5xl text-gold">{s.value}</p>
                  <p className="text-sm text-ink/60 mt-2 uppercase tracking-[0.18em]">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="spaces" className="pb-24 sm:pb-32">
        <div className="container-luxe">
          <div className="grid md:grid-cols-3 gap-6">
            {spaces.map((space, i) => (
              <Reveal key={space.name} delay={i * 0.12}>
                <Link
                  href="/marriage-hall/availability"
                  className="group relative block rounded-[28px] overflow-hidden h-[480px] shadow-card hover:shadow-luxe transition-all duration-500 hover:-translate-y-2"
                >
                  <Image
                    src={space.img}
                    alt={space.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/20 to-transparent" />
                  <div className="absolute top-6 left-6">
                    <span className="text-[11px] uppercase tracking-[0.3em] text-cream/70">{space.tag}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-7">
                    <h3 className="font-display text-3xl text-cream group-hover:text-gold transition-colors">
                      {space.name}
                    </h3>
                    <p className="text-cream/70 text-sm mt-2 leading-relaxed">{space.desc}</p>
                    <p className="text-cream text-xs uppercase tracking-[0.2em] mt-4">
                      {space.seated} · {space.floating}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32 bg-[#F3EDE1]">
        <div className="container-luxe">
          <Reveal>
            <SectionHeading
              eyebrow="Packages"
              title="Begin with a package, end with your wedding"
              subtitle="Every package is a starting point. We adjust it around your family, your rituals and your guest list."
            />
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6 mt-4">
            {packages.map((pkg, i) => (
              <Reveal key={pkg.name} delay={i * 0.12}>
                <div
                  className={`relative rounded-[28px] p-8 h-full flex flex-col transition-all duration-500 hover:-translate-y-2 ${
                    pkg.loved
                      ? 'bg-ink text-cream shadow-luxe'
                      : 'bg-white shadow-card hover:shadow-luxe'
                  }`}
                >
                  {pkg.loved && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-white text-[11px] uppercase tracking-[0.22em] px-5 py-1.5 rounded-full">
                      Most Loved
                    </span>
                  )}
                  <h3 className={`font-display text-3xl ${pkg.loved ? 'text-cream' : 'text-ink'}`}>{pkg.name}</h3>
                  <p className="mt-3">
                    <span className="font-display text-4xl text-gold"><CountUp value={Number(pkg.price.replace(/[^0-9]/g, ''))} /></span>
                    <span className={`text-sm ml-2 ${pkg.loved ? 'text-cream/60' : 'text-ink/50'}`}>{pkg.unit}</span>
                  </p>
                  <p className={`text-sm mt-4 leading-relaxed ${pkg.loved ? 'text-cream/70' : 'text-ink/60'}`}>
                    {pkg.blurb}
                  </p>
                  <ul className="mt-6 space-y-3 flex-1">
                    {pkg.features.map((f) => (
                      <li key={f} className={`flex items-start gap-3 text-sm ${pkg.loved ? 'text-cream/80' : 'text-ink/70'}`}>
                        <Sparkles size={15} className="text-gold mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Btn href="/marriage-hall/packages" variant={pkg.loved ? 'gold' : 'dark'} className="mt-8 w-full">
                    View details <ArrowRight size={15} />
                  </Btn>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="container-luxe grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="relative rounded-[32px] overflow-hidden h-[440px] shadow-card group">
              <Image
                src="/images/1519225421980-715cb0215aed.jpg"
                alt="Wedding decoration"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <Eyebrow align="left">Decoration</Eyebrow>
            <WordReveal as="h2" playOnView text="Eight styling directions, each with its own palette" className="mt-5 type-h2" />
            <p className="text-ink/60 mt-5 leading-relaxed">
              Royal gold, pastel florals, traditional marigold — or bring us a photograph
              and we will build it. Our in-house decor studio designs the mandap, stage,
              entrances and table styling as one story.
            </p>
            <Btn href="/marriage-hall/decorations" variant="dark" className="mt-8">
              See every theme <ArrowRight size={15} />
            </Btn>
          </Reveal>
        </div>
      </section>

      <section className="py-24 sm:py-32 bg-ink text-cream overflow-hidden">
        <div className="container-luxe">
          <Reveal>
            <SectionHeading
              dark
              eyebrow="Gallery"
              title="Moments we have had the honour to host"
              subtitle="A glimpse of recent weddings, receptions and sangeet evenings at 7 Vachan."
            />
          </Reveal>
        </div>
        <div className="container-luxe">
          <div className="flex gap-5 overflow-x-auto no-scrollbar pb-4 snap-x">
            {galleryStrip.map((src, i) => (
              <Reveal key={src} delay={i * 0.08} className="shrink-0 snap-start">
                <Link
                  href="/marriage-hall/gallery"
                  className="group block relative w-72 h-96 rounded-[24px] overflow-hidden"
                >
                  <Image
                    src={src}
                    alt="Wedding gallery preview"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-night/0 group-hover:bg-night/25 transition-colors duration-500" />
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="text-center mt-10">
            <Reveal>
              <Btn href="/marriage-hall/gallery" variant="gold">
                Open the gallery <ArrowRight size={15} />
              </Btn>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="container-luxe">
          <Reveal>
            <SectionHeading
              eyebrow="Kind Words"
              title="Loved by the families we host"
            />
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6 mt-4">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.12}>
                <figure className="bg-white rounded-[28px] p-8 shadow-card h-full flex flex-col hover:shadow-luxe hover:-translate-y-2 transition-all duration-500">
                  <Stars className="mb-5" />
                  <blockquote className="font-display italic text-xl leading-relaxed text-ink/85 flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6">
                    <p className="font-medium text-sm">{t.name}</p>
                    <p className="text-xs text-ink/50 mt-1 uppercase tracking-[0.15em]">{t.detail}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <div className="text-center mt-10">
            <Reveal>
              <Btn href="/marriage-hall/reviews" variant="outline">
                Read all reviews <ArrowRight size={15} />
              </Btn>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-[#F3EDE1] border-y border-[#E3DACA]">
        <div className="container-luxe py-12 flex flex-col lg:flex-row items-center justify-between gap-6">
          <Reveal className="w-full">
            <div className="flex items-start gap-4">
              <span className="w-12 h-12 rounded-full bg-gold/15 flex items-center justify-center shrink-0">
                <Sparkles size={22} className="text-golddeep" />
              </span>
              <div>
                <p className="font-display text-2xl">Book Two Functions</p>
                <p className="text-ink/60 text-sm mt-1 leading-relaxed">
                  Hold your Mehendi and Sangeet with us alongside the wedding and the
                  terrace hire is complimentary.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Btn href="/marriage-hall/availability" variant="gold" className="shrink-0">
              Claim the offer <ArrowRight size={15} />
            </Btn>
          </Reveal>
        </div>
      </section>

      <section className="py-24 sm:py-32 bg-ink text-cream">
        <div className="container-luxe text-center max-w-3xl mx-auto">
          <Reveal>
            <Eyebrow>Your Date</Eyebrow>
            <WordReveal as="h2" playOnView text="Come and see the room" className="mt-5 type-h2" />
            <p className="text-cream/65 mt-5 leading-relaxed">
              Check whether your date is open, tell us a little about the occasion, and we
              will call you. No payment, no obligation — just a conversation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <Btn href="/marriage-hall/availability" variant="gold">
                Check your date <ArrowRight size={15} />
              </Btn>
              <a href="tel:9993542874" className="btn-outline">
                <Phone size={15} /> Call 9993542874
              </a>
            </div>
            <p className="mt-8 text-sm text-cream/50 flex items-center justify-center gap-2">
              <Mail size={14} className="text-gold" /> events@7vachan.com
            </p>
          </Reveal>
        </div>
      </section>

      {showPill && !pillDismissed && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2">
          <Link
            href="/marriage-hall/availability"
            className="flex items-center gap-3 bg-gold text-white pl-6 pr-7 py-4 rounded-full shadow-luxe hover:bg-golddeep transition-all duration-300 hover:-translate-y-1"
          >
            <CalendarCheck size={20} />
            <span className="text-sm font-medium uppercase tracking-[0.2em]">Check your date</span>
            <ArrowRight size={16} />
          </Link>
          <button
            onClick={() => setPillDismissed(true)}
            aria-label="Dismiss"
            className="w-9 h-9 rounded-full bg-night/80 text-cream/70 flex items-center justify-center hover:bg-night hover:text-cream transition"
          >
            <X size={15} />
          </button>
        </div>
      )}
    </main>
  );
}

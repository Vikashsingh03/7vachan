'use client';

import { useState } from 'react';
import { Star, CheckCircle2, Send, Quote } from 'lucide-react';
import { Reveal, SectionHeading, Eyebrow, Btn, Stars, PageHero } from '@/components/ui';

const ratingSummary = {
  average: '4.9',
  total: 214,
  dist: [
    { stars: 5, pct: 88 },
    { stars: 4, pct: 9 },
    { stars: 3, pct: 2 },
    { stars: 2, pct: 1 },
    { stars: 1, pct: 0 },
  ],
};

const reviews = [
  {
    name: 'Aishwarya & Rohan',
    date: 'December 2025',
    rating: 5,
    event: 'Wedding · Gold Package',
    text: 'Haldi on the lawn in the morning, pheras in the hall, sangeet on the terrace. Our guests never had to leave — and neither did we. The events team handled a 600-guest baraat like it was a family dinner.',
  },
  {
    name: 'The Sharma Family',
    date: 'February 2026',
    rating: 5,
    event: 'Mehendi + Wedding',
    text: 'The events team thought of things we did not know we needed. The mandap at golden hour looked like a film set, and my mother is still showing the photos to everyone who visits.',
  },
  {
    name: 'Priya & Arjun',
    date: 'November 2025',
    rating: 5,
    event: 'Reception · Silver Package',
    text: 'Food is what our relatives still talk about. The live chaat counter had a queue all evening — in the best way. Service was warm without ever hovering.',
  },
  {
    name: 'Kavita & Sameer',
    date: 'January 2026',
    rating: 5,
    event: 'Engagement · Terrace',
    text: 'We booked the terrace for our engagement and it felt like our own private sky. Fairy lights, cool breeze, and the city glittering below. Intimate and perfect.',
  },
  {
    name: 'The Verma Family',
    date: 'December 2025',
    rating: 4,
    event: 'Wedding · Platinum Package',
    text: 'Three functions across three days and everything ran on time. The decor team rebuilt our Pinterest board better than the pictures. Only wish we had booked the bridal suite for an extra night.',
  },
  {
    name: 'Neha & Aditya',
    date: 'October 2025',
    rating: 5,
    event: 'Sangeet + Wedding',
    text: 'From the first site visit to the vidaai, one coordinator owned everything. We actually got to enjoy our own wedding instead of managing it.',
  },
];

const inputCls =
  'w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition placeholder:text-ink/30';

export default function ReviewsPage() {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState('');
  const [done, setDone] = useState(false);

  function submit(e) {
    e.preventDefault();
    setDone(true);
  }

  return (
    <main className="bg-cream text-ink">
      <PageHero
        eyebrow="Guest Stories"
        title="Reviews"
        subtitle="Real celebrations, real words from the wedding families we have had the honour to host."
      />

      <section className="py-20 sm:py-24">
        <div className="container-luxe grid lg:grid-cols-3 gap-8 items-start">
          <Reveal>
            <div className="bg-ink text-cream rounded-[28px] p-8 lg:sticky lg:top-28">
              <Eyebrow align="left">Rating Summary</Eyebrow>
              <p className="font-display text-7xl mt-4">{ratingSummary.average}</p>
              <Stars className="mt-3" size={18} />
              <p className="text-sm text-cream/50 mt-2 mb-7">
                Based on {ratingSummary.total} verified reviews
              </p>
              <div className="space-y-2.5">
                {ratingSummary.dist.map((row) => (
                  <div key={row.stars} className="flex items-center gap-3 text-sm">
                    <span className="w-10 text-cream/60">{row.stars} star</span>
                    <div className="flex-1 h-2 bg-cream/15 rounded-full overflow-hidden">
                      <div className="h-full bg-gold rounded-full" style={{ width: `${row.pct}%` }} />
                    </div>
                    <span className="w-10 text-right text-cream/50">{row.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
            {reviews.map((r, i) => (
              <Reveal key={r.name} delay={(i % 2) * 0.1} className="h-full">
                <article className="relative bg-white rounded-[28px] shadow-card p-8 h-full overflow-hidden hover:shadow-luxe hover:-translate-y-1.5 transition-all duration-500">
                  <Quote
                    size={96}
                    className="absolute -top-3 -right-3 text-gold/10 rotate-180"
                    aria-hidden="true"
                  />
                  <div className="relative">
                    <Stars value={r.rating} />
                    <blockquote className="font-display italic text-lg leading-relaxed text-ink/85 mt-4">
                      &ldquo;{r.text}&rdquo;
                    </blockquote>
                    <div className="mt-6">
                      <p className="font-medium text-sm">{r.name}</p>
                      <p className="text-xs text-ink/50 mt-1 uppercase tracking-[0.15em]">
                        {r.event} · {r.date}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="container-luxe max-w-2xl">
          <Reveal>
            <SectionHeading
              eyebrow="Share Your Story"
              title="Celebrated with us?"
              subtitle="Your words help the next family choose with confidence."
            />
          </Reveal>
          <Reveal delay={0.1}>
            {done ? (
              <div className="bg-white rounded-[28px] shadow-card p-10 text-center">
                <span className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={32} className="text-emerald-600" />
                </span>
                <h3 className="font-display text-3xl mb-3">Thank you, {name.split(' ')[0] || 'friend'}</h3>
                <p className="text-ink/60 text-sm leading-relaxed max-w-sm mx-auto">
                  Your review has been received with love. It will appear here after a
                  quick moderation by our team.
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
                <div>
                  <label htmlFor="rv-name" className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/55">
                    Your name
                  </label>
                  <input
                    id="rv-name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Priya & Aman"
                    className={`${inputCls} mt-3`}
                  />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/55">
                    Your rating
                  </span>
                  <div className="flex gap-1.5 mt-3">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setRating(s)}
                        onMouseEnter={() => setHover(s)}
                        onMouseLeave={() => setHover(0)}
                        aria-label={`${s} star${s > 1 ? 's' : ''}`}
                      >
                        <Star
                          size={32}
                          className={
                            s <= (hover || rating) ? 'fill-gold text-gold' : 'text-ink/20'
                          }
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label htmlFor="rv-text" className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/55">
                    Your review
                  </label>
                  <textarea
                    id="rv-text"
                    required
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Tell us about your celebration..."
                    rows={4}
                    className={`${inputCls} mt-3 resize-none`}
                  />
                </div>
                <button type="submit" className="btn-gold w-full uppercase">
                  Submit review <Send size={15} />
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </main>
  );
}

'use client';

import { useMemo, useState } from 'react';
import { Star, Send, BadgeCheck, User, Quote } from 'lucide-react';
import Reveal from '@/components/Reveal';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';
import WordReveal from '@/components/WordReveal';

const seedReviews = [
  {
    name: 'Priya Malhotra',
    rating: 5,
    date: '12 Sept 2026',
    text: 'The Dal Saat Vachan alone is worth the visit. Beautiful room, and the staff treated our anniversary like their own celebration.',
  },
  {
    name: 'Rohan Verma',
    rating: 5,
    date: '28 Aug 2026',
    text: 'Booked the Private Room for a team dinner of 14. Flawless service, the tandoor platter kept coming, and billing was transparent.',
  },
  {
    name: 'Anita Desai',
    rating: 4,
    date: '15 Aug 2026',
    text: 'Lovely terrace in the evening. The biryani is genuinely dum-cooked and the Jain options for my mother were handled with care.',
  },
  {
    name: 'Karan Singh',
    rating: 5,
    date: '2 Aug 2026',
    text: 'Weekday lunch thali is the best value in Satna, hands down. Fresh, hot, and the staff remember you on the second visit.',
  },
  {
    name: 'Meera Iyer',
    rating: 5,
    date: '21 July 2026',
    text: 'Murgh Malai Kebab melts in the mouth. Quiet family lounge, quick service, and the live tandoor is theatre in itself.',
  },
  {
    name: 'Aditya Rao',
    rating: 4,
    date: '9 July 2026',
    text: 'Good food, honest prices. Weekend evenings get busy — reserve ahead and you will have a wonderful time.',
  },
];

function Stars({ value, size = 16 }) {
  return (
    <span className="inline-flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          style={{ width: size, height: size }}
          className={s <= value ? 'text-gold fill-gold' : 'text-ink/20'}
        />
      ))}
    </span>
  );
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(seedReviews);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState('');
  const [sent, setSent] = useState(false);
  const [touched, setTouched] = useState(false);

  const stats = useMemo(() => {
    const total = reviews.length;
    const avg = total ? reviews.reduce((s, r) => s + r.rating, 0) / total : 0;
    const dist = [5, 4, 3, 2, 1].map((s) => ({
      stars: s,
      count: reviews.filter((r) => r.rating === s).length,
    }));
    return { total, avg, dist };
  }, [reviews]);

  const valid = name.trim() !== '' && text.trim().length >= 10;

  const submit = (e) => {
    e.preventDefault();
    if (!valid) {
      setTouched(true);
      return;
    }
    setReviews([{ name: name.trim(), rating, date: 'Just now', text: text.trim() }, ...reviews]);
    setSent(true);
    setName('');
    setText('');
    setRating(5);
    setTouched(false);
  };

  return (
    <main>
      <PageHero
        eyebrow="Guest Stories"
        title="What guests say"
        subtitle="Unfiltered words from the tables we have served."
      />

      <section className="py-16 md:py-24 bg-cream">
        <div className="container-luxe">
          <Reveal>
            <div className="bg-white rounded-[28px] shadow-card p-8 md:p-12 mb-14 grid md:grid-cols-[auto_1fr] gap-10 items-center">
              <div className="text-center md:text-left">
                <p className="font-display text-7xl text-ink font-medium">{stats.avg.toFixed(1)}</p>
                <div className="my-3 flex justify-center md:justify-start">
                  <Stars value={Math.round(stats.avg)} size={20} />
                </div>
                <p className="text-ink/50 text-sm">Out of 5 · Based on {stats.total} guest reviews</p>
              </div>
              <div className="space-y-3">
                {stats.dist.map((d) => (
                  <div key={d.stars} className="flex items-center gap-3">
                    <span className="text-sm text-ink/60 w-8 shrink-0">{d.stars} ★</span>
                    <div className="flex-1 h-2.5 bg-cream rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-golddeep to-gold rounded-full transition-all duration-700"
                        style={{ width: `${stats.total ? (d.count / stats.total) * 100 : 0}%` }}
                      />
                    </div>
                    <span className="text-sm text-ink/45 w-8 text-right shrink-0">{d.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <SectionHeading
              eyebrow="Reviews"
              title="In their words"
              subtitle="Serious about food, generous with praise."
            />
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {reviews.map((r, i) => (
              <Reveal key={`${r.name}-${i}`} delay={(i % 3) * 100}>
                <article className="relative bg-white rounded-[24px] shadow-card p-8 h-full hover:-translate-y-2 transition-transform duration-500 overflow-hidden">
                  <Quote className="absolute -top-2 -right-2 text-gold/10" style={{ width: 96, height: 96 }} />
                  <div className="relative">
                    <Stars value={r.rating} />
                    <p className="font-display italic text-xl text-ink/85 leading-relaxed my-5">
                      “{r.text}”
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-ink">{r.name}</p>
                        <p className="text-ink/45 text-xs uppercase tracking-[0.2em] mt-1">{r.date}</p>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="max-w-2xl mx-auto">
            <Reveal>
              <div className="bg-ink text-cream rounded-[28px] p-8 md:p-12">
                {sent ? (
                  <div className="text-center py-8">
                    <span className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/15 text-gold mb-6">
                      <BadgeCheck className="w-10 h-10" />
                    </span>
                    <h2 className="font-display text-3xl font-medium mb-3">Thank you for the kind words</h2>
                    <p className="text-cream/60 leading-relaxed mb-8">
                      Your review is now part of our story. We read every single one.
                    </p>
                    <button onClick={() => setSent(false)} className="btn-outline uppercase">
                      Write Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={submit} noValidate>
                    <p className="section-eyebrow mb-4">Share Your Experience</p>
                    <WordReveal as="h2" playOnView text="Dined with us recently?" className="mb-8 text-cream type-h2" />
                    <div className="space-y-5">
                      <label className="block">
                        <span className="text-[11px] uppercase tracking-[0.25em] text-cream/50 font-medium mb-2 block">Your name</span>
                        <span className="relative block">
                          <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gold pointer-events-none" style={{ width: 18, height: 18 }} />
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="What should we call you?"
                            className="w-full bg-cream/10 rounded-2xl py-4 text-cream placeholder:text-cream/35 outline-none border border-transparent focus:border-gold/70 transition-all"
                            style={{ paddingLeft: '3.25rem', paddingRight: '1.25rem' }}
                          />
                        </span>
                      </label>
                      <div>
                        <span className="text-[11px] uppercase tracking-[0.25em] text-cream/50 font-medium mb-3 block">Your rating</span>
                        <div className="flex items-center gap-2">
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
                                style={{ width: 32, height: 32 }}
                                className={`transition-all ${(hover || rating) >= s ? 'text-gold fill-gold scale-110' : 'text-cream/25'}`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      <label className="block">
                        <span className="text-[11px] uppercase tracking-[0.25em] text-cream/50 font-medium mb-2 block">Your review</span>
                        <textarea
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                          placeholder="Tell us about the food, the room, the evening… (min 10 characters)"
                          rows={5}
                          className="w-full bg-cream/10 rounded-2xl p-5 text-cream placeholder:text-cream/35 outline-none border border-transparent focus:border-gold/70 transition-all resize-none"
                        />
                      </label>
                      {touched && !valid && (
                        <p className="text-sm text-gold">Please add your name and a few words (10+ characters).</p>
                      )}
                      <button type="submit" className="btn-gold uppercase w-full">
                        Submit Review <Send className="w-4 h-4" />
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

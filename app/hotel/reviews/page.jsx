'use client';

import { useState } from "react";
import { Quote, BadgeCheck, Star } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { Stars, Btn } from "../_ui";
import { reviews } from "../_data";
import WordReveal from "@/components/WordReveal";

const inputCls =
  "w-full bg-cream border border-[#E3DACA] rounded-2xl px-5 py-4 text-ink outline-none focus:border-gold transition-colors";

export default function ReviewsPage() {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);

  function submit(e) {
    e.preventDefault();
    if (name.trim().length >= 2 && text.trim().length >= 10) setSent(true);
  }

  return (
    <>
      <section className="pt-36 pb-14 bg-ink text-cream">
        <div className="container-luxe text-center">
          <p className="section-eyebrow on-dark mb-4">Hotel · Reviews</p>
          <WordReveal as="h1" text="Guest Stories" className="page-title mb-4" />
          <p className="text-cream/70 leading-relaxed max-w-2xl mx-auto">
            In our guests&rsquo; own words.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container-luxe">
          <Reveal>
            <div className="max-w-3xl mx-auto bg-[#221B14] text-cream rounded-[32px] p-10 md:p-14 text-center mb-16 relative overflow-hidden">
              <Quote className="absolute -top-4 left-8 w-32 h-32 text-gold/10 rotate-180" />
              <p className="font-display text-7xl md:text-8xl text-gold relative">4.0</p>
              <p className="text-cream/70 uppercase tracking-[0.25em] text-xs mt-2 relative">Out of 5</p>
              <Stars value={4} className="justify-center mt-4 relative" />
              <p className="text-cream/50 text-sm mt-4 relative">Based on 2 Google &amp; on-site reviews</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
            {reviews.map((r, i) => (
              <Reveal key={r.name} delay={i * 0.1}>
                <figure className="relative bg-white border border-[#E3DACA] rounded-[24px] p-8 md:p-10 h-full shadow-card">
                  <Quote className="absolute top-6 right-8 w-10 h-10 text-gold/20" />
                  <Stars value={r.rating} className="mb-5" />
                  <p className="text-xs uppercase tracking-[0.25em] text-gold mb-3">{r.title}</p>
                  <blockquote className="font-display italic text-xl leading-relaxed text-ink/85 mb-6">
                    &ldquo;{r.text}&rdquo;
                  </blockquote>
                  <figcaption className="flex items-center gap-4">
                    <span className="w-12 h-12 rounded-full bg-gold/15 border border-gold/50 flex items-center justify-center font-display text-xl text-gold">
                      {r.name.charAt(0)}
                    </span>
                    <span>
                      <span className="block text-ink font-medium">{r.name}</span>
                      <span className="block text-ink/50 text-sm">{r.date}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="max-w-2xl mx-auto bg-[#F3EDE1] border border-[#E3DACA] rounded-[32px] p-8 md:p-12">
              <SectionHeading eyebrow="Your turn" title="Write a review" />
              {sent ? (
                <div className="text-center py-8">
                  <span className="w-16 h-16 mx-auto mb-5 rounded-full bg-gold/15 border-2 border-gold flex items-center justify-center text-gold">
                    <BadgeCheck className="w-8 h-8" />
                  </span>
                  <h3 className="font-display text-3xl text-ink mb-3">Thank you, {name.split(" ")[0]}.</h3>
                  <p className="text-ink/60 leading-relaxed">
                    Your review has been noted and will appear here after a quick moderation check.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-6">
                  <label className="block">
                    <span className="block text-[11px] uppercase tracking-[0.3em] text-gold mb-2">Your name</span>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Neha Gupta" className={inputCls} required />
                  </label>
                  <div>
                    <span className="block text-[11px] uppercase tracking-[0.3em] text-gold mb-3">Your rating</span>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <button key={i} type="button" onClick={() => setRating(i)} aria-label={`${i} stars`} className="transition-transform hover:scale-110">
                          <Star className={`w-8 h-8 ${i <= rating ? "fill-gold text-gold" : "text-gold/30"}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <label className="block">
                    <span className="block text-[11px] uppercase tracking-[0.3em] text-gold mb-2">Your review</span>
                    <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} placeholder="Tell us about your stay…" className={`${inputCls} resize-none`} required minLength={10} />
                  </label>
                  <Btn type="submit" variant="gold" className="w-full">
                    Submit review
                  </Btn>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

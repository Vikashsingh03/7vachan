'use client';

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, BadgeCheck, CalendarDays } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { Btn } from "../_ui";
import { offers, CONTACT } from "../_data";
import WordReveal from "@/components/WordReveal";

export default function OffersPage() {
  const [reserved, setReserved] = useState(null);
  return (
    <>
      <section className="pt-36 pb-14 bg-ink text-cream">
        <div className="container-luxe text-center">
          <p className="section-eyebrow on-dark mb-4">Hotel · Offers</p>
          <WordReveal as="h1" text="Offers & Celebrations" className="page-title mb-4" />
          <p className="text-cream/70 leading-relaxed max-w-2xl mx-auto">
            Seasonal generosity from the family — reserve an offer and we will hold it for your dates.
          </p>
        </div>
      </section>
      <section className="py-20 md:py-24">
        <div className="container-luxe">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {offers.map((o, i) => (
              <Reveal key={o.slug} delay={(i % 2) * 0.1}>
                <div className="card-luxe group h-full flex flex-col">
                  <div className="relative h-64 overflow-hidden">
                    <Image src={o.image} alt={o.title} fill className="zoom object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                    <span className="absolute top-4 left-4 bg-night/70 backdrop-blur text-cream text-[11px] uppercase tracking-[0.2em] px-4 py-2 rounded-full inline-flex items-center gap-2">
                      <CalendarDays className="w-3.5 h-3.5" /> {o.validity}
                    </span>
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <h2 className="font-display text-3xl text-ink mb-3 transition-colors duration-300 group-hover:text-gold">
                      {o.title}
                    </h2>
                    <p className="text-ink/60 leading-relaxed mb-7 flex-1">{o.text}</p>
                    {reserved === o.slug ? (
                      <p className="inline-flex items-center gap-2 text-gold text-xs uppercase tracking-[0.25em] font-medium">
                        <BadgeCheck className="w-5 h-5" /> Reserved — we&rsquo;ll call you on your dates
                      </p>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setReserved(o.slug)}
                        className="gold-link self-start"
                      >
                        Reserve this offer <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="text-center mt-14">
            <p className="text-ink/60 mb-6">
              Prefer to talk it through? Call us on{" "}
              <a href={CONTACT.phoneHref} className="text-gold link-sweep font-medium">{CONTACT.phone}</a>
            </p>
            <Btn href="/hotel/booking" variant="dark">
              Book your stay
            </Btn>
          </Reveal>
        </div>
      </section>
    </>
  );
}

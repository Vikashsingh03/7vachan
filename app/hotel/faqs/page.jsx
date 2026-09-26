'use client';

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { Btn } from "../_ui";
import { faqs, CONTACT } from "../_data";
import WordReveal from "@/components/WordReveal";

export default function FaqsPage() {
  const [open, setOpen] = useState(0);
  return (
    <>
      <section className="pt-36 pb-14 bg-ink text-cream">
        <div className="container-luxe text-center">
          <p className="section-eyebrow on-dark mb-4">Hotel · FAQs</p>
          <WordReveal as="h1" text="Questions, Answered" className="page-title mb-4" />
          <p className="text-cream/70 leading-relaxed max-w-2xl mx-auto">
            Everything guests usually ask before they arrive. Anything else — call{" "}
            <a href={CONTACT.phoneHref} className="text-gold">{CONTACT.phone}</a>.
          </p>
        </div>
      </section>
      <section className="py-20 md:py-24">
        <div className="container-luxe max-w-3xl">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={Math.min(i, 3) * 0.06}>
              <div className="border-b border-[#E3DACA]">
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between py-7 text-left gap-6"
                  aria-expanded={open === i}
                >
                  <span className={`font-display text-xl md:text-2xl transition-colors duration-300 ${open === i ? "text-gold" : "text-ink"}`}>
                    {f.q}
                  </span>
                  <span className={`w-10 h-10 shrink-0 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${open === i ? "border-gold bg-gold text-cream rotate-180" : "border-ink/20 text-ink/60"}`}>
                    <ChevronDown className="w-5 h-5" />
                  </span>
                </button>
                <div className={`grid transition-all duration-400 ${open === i ? "grid-rows-[1fr] pb-8" : "grid-rows-[0fr]"}`}>
                  <p className="overflow-hidden text-ink/65 leading-relaxed">{f.a}</p>
                </div>
              </div>
            </Reveal>
          ))}
          <Reveal className="text-center mt-14">
            <Btn href="/hotel/booking" variant="gold">
              Book your stay
            </Btn>
          </Reveal>
        </div>
      </section>
    </>
  );
}

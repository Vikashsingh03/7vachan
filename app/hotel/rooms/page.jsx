'use client';

import { useState } from "react";
import Reveal from "@/components/Reveal";
import { Eyebrow, RoomCard } from "../_ui";
import { rooms } from "../_data";
import WordReveal from "@/components/WordReveal";

const filters = ["All", "Deluxe", "Executive", "Family", "Luxury"];

export default function RoomsPage() {
  const [active, setActive] = useState("All");
  const visible = active === "All" ? rooms : rooms.filter((r) => r.category === active);
  return (
    <>
      <section className="pt-36 pb-14 bg-ink text-cream">
        <div className="container-luxe text-center">
          <p className="section-eyebrow on-dark mb-4">Hotel · Accommodation</p>
          <WordReveal as="h1" text="Rooms & Suites" className="page-title mb-4" />
          <p className="text-cream/70 leading-relaxed max-w-2xl mx-auto">
            Thoughtfully composed spaces where natural light, considered materials and quiet
            detail come together.
          </p>
        </div>
      </section>
      <section className="py-20 md:py-24">
        <div className="container-luxe">
          <Reveal>
            <div className="flex flex-wrap justify-center gap-3 mb-14">
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActive(f)}
                  className={`px-7 py-3 rounded-full text-xs uppercase tracking-[0.25em] font-medium border transition-all duration-300 ${
                    active === f
                      ? "bg-ink text-cream border-ink shadow-card"
                      : "bg-transparent text-ink/60 border-ink/20 hover:border-gold hover:text-gold"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </Reveal>
          <div key={active} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visible.map((room, i) => (
              <Reveal key={room.slug} delay={Math.min(i, 2) * 0.1}>
                <RoomCard room={room} />
              </Reveal>
            ))}
          </div>
          {visible.length === 0 && (
            <p className="text-center text-ink/50 py-16">No rooms in this category yet.</p>
          )}
        </div>
      </section>
    </>
  );
}

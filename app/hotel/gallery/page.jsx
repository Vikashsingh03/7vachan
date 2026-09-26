'use client';

import { useState } from "react";
import Image from "next/image";
import { X, Expand } from "lucide-react";
import Reveal from "@/components/Reveal";
import { galleryTabs, galleryImages } from "../_data";
import WordReveal from "@/components/WordReveal";

export default function GalleryPage() {
  const [tab, setTab] = useState("Rooms");
  const [lightbox, setLightbox] = useState(null);
  const visible = galleryImages.filter((g) => g.tab === tab);
  return (
    <>
      <section className="pt-36 pb-14 bg-ink text-cream">
        <div className="container-luxe text-center">
          <p className="section-eyebrow on-dark mb-4">Hotel · Gallery</p>
          <WordReveal as="h1" text="Moments from the Estate" className="page-title mb-4" />
          <p className="text-cream/70 leading-relaxed max-w-2xl mx-auto">
            Rooms, lobby, pool and dining — a walk through 7 Vachan, frame by frame.
          </p>
        </div>
      </section>
      <section className="py-20 md:py-24">
        <div className="container-luxe">
          <Reveal>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {galleryTabs.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={`px-7 py-3 rounded-full text-xs uppercase tracking-[0.25em] font-medium border transition-all duration-300 ${
                    tab === t
                      ? "bg-ink text-cream border-ink shadow-card"
                      : "bg-transparent text-ink/60 border-ink/20 hover:border-gold hover:text-gold"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </Reveal>
          <div key={tab} className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
            {visible.map((g, i) => (
              <Reveal key={g.src} delay={Math.min(i, 3) * 0.07} className="mb-6 break-inside-avoid">
                <button
                  type="button"
                  onClick={() => setLightbox(g)}
                  className="group relative block w-full rounded-[24px] overflow-hidden shadow-card"
                >
                  <Image
                    src={g.src}
                    alt={g.alt}
                    width={800}
                    height={i % 3 === 0 ? 1000 : i % 3 === 1 ? 700 : 850}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <span className="absolute inset-0 bg-night/0 group-hover:bg-night/35 transition-colors duration-500 flex items-center justify-center">
                    <Expand className="w-8 h-8 text-cream opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-night/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute top-6 right-6 w-12 h-12 rounded-full border border-cream/40 text-cream flex items-center justify-center hover:bg-gold hover:border-gold transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={lightbox.src}
              alt={lightbox.alt}
              width={1400}
              height={900}
              className="w-full h-auto max-h-[80vh] object-contain rounded-[24px]"
            />
            <p className="text-center text-cream/70 mt-4 text-sm uppercase tracking-[0.25em]">{lightbox.alt}</p>
          </div>
        </div>
      )}
    </>
  );
}

'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import Reveal from '@/components/Reveal';
import PageHero from '@/components/PageHero';

const img = (id, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

const tabs = ['All', 'Interiors', 'Dishes', 'Tandoor', 'Desserts'];

const photos = [
  { id: '1414235077428-338989a2e8c0', cat: 'Interiors', label: 'The main dining hall' },
  { id: '1517248135467-4c7edcad34c4', cat: 'Interiors', label: 'Evening seating' },
  { id: '1552566626-52f8b828add9', cat: 'Interiors', label: 'Warm corners' },
  { id: '1514933651103-005eec06c04b', cat: 'Interiors', label: 'Terrace at dusk' },
  { id: '1565557623262-b51c2513a641', cat: 'Dishes', label: 'Paneer Tikka Lasooni' },
  { id: '1603894584373-5ac82b2ae398', cat: 'Dishes', label: 'Butter chicken, slow simmered' },
  { id: '1589302168068-964664d93dc0', cat: 'Dishes', label: 'Awadhi Gosht Biryani' },
  { id: '1567188040759-fb8a883dc6d6', cat: 'Dishes', label: 'The weekday thali' },
  { id: '1585937421612-70a008356fbe', cat: 'Dishes', label: 'Dahi Ke Kebab' },
  { id: '1544025162-d76694265947', cat: 'Tandoor', label: 'Skewers over open flame' },
  { id: '1556910103-1c02745aae4d', cat: 'Tandoor', label: 'The kitchen at work' },
  { id: '1577219491135-ce391730fb2c', cat: 'Tandoor', label: 'Chef at the pass' },
  { id: '1551024506-0bccd828d307', cat: 'Desserts', label: 'Something sweet to finish' },
  { id: '1563805042-7684c019e1cb', cat: 'Desserts', label: 'Kulfi, served chilled' },
  { id: '1488477181946-6428a0291777', cat: 'Desserts', label: 'Seasonal dessert plate' },
];

export default function GalleryPage() {
  const [tab, setTab] = useState('All');
  const [viewer, setViewer] = useState(null);

  const filtered = useMemo(
    () => (tab === 'All' ? photos : photos.filter((p) => p.cat === tab)),
    [tab]
  );

  const step = (dir) => {
    setViewer((v) => {
      if (v === null) return v;
      return (v + dir + filtered.length) % filtered.length;
    });
  };

  return (
    <main>
      <PageHero
        eyebrow="Gallery"
        title="A look inside"
        subtitle="Firelight, slow cooking and rooms made for long evenings."
      />

      <section className="py-16 md:py-20 bg-cream">
        <div className="container-luxe">
          <Reveal>
            <div className="flex flex-wrap justify-center gap-2.5 mb-12">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-6 py-3 rounded-full text-xs uppercase tracking-[0.18em] font-medium transition-all border ${
                    tab === t
                      ? 'bg-ink text-cream border-ink shadow-card'
                      : 'bg-white text-ink/65 border-ink/12 hover:border-gold hover:text-gold'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="columns-2 md:columns-3 gap-5 [column-fill:balance]">
            {filtered.map((p, i) => (
              <Reveal key={p.id + p.label} delay={(i % 3) * 80}>
                <button
                  onClick={() => setViewer(i)}
                  className="group relative block w-full mb-5 rounded-[22px] overflow-hidden shadow-card text-left"
                >
                  <Image
                    src={img(p.id, 800)}
                    alt={p.label}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ transform: 'scale(1)' }}
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="absolute bottom-0 inset-x-0 p-5 flex items-end justify-between translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="text-cream font-display text-xl">{p.label}</span>
                    <Expand className="w-5 h-5 text-gold shrink-0" />
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {viewer !== null && filtered[viewer] && (
        <div
          className="fixed inset-0 z-[90] bg-ink/95 backdrop-blur flex items-center justify-center p-4"
          onClick={() => setViewer(null)}
        >
          <button
            aria-label="Close viewer"
            className="absolute top-6 right-6 text-cream/70 hover:text-gold transition-colors"
            onClick={() => setViewer(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <button
            aria-label="Previous photo"
            onClick={(e) => { e.stopPropagation(); step(-1); }}
            className="absolute left-4 md:left-8 text-cream/70 hover:text-gold transition-colors bg-cream/10 rounded-full p-3"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            aria-label="Next photo"
            onClick={(e) => { e.stopPropagation(); step(1); }}
            className="absolute right-4 md:right-8 text-cream/70 hover:text-gold transition-colors bg-cream/10 rounded-full p-3"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative rounded-[24px] overflow-hidden shadow-luxe">
              <Image
                src={img(filtered[viewer].id, 1600)}
                alt={filtered[viewer].label}
                width={1600}
                height={1000}
                className="w-full h-auto max-h-[75vh] object-contain bg-ink"
              />
            </div>
            <div className="flex items-center justify-between mt-4 text-cream">
              <p className="font-display text-2xl">{filtered[viewer].label}</p>
              <p className="text-cream/50 text-sm tracking-widest">
                {viewer + 1} / {filtered.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

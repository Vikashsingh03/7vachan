'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import { Reveal, PageHero } from '@/components/ui';

const U = (id) => `/images/${id.replace('photo-', '')}.jpg`;

const images = [
  { src: U('photo-1519225421980-715cb0215aed'), label: 'Reception in bloom', category: 'Decor' },
  { src: U('photo-1469371670807-013ccf25f16a'), label: 'Ballroom at dusk', category: 'Decor' },
  { src: U('photo-1511795409834-ef04bbd61622'), label: 'Table styling', category: 'Decor' },
  { src: U('photo-1519167758481-83f550bb49b3'), label: 'Chandelier ceiling', category: 'Decor' },
  { src: U('photo-1522673607200-164d1b6ce486'), label: 'Floral details', category: 'Decor' },
  { src: U('photo-1490750967868-88aa4486c946'), label: 'Pastel florals', category: 'Decor' },
  { src: U('photo-1414235077428-338989a2e8c0'), label: 'Fine dining setup', category: 'Decor' },
  { src: U('photo-1514525253161-7a46d19cd819'), label: 'Evening lights', category: 'Decor' },
  { src: U('photo-1583939003579-730e3918a45a'), label: 'Mandap at golden hour', category: 'Mandap' },
  { src: U('photo-1591604466107-ec97de577aff'), label: 'The pheras', category: 'Mandap' },
  { src: U('photo-1606800052052-a08af7148866'), label: 'Floral mandap', category: 'Mandap' },
  { src: U('photo-1464366400600-7168b8af9bc3'), label: 'Lawn ceremony', category: 'Mandap' },
  { src: U('photo-1511285560929-80b456fea0bc'), label: 'Vows exchanged', category: 'Mandap' },
  { src: U('photo-1519741497674-611481863552'), label: 'The couple', category: 'Celebrations' },
  { src: U('photo-1520854221256-17451cc331bf'), label: 'The bride', category: 'Celebrations' },
  { src: U('photo-1465495976277-4387d4b0b4c6'), label: 'Sparkler send-off', category: 'Celebrations' },
  { src: U('photo-1478146896981-b80fe463b330'), label: 'Golden hour portraits', category: 'Celebrations' },
  { src: U('photo-1460978812857-470ed1c77af0'), label: 'First dance', category: 'Celebrations' },
];

const categories = ['All', 'Decor', 'Mandap', 'Celebrations'];

export default function GalleryPage() {
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const counts = useMemo(() => {
    const c = { All: images.length };
    for (const img of images) c[img.category] = (c[img.category] || 0) + 1;
    return c;
  }, []);

  const filtered = useMemo(
    () => (filter === 'All' ? images : images.filter((g) => g.category === filter)),
    [filter]
  );

  const step = (dir) =>
    setLightbox((i) => (i + dir + filtered.length) % filtered.length);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  return (
    <main className="bg-cream text-ink">
      <PageHero
        eyebrow="Gallery"
        title="Moments & Spaces"
        subtitle="Decor, mandaps and celebrations — a glimpse of recent weddings at 7 Vachan."
      />

      <section className="py-20 sm:py-24">
        <div className="container-luxe">
          <Reveal>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setFilter(c);
                    setLightbox(null);
                  }}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    filter === c
                      ? 'bg-ink text-cream shadow-luxe'
                      : 'bg-white border border-ink/15 text-ink/70 hover:border-gold hover:text-ink'
                  }`}
                >
                  {c} <span className={filter === c ? 'text-gold' : 'text-ink/40'}>({counts[c] || 0})</span>
                </button>
              ))}
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((g, i) => (
              <Reveal key={g.src} delay={(i % 3) * 0.08}>
                <button
                  onClick={() => setLightbox(i)}
                  className="group relative rounded-[24px] overflow-hidden h-72 w-full text-left shadow-card hover:shadow-luxe transition-shadow duration-500"
                >
                  <Image
                    src={g.src}
                    alt={g.label}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-night/0 group-hover:bg-night/30 transition-colors duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                      <Expand size={20} className="text-ink" />
                    </span>
                  </div>
                  <span className="absolute bottom-4 left-4 bg-ink/70 backdrop-blur text-cream text-xs px-3 py-1.5 rounded-full">
                    {g.label}
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {lightbox !== null && filtered[lightbox] && (
        <div
          className="fixed inset-0 z-[60] bg-night/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <X size={22} />
          </button>
          <button
            className="absolute left-4 md:left-8 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous photo"
          >
            <ChevronLeft size={22} />
          </button>
          <div
            className="relative w-full max-w-4xl h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={U(filtered[lightbox].src.split('?')[0].split('/').pop(), 1600)}
              alt={filtered[lightbox].label}
              fill
              className="object-contain rounded-xl"
            />
          </div>
          <button
            className="absolute right-4 md:right-8 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next photo"
          >
            <ChevronRight size={22} />
          </button>
          <p className="absolute bottom-6 text-white/80 text-sm">
            {filtered[lightbox].label} · {lightbox + 1} / {filtered.length}
          </p>
        </div>
      )}
    </main>
  );
}

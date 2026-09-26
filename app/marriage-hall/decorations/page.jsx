'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, MoveHorizontal, Palette } from 'lucide-react';
import { Reveal, SectionHeading, Eyebrow, Btn, PageHero } from '@/components/ui';

const BEFORE_IMG =
  '/images/1519167758481-83f550bb49b3.jpg';
const AFTER_IMG =
  '/images/1519225421980-715cb0215aed.jpg';

const themes = [
  {
    name: 'Royal Gold',
    desc: 'Champagne drapes, brass accents and candlelight — timeless palace grandeur for the main ceremony.',
    palette: ['#B98F3E', '#F5E6C8', '#8C6A2B', '#FFFDF7'],
    img: '/images/1519167758481-83f550bb49b3.jpg',
  },
  {
    name: 'Pastel Floral',
    desc: 'Blush roses, lavender and ivory — soft, romantic styling for day functions and receptions.',
    palette: ['#E8B4B8', '#C9A0DC', '#FFF6F0', '#9CAF88'],
    img: '/images/1490750967868-88aa4486c946.jpg',
  },
  {
    name: 'Traditional Marigold',
    desc: 'Genda phool torans, brass urlis and vibrant hues — the classic Indian celebration, done richly.',
    palette: ['#E8A020', '#C0392B', '#F5D76E', '#1E5B3A'],
    img: '/images/1469371670807-013ccf25f16a.jpg',
  },
];

export default function DecorationsPage() {
  const [pos, setPos] = useState(50);

  return (
    <main className="bg-cream text-ink">
      <PageHero
        eyebrow="Wedding Decor"
        title="Signature Themes"
        subtitle="Eight handcrafted decor themes — pick a palette, or let our designers blend one for you."
      />

      <section className="py-20 sm:py-24">
        <div className="container-luxe">
          <Reveal>
            <SectionHeading
              eyebrow="Before & After"
              title="Drag to see the transformation"
              subtitle="The same banquet hall — first as a blank canvas, then dressed for a Gold package wedding."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="max-w-5xl mx-auto">
              <div className="relative rounded-[32px] overflow-hidden h-[420px] sm:h-[560px] shadow-luxe select-none">
                <Image
                  src={BEFORE_IMG}
                  alt="Banquet hall before decoration"
                  fill
                  className="object-cover"
                  draggable={false}
                />
                <div
                  className="absolute inset-0"
                  style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
                >
                  <Image
                    src={AFTER_IMG}
                    alt="Banquet hall after decoration"
                    fill
                    className="object-cover"
                    draggable={false}
                  />
                </div>
                <span className="absolute top-5 left-5 bg-night/70 backdrop-blur text-cream text-[11px] uppercase tracking-[0.22em] px-4 py-2 rounded-full">
                  After
                </span>
                <span className="absolute top-5 right-5 bg-night/70 backdrop-blur text-cream text-[11px] uppercase tracking-[0.22em] px-4 py-2 rounded-full">
                  Before
                </span>
                <div
                  className="absolute top-0 bottom-0 w-px bg-white/90"
                  style={{ left: `${pos}%` }}
                >
                  <span className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-luxe flex items-center justify-center text-ink">
                    <MoveHorizontal size={20} />
                  </span>
                </div>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={pos}
                onChange={(e) => setPos(Number(e.target.value))}
                aria-label="Compare before and after decoration"
                className="gold-range w-full mt-6"
                style={{ ['--fill']: `${pos}%` }}
              />
              <div className="flex justify-between text-xs uppercase tracking-[0.2em] text-ink/45 mt-2">
                <span>After</span>
                <span>Before</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="container-luxe">
          <Reveal>
            <SectionHeading
              eyebrow="Decor Themes"
              title="Three directions our families love most"
              subtitle="Or bring us a photograph and we will build it — every theme is customised to your rituals and palette."
            />
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6 mt-4">
            {themes.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.12}>
                <article className="group bg-white rounded-[28px] overflow-hidden shadow-card hover:shadow-luxe hover:-translate-y-2 transition-all duration-500 h-full">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={t.img}
                      alt={t.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-night/50 to-transparent" />
                    <span className="absolute bottom-5 left-5 flex items-center gap-2 text-cream text-[11px] uppercase tracking-[0.22em]">
                      <Palette size={14} className="text-gold" /> Theme
                    </span>
                  </div>
                  <div className="p-8">
                    <h3 className="font-display text-3xl group-hover:text-gold transition-colors">
                      {t.name}
                    </h3>
                    <p className="text-ink/60 text-sm leading-relaxed mt-3">{t.desc}</p>
                    <div className="flex items-center gap-2.5 mt-5">
                      {t.palette.map((hex) => (
                        <span
                          key={hex}
                          title={hex}
                          className="w-8 h-8 rounded-full border border-ink/15 shadow-sm"
                          style={{ backgroundColor: hex }}
                        />
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="text-center mt-12">
            <Reveal>
              <Btn href="/marriage-hall/contact" variant="dark">
                Discuss your theme <ArrowRight size={15} />
              </Btn>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}

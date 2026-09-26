'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, ArrowRight, UtensilsCrossed, X } from 'lucide-react';
import Reveal from '@/components/Reveal';
import CountUp from '@/components/CountUp';
import PageHero from '@/components/PageHero';
import { menuItems, menuCategories } from '../menu-data';
import WordReveal from '@/components/WordReveal';

const dietOptions = [
  { key: 'all', label: 'All' },
  { key: 'veg', label: 'Veg' },
  { key: 'nonveg', label: 'Non-Veg' },
  { key: 'jain', label: 'Jain' },
];

function VegDot({ veg }) {
  return (
    <span className={`inline-flex items-center justify-center w-4 h-4 border-2 rounded-[4px] bg-white shrink-0 ${veg ? 'border-green-700' : 'border-red-800'}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${veg ? 'bg-green-700' : 'bg-red-800'}`} />
    </span>
  );
}

export default function MenuPage() {
  const [query, setQuery] = useState('');
  const [diet, setDiet] = useState('all');
  const [category, setCategory] = useState('All');

  const maxDishPrice = useMemo(
    () => menuItems.reduce((m, d) => Math.max(m, d.price || 0), 0),
    []
  );
  const [maxPrice, setMaxPrice] = useState(maxDishPrice);

  const categories = useMemo(() => {
    const fromData = [...new Set(menuItems.map((d) => d.category).filter(Boolean))];
    const base = (menuCategories && menuCategories.length ? menuCategories : ['All']).filter((c) => c !== 'All');
    const merged = ['All', ...base];
    fromData.forEach((c) => {
      if (!merged.includes(c)) merged.push(c);
    });
    return merged;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return menuItems.filter((d) => {
      if (diet === 'veg' && !d.veg) return false;
      if (diet === 'nonveg' && d.veg) return false;
      if (diet === 'jain' && !d.jain) return false;
      if (category !== 'All' && d.category !== category) return false;
      if ((d.price || 0) > maxPrice) return false;
      if (q) {
        const hay = `${d.name || ''} ${d.description || ''} ${d.category || ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [query, diet, category, maxPrice]);

  const hasFilters = query.trim() !== '' || diet !== 'all' || category !== 'All' || maxPrice < maxDishPrice;

  const clearAll = () => {
    setQuery('');
    setDiet('all');
    setCategory('All');
    setMaxPrice(maxDishPrice);
  };

  const pill = (active) =>
    `px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.15em] font-medium transition-all duration-300 border ${
      active
        ? 'bg-ink text-cream border-ink shadow-card'
        : 'bg-white text-ink/70 border-ink/15 hover:border-gold hover:text-gold'
    }`;

  return (
    <main>
      <PageHero
        eyebrow="The Menu"
        title="Eat well, slowly"
        subtitle="Search it, filter it, or just read from the top. Prices are inclusive of taxes."
      />

      <section className="py-16 md:py-20 bg-cream">
        <div className="container-luxe">
          <Reveal>
            <div className="bg-white rounded-[28px] shadow-card p-6 md:p-8 mb-10">
              <div className="relative mb-6">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/35" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search dishes — try “biryani”, “paneer”, “kebab”…"
                  className="w-full bg-cream rounded-full py-4 text-ink placeholder:text-ink/35 outline-none border border-transparent focus:border-gold/60 focus:bg-white transition-all"
                  style={{ paddingLeft: '3.25rem' }}
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    aria-label="Clear search"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/40 hover:text-gold transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2.5 mb-5">
                <span className="text-[11px] uppercase tracking-[0.25em] text-ink/45 mr-1">Diet</span>
                {dietOptions.map((o) => (
                  <button key={o.key} onClick={() => setDiet(o.key)} className={pill(diet === o.key)}>
                    {o.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2.5 mb-7">
                <span className="text-[11px] uppercase tracking-[0.25em] text-ink/45 mr-1">Category</span>
                {categories.map((c) => (
                  <button key={c} onClick={() => setCategory(c)} className={pill(category === c)}>
                    {c}
                  </button>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <span className="text-[11px] uppercase tracking-[0.25em] text-ink/45 shrink-0">Max price</span>
                <input
                  type="range"
                  min={50}
                  max={maxDishPrice}
                  step={10}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="gold-range flex-1"
                  style={{ '--fill': `${((maxPrice - 50) / (maxDishPrice - 50)) * 100}%` }}
                  aria-label="Maximum price"
                />
                <span className="shrink-0 bg-ink text-cream text-sm font-medium rounded-full px-5 py-2">
                  Up to ₹{maxPrice}
                </span>
              </div>
            </div>
          </Reveal>

          <p className="text-ink/50 text-sm mb-8 flex items-center gap-2">
            <UtensilsCrossed className="w-4 h-4 text-gold" />
            {filtered.length} {filtered.length === 1 ? 'dish' : 'dishes'}
            {hasFilters && (
              <button onClick={clearAll} className="ml-2 text-gold underline underline-offset-4 hover:text-golddeep">
                Clear all filters
              </button>
            )}
          </p>

          {filtered.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-[28px] shadow-card">
              <p className="font-display text-4xl text-ink mb-3">No dishes match</p>
              <p className="text-ink/55 mb-8">Try clearing filters — or call us at 9993542874 and we will cook to request.</p>
              <button onClick={clearAll} className="btn-gold uppercase">
                Clear Filters <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((d, i) => (
                <Reveal key={d.name} delay={(i % 3) * 100}>
                  <article className="card-luxe group h-full">
                    <div className="relative h-60 overflow-hidden">
                      <Image src={d.image} alt={d.name} fill className="zoom object-cover" />
                      <span className="absolute top-4 right-4">
                        <VegDot veg={d.veg} />
                      </span>
                    </div>
                    <div className="p-7">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="font-display text-2xl font-medium text-ink group-hover:text-gold transition-colors">
                          {d.name}
                        </h3>
                        <p className="font-display text-xl text-gold shrink-0"><CountUp value={d.price} /></p>
                      </div>
                      <p className="text-ink/60 text-sm leading-relaxed mb-4">{d.description}</p>
                      {(d.tags || []).length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {(d.tags || []).map((t) => (
                            <span key={t} className="text-[10px] uppercase tracking-[0.2em] font-medium text-gold border border-gold/40 rounded-full px-3 py-1">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}

          <Reveal>
            <div className="mt-16 bg-ink text-cream rounded-[28px] p-10 md:p-14 text-center relative overflow-hidden">
              <Image
                src="/images/1555396273-367ea4eb4db5.jpg"
                alt="Table spread at 7 Vachan Kitchen"
                fill
                className="object-cover opacity-20"
              />
              <div className="relative z-10">
                <p className="section-eyebrow mb-4">Hungry already?</p>
                <WordReveal as="h2" playOnView text="Book a table and taste them fresh" className="mb-6 type-h2" />
                <Link href="/restaurant/reserve" className="btn-gold uppercase">
                  Reserve a Table <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

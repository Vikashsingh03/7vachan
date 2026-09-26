'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, ChevronDown, ArrowRight, Phone } from 'lucide-react';
import Reveal from '@/components/Reveal';
import PageHero from '@/components/PageHero';
import WordReveal from '@/components/WordReveal';

const faqs = [
  {
    q: 'What are the restaurant hours?',
    a: 'We are open every day, 12:00 PM to 11:30 PM. The kitchen takes last orders at 11:00 PM. Lunch service runs noon to 3:30 PM, and dinner from 7 PM onwards.',
  },
  {
    q: 'Do you serve Jain food?',
    a: 'Yes. Most of our vegetarian menu can be prepared the Jain way — cooked separately, without onion, garlic or root vegetables. Look for the JAIN tag on the menu, or mention it when you reserve and we will plan around it.',
  },
  {
    q: 'Can I place bulk or festive orders?',
    a: 'Absolutely. We take bulk orders for weddings, office lunches and festivals like Diwali — thalis, biryani handis and tandoor platters scale well. Please give us 48 hours notice; write to dine@7vachan.com or call 9993542874 with your headcount.',
  },
  {
    q: 'Do you have outdoor seating?',
    a: 'Yes — our Terrace Evening Seating is open from 6 PM onwards, weather permitting. It seats 40 and is first-come on most evenings; reserve ahead for weekends.',
  },
  {
    q: 'Is parking available?',
    a: 'Yes, we offer valet parking in the evenings and there is ample self-parking through the day, right by the main entrance on Kothi Road.',
  },
  {
    q: 'Do I need a reservation?',
    a: 'Walk-ins are welcome for lunch, but weekend dinners fill up fast. We recommend reserving online or by phone — especially for groups of 5 or more — so we can hold the right table for you.',
  },
  {
    q: 'Is there a weekday lunch offer?',
    a: 'Yes. Our Weekday Lunch Thali — a full vegetarian thali — is served Monday to Friday, noon to 3 PM. It is the best-value meal in the house.',
  },
  {
    q: 'Can you host a private celebration?',
    a: 'Of course. The Private Room seats up to 20, the Royal Alcove up to 12, and the Terrace Pavilion up to 50 guests — each with dedicated service and set menus on request.',
  },
];

export default function FaqsPage() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return faqs;
    return faqs.filter(
      (f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <main>
      <PageHero
        eyebrow="FAQs"
        title="Questions, answered"
        subtitle="Hours, Jain preparations, bulk orders, parking — the things guests ask us most."
      />

      <section className="py-16 md:py-24 bg-cream">
        <div className="container-luxe max-w-3xl mx-auto">
          <Reveal>
            <div className="relative mb-10">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/35" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search questions…"
                className="w-full bg-white rounded-full py-4 text-ink placeholder:text-ink/35 outline-none border border-transparent focus:border-gold/60 shadow-card transition-all"
                style={{ paddingLeft: '3.25rem', paddingRight: '1.5rem' }}
              />
            </div>
          </Reveal>

          {filtered.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-[28px] shadow-card">
              <p className="font-display text-3xl text-ink mb-3">No matches found</p>
              <p className="text-ink/55">Try a different search — or just ask us directly.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((f, i) => {
                const isOpen = open === i;
                return (
                  <Reveal key={f.q} delay={Math.min(i, 5) * 60}>
                    <div
                      className={`bg-white rounded-[22px] shadow-card overflow-hidden transition-all ${
                        isOpen ? 'ring-1 ring-gold/40' : ''
                      }`}
                    >
                      <button
                        onClick={() => setOpen(isOpen ? -1 : i)}
                        className="w-full flex items-center justify-between gap-4 text-left px-7 py-6"
                      >
                        <span className={`font-display text-xl md:text-2xl font-medium transition-colors ${isOpen ? 'text-gold' : 'text-ink'}`}>
                          {f.q}
                        </span>
                        <span className={`inline-flex items-center justify-center w-9 h-9 rounded-full shrink-0 transition-all duration-300 ${isOpen ? 'bg-gold text-white rotate-180' : 'bg-cream text-ink/50'}`}>
                          <ChevronDown className="w-4 h-4" />
                        </span>
                      </button>
                      <div
                        className="grid transition-all duration-500 ease-out"
                        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                      >
                        <div className="overflow-hidden">
                          <p className="px-7 pb-7 text-ink/65 leading-relaxed">{f.a}</p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          )}

          <Reveal>
            <div className="mt-14 bg-ink text-cream rounded-[28px] p-10 text-center">
              <p className="section-eyebrow mb-4">Still curious?</p>
              <WordReveal as="h2" playOnView text="Ask us anything" className="mb-6 type-h2" />
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/restaurant/contact" className="btn-gold uppercase">
                  Contact Us <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="tel:9993542874" className="btn-outline uppercase">
                  <Phone className="w-4 h-4" /> 9993542874
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const offers = [
  {
    tag: 'FESTIVE OFFER',
    title: 'Dussehra Sale',
    copy: 'Celebrate the season of victory with 25% off on suites and festive thalis at 7 Vachan Kitchen.',
    image: '/images/1519167758481-83f550bb49b3.jpg',
    href: '/hotel/offers',
  },
  {
    tag: 'WEEKDAY SPECIAL',
    title: 'Weekday Lunch Thali',
    copy: 'A royal thali every weekday afternoon — seven curries, fresh tandoor breads and dessert, one price.',
    image: '/images/1414235077428-338989a2e8c0.jpg',
    href: '/restaurant/menu',
  },
  {
    tag: 'WEDDINGS',
    title: 'Book Two Functions',
    copy: 'Reserve any two wedding functions together and unlock complimentary décor and suite upgrades.',
    image: '/images/1511795409834-ef04bbd61622.jpg',
    href: '/marriage-hall/packages',
  },
];

export default function OffersCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % offers.length), 5000);
    return () => clearInterval(t);
  }, [paused]);

  const go = (dir) => setIndex((i) => (i + dir + offers.length) % offers.length);

  return (
    <div
      className="relative rounded-[28px] overflow-hidden shadow-luxe h-[420px] md:h-[460px] group"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {offers.map((offer, i) => (
        <div
          key={offer.title}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-luxe ${i === index ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <img src={offer.image} alt={offer.title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-14 max-w-xl">
            <p className="section-eyebrow mb-4">{offer.tag}</p>
            <h3 className="font-display text-4xl md:text-5xl text-cream mb-4">{offer.title}</h3>
            <p className="text-cream/75 leading-relaxed mb-8">{offer.copy}</p>
            <div>
              <Link href={offer.href} className="btn-gold">
                View Offer
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      ))}
      <div className="absolute bottom-6 left-8 md:left-14 flex items-center gap-3">
        {offers.map((offer, i) => (
          <button
            key={offer.title}
            onClick={() => setIndex(i)}
            aria-label={`Go to ${offer.title}`}
            className="h-1.5 w-10 rounded-full"
          >
            <span
              className={`block h-full rounded-full origin-left transition-transform duration-500 ease-luxe ${i === index ? 'scale-x-100 bg-gold' : 'scale-x-[0.4] bg-white/40 hover:bg-white/70'}`}
            />
          </button>
        ))}
      </div>
      <div className="absolute bottom-5 right-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={() => go(-1)}
          aria-label="Previous offer"
          className="w-11 h-11 rounded-full border border-white/40 text-white flex items-center justify-center hover:bg-gold hover:border-gold transition-colors"
        >
          <ArrowLeft size={18} />
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Next offer"
          className="w-11 h-11 rounded-full border border-white/40 text-white flex items-center justify-center hover:bg-gold hover:border-gold transition-colors"
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

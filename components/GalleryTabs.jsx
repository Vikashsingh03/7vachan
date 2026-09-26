'use client';

import { useState } from 'react';

const tabs = ['Everything', 'Hotel', 'Restaurant', 'Marriage Hall'];

const photos = [
  { src: '/images/1566073771259-6a8506099945.jpg', label: 'Arrival Lobby', cat: 'Hotel' },
  { src: '/images/1414235077428-338989a2e8c0.jpg', label: 'Main Dining Room', cat: 'Restaurant' },
  { src: '/images/1519167758481-83f550bb49b3.jpg', label: 'Mandap at Golden Hour', cat: 'Marriage Hall' },
  { src: '/images/1582719508461-905c673771fd.jpg', label: 'Deluxe Suite', cat: 'Hotel' },
  { src: '/images/1517248135467-4c7edcad34c4.jpg', label: 'Evening Service', cat: 'Restaurant' },
  { src: '/images/1511795409834-ef04bbd61622.jpg', label: 'Reception Hall', cat: 'Marriage Hall' },
  { src: '/images/1590490360182-c33d57733427.jpg', label: 'Beach View Room', cat: 'Hotel' },
  { src: '/images/1552566626-52f8b828add9.jpg', label: 'Kitchen Pass', cat: 'Restaurant' },
  { src: '/images/1465495976277-4387d4b0b4c6.jpg', label: 'Garden Pheras', cat: 'Marriage Hall' },
];

export default function GalleryTabs() {
  const [active, setActive] = useState('Everything');
  const visible = photos.filter((p) => active === 'Everything' || p.cat === active);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
              active === tab
                ? 'bg-ink text-cream shadow-card'
                : 'bg-white text-ink/65 ring-1 ring-ink/10 hover:ring-gold/60 hover:text-ink'
            }`}
          >
            {tab}
            <span className={`ml-2 text-xs ${active === tab ? 'text-gold' : 'text-ink/40'}`}>
              {tab === 'Everything' ? photos.length : photos.filter((p) => p.cat === tab).length}
            </span>
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
        {visible.map((photo) => (
          <div key={photo.src} className="card-luxe !rounded-2xl h-56 md:h-72">
            <div className="relative w-full h-full overflow-hidden group">
              <img src={photo.src} alt={photo.label} loading="lazy" className="zoom w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <p className="absolute bottom-4 left-5 text-cream font-display text-xl opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                {photo.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

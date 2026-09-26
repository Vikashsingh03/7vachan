'use client';

import Link from 'next/link';
import { Search } from 'lucide-react';

export default function BookingWidget() {
  return (
    <div className="bg-white rounded-[28px] shadow-luxe px-6 py-6 md:px-10 md:py-8">
      <div className="grid gap-5 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end">
        <label className="block">
          <span className="block text-[11px] uppercase text-ink/50 font-medium mb-2.5" style={{ letterSpacing: '0.22em' }}>
            Arrival
          </span>
          <input
            type="date"
            className="w-full bg-cream border border-ink/10 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:border-gold transition-colors"
          />
        </label>
        <label className="block">
          <span className="block text-[11px] uppercase text-ink/50 font-medium mb-2.5" style={{ letterSpacing: '0.22em' }}>
            Departure
          </span>
          <input
            type="date"
            className="w-full bg-cream border border-ink/10 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:border-gold transition-colors"
          />
        </label>
        <label className="block">
          <span className="block text-[11px] uppercase text-ink/50 font-medium mb-2.5" style={{ letterSpacing: '0.22em' }}>
            Guests
          </span>
          <select
            className="w-full bg-cream border border-ink/10 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:border-gold transition-colors"
            defaultValue="2"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? 'Guest' : 'Guests'}
              </option>
            ))}
          </select>
        </label>
        <Link href="/hotel/booking" className="btn-dark !px-8 !py-4 whitespace-nowrap">
          <Search size={16} />
          CHECK AVAILABILITY
        </Link>
      </div>
    </div>
  );
}

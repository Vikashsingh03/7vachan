'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Phone, Mail, MapPin, Instagram, Facebook, Youtube, Send, CheckCircle2,
} from 'lucide-react';

const exploreLinks = [
  { label: 'Rooms & Suites', href: '/hotel/rooms' },
  { label: 'Hotel Offers', href: '/hotel/offers' },
  { label: 'Our Menu', href: '/restaurant/menu' },
  { label: 'Reserve a Table', href: '/restaurant/reserve' },
  { label: 'Wedding Packages', href: '/marriage-hall/packages' },
  { label: 'Check Your Date', href: '/marriage-hall/availability' },
  { label: 'Contact Us', href: '/contact' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const subscribe = (e) => {
    e.preventDefault();
    if (email.trim()) setSubscribed(true);
  };

  return (
    <footer className="bg-ink text-cream">
      <div className="container-luxe py-16 lg:py-24 grid gap-12 md:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1.15fr_1.35fr]">
        <div>
          <p className="font-display text-3xl font-light" style={{ letterSpacing: '0.025em' }}>
            7 <span className="text-gold">Vachan</span>
          </p>
          <p className="font-sans font-light text-[13px] uppercase text-cream/40 mt-2 mb-6" style={{ letterSpacing: '0.22em' }}>
            Hotel · Restaurant · Banquets
          </p>
          <p className="font-sans font-light text-[15px] leading-[26px] text-cream/60 mb-7 max-w-xs">
            One address for the night you stay, the meal you remember and the day you will never forget — a grand hotel, a celebrated kitchen and timeless wedding venues in Satna.
          </p>
          <div className="flex items-center gap-3">
            {[
              { icon: Instagram, label: 'Instagram' },
              { icon: Facebook, label: 'Facebook' },
              { icon: Youtube, label: 'YouTube' },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center text-cream/70 hover:border-gold hover:text-gold transition-colors duration-300"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="font-sans font-light uppercase text-gold mb-3" style={{ fontSize: '13px', letterSpacing: '0.12em', lineHeight: '18px' }}>
            Explore
          </p>
          <ul className="space-y-3.5">
            {exploreLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="link-sweep font-sans font-light text-cream/60 hover:text-gold transition-colors duration-300" style={{ fontSize: "15px", lineHeight: "22px" }}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-sans font-light uppercase text-gold mb-3" style={{ fontSize: '13px', letterSpacing: '0.12em', lineHeight: '18px' }}>
            Contact
          </p>
          <ul className="space-y-4 text-cream/70">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 text-gold shrink-0" />
              <span className="font-sans font-light" style={{ fontSize: "15px", lineHeight: "22px" }}>
                7 Vachan Marriage Hall, Satna, Kothi Road, near Lovedale School, Bagha, Madhya Pradesh 485001
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-gold shrink-0" />
              <a href="tel:+919993542874" className="font-sans font-light hover:text-gold transition-colors duration-300" style={{ fontSize: "15px", lineHeight: "22px" }}>
                99935 42874
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="text-gold shrink-0" />
              <a href="mailto:hotel@7vachan.com" className="font-sans font-light hover:text-gold transition-colors duration-300" style={{ fontSize: "15px", lineHeight: "22px" }}>
                hotel@7vachan.com
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-sans font-light uppercase text-gold mb-3" style={{ fontSize: '13px', letterSpacing: '0.12em', lineHeight: '18px' }}>
            Private Offers
          </p>
          <p className="font-sans font-light text-cream/60 mb-5" style={{ fontSize: "15px", lineHeight: "22px" }}>
            Members-only rates, festive menus and wedding dates — straight to your inbox.
          </p>
          {subscribed ? (
            <p className="flex items-center gap-2 text-sm text-gold">
              <CheckCircle2 size={16} />
              You are on the list. Welcome to 7 Vachan.
            </p>
          ) : (
            <form className="flex" onSubmit={subscribe}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 min-w-0 bg-white/5 border border-white/15 rounded-l-full px-5 py-3 text-sm placeholder:text-cream/35 focus:outline-none focus:border-gold transition-colors"
              />
              <button
                type="submit"
                className="bg-gold hover:bg-golddeep transition-colors text-chocolate rounded-r-full px-5 py-3 text-sm font-semibold inline-flex items-center gap-2"
              >
                <Send size={14} />
                Join
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-luxe py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/40">
          <p>© 2026 7 Vachan. All rights reserved.</p>
          <p className="uppercase" style={{ letterSpacing: '0.22em' }}>
            Crafted with care in Satna
          </p>
        </div>
      </div>
    </footer>
  );
}

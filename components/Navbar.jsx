'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChevronDown, Menu, X, Phone, MapPin,
  BedDouble, Tag, Image as ImageIcon, Star, HelpCircle, Sparkles,
  Flower2, UtensilsCrossed, CalendarCheck, ChefHat, BookOpen,
  HeartHandshake, IndianRupee, Camera, Users,
} from 'lucide-react';
import { Btn } from './ui';

const hotelLinks = [
  { label: 'Rooms & Suites', href: '/hotel/rooms', icon: BedDouble },
  { label: 'Offers', href: '/hotel/offers', icon: Tag },
  { label: 'Gallery', href: '/hotel/gallery', icon: ImageIcon },
  { label: 'Reviews', href: '/hotel/reviews', icon: Star },
  { label: 'FAQs', href: '/hotel/faqs', icon: HelpCircle },
  { label: 'Contact', href: '/hotel/contact', icon: Phone },
];

const hallLinks = [
  { label: 'Overview', href: '/marriage-hall', icon: Sparkles },
  { label: 'Packages', href: '/marriage-hall/packages', icon: IndianRupee },
  { label: 'Decorations', href: '/marriage-hall/decorations', icon: Flower2 },
  { label: 'Catering', href: '/marriage-hall/catering', icon: UtensilsCrossed },
  { label: 'Availability', href: '/marriage-hall/availability', icon: CalendarCheck },
  { label: 'Gallery', href: '/marriage-hall/gallery', icon: Camera },
  { label: 'Reviews', href: '/marriage-hall/reviews', icon: Star },
  { label: 'Contact', href: '/marriage-hall/contact', icon: Phone },
];

const restaurantLinks = [
  { label: 'Overview', href: '/restaurant', icon: ChefHat },
  { label: 'Menu', href: '/restaurant/menu', icon: BookOpen },
  { label: 'Reserve a Table', href: '/restaurant/reserve', icon: CalendarCheck },
  { label: 'Gallery', href: '/restaurant/gallery', icon: ImageIcon },
  { label: 'Reviews', href: '/restaurant/reviews', icon: Star },
  { label: 'Contact', href: '/restaurant/contact', icon: Phone },
];

function Dropdown({ label, links, dark, active }) {
  return (
    <div className="relative group">
      <button
        className={`nav-link flex items-center gap-1.5 py-3 ${active ? 'active' : ''} ${
          dark ? 'text-cream/80 hover:text-cream' : 'text-ink/70 hover:text-ink'
        }`}
      >
        {label}
        <ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />
      </button>
      <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-luxe">
        <div className="dropdown-panel bg-cream rounded-2xl shadow-luxe border border-hairline py-2.5 w-60 overflow-hidden">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 px-5 py-2.5 text-[15px] font-light text-ink/70 hover:bg-beige hover:text-gold transition-colors duration-300"
              >
                <Icon size={16} className="text-gold shrink-0" />
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MobileAccordion({ title, links, openSection, setOpenSection, close }) {
  const open = openSection === title;
  return (
    <div className="border-b border-hairline">
      <button
        className="w-full flex items-center justify-between py-3.5 font-medium text-ink"
        onClick={() => setOpenSection(open ? null : title)}
      >
        <span className="text-sm uppercase" style={{ letterSpacing: '0.14em' }}>{title}</span>
        <ChevronDown size={18} className={`text-gold transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`acc-panel ${open ? 'open' : ''}`}>
        <div>
          <div className="pb-4 pl-1 space-y-1">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 py-2 text-[15px] font-light text-warm-500 hover:text-gold transition-colors duration-300"
                  onClick={close}
                >
                  <Icon size={15} className="text-gold shrink-0" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (y > lastY.current && y > 220) {
        setHidden(true);
      } else if (y < lastY.current) {
        setHidden(false);
      }
      lastY.current = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open ]);

  const dark = !scrolled;
  const close = () => setOpen(false);
  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-transform duration-500 ease-luxe ${
        hidden && !open ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div
        className={`transition-[background-color,box-shadow,border-color] duration-[600ms] ease-luxe border-b ${
          dark
            ? 'bg-transparent border-transparent'
            : 'bg-cream/85 backdrop-blur-xl shadow-card border-ink/10'
        }`}
      >
        <div
          className={`container-luxe flex items-center justify-between transition-[height] duration-500 ease-luxe ${
            dark ? 'h-[72px] lg:h-[88px]' : 'h-16 lg:h-[72px]'
          }`}
        >
          <Link href="/" className="flex flex-col" aria-label="7 Vachan home">
            <span
              className="font-display font-light leading-none"
              style={{ fontSize: '26px', letterSpacing: '0.025em' }}
            >
              <span className={dark ? 'text-cream' : 'text-ink'}>7</span>{' '}
              <span className="text-gold">Vachan</span>
            </span>
            <span
              className={`font-sans font-light uppercase mt-1.5 ${dark ? 'text-cream/55' : 'text-ink/55'}`}
              style={{ fontSize: '13px', letterSpacing: '0.22em' }}
            >
              Hotel · Restaurant
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
            <Link
              href="/"
              className={`nav-link py-3 ${isActive('/') ? 'active' : ''} ${
                dark ? 'text-cream/80 hover:text-cream' : 'text-ink/70 hover:text-ink'
              }`}
            >
              Home
            </Link>
            <Dropdown label="Hotel" links={hotelLinks} dark={dark} active={isActive('/hotel')} />
            <Dropdown label="Marriage Hall" links={hallLinks} dark={dark} active={isActive('/marriage-hall')} />
            <Dropdown label="Restaurant" links={restaurantLinks} dark={dark} active={isActive('/restaurant')} />
            <Link
              href="/my-bookings"
              className={`nav-link py-3 ${isActive('/my-bookings') ? 'active' : ''} ${
                dark ? 'text-cream/80 hover:text-cream' : 'text-ink/70 hover:text-ink'
              }`}
            >
              My Bookings
            </Link>
            <Link
              href="/login"
              className={`nav-link py-3 ${isActive('/login') ? 'active' : ''} ${
                dark ? 'text-cream/80 hover:text-cream' : 'text-ink/70 hover:text-ink'
              }`}
            >
              Login
            </Link>
          </nav>

          <div className="hidden lg:flex items-center">
            <Btn href="/hotel/booking" variant={dark ? 'gold' : 'dark'} className="!px-6 !py-3">
              Book Now
            </Btn>
          </div>

          <button
            className={`lg:hidden p-2 -mr-2 ${dark ? 'text-cream' : 'text-ink'}`}
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={26} />
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={close} />
        <aside
          className={`absolute right-0 top-0 h-full w-[86%] max-w-sm bg-cream shadow-luxe flex flex-col transition-transform duration-500 ease-luxe ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between px-6 h-20 border-b border-hairline shrink-0">
            <span className="font-display text-2xl font-light text-ink" style={{ letterSpacing: '0.025em' }}>
              7 <span className="text-gold">Vachan</span>
            </span>
            <button onClick={close} aria-label="Close menu" className="p-2 -mr-2 text-ink">
              <X size={24} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-2">
            <Link href="/" onClick={close} className="block py-3.5 font-medium text-ink border-b border-hairline text-sm uppercase" style={{ letterSpacing: '0.14em' }}>
              Home
            </Link>
            <MobileAccordion title="Hotel" links={hotelLinks} openSection={openSection} setOpenSection={setOpenSection} close={close} />
            <MobileAccordion title="Marriage Hall" links={hallLinks} openSection={openSection} setOpenSection={setOpenSection} close={close} />
            <MobileAccordion title="Restaurant" links={restaurantLinks} openSection={openSection} setOpenSection={setOpenSection} close={close} />
            <Link href="/my-bookings" onClick={close} className="flex items-center gap-3 py-3.5 text-ink border-b border-hairline text-sm uppercase" style={{ letterSpacing: '0.14em' }}>
              <Users size={16} className="text-gold" /> My Bookings
            </Link>
            <Link href="/login" onClick={close} className="flex items-center gap-3 py-3.5 text-ink border-b border-hairline text-sm uppercase" style={{ letterSpacing: '0.14em' }}>
              <HeartHandshake size={16} className="text-gold" /> Login
            </Link>
          </div>
          <div className="p-6 border-t border-hairline shrink-0 space-y-4">
            <Btn href="/hotel/booking" variant="gold" className="w-full" onClick={close}>
              Book Now
            </Btn>
            <a href="tel:+919993542874" className="flex items-center justify-center gap-2 text-[15px] font-light text-warm-500">
              <Phone size={15} className="text-gold" /> 99935 42874
            </a>
            <p className="flex items-center justify-center gap-2 text-xs text-warm-500/70">
              <MapPin size={13} className="text-gold" /> Satna, Madhya Pradesh
            </p>
          </div>
        </aside>
      </div>
    </header>
  );
}

'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Minus,
  Plus,
  Play,
  MapPin,
  Phone,
  Mail,
  Clock,
  Wifi,
  Waves,
  UtensilsCrossed,
  Car,
  Bell,
  PlugZap,
  HeartHandshake,
  BedDouble,
  Coffee,
  Sparkles,
  Quote,
  ChevronDown,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import WordReveal from "@/components/WordReveal";
import SectionHeading from "@/components/SectionHeading";
import { Eyebrow, Btn, Stars, RoomCard } from "./hotel/_ui";
import { CONTACT, rooms, offers, reviews, facilities, HERO_IMAGES } from "./hotel/_data";

const slides = [
  { src: HERO_IMAGES.banquet, label: "The Banquet Hall" },
  { src: HERO_IMAGES.terrace, label: "The Evening Terrace" },
  { src: HERO_IMAGES.lobby, label: "The Lobby" },
  { src: HERO_IMAGES.pool, label: "The Pool" },
  { src: rooms[0].image, label: "Deluxe Room" },
  { src: rooms[3].image, label: "Luxury Room" },
];

function Hero() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % slides.length), 7000);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="relative h-[100svh] min-h-[640px] overflow-hidden bg-night">
      {slides.map((s, i) => (
        <div
          key={s.src}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-luxe ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={s.src}
            alt={s.label}
            fill
            priority={i === 0}
            className={`object-cover ${i === active ? "animate-kenburns" : ""}`}
            sizes="100vw"
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-night/60 via-night/35 to-night/70" />
      <div className="relative z-10 h-full container-luxe flex flex-col items-center justify-center text-center px-4">
        <p className="hero-anim d1 type-hero-eyebrow mb-6">
          Hotel · Restaurant · Banquets
        </p>
        <WordReveal as="h1" text="7 Vachan" delay={0.35} className="type-hero-h1" />
        <p className="hero-anim d3 type-hero-sub max-w-3xl mt-6">
          One address for the night you stay, the meal you remember and the day
          you&rsquo;ll never forget.
        </p>
        <div className="hero-anim d4 flex flex-wrap items-center justify-center gap-4 mt-10">
          <Btn href="/hotel/booking" variant="gold">
            Book your stay
          </Btn>
          <Btn href="/hotel" variant="outline">
            Explore the estate
          </Btn>
        </div>
      </div>
      <button
        type="button"
        className="hero-anim d4 group absolute left-6 md:left-10 bottom-32 md:bottom-36 z-10 flex items-center gap-4"
        aria-label="Watch the film"
      >
        <span className="play-ring relative w-16 h-16 rounded-full border border-cream/60 flex items-center justify-center text-cream transition-all duration-300 group-hover:bg-gold group-hover:border-gold">
          <Play className="w-5 h-5 fill-current ml-0.5" />
        </span>
        <span className="text-cream text-[11px] uppercase tracking-[0.3em] hidden sm:block">
          Watch the film
        </span>
      </button>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-8 z-10 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setActive(i)}
              className="h-[2px] w-10 rounded-full"
            >
              <span
                className={`block h-full rounded-full origin-left transition-transform duration-[600ms] ease-luxe ${
                  i === active ? "scale-x-100 bg-gold" : "scale-x-50 bg-cream/35 hover:bg-cream/60"
                }`}
              />
            </button>
          ))}
        </div>
        <div className="flex flex-col items-center gap-2 text-cream/70">
          <span className="text-[10px] uppercase tracking-[0.35em]">Scroll</span>
          <span className="w-px h-10 bg-gradient-to-b from-gold to-transparent animate-floaty" />
        </div>
      </div>
    </section>
  );
}

function BookingBar() {
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [guests, setGuests] = useState(2);
  const href = `/hotel/booking?arrival=${arrival}&departure=${departure}&guests=${guests}`;
  return (
    <div className="relative z-20 container-luxe px-4 sm:px-6">
      <div className="-mt-20 bg-cream rounded-[28px] shadow-luxe border border-[#E3DACA] px-6 py-6 md:px-10 md:py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] gap-6 items-center">
        <label className="block">
          <span className="block text-[11px] uppercase tracking-[0.3em] text-gold mb-2">Arrival</span>
          <input
            type="date"
            value={arrival}
            onChange={(e) => setArrival(e.target.value)}
            className="w-full bg-transparent font-display text-xl text-ink outline-none border-b border-[#E3DACA] pb-2 focus:border-gold transition-colors"
          />
        </label>
        <label className="block">
          <span className="block text-[11px] uppercase tracking-[0.3em] text-gold mb-2">Departure</span>
          <input
            type="date"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            className="w-full bg-transparent font-display text-xl text-ink outline-none border-b border-[#E3DACA] pb-2 focus:border-gold transition-colors"
          />
        </label>
        <div>
          <span className="block text-[11px] uppercase tracking-[0.3em] text-gold mb-2">Guests</span>
          <div className="flex items-center gap-4 border-b border-[#E3DACA] pb-2">
            <button
              type="button"
              aria-label="Fewer guests"
              onClick={() => setGuests((g) => Math.max(1, g - 1))}
              className="w-8 h-8 rounded-full border border-ink/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-display text-xl text-ink min-w-[90px] text-center">
              {guests} Guest{guests > 1 ? "s" : ""}
            </span>
            <button
              type="button"
              aria-label="More guests"
              onClick={() => setGuests((g) => Math.min(8, g + 1))}
              className="w-8 h-8 rounded-full border border-ink/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
        <Btn href={href} variant="dark" className="w-full lg:w-auto whitespace-nowrap">
          Check availability
        </Btn>
      </div>
    </div>
  );
}

function Welcome() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-luxe grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <Reveal>
          <div className="relative">
            <div className="rounded-[32px] overflow-hidden shadow-luxe">
              <Image
                src={HERO_IMAGES.lobby}
                alt="7 Vachan hotel lobby"
                width={900}
                height={1100}
                className="w-full h-[480px] md:h-[560px] object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-4 md:-right-8 bg-night text-cream rounded-[24px] px-8 py-6 shadow-luxe">
              <p className="font-display text-4xl text-gold">4★</p>
              <p className="text-xs uppercase tracking-[0.25em] text-cream/70 mt-1">Star Hospitality</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <Eyebrow>Welcome</Eyebrow>
          <WordReveal as="h2" playOnView text="4-Star Hospitality" className="text-ink mb-6 text-center lg:text-left type-h2" />
          <p className="text-ink/70 leading-relaxed mb-4">
            A premium hotel property offering comfort and hospitality in the heart of the city.
          </p>
          <p className="text-ink/70 leading-relaxed mb-8">
            Rooted in the promise of &ldquo;Hotel Comfort 7 Vachan Satna&rdquo; — every arrival is
            met with the same care, whether you stay one night or a season.
          </p>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <Btn href="/hotel" variant="dark">
              Our story
            </Btn>
            <Btn href="/hotel/rooms" variant="outlineDark">
              Browse rooms
            </Btn>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Accommodation() {
  const featured = [rooms[0], rooms[2], rooms[4]];
  return (
    <section className="py-24 md:py-32 bg-[#F3EDE1]/60">
      <div className="container-luxe">
        <Reveal>
          <SectionHeading
            eyebrow="Accommodation"
            title="Rooms & Suites"
            subtitle="Thoughtfully composed spaces where natural light, considered materials and quiet detail come together."
          />
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((room, i) => (
            <Reveal key={room.slug} delay={i * 0.12}>
              <RoomCard room={room} />
            </Reveal>
          ))}
        </div>
        <Reveal className="text-center mt-12">
          <Btn href="/hotel/rooms" variant="outlineDark">
            View all rooms
          </Btn>
        </Reveal>
      </div>
    </section>
  );
}

function Estate() {
  const cards = [
    { name: "Hotel", text: "Five room types, one promise of rest.", href: "/hotel", src: HERO_IMAGES.lobby },
    { name: "Restaurant", text: "A kitchen the city eats at.", href: "/restaurant", src: HERO_IMAGES.terrace },
    { name: "Marriage Hall", text: "Banquets beneath chandeliers.", href: "/marriage-hall", src: HERO_IMAGES.banquet },
  ];
  return (
    <section className="py-24 md:py-32">
      <div className="container-luxe">
        <Reveal>
          <div className="bg-[#221B14] rounded-[32px] px-6 py-16 md:p-20 text-center text-cream relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.07] bg-cover bg-center"
              style={{ backgroundImage: `url(${HERO_IMAGES.banquet})` }}
            />
            <div className="relative">
              <Eyebrow>The estate</Eyebrow>
              <p className="font-display text-2xl md:text-4xl leading-snug max-w-3xl mx-auto mb-14">
                A hotel to stay in, a kitchen to eat at and a banquet hall to celebrate in — all
                on the same grounds, run by the same family.
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                {cards.map((c) => (
                  <Link
                    key={c.name}
                    href={c.href}
                    className="group relative rounded-[24px] overflow-hidden h-80 block"
                  >
                    <Image src={c.src} alt={c.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/20 to-transparent" />
                    <div className="absolute bottom-0 p-7">
                      <h3 className="font-display text-3xl mb-2 transition-colors duration-300 group-hover:text-gold">
                        {c.name}
                      </h3>
                      <p className="text-cream/70 text-sm mb-4">{c.text}</p>
                      <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-gold">
                        Explore <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const whyFeatures = [
  { icon: HeartHandshake, title: "Family-run estate", text: "One family owns the hotel, the kitchen and the banquet hall — so nothing is ever somebody else's problem." },
  { icon: BedDouble, title: "Rooms built for rest", text: "Thick walls, blackout drapes and genuinely comfortable beds. The quietest rooms in Satna." },
  { icon: Coffee, title: "Breakfast that waits for you", text: "Hot breakfast served where you like it — in the dining room, on the terrace, or in bed." },
  { icon: Sparkles, title: "Service that remembers", text: "Stay twice and we remember your room, your tea and your name. Regulars are our favourite guests." },
];

const facilityIcons = {
  "Free WiFi": Wifi,
  "Swimming Pool": Waves,
  Restaurant: UtensilsCrossed,
  Parking: Car,
  "Room Service": Bell,
  "Power Backup": PlugZap,
};

function WhyUs() {
  return (
    <section className="py-24 md:py-32 bg-[#F3EDE1]/60">
      <div className="container-luxe">
        <Reveal>
          <SectionHeading
            eyebrow="Why 7 Vachan"
            title="Arrive as a guest, leave as a regular"
            subtitle="Four quiet promises we keep every single day, for every single guest."
          />
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyFeatures.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.1}>
              <div className="bg-cream rounded-[24px] p-8 border border-[#E3DACA] text-center h-full hover:-translate-y-2 hover:shadow-card transition-all duration-500">
                <span className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-gold/70 flex items-center justify-center text-gold">
                  <f.icon className="w-7 h-7" />
                </span>
                <h3 className="font-display text-2xl text-ink mb-3">{f.title}</h3>
                <p className="text-ink/60 text-sm leading-relaxed">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-20">
          <Reveal>
            <p className="text-center text-[11px] uppercase tracking-[0.3em] text-gold mb-8">Facilities</p>
          </Reveal>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6">
            {facilities.map((f, i) => {
              const Icon = facilityIcons[f] || Sparkles;
              return (
                <Reveal key={f} delay={i * 0.06}>
                  <span className="inline-flex items-center gap-3 text-ink/70 text-sm uppercase tracking-[0.15em]">
                    <Icon className="w-5 h-5 text-gold" /> {f}
                  </span>
                </Reveal>
              );
            })}
          </div>
          <Reveal className="text-center mt-10">
            <Link href="/hotel/amenities" className="link-sweep text-xs uppercase tracking-[0.25em] text-ink font-medium">
              Explore all amenities
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Offers() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-luxe">
        <Reveal>
          <SectionHeading
            eyebrow="Offers"
            title="Reasons to visit sooner"
            subtitle="Seasonal celebrations, weekday rituals and wedding-season generosity."
          />
        </Reveal>
        <div className="grid md:grid-cols-3 gap-8">
          {offers.slice(0, 3).map((o, i) => (
            <Reveal key={o.slug} delay={i * 0.12}>
              <div className="card-luxe group h-full flex flex-col">
                <div className="relative h-60 overflow-hidden">
                  <Image src={o.image} alt={o.title} fill className="zoom object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                  <span className="absolute top-4 left-4 bg-night/70 backdrop-blur text-cream text-[11px] uppercase tracking-[0.2em] px-4 py-2 rounded-full">
                    {o.validity}
                  </span>
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <h3 className="font-display text-2xl text-ink mb-3 transition-colors duration-300 group-hover:text-gold">
                    {o.title}
                  </h3>
                  <p className="text-ink/60 text-sm leading-relaxed mb-6 flex-1">{o.text}</p>
                  <Link
                    href="/hotel/offers"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold font-medium"
                  >
                    Reserve this offer <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="text-center mt-12">
          <Btn href="/hotel/offers" variant="outlineDark">
            View all offers
          </Btn>
        </Reveal>
      </div>
    </section>
  );
}

function GuestStories() {
  return (
    <section className="py-24 md:py-32 bg-[#221B14] text-cream relative overflow-hidden">
      <Quote className="absolute -top-6 left-6 w-48 h-48 text-gold/10 rotate-180" />
      <div className="container-luxe relative">
        <Reveal>
          <div className="text-center mb-14">
            <Eyebrow>Guest Stories</Eyebrow>
            <p className="font-display text-6xl md:text-7xl text-gold">4.0</p>
            <p className="text-cream/70 uppercase tracking-[0.25em] text-xs mt-2">Out of 5</p>
            <p className="text-cream/50 text-sm mt-3">Based on 2 Google &amp; on-site reviews</p>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.12}>
              <figure className="relative bg-cream/[0.04] border border-cream/15 rounded-[24px] p-8 md:p-10 h-full">
                <Quote className="absolute top-6 right-8 w-10 h-10 text-gold/25" />
                <Stars value={r.rating} className="mb-5" />
                <blockquote className="font-display italic text-xl md:text-2xl leading-relaxed text-cream/90 mb-6">
                  &ldquo;{r.text}&rdquo;
                </blockquote>
                <figcaption className="flex items-center gap-4">
                  <span className="w-12 h-12 rounded-full bg-gold/20 border border-gold/50 flex items-center justify-center font-display text-xl text-gold">
                    {r.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block text-cream font-medium">{r.name}</span>
                    <span className="block text-cream/50 text-sm">{r.date}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <Reveal className="text-center mt-12">
          <Btn href="/hotel/reviews" variant="outline">
            Read all reviews
          </Btn>
        </Reveal>
      </div>
    </section>
  );
}

function FindUs() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-luxe">
        <Reveal>
          <SectionHeading eyebrow="Find Us" title="In the heart of Satna" />
        </Reveal>
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          <Reveal>
            <div className="bg-[#F3EDE1] rounded-[28px] p-8 md:p-12 h-full border border-[#E3DACA]">
              <div className="space-y-7">
                <div className="flex gap-5">
                  <span className="w-12 h-12 shrink-0 rounded-full border-2 border-gold/70 flex items-center justify-center text-gold">
                    <MapPin className="w-5 h-5" />
                  </span>
                  <p className="text-ink/70 leading-relaxed pt-2">{CONTACT.address}</p>
                </div>
                <div className="flex gap-5 items-center">
                  <span className="w-12 h-12 shrink-0 rounded-full border-2 border-gold/70 flex items-center justify-center text-gold">
                    <Phone className="w-5 h-5" />
                  </span>
                  <a href={CONTACT.phoneHref} className="font-display text-2xl text-ink link-sweep">
                    {CONTACT.phone}
                  </a>
                </div>
                <div className="flex gap-5 items-center">
                  <span className="w-12 h-12 shrink-0 rounded-full border-2 border-gold/70 flex items-center justify-center text-gold">
                    <Mail className="w-5 h-5" />
                  </span>
                  <a href={`mailto:${CONTACT.email}`} className="text-ink/80 link-sweep">
                    {CONTACT.email}
                  </a>
                </div>
                <div className="flex gap-5 items-center">
                  <span className="w-12 h-12 shrink-0 rounded-full border-2 border-gold/70 flex items-center justify-center text-gold">
                    <Clock className="w-5 h-5" />
                  </span>
                  <p className="text-ink/70">
                    Check-in {CONTACT.checkIn} · Check-out {CONTACT.checkOut}
                    <span className="block text-sm text-ink/50">Reception {CONTACT.reception}</span>
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 mt-10">
                <Btn href="/hotel/contact" variant="dark">
                  Contact us
                </Btn>
                <Btn href="/hotel/booking" variant="outlineDark">
                  Book your stay
                </Btn>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="rounded-[28px] overflow-hidden shadow-card border border-[#E3DACA] h-full min-h-[420px] relative">
              <iframe
                title="7 Vachan location map"
                src="https://www.google.com/maps?q=Kothi+Road,+near+Lovedale+School,+Bagha,+Satna,+Madhya+Pradesh+485001&output=embed"
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FaqTeaser() {
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: "What are the check-in and check-out times?", a: `Check-in from ${CONTACT.checkIn}, check-out until ${CONTACT.checkOut}. Early check-in and late check-out on request.` },
    { q: "Is parking available?", a: "Yes — free attended on-site parking for all resident guests." },
    { q: "What is the cancellation policy?", a: "Free cancellation up to 48 hours before check-in." },
  ];
  return (
    <section className="pb-24 md:pb-32">
      <div className="container-luxe max-w-3xl">
        <Reveal>
          <SectionHeading eyebrow="Good to know" title="Quick answers" />
        </Reveal>
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={i * 0.08}>
            <div className="border-b border-[#E3DACA]">
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-6 text-left gap-4"
              >
                <span className="font-display text-xl md:text-2xl text-ink">{f.q}</span>
                <ChevronDown className={`w-5 h-5 text-gold shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`} />
              </button>
              <div className={`grid transition-[grid-template-rows] duration-500 ease-luxe ${open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <p className="overflow-hidden text-ink/60 leading-relaxed"><span className="block pb-6">{f.a}</span></p>
              </div>
            </div>
          </Reveal>
        ))}
        <Reveal className="text-center mt-10">
          <Btn href="/hotel/faqs" variant="outlineDark">
            All FAQs
          </Btn>
        </Reveal>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <BookingBar />
      <div className="pt-24 md:pt-28">
        <Welcome />
      </div>
      <Accommodation />
      <Estate />
      <WhyUs />
      <Offers />
      <GuestStories />
      <FindUs />
      <FaqTeaser />
    </>
  );
}

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BedDouble,
  ConciergeBell,
  Star,
  MapPin,
  Phone,
  Clock,
  Wifi,
  Waves,
  UtensilsCrossed,
  Car,
  Bell,
  PlugZap,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { Eyebrow, Btn, RoomCard } from "./_ui";
import WordReveal from "@/components/WordReveal";
import CountUp from "@/components/CountUp";
import { CONTACT, rooms, offers, HERO_IMAGES } from "./_data";

function ImageHero() {
  return (
    <section className="relative h-[72vh] min-h-[520px] overflow-hidden bg-night">
      <Image
        src={HERO_IMAGES.lobby}
        alt="Hotel Comfort 7 Vachan Satna lobby"
        fill
        priority
        className="object-cover animate-kenburns"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-night/55 via-night/25 to-night/65" />
      <div className="relative z-10 h-full container-luxe flex flex-col items-center justify-center text-center text-cream px-4">
        <p className="hero-anim d1 type-hero-eyebrow mb-6">
          7 Vachan Presents
        </p>
        <WordReveal as="h1" text="Rooms that feel considered, service that remembers your name." delay={0.35} className="type-hero-h1 max-w-3xl" />
        <div className="hero-anim d4 flex flex-wrap items-center justify-center gap-4 mt-10">
          <Btn href="/hotel/booking" variant="gold">
            Book your stay
          </Btn>
          <Btn href="/hotel/rooms" variant="outline">
            Explore rooms
          </Btn>
        </div>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-8 z-10 flex flex-col items-center gap-2 text-cream/70">
        <span className="text-[10px] uppercase tracking-[0.35em]">Scroll</span>
        <span className="w-px h-10 bg-gradient-to-b from-gold to-transparent animate-floaty" />
      </div>
    </section>
  );
}

const stats = [
  { n: "5", label: "Room types" },
  { n: "8", label: "Amenities" },
  { n: "4", label: "Star rating" },
  { n: "2", label: "Guest reviews" },
];

function Property() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-luxe grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <Reveal>
          <Eyebrow>The property</Eyebrow>
          <WordReveal as="h2" playOnView text="Arrive as a guest, leave as a regular" className="text-ink mb-6 text-center lg:text-left type-h2" />
          <p className="text-ink/70 leading-relaxed mb-4">
            A premium hotel property offering comfort and hospitality in the heart of the city.
          </p>
          <p className="text-ink/70 leading-relaxed mb-6">
            Every room is prepared the same way whether you are staying one night or a fortnight
            — pressed linen, quiet air conditioning, and a team that notices what you asked for
            last time.
          </p>
          <p className="text-ink/60 text-sm leading-relaxed mb-8 flex items-start gap-3">
            <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
            {CONTACT.address}
          </p>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <Btn href="/hotel/rooms" variant="dark">
              Explore rooms
            </Btn>
            <Btn href="/hotel/contact" variant="outlineDark">
              Our story
            </Btn>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="grid grid-cols-2 gap-5">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-[#F3EDE1] border border-[#E3DACA] rounded-[24px] p-8 text-center hover:-translate-y-1 hover:shadow-card transition-all duration-500"
              >
                <p className="font-display text-5xl text-gold mb-2">{s.n}</p>
                <p className="text-xs uppercase tracking-[0.25em] text-ink/60">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const stayInfo = [
  { icon: Clock, label: "Check-in", value: CONTACT.checkIn },
  { icon: Clock, label: "Check-out", value: CONTACT.checkOut },
  { icon: BedDouble, label: "Rooms from", price: 1200, unit: "per night" },
  { icon: ConciergeBell, label: "Reception", value: CONTACT.reception },
];

function YourStay() {
  return (
    <section className="py-24 md:py-32 bg-[#F3EDE1]/60">
      <div className="container-luxe">
        <Reveal>
          <SectionHeading
            eyebrow="Your stay"
            title="The details, handled"
            subtitle="Everything is arranged before you ask — here is what to expect when you book with us."
          />
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stayInfo.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="bg-cream rounded-[24px] border border-[#E3DACA] p-8 text-center h-full hover:-translate-y-2 hover:shadow-card transition-all duration-500">
                <span className="w-14 h-14 mx-auto mb-5 rounded-full border-2 border-gold/70 flex items-center justify-center text-gold">
                  <s.icon className="w-6 h-6" />
                </span>
                <p className="text-[11px] uppercase tracking-[0.3em] text-gold mb-2">{s.label}</p>
                <p className="font-display text-2xl text-ink">{s.price != null ? (<><CountUp value={s.price} /> {s.unit}</>) : s.value}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="text-center mt-12">
          <div className="flex flex-wrap justify-center gap-4">
            <Btn href="/hotel/booking" variant="gold">
              Check availability
            </Btn>
            <Btn href="/hotel/faqs" variant="outlineDark">
              Read FAQs
            </Btn>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const amenityIcons = {
  "Free WiFi": Wifi,
  "Swimming Pool": Waves,
  Restaurant: UtensilsCrossed,
  Parking: Car,
  "Room Service": Bell,
  "Power Backup": PlugZap,
};

function AmenitiesStrip() {
  const list = Object.keys(amenityIcons);
  return (
    <section className="py-24 md:py-28">
      <div className="container-luxe">
        <Reveal>
          <SectionHeading eyebrow="Facilities" title="Across the estate" />
        </Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {list.map((name, i) => {
            const Icon = amenityIcons[name];
            return (
              <Reveal key={name} delay={i * 0.06}>
                <div className="text-center group">
                  <span className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-gold/60 flex items-center justify-center text-gold transition-all duration-300 group-hover:bg-gold group-hover:text-cream group-hover:border-gold">
                    <Icon className="w-6 h-6" />
                  </span>
                  <p className="text-xs uppercase tracking-[0.2em] text-ink/70">{name}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal className="text-center mt-10">
          <Link href="/hotel/amenities" className="gold-link">
            Explore all amenities <ArrowRight className="w-4 h-4 text-gold" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function Accommodation() {
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
          {rooms.slice(0, 3).map((room, i) => (
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

function OffersBand() {
  const o = offers[1];
  return (
    <section className="py-24 md:py-32">
      <div className="container-luxe">
        <Reveal>
          <div className="relative rounded-[32px] overflow-hidden bg-night text-cream">
            <Image src={o.image} alt={o.title} fill className="object-cover opacity-40" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-r from-night/80 via-night/40 to-transparent" />
            <div className="relative p-10 md:p-20 max-w-2xl">
              <Eyebrow>Offers</Eyebrow>
              <h2 className="font-display text-4xl md:text-5xl mb-5">{o.title}</h2>
              <p className="text-cream/75 leading-relaxed mb-3">{o.text}</p>
              <p className="text-gold text-xs uppercase tracking-[0.25em] mb-8">{o.validity}</p>
              <div className="flex flex-wrap gap-4">
                <Btn href="/hotel/offers" variant="gold">
                  View all offers
                </Btn>
                <Btn href="/hotel/booking" variant="outline">
                  Book your stay
                </Btn>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function BookingCta() {
  return (
    <section className="pb-24 md:pb-32">
      <div className="container-luxe">
        <Reveal>
          <div className="bg-[#F3EDE1] border border-[#E3DACA] rounded-[32px] p-10 md:p-16 text-center">
            <Eyebrow>Your room</Eyebrow>
            <WordReveal as="h2" playOnView text="Check availability for your dates" className="text-ink mb-5 type-h2" />
            <p className="text-ink/60 leading-relaxed max-w-xl mx-auto mb-8">
              Only the advance is charged online — the rest is settled when you arrive.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-10 text-ink/70 text-sm">
              <a href={CONTACT.phoneHref} className="inline-flex items-center gap-2 link-sweep">
                <Phone className="w-4 h-4 text-gold" /> Call {CONTACT.phone}
              </a>
              <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-2 link-sweep">
                <Star className="w-4 h-4 text-gold" /> Email {CONTACT.email}
              </a>
            </div>
            <Btn href="/hotel/booking" variant="dark">
              Start your booking
            </Btn>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function HotelPage() {
  return (
    <>
      <ImageHero />
      <Property />
      <Accommodation />
      <YourStay />
      <AmenitiesStrip />
      <OffersBand />
      <BookingCta />
    </>
  );
}

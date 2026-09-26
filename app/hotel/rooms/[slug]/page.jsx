import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Users,
  Ruler,
  Wifi,
  Tv,
  Bath,
  Coffee,
  Briefcase,
  Wine,
  BedDouble,
  ConciergeBell,
  Sparkles,
  Clock,
  Check,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import { notFound } from "next/navigation";
import Gallery from "./Gallery";
import { rooms, CONTACT } from "../../_data";
import { Stars, Btn } from "../../_ui";
import WordReveal from "@/components/WordReveal";

export function generateStaticParams() {
  return rooms.map((r) => ({ slug: r.slug }));
}

const amenityIcons = {
  "Free WiFi": Wifi,
  "Smart TV": Tv,
  Bathtub: Bath,
  "Coffee Maker": Coffee,
  "Work Desk": Briefcase,
  "Mini Bar": Wine,
  "Rain Shower": Bath,
  "Extra Bedding": BedDouble,
  "Lounge Access": ConciergeBell,
  "Private Butler": ConciergeBell,
  Jacuzzi: Sparkles,
};

const policies = [
  { icon: Clock, title: "Check-in", text: `From ${CONTACT.checkIn}` },
  { icon: Clock, title: "Check-out", text: `Until ${CONTACT.checkOut}` },
  { icon: Check, title: "Cancellation", text: "Free up to 48 hours before check-in" },
  { icon: Check, title: "Reception", text: CONTACT.reception },
];

export default function RoomDetailPage({ params }) {
  const room = rooms.find((r) => r.slug === params.slug);
  if (!room) notFound();
  const others = rooms.filter((r) => r.slug !== room.slug).slice(0, 2);
  return (
    <>
      <section className="pt-32 pb-10">
        <div className="container-luxe">
          <Link
            href="/hotel/rooms"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-ink/60 hover:text-gold transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> All rooms
          </Link>
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <Reveal>
                <Gallery images={room.gallery} name={room.name} />
              </Reveal>
            </div>
            <div className="lg:col-span-1">
              <Reveal delay={0.1}>
                <div className="lg:sticky lg:top-28 bg-cream border border-[#E3DACA] rounded-[28px] p-8 shadow-card">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-gold mb-3">{room.category}</p>
                  <WordReveal as="h1" text={room.name} className="text-ink mb-3 type-h2" />
                  <Stars value={room.rating} className="mb-5" />
                  <div className="flex items-center gap-6 text-xs uppercase tracking-widest text-ink/50 mb-6">
                    <span className="inline-flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-gold" /> Up to {room.guests} guests
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Ruler className="w-4 h-4 text-gold" /> {room.size}
                    </span>
                  </div>
                  <p className="pb-6 mb-6 border-b border-[#E3DACA]">
                    <span className="font-display text-4xl font-semibold text-ink">
                      <CountUp value={room.price} />
                    </span>
                    <span className="text-ink/50"> / night</span>
                  </p>
                  <Btn href={`/hotel/booking?room=${room.slug}`} variant="gold" className="w-full mb-3">
                    Book this room
                  </Btn>
                  <a
                    href={CONTACT.phoneHref}
                    className="block text-center text-xs uppercase tracking-[0.25em] text-ink/60 hover:text-gold transition-colors"
                  >
                    or call {CONTACT.phone}
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-luxe grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <Reveal>
              <WordReveal as="h2" playOnView text="About this room" className="text-ink mb-5 type-h2" />
              <p className="text-ink/70 leading-relaxed mb-12">{room.longDescription}</p>
            </Reveal>
            <Reveal>
              <WordReveal as="h2" playOnView text="Amenities" className="text-ink mb-7 type-h2" />
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 mb-12">
                {room.amenities.map((a) => {
                  const Icon = amenityIcons[a] || Sparkles;
                  return (
                    <div key={a} className="flex items-center gap-3 text-ink/70 text-sm">
                      <span className="w-11 h-11 shrink-0 rounded-full border-2 border-gold/60 flex items-center justify-center text-gold">
                        <Icon className="w-5 h-5" />
                      </span>
                      {a}
                    </div>
                  );
                })}
              </div>
            </Reveal>
            <Reveal>
              <WordReveal as="h2" playOnView text="Policies" className="text-ink mb-7 type-h2" />
              <div className="grid sm:grid-cols-2 gap-5">
                {policies.map((p) => (
                  <div key={p.title} className="bg-[#F3EDE1] border border-[#E3DACA] rounded-[20px] p-6 flex gap-4">
                    <p.icon className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-gold mb-1">{p.title}</p>
                      <p className="text-ink/75 text-sm">{p.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F3EDE1]/60">
        <div className="container-luxe">
          <Reveal>
            <WordReveal as="h2" playOnView text="You may also like" className="text-ink text-center mb-10 type-h2" />
          </Reveal>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {others.map((r, i) => (
              <Reveal key={r.slug} delay={i * 0.1}>
                <Link href={`/hotel/rooms/${r.slug}`} className="card-luxe group flex flex-col sm:flex-row">
                  <div className="relative h-52 sm:h-auto sm:w-56 shrink-0 overflow-hidden">
                    <img src={r.image} alt={r.name} className="zoom absolute inset-0 w-full h-full object-cover" />
                  </div>
                  <div className="p-7">
                    <h3 className="font-display text-2xl text-ink mb-2 transition-colors duration-300 group-hover:text-gold">
                      {r.name}
                    </h3>
                    <p className="text-ink/60 text-sm mb-4 line-clamp-2">{r.description}</p>
                    <p className="text-ink">
                      <span className="font-display text-2xl font-semibold"><CountUp value={r.price} /></span>
                      <span className="text-ink/50 text-sm"> / night</span>
                    </p>
                    <span className="gold-link mt-4">
                      View details <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

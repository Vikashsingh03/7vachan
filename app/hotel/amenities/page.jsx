import {
  Wifi,
  Waves,
  UtensilsCrossed,
  ConciergeBell,
  Car,
  PlugZap,
  Bell,
  Shirt,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { Btn } from "../_ui";
import WordReveal from "@/components/WordReveal";

const amenities = [
  { icon: Wifi, name: "Free WiFi", text: "High-speed internet in every room and across the estate — streaming and video calls welcome." },
  { icon: Waves, name: "Swimming Pool", text: "A calm, clean pool on the deck, open mornings and evenings with attended hours." },
  { icon: UtensilsCrossed, name: "Restaurant", text: "Our in-house kitchen serves breakfast, the famous weekday thali and à la carte dinners." },
  { icon: ConciergeBell, name: "24×7 Front Desk", text: "A real person at the desk around the clock — late arrivals and early departures handled." },
  { icon: Car, name: "Parking", text: "Free attended on-site parking for residents, with room for wedding and banquet guests." },
  { icon: PlugZap, name: "Power Backup", text: "Full-building backup power, so the lights, lift and AC never notice a cut." },
  { icon: Bell, name: "Room Service", text: "Food, laundry pickups and small requests delivered to your door, day and night." },
  { icon: Shirt, name: "Laundry", text: "Same-day laundry and pressing — leave it by 10 AM and wear it by evening." },
];

export default function AmenitiesPage() {
  return (
    <>
      <section className="pt-36 pb-14 bg-ink text-cream">
        <div className="container-luxe text-center">
          <p className="section-eyebrow on-dark mb-4">Hotel · Amenities</p>
          <WordReveal as="h1" text="Every Comfort, Considered" className="page-title mb-4" />
          <p className="text-cream/70 leading-relaxed max-w-2xl mx-auto">
            The quiet infrastructure of a good stay — all included, all attended, all on the same grounds.
          </p>
        </div>
      </section>
      <section className="py-20 md:py-24">
        <div className="container-luxe">
          <Reveal>
            <SectionHeading
              eyebrow="Amenities"
              title="Across the estate"
              subtitle="Eight things you never have to think about while you are with us."
            />
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {amenities.map((a, i) => (
              <Reveal key={a.name} delay={(i % 4) * 0.08}>
                <div className="bg-white border border-[#E3DACA] rounded-[24px] p-8 text-center h-full hover:-translate-y-2 hover:shadow-card transition-all duration-500 group">
                  <span className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-gold/70 flex items-center justify-center text-gold transition-all duration-300 group-hover:bg-gold group-hover:text-cream group-hover:border-gold">
                    <a.icon className="w-7 h-7" />
                  </span>
                  <h3 className="font-display text-2xl text-ink mb-3">{a.name}</h3>
                  <p className="text-ink/60 text-sm leading-relaxed">{a.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="text-center mt-14">
            <Btn href="/hotel/booking" variant="gold">
              Book your stay
            </Btn>
          </Reveal>
        </div>
      </section>
    </>
  );
}

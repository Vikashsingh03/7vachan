import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Users, Check, BellRing, UtensilsCrossed, Music, Cake } from 'lucide-react';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import WordReveal from '@/components/WordReveal';

function Eyebrow({ children, dark = false }) {
  return (
    <div className="flex items-center justify-center gap-4 mb-5">
      <span className="h-px w-12 bg-gold/60" />
      <p className="section-eyebrow !mb-0">{children}</p>
      <span className="h-px w-12 bg-gold/60" />
    </div>
  );
}

const spaces = [
  {
    name: 'The Private Room',
    capacity: 'Up to 20 guests',
    copy: 'A wood-panelled room with its own entrance and a single long table — made for birthdays, anniversaries and quiet deals.',
    features: ['Dedicated server', 'Custom menu on request', 'Projector for speeches'],
    image: '/images/1517248135467-4c7edcad34c4.jpg',
  },
  {
    name: 'The Royal Alcove',
    capacity: 'Up to 12 guests',
    copy: 'A curtained alcove off the main hall with low light and brass lamps — our most requested corner for family dinners.',
    features: ['Semi-private setting', 'Set thali menus', 'Cake service included'],
    image: '/images/1559339352-11d035aa65de.jpg',
  },
  {
    name: 'Terrace Pavilion',
    capacity: 'Up to 50 guests',
    copy: 'An open-air terrace under fairy lights, steps from the tandoor — perfect for sangeet dinners and large celebrations.',
    features: ['Live tandoor counter', 'Space for performances', 'Valet parking'],
    image: '/images/1514933651103-005eec06c04b.jpg',
  },
];

const perks = [
  { icon: BellRing, title: 'Dedicated Service', copy: 'Your own server through the evening — refills, courses and timing handled quietly.' },
  { icon: UtensilsCrossed, title: 'Set Menus', copy: 'Curated thali and tandoor set menus for groups, vegetarian and Jain friendly.' },
  { icon: Cake, title: 'Celebration Touches', copy: 'Cakes, candles and a little theatre for birthdays and anniversaries — just tell us.' },
  { icon: Music, title: 'Your Ambience', copy: 'Background music, speeches or a small performance — the room bends to your evening.' },
];

export default function DiningPage() {
  return (
    <main>
      <section className="relative min-h-[68vh] flex items-center justify-center overflow-hidden bg-ink">
        <Image
          src="/images/1552566626-52f8b828add9.jpg"
          alt="Warm private dining corner"
          fill
          priority
          className="object-cover animate-kenburns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/55 to-ink/85" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto pt-24">
          <div className="hero-anim d1">
            <Eyebrow dark>Private Dining</Eyebrow>
          </div>
          <WordReveal as="h1" text="Your evening, behind closed doors" delay={0.35} className="type-hero-h1 mb-5" />
          <p className="hero-anim d3 type-hero-sub max-w-xl mx-auto mb-8">
            Three intimate spaces for celebrations, family dinners and quiet business meals — each with its own service.
          </p>
          <div className="hero-anim d4">
            <Link href="/restaurant/reserve" className="btn-gold uppercase">
              Reserve a Space <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-cream">
        <div className="container-luxe space-y-16">
          {spaces.map((s, i) => (
            <Reveal key={s.name}>
              <div className={`grid md:grid-cols-2 gap-8 md:gap-14 items-center ${i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''}`}>
                <div className="relative rounded-[28px] overflow-hidden shadow-luxe h-[380px] md:h-[460px] group">
                  <Image src={s.image} alt={s.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div>
                  <p className="section-eyebrow mb-4">{s.capacity}</p>
                  <h2 className="font-display text-4xl md:text-5xl text-ink font-medium mb-4">{s.name}</h2>
                  <p className="text-ink/65 leading-relaxed mb-6">{s.copy}</p>
                  <ul className="space-y-3 mb-8">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-ink/75">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gold/15 text-gold shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/restaurant/reserve" className="btn-dark uppercase">
                    Book This Space <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24 md:py-32 bg-creamdark/40">
        <div className="container-luxe">
          <Reveal>
            <SectionHeading
              eyebrow="Included With Every Booking"
              title="The details are on us"
              subtitle="Private dining at 7 Vachan comes with the small things done properly."
            />
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((p, i) => (
              <Reveal key={p.title} delay={i * 100}>
                <div className="bg-white rounded-[24px] shadow-card p-8 h-full hover:-translate-y-2 transition-transform duration-500">
                  <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold text-white mb-5 shadow-card">
                    <p.icon className="w-6 h-6" />
                  </span>
                  <h3 className="font-display text-2xl text-ink font-medium mb-2">{p.title}</h3>
                  <p className="text-ink/60 text-sm leading-relaxed">{p.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-28 bg-ink text-cream relative overflow-hidden">
        <Image
          src="/images/1414235077428-338989a2e8c0.jpg"
          alt="Candlelit table"
          fill
          className="object-cover opacity-15"
        />
        <div className="relative z-10 container-luxe text-center max-w-2xl mx-auto">
          <Reveal>
            <div className="flex items-center justify-center gap-3 mb-5 text-gold">
              <Users className="w-5 h-5" />
              <p className="section-eyebrow !mb-0">Groups of 8 or more</p>
            </div>
            <WordReveal as="h2" playOnView text="Planning something bigger?" className="mb-5 type-h2" />
            <p className="text-cream/60 leading-relaxed mb-8">
              For 9 or more guests, call us directly at <a href="tel:9993542874" className="text-gold hover:underline">9993542874</a> so
              we can seat everyone together and plan a set menu. No advance needed for table bookings.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/restaurant/reserve" className="btn-gold uppercase">
                Reserve a Space <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/restaurant/contact" className="btn-outline uppercase">
                Talk to Our Team
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

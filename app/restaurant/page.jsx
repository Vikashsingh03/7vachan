import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock, Mail, Phone, MapPin, Flame, Wheat, Leaf, Sparkles } from 'lucide-react';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import { menuItems } from './menu-data';
import WordReveal from '@/components/WordReveal';

const HERO_IMG = '/images/1414235077428-338989a2e8c0.jpg';
const STORY_IMG = '/images/1544025162-d76694265947.jpg';

function Eyebrow({ children, dark = false }) {
  return (
    <div className="flex items-center justify-center gap-4 mb-5">
      <span className="h-px w-12 bg-gold/60" />
      <p className="section-eyebrow !mb-0" style={dark ? { color: '#d9be8e' } : undefined}>{children}</p>
      <span className="h-px w-12 bg-gold/60" />
    </div>
  );
}

function VegDot({ veg }) {
  return (
    <span className={`inline-flex items-center justify-center w-4 h-4 border-2 rounded-[4px] bg-white shrink-0 ${veg ? 'border-green-700' : 'border-red-800'}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${veg ? 'bg-green-700' : 'bg-red-800'}`} />
    </span>
  );
}

const spaces = [
  {
    name: 'Main Dining Hall',
    copy: 'High ceilings, warm lamplight and the murmur of a full house — the heart of 7 Vachan Kitchen.',
    detail: 'Seats 80 · Family tables',
    image: '/images/1517248135467-4c7edcad34c4.jpg',
  },
  {
    name: 'Private Family Lounge',
    copy: 'A quiet, curtained corner for unhurried family dinners and small celebrations.',
    detail: 'Seats 24 · Semi-private',
    image: '/images/1552566626-52f8b828add9.jpg',
  },
  {
    name: 'Terrace Evening Seating',
    copy: 'Open air under the evening sky — kebabs off the tandoor, breeze on, city lights below.',
    detail: 'Seats 40 · 6 PM onwards',
    image: '/images/1514933651103-005eec06c04b.jpg',
  },
];

const whyUs = [
  { icon: Flame, title: 'Live Tandoor', copy: 'Clay ovens fired through service — breads blister and kebabs char to order.' },
  { icon: Wheat, title: 'Awadhi Patience', copy: 'Dals simmer overnight, biryanis seal on dum. Nothing here is hurried.' },
  { icon: Leaf, title: 'Vegetarian Friendly', copy: 'Half the menu is vegetarian, with Jain preparations on request.' },
  { icon: Sparkles, title: 'Seasonal Short Menu', copy: 'A tight menu that changes with what the morning market offers.' },
];

export default function RestaurantPage() {
  const signatureNames = ['Paneer Tikka Lasooni', 'Murgh Malai Kebab', 'Dal Saat Vachan', 'Butter Chicken'];
  const signature = signatureNames
    .map((n) => menuItems.find((d) => d.name === n))
    .filter(Boolean)
    .slice(0, 4);
  return (
    <main>
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-ink">
        <Image src={HERO_IMG} alt="Candlelit dining room at 7 Vachan Kitchen" fill priority className="object-cover animate-kenburns" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/55 to-ink/85" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto pt-24">
          <div className="hero-anim d1">
            <Eyebrow dark>Restaurant</Eyebrow>
          </div>
          <WordReveal as="h1" text="Dining at 7 Vachan" delay={0.35} className="type-hero-h1 mb-6" />
          <p className="hero-anim d3 type-hero-sub mb-3">
            North Indian · Awadhi · Tandoor — cooked to order, served without hurry.
          </p>
          <p className="hero-anim d4 flex items-center justify-center gap-2 text-cream/60 text-sm tracking-wide mb-10">
            <Clock className="w-4 h-4 text-gold" /> Open daily · 12:00 PM – 11:30 PM
          </p>
          <div className="hero-anim d5 flex flex-wrap items-center justify-center gap-4">
            <Link href="/restaurant/reserve" className="btn-gold uppercase">
              Reserve a Table <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/restaurant/menu" className="btn-outline uppercase">
              View Menu
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/50 text-[11px] uppercase tracking-[0.3em] flex flex-col items-center gap-2">
          Scroll
          <span className="w-px h-10 bg-gradient-to-b from-gold to-transparent" />
        </div>
      </section>

      <section className="py-24 md:py-32 bg-cream">
        <div className="container-luxe grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <Reveal>
            <div className="relative rounded-[28px] overflow-hidden shadow-luxe">
              <Image src={STORY_IMG} alt="Skewers grilling over open flame" width={1200} height={1400} className="object-cover aspect-[4/5] w-full" />
              <div className="absolute bottom-5 left-5 right-5 bg-ink/80 backdrop-blur rounded-2xl px-6 py-5 text-cream">
                <p className="section-eyebrow !text-[10px] mb-2">Weekday Lunch Thali</p>
                <p className="font-display text-xl">A full vegetarian thali, Monday to Friday, noon to 3 PM.</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <Eyebrow>Our Kitchen</Eyebrow>
            <WordReveal as="h2" playOnView text="Fire, spice and slow cooking" className="text-ink mb-6 type-h2" />
            <div className="space-y-5 text-ink/65 leading-relaxed">
              <p>
                Our kitchen serves North Indian and Awadhi cooking from a live tandoor, alongside a short
                seasonal menu that changes with what the morning market offers.
              </p>
              <p>
                Rooted in the promise of 7 Vachan Kitchen — every arrival is met with the same care, whether
                you stay one night or a season. Dals simmer overnight, biryanis seal on dum, and breads
                blister against clay seconds before they reach your table.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link href="/restaurant/dining" className="btn-dark uppercase">
                Private Dining <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/restaurant/menu" className="btn-outline-dark uppercase">
                Browse the Menu
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-creamdark/40">
        <div className="container-luxe">
          <Reveal>
            <SectionHeading
              eyebrow="Dining Spaces"
              title="Rooms with their own mood"
              subtitle="Three ways to sit down with us — pick the one that fits the evening."
            />
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {spaces.map((s, i) => (
              <Reveal key={s.name} delay={i * 120}>
                <Link href="/restaurant/dining" className="card-luxe group block relative h-[440px]">
                  <Image src={s.image} alt={s.name} fill className="zoom object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-7 text-cream">
                    <p className="text-gold text-[11px] uppercase tracking-[0.3em] mb-2">{s.detail}</p>
                    <h3 className="font-display text-3xl font-medium mb-2 group-hover:text-gold transition-colors">{s.name}</h3>
                    <p className="text-cream/70 text-sm leading-relaxed">{s.copy}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-ink text-cream">
        <div className="container-luxe">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Eyebrow dark>From the Pass</Eyebrow>
              <WordReveal as="h2" playOnView text="Signature dishes" className="page-title text-cream mb-4" />
              <p className="text-cream/60 leading-relaxed">The dishes our kitchen is proudest of — worth ordering even if you came for something else.</p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {signature.map((d, i) => (
              <Reveal key={d.name} delay={i * 100}>
                <Link href="/restaurant/menu" className="group block bg-cream/[0.04] border border-cream/10 rounded-[24px] overflow-hidden hover:border-gold/50 transition-all duration-500 hover:-translate-y-2 h-full">
                  <div className="relative h-52 overflow-hidden">
                    <Image src={d.image} alt={d.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-display text-2xl font-medium group-hover:text-gold transition-colors">{d.name}</h3>
                      <VegDot veg={d.veg} />
                    </div>
                    <p className="text-cream/55 text-sm leading-relaxed line-clamp-2 mb-4">{d.description}</p>
                    <p className="font-display text-xl text-gold">₹{d.price}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="text-center mt-12">
              <Link href="/restaurant/menu" className="btn-gold uppercase">
                Full Menu <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 md:py-28 bg-cream">
        <div className="container-luxe">
          <Reveal>
            <SectionHeading
              eyebrow="Why Dine With Us"
              title="The 7 Vachan table"
              subtitle="Small promises, kept every service."
            />
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((w, i) => (
              <Reveal key={w.title} delay={i * 100}>
                <div className="bg-white rounded-[24px] shadow-card p-8 text-center h-full hover:-translate-y-2 transition-transform duration-500">
                  <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold/10 text-gold mb-5">
                    <w.icon className="w-6 h-6" />
                  </span>
                  <h3 className="font-display text-2xl text-ink font-medium mb-2">{w.title}</h3>
                  <p className="text-ink/60 text-sm leading-relaxed">{w.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-ink text-cream border-t border-cream/10">
        <div className="container-luxe grid md:grid-cols-3 gap-10 text-center md:text-left">
          <Reveal>
            <p className="section-eyebrow mb-4">Hours</p>
            <p className="font-display text-2xl mb-1">12:00 PM – 11:30 PM</p>
            <p className="text-cream/55 text-sm">Open every day of the week</p>
          </Reveal>
          <Reveal delay={120}>
            <p className="section-eyebrow mb-4">Reach Us</p>
            <a href="mailto:dine@7vachan.com" className="flex items-center justify-center md:justify-start gap-2 text-cream/80 hover:text-gold transition-colors mb-2">
              <Mail className="w-4 h-4 text-gold" /> dine@7vachan.com
            </a>
            <a href="tel:9993542874" className="flex items-center justify-center md:justify-start gap-2 text-cream/80 hover:text-gold transition-colors">
              <Phone className="w-4 h-4 text-gold" /> 9993542874
            </a>
          </Reveal>
          <Reveal delay={240}>
            <p className="section-eyebrow mb-4">Find Us</p>
            <p className="flex items-start justify-center md:justify-start gap-2 text-cream/80 text-sm leading-relaxed">
              <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              7 Vachan, Kothi Road, near Lovedale School, Bagha, Satna, Madhya Pradesh 485001
            </p>
          </Reveal>
        </div>
        <div className="container-luxe mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link href="/restaurant/menu" className="btn-gold uppercase">
            Explore the Menu <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/restaurant/reserve" className="btn-outline uppercase">
            Reserve a Table
          </Link>
        </div>
      </section>
    </main>
  );
}

import Image from 'next/image';
import { ArrowRight, Check, ChefHat, Mail, Phone, UtensilsCrossed } from 'lucide-react';
import { Reveal, SectionHeading, Eyebrow, Btn, PageHero } from '@/components/ui';
import WordReveal from '@/components/WordReveal';
import CountUp from '@/components/CountUp';

const tiers = [
  {
    name: 'Classic',
    price: '₹899',
    unit: 'per plate',
    desc: 'A beloved spread of North Indian favourites, served with warmth.',
    features: [
      'Welcome drinks & mocktails',
      '8 starters, veg & non-veg',
      '4 main course curries',
      'Live chaat counter',
      '3 desserts',
      'Breads & rice station',
    ],
  },
  {
    name: 'Royal',
    price: '₹1,299',
    unit: 'per plate',
    desc: 'Multi-cuisine abundance with live cooking theatres for your guests.',
    loved: true,
    features: [
      'Signature welcome drinks',
      '12 starters across cuisines',
      '6 main course curries',
      'Three live counters',
      '5 desserts + kulfi cart',
      'Continental & Chinese station',
      'Midnight snack service',
    ],
  },
  {
    name: 'Maharaja',
    price: '₹1,799',
    unit: 'per plate',
    desc: 'A bespoke feast curated with our executive chef, course by course.',
    features: [
      'Champagne-style welcome bar',
      '16 starters, chef-curated',
      '8 main course specials',
      'Six live counters',
      'Dessert room with live jalebi',
      'Sushi & Mediterranean station',
      'Personalised menu cards',
      'Late-night biryani service',
    ],
  },
];

const courses = [
  {
    name: 'Welcome Drinks',
    items: ['Kesar Badam Sharbat', 'Aam Panna Cooler', 'Masala Shikanji', 'Fresh Coconut Water'],
  },
  {
    name: 'Starters',
    items: ['Paneer Tikka Angara', 'Tandoori Mushroom', 'Dahi Ke Kebab', 'Chicken Malai Tikka', 'Fish Amritsari'],
  },
  {
    name: 'Main Course',
    items: ['Dal 7 Vachan', 'Paneer Lababdar', 'Kadhai Vegetables', 'Mutton Rogan Josh', 'Butter Chicken', 'Subz Biryani'],
  },
  {
    name: 'Live Counters',
    items: ['Chaat & Golgappa', 'Dosa & Uttapam', 'Pasta al Forno', 'Tandoor Breads', 'Kulfi Falooda'],
  },
  {
    name: 'Desserts',
    items: ['Gulab Jamun Cheesecake', 'Rasmalai Tres Leches', 'Kesar Rasmalai', 'Gajar Halwa Tart', 'Seasonal Fruit Pavlova'],
  },
  {
    name: 'Beverages',
    items: ['Filter Coffee', 'Masala Chai', 'Fresh Lime Soda', 'Cold Coffee', 'Buttermilk Bar'],
  },
];

export default function CateringPage() {
  return (
    <main className="bg-cream text-ink">
      <PageHero
        eyebrow="Wedding Catering"
        title="Feasts to Remember"
        subtitle="Cooked in our own kitchen by our own chefs — never outsourced. Menus are built with you, and tasted before you commit."
      />

      <section className="py-24 sm:py-28">
        <div className="container-luxe">
          <Reveal>
            <SectionHeading
              eyebrow="Per-Plate Tiers"
              title="Catering packages"
              subtitle="Transparent per-plate pricing. Final menus are built around your guest count, dietary needs and traditions."
            />
          </Reveal>
          <div className="grid lg:grid-cols-3 gap-8 items-stretch mt-4">
            {tiers.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 0.12} className="h-full">
                <article
                  className={`relative rounded-[32px] p-8 h-full flex flex-col transition-all duration-500 hover:-translate-y-2 ${
                    tier.loved ? 'bg-ink text-cream shadow-luxe ring-2 ring-gold' : 'bg-white shadow-card hover:shadow-luxe'
                  }`}
                >
                  {tier.loved && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-white text-[11px] uppercase tracking-[0.22em] px-5 py-1.5 rounded-full">
                      Most Loved
                    </span>
                  )}
                  <h2 className={`font-display text-3xl ${tier.loved ? 'text-cream' : 'text-ink'}`}>{tier.name}</h2>
                  <p className="mt-3">
                    <span className="font-display text-5xl text-gold"><CountUp value={Number(tier.price.replace(/[^0-9]/g, ''))} /></span>
                    <span className={`text-sm ml-2 ${tier.loved ? 'text-cream/60' : 'text-ink/50'}`}>{tier.unit}</span>
                  </p>
                  <p className={`text-sm mt-4 leading-relaxed ${tier.loved ? 'text-cream/70' : 'text-ink/60'}`}>
                    {tier.desc}
                  </p>
                  <div className={`h-px my-6 ${tier.loved ? 'bg-cream/15' : 'bg-[#E3DACA]'}`} />
                  <ul className="space-y-3 flex-1">
                    {tier.features.map((f) => (
                      <li
                        key={f}
                        className={`flex items-start gap-3 text-sm ${tier.loved ? 'text-cream/80' : 'text-ink/70'}`}
                      >
                        <span className="w-5 h-5 rounded-full bg-gold/15 flex items-center justify-center shrink-0 mt-0.5">
                          <Check size={12} className="text-gold" strokeWidth={3} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Btn href="/marriage-hall/contact" variant={tier.loved ? 'gold' : 'dark'} className="mt-8 w-full">
                    Enquire <ArrowRight size={15} />
                  </Btn>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="container-luxe">
          <Reveal>
            <SectionHeading
              eyebrow="Sample Menu"
              title="A taste of the kitchen"
              subtitle="A sample Royal-tier menu — your final menu is curated with our executive chef at your tasting."
            />
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {courses.map((course, i) => (
              <Reveal key={course.name} delay={(i % 3) * 0.1}>
                <div className="bg-white rounded-[28px] shadow-card p-8 h-full hover:shadow-luxe hover:-translate-y-1.5 transition-all duration-500">
                  <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-gold mb-5">
                    <UtensilsCrossed size={14} /> {course.name}
                  </p>
                  <ul className="space-y-2.5">
                    {course.items.map((item) => (
                      <li key={item} className="font-display text-lg text-ink/85">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="container-luxe">
          <Reveal>
            <div className="relative rounded-[32px] overflow-hidden shadow-luxe">
              <Image
                src="/images/1555244162-803834f70033.jpg"
                alt="Catering buffet"
                width={1800}
                height={700}
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-night/85 via-night/55 to-transparent" />
              <div className="absolute inset-0 flex items-center">
                <div className="p-10 sm:p-14 max-w-xl">
                  <ChefHat size={36} className="text-gold mb-5" />
                  <WordReveal as="h2" playOnView text="Taste before you commit" className="text-cream type-h2" />
                  <p className="text-cream/70 mt-4 leading-relaxed">
                    Finalise your menu over a private tasting session for two, hosted by
                    our executive chef. Bring your family, bring your opinions — we will
                    bring the feast.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <Btn href="/marriage-hall/contact" variant="gold">
                      Book a tasting session <ArrowRight size={15} />
                    </Btn>
                    <a href="tel:9993542874" className="btn-outline">
                      <Phone size={15} /> 9993542874
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-luxe">
          <Reveal>
            <div className="rounded-[28px] bg-[#F3EDE1] border border-[#E3DACA] p-10 text-center max-w-3xl mx-auto">
              <Eyebrow>Talk Menus</Eyebrow>
              <WordReveal as="h2" playOnView text="Write to our events team" className="mt-4 type-h2" />
              <p className="text-ink/60 text-sm mt-3">
                Share your date and guest count — we will send curated menu options with
                per-plate pricing.
              </p>
              <a
                href="mailto:events@7vachan.com"
                className="inline-flex items-center gap-2 mt-6 text-golddeep font-medium hover:underline"
              >
                <Mail size={16} /> events@7vachan.com
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

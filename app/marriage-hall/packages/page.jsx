import Image from 'next/image';
import { ArrowRight, Check, Sparkles, Phone, Mail, MapPin } from 'lucide-react';
import { Reveal, SectionHeading, Eyebrow, Btn, PageHero } from '@/components/ui';
import WordReveal from '@/components/WordReveal';
import CountUp from '@/components/CountUp';

const packages = [
  {
    name: 'Silver',
    tagline: 'An elegant start',
    guests: '100–300 guests',
    price: '₹1,100',
    unit: 'per plate',
    desc: 'Everything a beautifully run celebration needs, without excess. Suited to intimate weddings and family functions.',
    img: '/images/1519225421980-715cb0215aed.jpg',
    inclusions: [
      'Grand Banquet Hall for 6 hours',
      'Classic stage decoration',
      'Standard floral entrance',
      'Buffet setup with two live counters',
      'Basic sound and lighting',
      'Valet parking',
      'Dedicated event coordinator',
    ],
  },
  {
    name: 'Gold',
    tagline: 'Considered in every detail',
    guests: '300–600 guests',
    price: '₹1,450',
    unit: 'per plate',
    desc: 'For celebrations spanning several functions, with styling and service scaled to match.',
    img: '/images/1519167758481-83f550bb49b3.jpg',
    loved: true,
    inclusions: [
      'All venue spaces for a full day',
      'Designer stage, mandap and ceiling installation',
      'Premium imported floral styling',
      'Multi-cuisine buffet with six live counters',
      'Concert-grade sound and architectural lighting',
      'Bridal suite plus six guest rooms',
      'Full valet and guest reception team',
      'Two dedicated event managers',
    ],
  },
  {
    name: 'Platinum',
    tagline: 'Nothing held back',
    guests: '600–1,000 guests',
    price: '₹1,900',
    unit: 'per plate',
    desc: 'A multi-day wedding hosted end to end — every space, every service, planned around your family.',
    img: '/images/1469371670807-013ccf25f16a.jpg',
    inclusions: [
      'Exclusive multi-day use of the entire estate',
      'Bespoke set design by our creative director',
      'Imported floral installation across all spaces',
      'Bespoke menu curated with our executive chef',
      'Full production: sound, lighting and projection',
      'Bridal suite plus eighteen guest rooms',
      'Baraat reception with ceremonial entry',
      'Complete planning team from your first visit',
    ],
  },
];

export default function PackagesPage() {
  return (
    <main className="bg-cream text-ink">
      <PageHero
        eyebrow="Marriage Hall"
        title="Wedding Packages"
        subtitle="Every package is a starting point. We adjust it around your family, your rituals and your guest list."
      />

      <section className="py-24 sm:py-28">
        <div className="container-luxe">
          <div className="grid lg:grid-cols-3 gap-8 items-stretch">
            {packages.map((pkg, i) => (
              <Reveal key={pkg.name} delay={i * 0.12} className="h-full">
                <article
                  className={`relative rounded-[32px] overflow-hidden h-full flex flex-col transition-all duration-500 hover:-translate-y-2 ${
                    pkg.loved ? 'bg-ink text-cream shadow-luxe ring-2 ring-gold' : 'bg-white shadow-card hover:shadow-luxe'
                  }`}
                >
                  {pkg.loved && (
                    <span className="absolute top-5 right-5 z-10 bg-gold text-white text-[11px] uppercase tracking-[0.22em] px-5 py-2 rounded-full flex items-center gap-2">
                      <Sparkles size={13} /> Most Loved
                    </span>
                  )}
                  <div className="relative h-56 shrink-0 overflow-hidden group">
                    <Image
                      src={pkg.img}
                      alt={`${pkg.name} package`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-night/60 to-transparent" />
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <p className="text-[11px] uppercase tracking-[0.3em] text-gold">{pkg.tagline}</p>
                    <h2 className={`font-display text-4xl mt-2 ${pkg.loved ? 'text-cream' : 'text-ink'}`}>{pkg.name}</h2>
                    <p className={`text-xs uppercase tracking-[0.2em] mt-2 ${pkg.loved ? 'text-cream/60' : 'text-ink/50'}`}>
                      {pkg.guests}
                    </p>
                    <p className="mt-4">
                      <span className="font-display text-5xl text-gold"><CountUp value={Number(pkg.price.replace(/[^0-9]/g, ''))} /></span>
                      <span className={`text-sm ml-2 ${pkg.loved ? 'text-cream/60' : 'text-ink/50'}`}>{pkg.unit}</span>
                    </p>
                    <p className={`text-sm mt-4 leading-relaxed ${pkg.loved ? 'text-cream/70' : 'text-ink/60'}`}>
                      {pkg.desc}
                    </p>
                    <div className={`h-px my-6 ${pkg.loved ? 'bg-cream/15' : 'bg-[#E3DACA]'}`} />
                    <p className={`text-xs uppercase tracking-[0.25em] mb-4 ${pkg.loved ? 'text-cream/60' : 'text-ink/50'}`}>
                      What&apos;s included
                    </p>
                    <ul className="space-y-3 flex-1">
                      {pkg.inclusions.map((inc) => (
                        <li
                          key={inc}
                          className={`flex items-start gap-3 text-sm ${pkg.loved ? 'text-cream/80' : 'text-ink/70'}`}
                        >
                          <span className="w-5 h-5 rounded-full bg-gold/15 flex items-center justify-center shrink-0 mt-0.5">
                            <Check size={12} className="text-gold" strokeWidth={3} />
                          </span>
                          {inc}
                        </li>
                      ))}
                    </ul>
                    <Btn
                      href="/marriage-hall/availability"
                      variant={pkg.loved ? 'gold' : 'dark'}
                      className="mt-8 w-full"
                    >
                      Check availability <ArrowRight size={15} />
                    </Btn>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="container-luxe">
          <Reveal>
            <div className="rounded-[32px] bg-[#F3EDE1] border border-[#E3DACA] p-10 sm:p-14 text-center max-w-4xl mx-auto">
              <Eyebrow>Custom Celebrations</Eyebrow>
              <WordReveal as="h2" playOnView text="We quote each celebration individually" className="mt-5 type-h2" />
              <p className="text-ink/60 mt-5 leading-relaxed max-w-2xl mx-auto">
                The cost of a wedding here depends on the spaces you use, the guest count,
                the decoration you choose and how many functions you are hosting — so a
                single figure on a web page would mislead more than it helps. Send us an
                enquiry and you will have a full written quotation after one conversation.
                No payment is taken until you are ready.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                <Btn href="/marriage-hall/contact" variant="gold">
                  Request a quotation <ArrowRight size={15} />
                </Btn>
                <a href="tel:9993542874" className="btn-outline-dark">
                  <Phone size={15} /> 9993542874
                </a>
              </div>
              <p className="mt-8 text-sm text-ink/50 flex items-center justify-center gap-2">
                <Mail size={14} className="text-gold" /> events@7vachan.com
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-luxe">
          <Reveal>
            <div className="flex items-start gap-3 text-sm text-ink/55 max-w-3xl mx-auto">
              <MapPin size={16} className="text-gold shrink-0 mt-0.5" />
              <p>
                7 Vachan Marriage Hall, Satna, Kothi Road, near Lovedale School, Bagha,
                Madhya Pradesh 485001
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink text-cream">
        <div className="container-luxe py-16 text-center">
          <Reveal>
            <p className="font-display text-2xl sm:text-3xl italic">
              &ldquo;Book Two Functions — hold your Mehendi and Sangeet with us alongside
              the wedding and the terrace hire is complimentary.&rdquo;
            </p>
            <Btn href="/marriage-hall/availability" variant="gold" className="mt-8">
              Check your date <ArrowRight size={15} />
            </Btn>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

import Image from 'next/image';
import WordReveal from './WordReveal';

export default function PageHero({ image, eyebrow, title, subtitle, subtext }) {
  const text = subtitle || subtext;
  return (
    <section className="relative h-[70vh] min-h-[520px] flex items-center justify-center overflow-hidden bg-ink">
      <div className="absolute inset-0">
        {image ? (
          <Image
            src={image}
            alt={typeof title === 'string' ? title : '7 Vachan'}
            fill
            priority
            className="object-cover animate-kenburns"
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#2b2318_0%,#14120f_70%)]" />
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/45 to-ink/75" />
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        {eyebrow && (
          <p className="hero-anim d1 type-hero-eyebrow mb-6">{eyebrow}</p>
        )}
        <WordReveal as="h1" text={title} delay={0.35} className="type-hero-h1" />
        {text && (
          <p className="hero-anim d3 type-hero-sub max-w-2xl mx-auto mt-6">{text}</p>
        )}
        <div className="hero-anim d4 mt-8 flex justify-center">
          <span className="block w-16 h-px bg-gold" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

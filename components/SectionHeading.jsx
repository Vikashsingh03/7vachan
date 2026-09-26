import Reveal from './Reveal';
import WordReveal from './WordReveal';
import { Eyebrow } from './ui';

export default function SectionHeading({ eyebrow, title, subtext, subtitle, align = 'center', dark = false }) {
  const centered = align === 'center';
  const text = subtext || subtitle;
  return (
    <div className={`max-w-2xl mb-12 md:mb-16 ${centered ? 'mx-auto text-center' : 'text-left'}`}>
      {eyebrow && (
        <Reveal variant="fade">
          <Eyebrow center={centered} dark={dark} className="mb-5">
            {eyebrow}
          </Eyebrow>
        </Reveal>
      )}
      <WordReveal
        as="h2"
        playOnView
        text={title}
        className={`type-h2 mb-5 ${dark ? 'text-cream' : 'text-ink'}`}
      />
      {text && (
        <Reveal delay={200}>
          <p className={`type-body ${dark ? 'text-cream/65' : ''}`}>{text}</p>
        </Reveal>
      )}
    </div>
  );
}

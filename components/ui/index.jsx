import Link from 'next/link';
import { Star } from 'lucide-react';
import RevealBase from './Reveal';
import PageHeroBase from './PageHero';
import SectionHeadingBase from './SectionHeading';

export const Reveal = RevealBase;
export const PageHero = PageHeroBase;
export const SectionHeading = SectionHeadingBase;

export function Eyebrow({ children, className = '', align = 'center', dark = false }) {
  const justify =
    align === 'left' ? 'justify-start' : align === 'right' ? 'justify-end' : 'justify-center';
  return (
    <p className={`flex items-center gap-4 ${justify} ${className}`}>
      <span className="h-px w-10 bg-gold/50" aria-hidden="true" />
      <span className="eyebrow whitespace-nowrap" style={dark ? { color: '#d9be8e' } : undefined}>{children}</span>
      <span className="h-px w-10 bg-gold/50" aria-hidden="true" />
    </p>
  );
}

const btnStyles = {
  gold: 'btn-gold',
  dark: 'btn-dark',
  outline: 'btn-outline-dark',
  light: 'btn-outline',
};

export function Btn({
  href,
  variant = 'gold',
  className = '',
  children,
  type,
  onClick,
  ...rest
}) {
  const cls = `${btnStyles[variant] || btnStyles.gold} uppercase ${className}`;
  if (href) {
    return (
      <Link href={href} className={cls} onClick={onClick} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type || 'button'} className={cls} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}

export function Stars({ count = 5, size = 14, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`} aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={size} className="fill-gold text-gold" aria-hidden="true" />
      ))}
    </span>
  );
}

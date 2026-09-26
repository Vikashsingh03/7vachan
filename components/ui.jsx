'use client';

import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';

const variants = {
  gold: 'btn-pill-gold',
  dark: 'btn-pill-dark',
  outline: 'btn-pill-outline',
  outlineDark: 'btn-pill-outline-dark',
};

export function Btn({ variant = 'gold', href, children, onClick, className = '', type = 'button' }) {
  const cls = `${variants[variant] || variants.gold} ${className}`.trim();
  const inner = (
    <>
      {children}
      <ArrowRight size={15} />
    </>
  );
  if (href) {
    return (
      <Link href={href} className={cls} onClick={onClick}>
        {inner}
      </Link>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick}>
      {inner}
    </button>
  );
}

export function Eyebrow({ children, center = true, dark = false, className = '' }) {
  return (
    <div className={`flex items-center gap-4 ${center ? 'justify-center' : 'justify-start'} ${className}`}>
      <span className="h-px w-10 bg-gold/60" aria-hidden="true" />
      <span className="eyebrow whitespace-nowrap" style={dark ? { color: '#d9be8e' } : undefined}>{children}</span>
      <span className="h-px w-10 bg-gold/60" aria-hidden="true" />
    </div>
  );
}

export function Stars({ value = 5, size = 14, className = '' }) {
  const full = Math.round(value);
  return (
    <span className={`inline-flex items-center gap-1 ${className}`} aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={i <= full ? 'fill-gold text-gold' : 'text-hairline'}
        />
      ))}
    </span>
  );
}

export function Container({ children, className = '' }) {
  return <div className={`container-luxe ${className}`}>{children}</div>;
}

export function Field({ label, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      {label && (
        <span className="block text-[11px] uppercase font-medium text-body mb-2" style={{ letterSpacing: '0.22em' }}>
          {label}
        </span>
      )}
      {children}
    </label>
  );
}

export { default as Reveal } from './Reveal';
export { default as SectionHeading } from './SectionHeading';
export { default as PageHero } from './PageHero';

'use client';

import { useEffect, useRef } from 'react';

const variantClass = {
  up: 'reveal',
  fade: 'reveal-fade',
  image: 'reveal-img',
  left: 'reveal-left',
};

export default function Reveal({ children, className = '', delay = 0, variant = 'up' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${variantClass[variant] || 'reveal'} ${className}`}
      style={{ '--reveal-delay': `${delay / 1000}s` }}
    >
      {children}
    </div>
  );
}

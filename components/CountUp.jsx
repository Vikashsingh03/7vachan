'use client';

import { useEffect, useRef, useState } from 'react';

function easeOutExpo(t) {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export default function CountUp({
  value = 0,
  prefix = '₹',
  suffix = '',
  duration = 0.9,
  className = '',
}) {
  const ref = useRef(null);
  const rafRef = useRef(0);
  const displayRef = useRef(0);
  const hasRun = useRef(false);
  const [display, setDisplay] = useState(0);
  const target = Number(value) || 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animate = (from, to) => {
      cancelAnimationFrame(rafRef.current);
      if (reduce || from === to) {
        displayRef.current = to;
        setDisplay(to);
        return;
      }
      const ms = Math.max(0.15, duration) * 1000;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - start) / ms);
        const v = Math.round(from + (to - from) * easeOutExpo(p));
        displayRef.current = v;
        setDisplay(v);
        if (p < 1) rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    if (hasRun.current) {
      animate(displayRef.current, target);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            hasRun.current = true;
            io.disconnect();
            animate(0, target);
          }
        });
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
}

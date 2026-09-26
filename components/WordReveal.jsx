'use client';

import { useEffect, useRef, useState } from 'react';

export default function WordReveal({
  text = '',
  as: Tag = 'span',
  className = '',
  delay = 0,
  stagger = 0.1,
  playOnView = false,
}) {
  const ref = useRef(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (!playOnView) {
      const t = setTimeout(() => setPlay(true), Math.max(0, delay) * 1000);
      return () => clearTimeout(t);
    }
    const el = ref.current;
    if (!el) return;
    let timer = null;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            timer = setTimeout(() => setPlay(true), Math.max(0, delay) * 1000);
            io.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [playOnView, delay]);

  const words = String(text).split(' ').filter(Boolean);

  return (
    <Tag ref={ref} className={`wr${play ? ' wr-play' : ''} ${className}`} aria-label={String(text)}>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <span key={i} className="wr-mask">
            <span className="wr-word" style={{ animationDelay: `${(i * stagger).toFixed(2)}s` }}>
              {w}
            </span>
            {i < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </span>
    </Tag>
  );
}

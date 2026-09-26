'use client';

import { useState } from "react";
import Image from "next/image";

export default function Gallery({ images, name }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="relative rounded-[28px] overflow-hidden h-[420px] md:h-[520px] shadow-luxe">
        <Image
          key={images[active]}
          src={images[active]}
          alt={`${name} — photo ${active + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 66vw"
          priority
        />
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`View photo ${i + 1}`}
            className={`relative h-24 md:h-28 rounded-[18px] overflow-hidden border-2 transition-all duration-300 ${
              i === active ? "border-gold shadow-card" : "border-transparent opacity-70 hover:opacity-100"
            }`}
          >
            <Image src={src} alt={`${name} thumbnail ${i + 1}`} fill className="object-cover" sizes="200px" />
          </button>
        ))}
      </div>
    </div>
  );
}

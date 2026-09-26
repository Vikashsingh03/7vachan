'use client';

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Users, Ruler } from "lucide-react";
import CountUp from "@/components/CountUp";

export function Eyebrow({ children }) {
  return (
    <div className="flex items-center justify-center gap-4 mb-6">
      <span className="h-px w-12 bg-gold/60" />
      <span className="eyebrow">
        {children}
      </span>
      <span className="h-px w-12 bg-gold/60" />
    </div>
  );
}

export function Btn({ href, variant = "gold", children, onClick, type = "button", className = "" }) {
  const styles = {
    gold: "btn-gold",
    dark: "btn-dark",
    outline: "btn-outline",
    outlineDark: "btn-outline-dark",
  };
  const cls = `uppercase ${styles[variant] || styles.gold} ${className}`;
  const inner = (
    <>
      {children}
      <ArrowRight className="w-4 h-4" />
    </>
  );
  if (href) {
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

export function Stars({ value = 5, className = "" }) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i <= Math.round(value) ? "fill-gold text-gold" : "text-gold/30"}`}
        />
      ))}
    </div>
  );
}

export function RoomCard({ room }) {
  return (
    <Link href={`/hotel/rooms/${room.slug}`} className="card-luxe group block">
      <div className="relative h-72 overflow-hidden">
        <Image
          src={room.image}
          alt={room.name}
          fill
          className="zoom object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <span className="absolute top-4 left-4 bg-cream/90 backdrop-blur text-[11px] uppercase tracking-[0.2em] text-ink px-4 py-2 rounded-full">
          {room.category}
        </span>
      </div>
      <div className="p-7">
        <h3 className="card-title font-display text-2xl text-ink mb-2">
          {room.name}
        </h3>
        <p className="text-ink/60 text-sm leading-relaxed mb-5 line-clamp-2">
          {room.description}
        </p>
        <div className="flex items-center gap-5 text-xs uppercase tracking-widest text-ink/50 mb-5">
          <span className="inline-flex items-center gap-1.5">
            <Users className="w-4 h-4 text-gold" /> Up to {room.guests} guests
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Ruler className="w-4 h-4 text-gold" /> {room.size}
          </span>
        </div>
        <div className="flex items-center justify-between pt-5 border-t border-hairline">
          <p className="text-ink">
            <span className="text-xs uppercase tracking-widest text-ink/50 block">From</span>
            <span className="font-display text-2xl font-semibold"><CountUp value={room.price} /></span>
            <span className="text-ink/50 text-sm"> / night</span>
          </p>
          <span className="gold-link">
            View details <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

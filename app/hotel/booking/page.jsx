'use client';

import { useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Minus,
  Plus,
  CalendarDays,
  Users,
  BedDouble,
  PartyPopper,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import { Btn } from "../_ui";
import { rooms, CONTACT } from "../_data";
import WordReveal from "@/components/WordReveal";

const steps = ["Dates & Room", "Guest Details", "Review & Confirm"];

function nightsBetween(a, d) {
  if (!a || !d) return 0;
  const ms = new Date(d) - new Date(a);
  return ms > 0 ? Math.round(ms / 86400000) : 0;
}

function Field({ label, children, error }) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-[0.3em] text-gold mb-2">{label}</span>
      {children}
      {error && <span className="block text-sm text-red-700 mt-2">{error}</span>}
    </label>
  );
}

const inputCls =
  "w-full bg-cream border border-[#E3DACA] rounded-2xl px-5 py-4 text-ink outline-none focus:border-gold transition-colors";

function BookingFlow() {
  const qp = useSearchParams();
  const [step, setStep] = useState(0);
  const [arrival, setArrival] = useState(qp.get("arrival") || "");
  const [departure, setDeparture] = useState(qp.get("departure") || "");
  const [roomSlug, setRoomSlug] = useState(qp.get("room") || rooms[0].slug);
  const [guests, setGuests] = useState(parseInt(qp.get("guests") || "2", 10));
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [requests, setRequests] = useState("");
  const [errors, setErrors] = useState({});
  const [reference, setReference] = useState("");

  const room = rooms.find((r) => r.slug === roomSlug) || rooms[0];
  const nights = useMemo(() => nightsBetween(arrival, departure), [arrival, departure]);
  const total = nights * room.price;
  const advance = Math.round(total * 0.2);

  function validateStep1() {
    const e = {};
    if (!arrival) e.arrival = "Please choose an arrival date.";
    if (!departure) e.departure = "Please choose a departure date.";
    if (arrival && departure && nights <= 0) e.departure = "Departure must be after arrival.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateStep2() {
    const e = {};
    if (name.trim().length < 2) e.name = "Please enter your full name.";
    if (!/^[6-9]\d{9}$/.test(phone.replace(/\s/g, "")))
      e.phone = "Enter a valid 10-digit mobile number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email address.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (step === 0 && !validateStep1()) return;
    if (step === 1 && !validateStep2()) return;
    setErrors({});
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function confirm() {
    const ref = `7V-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    setReference(ref);
    setStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const fmtDate = (d) =>
    d ? new Date(`${d}T00:00:00`).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—";
  const inr = (n) => `₹${n.toLocaleString("en-IN")}`;

  return (
    <>
      <section className="pt-36 pb-14 bg-ink text-cream">
        <div className="container-luxe text-center">
          <p className="section-eyebrow on-dark mb-4">Reservations</p>
          <WordReveal as="h1" text="Book Your Stay" className="page-title mb-4" />
          <p className="text-cream/70 leading-relaxed max-w-2xl mx-auto">
            Three quick steps — only the advance is charged online, the rest is settled when you arrive.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-luxe max-w-6xl">
          <Reveal>
            <div className="flex items-center justify-center mb-12">
              {steps.map((s, i) => (
                <div key={s} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <span
                      className={`w-11 h-11 rounded-full border-2 flex items-center justify-center font-display text-lg transition-all duration-300 ${
                        i < step
                          ? "bg-gold border-gold text-cream"
                          : i === step
                          ? "border-gold text-gold"
                          : "border-ink/20 text-ink/40"
                      }`}
                    >
                      {i < step ? <Check className="w-5 h-5" /> : i + 1}
                    </span>
                    <span
                      className={`mt-2 text-[10px] md:text-xs uppercase tracking-[0.2em] whitespace-nowrap ${
                        i <= step ? "text-ink" : "text-ink/40"
                      }`}
                    >
                      {s}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <span className={`w-10 md:w-24 h-px mx-2 md:mx-4 mb-6 ${i < step ? "bg-gold" : "bg-ink/15"}`} />
                  )}
                </div>
              ))}
            </div>
          </Reveal>

          {step < 3 ? (
            <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
              <Reveal>
                <div className="bg-white border border-[#E3DACA] rounded-[28px] p-8 md:p-10 shadow-card">
                  {step === 0 && (
                    <div className="space-y-7">
                      <WordReveal as="h2" playOnView text="When are you visiting?" className="text-ink type-h2" />
                      <div className="grid sm:grid-cols-2 gap-6">
                        <Field label="Arrival" error={errors.arrival}>
                          <input type="date" value={arrival} onChange={(e) => setArrival(e.target.value)} className={inputCls} />
                        </Field>
                        <Field label="Departure" error={errors.departure}>
                          <input type="date" value={departure} onChange={(e) => setDeparture(e.target.value)} className={inputCls} />
                        </Field>
                      </div>
                      <Field label="Room type">
                        <div className="grid gap-3">
                          {rooms.map((r) => (
                            <button
                              key={r.slug}
                              type="button"
                              onClick={() => setRoomSlug(r.slug)}
                              className={`flex items-center justify-between gap-4 border rounded-2xl px-5 py-4 text-left transition-all duration-300 ${
                                r.slug === roomSlug
                                  ? "border-gold bg-gold/5 shadow-card"
                                  : "border-[#E3DACA] hover:border-gold/60"
                              }`}
                            >
                              <span className="flex items-center gap-4">
                                <BedDouble className={`w-5 h-5 ${r.slug === roomSlug ? "text-gold" : "text-ink/40"}`} />
                                <span>
                                  <span className="block font-medium text-ink">{r.name}</span>
                                  <span className="block text-sm text-ink/50">Up to {r.guests} guests</span>
                                </span>
                              </span>
                              <span className="font-display text-xl text-ink whitespace-nowrap">
                                ₹{r.price.toLocaleString("en-IN")}
                                <span className="text-sm text-ink/50">/night</span>
                              </span>
                            </button>
                          ))}
                        </div>
                      </Field>
                      <Field label="Guests">
                        <div className="flex items-center gap-5">
                          <button
                            type="button"
                            aria-label="Fewer guests"
                            onClick={() => setGuests((g) => Math.max(1, g - 1))}
                            className="w-10 h-10 rounded-full border border-ink/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-display text-2xl text-ink min-w-[110px] text-center">
                            {guests} Guest{guests > 1 ? "s" : ""}
                          </span>
                          <button
                            type="button"
                            aria-label="More guests"
                            onClick={() => setGuests((g) => Math.min(8, g + 1))}
                            className="w-10 h-10 rounded-full border border-ink/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </Field>
                    </div>
                  )}

                  {step === 1 && (
                    <div className="space-y-7">
                      <WordReveal as="h2" playOnView text="Who is staying?" className="text-ink type-h2" />
                      <Field label="Full name" error={errors.name}>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Aarav Sharma" className={inputCls} />
                      </Field>
                      <div className="grid sm:grid-cols-2 gap-6">
                        <Field label="Mobile number" error={errors.phone}>
                          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value.replace(/[^\d]/g, "").slice(0, 10))} placeholder="10-digit mobile" className={inputCls} />
                        </Field>
                        <Field label="Email" error={errors.email}>
                          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={inputCls} />
                        </Field>
                      </div>
                      <Field label="Special requests (optional)">
                        <textarea value={requests} onChange={(e) => setRequests(e.target.value)} rows={3} placeholder="Early check-in, extra bed, anniversary surprise…" className={`${inputCls} resize-none`} />
                      </Field>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-7">
                      <WordReveal as="h2" playOnView text="Review & confirm" className="text-ink type-h2" />
                      <div className="bg-[#F3EDE1] border border-[#E3DACA] rounded-2xl p-6 space-y-4 text-sm">
                        <div className="flex justify-between gap-4">
                          <span className="text-ink/55 uppercase tracking-[0.2em] text-xs">Guest</span>
                          <span className="text-ink font-medium text-right">{name}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-ink/55 uppercase tracking-[0.2em] text-xs">Contact</span>
                          <span className="text-ink font-medium text-right">{phone} · {email}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-ink/55 uppercase tracking-[0.2em] text-xs">Room</span>
                          <span className="text-ink font-medium text-right">{room.name}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-ink/55 uppercase tracking-[0.2em] text-xs">Dates</span>
                          <span className="text-ink font-medium text-right">
                            {fmtDate(arrival)} → {fmtDate(departure)} · {nights} night{nights !== 1 ? "s" : ""}
                          </span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-ink/55 uppercase tracking-[0.2em] text-xs">Guests</span>
                          <span className="text-ink font-medium text-right">{guests}</span>
                        </div>
                        {requests && (
                          <div className="flex justify-between gap-4">
                            <span className="text-ink/55 uppercase tracking-[0.2em] text-xs">Requests</span>
                            <span className="text-ink font-medium text-right">{requests}</span>
                          </div>
                        )}
                        <div className="border-t border-[#E3DACA] pt-4 space-y-2">
                          <div className="flex justify-between">
                            <span className="text-ink/55">Room total</span>
                            <span className="text-ink font-medium">{inr(total)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-ink/55">Advance due online (20%)</span>
                            <span className="font-display text-2xl text-gold font-semibold">{inr(advance)}</span>
                          </div>
                          <p className="text-xs text-ink/50">Balance of {inr(total - advance)} is settled at the hotel.</p>
                        </div>
                      </div>
                      <p className="text-xs text-ink/50 leading-relaxed">
                        By confirming you agree to our cancellation policy — free cancellation up to
                        48 hours before check-in ({CONTACT.checkIn}).
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-10 pt-8 border-t border-[#E3DACA]">
                    <button
                      type="button"
                      onClick={() => setStep((s) => Math.max(0, s - 1))}
                      disabled={step === 0}
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-ink/60 hover:text-gold transition-colors disabled:opacity-30"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    {step < 2 ? (
                      <Btn variant="dark" onClick={next}>
                        Continue
                      </Btn>
                    ) : (
                      <Btn variant="gold" onClick={confirm}>
                        Confirm booking
                      </Btn>
                    )}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <aside className="lg:sticky lg:top-28 bg-night text-cream rounded-[28px] p-8 shadow-luxe">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-gold mb-6">Your selection</p>
                  <div className="space-y-5 text-sm">
                    <p className="flex items-center gap-3 text-cream/80">
                      <CalendarDays className="w-5 h-5 text-gold shrink-0" />
                      {fmtDate(arrival)} → {fmtDate(departure)}
                    </p>
                    <p className="flex items-center gap-3 text-cream/80">
                      <BedDouble className="w-5 h-5 text-gold shrink-0" />
                      {room.name}
                    </p>
                    <p className="flex items-center gap-3 text-cream/80">
                      <Users className="w-5 h-5 text-gold shrink-0" />
                      {guests} Guest{guests > 1 ? "s" : ""} · {nights} night{nights !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="border-t border-cream/15 mt-6 pt-6">
                    <div className="flex justify-between text-cream/70 text-sm mb-2">
                      <span>{inr(room.price)} × {nights} night{nights !== 1 ? "s" : ""}</span>
                      <span>{inr(total)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs uppercase tracking-[0.25em] text-gold">Total</span>
                      <span className="font-display text-3xl text-gold">{inr(total)}</span>
                    </div>
                  </div>
                </aside>
              </Reveal>
            </div>
          ) : (
            <Reveal>
              <div className="max-w-2xl mx-auto bg-white border border-[#E3DACA] rounded-[32px] p-10 md:p-14 shadow-luxe text-center">
                <span className="w-20 h-20 mx-auto mb-7 rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center text-gold">
                  <PartyPopper className="w-9 h-9" />
                </span>
                <p className="text-[11px] uppercase tracking-[0.3em] text-gold mb-4">Booking confirmed</p>
                <h2 className="font-display text-4xl md:text-5xl text-ink mb-5">
                  We&rsquo;ll see you soon, {name.split(" ")[0]}.
                </h2>
                <p className="text-ink/60 leading-relaxed mb-8">
                  Your {room.name} is reserved from {fmtDate(arrival)} to {fmtDate(departure)}.
                  A confirmation has been noted for {email} and {phone}.
                </p>
                <div className="inline-block bg-[#F3EDE1] border border-dashed border-gold/60 rounded-2xl px-8 py-5 mb-10">
                  <p className="text-xs uppercase tracking-[0.3em] text-ink/50 mb-1">Booking reference</p>
                  <p className="font-display text-3xl text-ink tracking-widest">{reference}</p>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  <Btn href="/" variant="dark">
                    Back to home
                  </Btn>
                  <Btn href="/hotel/rooms" variant="outlineDark">
                    Browse rooms
                  </Btn>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="pt-40 pb-24 text-center text-ink/50">Loading booking…</div>}>
      <BookingFlow />
    </Suspense>
  );
}

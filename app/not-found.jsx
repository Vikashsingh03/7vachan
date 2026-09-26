import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import WordReveal from '@/components/WordReveal';

export default function NotFound() {
  return (
    <main className="bg-cream text-ink min-h-screen flex items-center">
      <div className="container-luxe py-32 text-center w-full">
        <p
          className="uppercase text-gold text-[11px] font-medium"
          style={{ letterSpacing: '0.3em' }}
        >
          <span className="inline-flex items-center gap-4">
            <span className="h-px w-10 bg-gold/50" aria-hidden="true" />
            Page Not Found
            <span className="h-px w-10 bg-gold/50" aria-hidden="true" />
          </span>
        </p>
        <WordReveal as="h1" text="404" className="font-display text-[9rem] sm:text-[12rem] leading-none mt-6 text-ink" />
        <p className="font-display italic text-2xl sm:text-3xl text-ink/70 mt-2">
          This celebration seems to have moved elsewhere
        </p>
        <p className="text-ink/55 max-w-md mx-auto mt-5 leading-relaxed">
          The page you are looking for does not exist or has been moved. Let us
          guide you back somewhere beautiful.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Link href="/" className="btn-gold uppercase">
            Back to home <ArrowRight size={15} />
          </Link>
          <Link href="/hotel" className="btn-outline-dark uppercase">
            Explore rooms
          </Link>
        </div>
      </div>
    </main>
  );
}

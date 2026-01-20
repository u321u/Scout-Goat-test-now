import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'House Cleaning in Mobile, AL',
  description: 'Premium house cleaning and move-out cleaning in Mobile, AL. Clear options, fast scheduling, and consistent quality.'
};

export default function Page() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <section className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <div className="badge"><span className="h-1.5 w-1.5 rounded-full bg-blush" />Reliable scheduling • Clear scope</div>
            <h1 className="mt-4 font-[var(--font-playfair)] text-4xl leading-[1.05] tracking-tight md:text-5xl">
              House Cleaning you can feel the second you walk in.
            </h1>
            <p className="mt-4 max-w-xl text-base text-black/70">
              A premium clean with clear expectations—routine housekeeping, deep cleans, and move-in/move-out. Tell us what matters most and we’ll handle it.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Link href="/quote" className="btn-primary justify-center">Get a Cleaning Quote</Link>
              <Link href="/contact" className="btn-secondary justify-center">Ask a Question</Link>
            </div>
          </div>

          <div className="card p-6">
            
            <div className="text-sm font-semibold">Cleaning options</div>
            <ul className="mt-3 space-y-2 text-sm text-black/70">
              <li>• Routine housekeeping (weekly/bi-weekly/monthly)</li>
              <li>• Deep cleaning (kitchen/bath focus)</li>
              <li>• Move-in / move-out cleaning</li>
              <li>• Add-ons: oven, fridge, interior windows</li>
            </ul>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="card p-4">
                <div className="text-xs text-black/60">Routine clean</div>
                <div className="mt-1 text-lg font-semibold">From $99</div>
                <div className="mt-1 text-xs text-black/60">Studio–2 bed typical starting point</div>
              </div>
              <div className="card p-4">
                <div className="text-xs text-black/60">Deep clean</div>
                <div className="mt-1 text-lg font-semibold">From $199</div>
                <div className="mt-1 text-xs text-black/60">Best for resets and first visits</div>
              </div>
              <div className="card p-4">
                <div className="text-xs text-black/60">Move-out</div>
                <div className="mt-1 text-lg font-semibold">Custom quote</div>
                <div className="mt-1 text-xs text-black/60">Based on size + condition</div>
              </div>
              <div className="card p-4">
                <div className="text-xs text-black/60">Bundle & save</div>
                <div className="mt-1 text-lg font-semibold">Ask us</div>
                <div className="mt-1 text-xs text-black/60">Cleaning + hauling discounts</div>
              </div>
            </div>

            <p className="mt-4 text-xs text-black/50">
              We’ll confirm square footage, level of buildup, and priorities. For the quickest quote, send photos or describe the rooms.
            </p>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

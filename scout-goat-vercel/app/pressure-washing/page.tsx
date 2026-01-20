import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'Pressure Washing in Mobile, AL',
  description: 'Pressure washing and soft-washing in Mobile, AL. Driveways, sidewalks, patios, siding, and more. Photo quotes available.'
};

export default function Page() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <section className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <div className="badge"><span className="h-1.5 w-1.5 rounded-full bg-blush" />Photo quotes • Fast scheduling</div>
            <h1 className="mt-4 font-[var(--font-playfair)] text-4xl leading-[1.05] tracking-tight md:text-5xl">
              Pressure washing that brings curb appeal back.
            </h1>
            <p className="mt-4 max-w-xl text-base text-black/70">
              From driveways to patios to full exterior washes—get a fast photo quote and a clean finish that looks expensive.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Link href="/quote" className="btn-primary justify-center">Get a Wash Quote</Link>
              <Link href="/contact" className="btn-secondary justify-center">Ask a Question</Link>
            </div>
          </div>

          <div className="card p-6">
            
            <div className="text-sm font-semibold">What we wash</div>
            <ul className="mt-3 space-y-2 text-sm text-black/70">
              <li>• Driveways, sidewalks, patios</li>
              <li>• Siding, brick, gutters (exterior)</li>
              <li>• Fences, decks, outdoor furniture</li>
              <li>• Soft-wash options for delicate surfaces</li>
            </ul>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="card p-4">
                <div className="text-xs text-black/60">Driveway / walk</div>
                <div className="mt-1 text-lg font-semibold">From $99</div>
                <div className="mt-1 text-xs text-black/60">Based on size + staining</div>
              </div>
              <div className="card p-4">
                <div className="text-xs text-black/60">House wash</div>
                <div className="mt-1 text-lg font-semibold">Custom quote</div>
                <div className="mt-1 text-xs text-black/60">Surface + stories + access</div>
              </div>
              <div className="card p-4">
                <div className="text-xs text-black/60">Patio / pool deck</div>
                <div className="mt-1 text-lg font-semibold">From $129</div>
                <div className="mt-1 text-xs text-black/60">Great for make-ready</div>
              </div>
              <div className="card p-4">
                <div className="text-xs text-black/60">Bundles</div>
                <div className="mt-1 text-lg font-semibold">Save more</div>
                <div className="mt-1 text-xs text-black/60">Wash + hauling / cleaning</div>
              </div>
            </div>

            <p className="mt-4 text-xs text-black/50">
              Send a quick photo of the area and we’ll quote the same day when possible.
            </p>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

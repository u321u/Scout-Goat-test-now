import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'Pricing',
  description: 'Clear, photo-based pricing for junk removal, house cleaning, and pressure washing in Mobile, AL.'
};

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <section className="card p-8">
          <div className="badge"><span className="h-1.5 w-1.5 rounded-full bg-blush" />Clear, photo-based pricing</div>
          <h1 className="mt-4 font-[var(--font-playfair)] text-4xl leading-[1.05] tracking-tight md:text-5xl">
            Pricing that’s easy to understand.
          </h1>
          <p className="mt-4 max-w-3xl text-base text-black/70">
            We price by volume + labor, then confirm with photos so you know exactly what you’re paying before we arrive.
            No weird surprises—just a clean quote and a fast schedule.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="card p-5">
              <div className="text-sm font-semibold">Junk Removal</div>
              <p className="mt-2 text-sm text-black/70">
                Based on how much space your items take up, how heavy they are, and access (stairs, distance, parking).
              </p>
              <ul className="mt-3 space-y-2 text-sm text-black/70">
                <li>• Small pickup: <span className="font-medium">$99–$149</span></li>
                <li>• ¼ load: <span className="font-medium">$199–$299</span></li>
                <li>• ½ load: <span className="font-medium">$349–$499</span></li>
                <li>• Full load: <span className="font-medium">$599–$899</span></li>
              </ul>
              <p className="mt-3 text-xs text-black/50">Special disposal items may add fees.</p>
            </div>

            <div className="card p-5">
              <div className="text-sm font-semibold">House Cleaning</div>
              <p className="mt-2 text-sm text-black/70">
                Based on square footage, condition, and the level of detail you want (routine vs deep vs move-out).
              </p>
              <ul className="mt-3 space-y-2 text-sm text-black/70">
                <li>• Routine clean: <span className="font-medium">from $99</span></li>
                <li>• Deep clean: <span className="font-medium">from $199</span></li>
                <li>• Move-out: <span className="font-medium">custom quote</span></li>
              </ul>
              <p className="mt-3 text-xs text-black/50">Add-ons available (oven, fridge, windows).</p>
            </div>

            <div className="card p-5">
              <div className="text-sm font-semibold">Pressure Washing</div>
              <p className="mt-2 text-sm text-black/70">
                Based on the surface area, staining, stories/access, and whether we use pressure or soft-wash.
              </p>
              <ul className="mt-3 space-y-2 text-sm text-black/70">
                <li>• Driveway/walk: <span className="font-medium">from $99</span></li>
                <li>• Patio/pool deck: <span className="font-medium">from $129</span></li>
                <li>• House wash: <span className="font-medium">custom quote</span></li>
              </ul>
              <p className="mt-3 text-xs text-black/50">Bundle with hauling/cleaning to save.</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="card p-6">
              <div className="text-sm font-semibold">The fastest way to get an exact price</div>
              <p className="mt-2 text-sm text-black/70">
                Upload photos and we’ll respond with a confident, written quote (often same day).
              </p>
              <Link href="/quote" className="btn-primary mt-4 inline-flex justify-center">Upload Photos for a Quote</Link>
            </div>
            <div className="card p-6">
              <div className="text-sm font-semibold">Need a budget option?</div>
              <p className="mt-2 text-sm text-black/70">
                Use <span className="font-medium">Name Your Price</span> with photos and we’ll tell you what’s possible.
              </p>
              <Link href="/quote" className="btn-secondary mt-4 inline-flex justify-center">Try Name Your Price</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

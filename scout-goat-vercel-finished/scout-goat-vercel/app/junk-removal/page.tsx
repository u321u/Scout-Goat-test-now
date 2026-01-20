import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'Junk Removal in Mobile, AL',
  description: 'Fast junk removal and cleanouts in Mobile, AL. Upload photos for an accurate quote. Same/next-day slots when available.'
};

export default function Page() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <section className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <div className="badge"><span className="h-1.5 w-1.5 rounded-full bg-blush" />Same/next-day slots when available</div>
            <h1 className="mt-4 font-[var(--font-playfair)] text-4xl leading-[1.05] tracking-tight md:text-5xl">
              Junk Removal that feels effortless.
            </h1>
            <p className="mt-4 max-w-xl text-base text-black/70">
              Send photos, get a clear price, and we handle the heavy lifting—loading, hauling, and disposal. Homeowners, renters, landlords, and small businesses.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Link href="/quote" className="btn-primary justify-center">Upload Photos for a Quote</Link>
              <Link href="/contact" className="btn-secondary justify-center">Ask a Question</Link>
            </div>
          </div>

          <div className="card p-6">
            
            <div className="text-sm font-semibold">What we haul</div>
            <ul className="mt-3 space-y-2 text-sm text-black/70">
              <li>• Furniture, mattresses, appliances</li>
              <li>• Garage / attic / storage cleanouts</li>
              <li>• Yard debris, fencing, small demo debris</li>
              <li>• Office junk, light commercial cleanouts</li>
            </ul>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="card p-4">
                <div className="text-xs text-black/60">Small pickup</div>
                <div className="mt-1 text-lg font-semibold">$99–$149</div>
                <div className="mt-1 text-xs text-black/60">A few items / curbside</div>
              </div>
              <div className="card p-4">
                <div className="text-xs text-black/60">Quarter load</div>
                <div className="mt-1 text-lg font-semibold">$199–$299</div>
                <div className="mt-1 text-xs text-black/60">Small room / light cleanout</div>
              </div>
              <div className="card p-4">
                <div className="text-xs text-black/60">Half load</div>
                <div className="mt-1 text-lg font-semibold">$349–$499</div>
                <div className="mt-1 text-xs text-black/60">1–2 rooms</div>
              </div>
              <div className="card p-4">
                <div className="text-xs text-black/60">Full load</div>
                <div className="mt-1 text-lg font-semibold">$599–$899</div>
                <div className="mt-1 text-xs text-black/60">Whole-home / heavy volume</div>
              </div>
            </div>

            <p className="mt-4 text-xs text-black/50">
              Exact pricing depends on volume, weight, stairs, distance, and disposal requirements.
              Upload photos for the fastest accurate quote.
            </p>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

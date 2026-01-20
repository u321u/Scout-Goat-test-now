import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'Service Areas',
  description: 'Scout Goat serves Mobile, AL and surrounding Gulf Coast areas for junk removal, house cleaning, and pressure washing.'
};

const areas = [
  'Mobile', 'Daphne', 'Fairhope', 'Spanish Fort', 'Saraland', 'Prichard', 'Theodore', 'Semmes',
  'Tillmans Corner', 'Eight Mile', 'Creola', 'Satsuma', 'Chickasaw',
  'Foley', 'Gulf Shores', 'Orange Beach'
];

export default function ServiceAreasPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <section className="card p-8">
          <div className="badge"><span className="h-1.5 w-1.5 rounded-full bg-blush" />Mobile, AL + nearby</div>
          <h1 className="mt-4 font-[var(--font-playfair)] text-4xl leading-[1.05] tracking-tight md:text-5xl">
            Service Areas
          </h1>
          <p className="mt-4 max-w-3xl text-base text-black/70">
            We’re based in the Mobile area and regularly serve the surrounding Gulf Coast.
            If you’re outside these areas, send your ZIP—we may still be able to help.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((a) => (
              <div key={a} className="card p-4">
                <div className="font-medium">{a}</div>
                <div className="mt-1 text-xs text-black/60">Junk Removal • Cleaning • Pressure Washing</div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="card p-6">
              <div className="text-sm font-semibold">Not sure if we cover your address?</div>
              <p className="mt-2 text-sm text-black/70">
                Send your ZIP + a photo and we’ll confirm quickly.
              </p>
              <Link href="/quote" className="btn-primary mt-4 inline-flex justify-center">Check Your ZIP</Link>
            </div>
            <div className="card p-6">
              <div className="text-sm font-semibold">Property managers & businesses</div>
              <p className="mt-2 text-sm text-black/70">
                We offer recurring cleanouts, make-ready cleaning, and on-call exterior washing.
              </p>
              <Link href="/contact" className="btn-secondary mt-4 inline-flex justify-center">Contact Us</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

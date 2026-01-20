import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-16">
        <div className="card p-8">
          <h1 className="font-[var(--font-playfair)] text-4xl">Page not found</h1>
          <p className="mt-3 text-sm text-black/70">
            That link doesn’t exist. Use the buttons below to get back on track.
          </p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <Link href="/" className="btn-secondary justify-center">Home</Link>
            <Link href="/quote" className="btn-primary justify-center">Get a Quote</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

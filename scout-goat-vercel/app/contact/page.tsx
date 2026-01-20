import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ContactForm } from '@/components/ContactForm';

const phone = process.env.NEXT_PUBLIC_BUSINESS_PHONE || '(251) 289-0478';
const email = process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'scoutgoat4733@gmail.com';

export const metadata = {
  title: 'Contact',
  description: 'Contact Scout Goat for junk removal, house cleaning, and pressure washing. Fast replies by text.'
};

function telHref(p: string) {
  const digits = (p || '').replace(/\D/g, '');
  return digits ? `tel:${digits}` : '#';
}

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <section className="grid gap-10 md:grid-cols-2 md:items-start">
          <div>
            <div className="badge"><span className="h-1.5 w-1.5 rounded-full bg-blush" />Fast replies by text</div>
            <h1 className="mt-4 font-[var(--font-playfair)] text-4xl leading-[1.05] tracking-tight md:text-5xl">
              Contact Scout Goat
            </h1>
            <p className="mt-4 max-w-xl text-base text-black/70">
              Tell us what you need and we’ll reply with the next steps. For the fastest exact pricing, use the Photo Quote tool.
            </p>

            <div className="mt-6 grid gap-3">
              <div className="card p-5">
                <div className="text-sm font-semibold">Call / Text</div>
                <a className="mt-2 inline-flex text-sm text-black/70 hover:text-black" href={telHref(phone)}>{phone}</a>
              </div>
              <div className="card p-5">
                <div className="text-sm font-semibold">Email</div>
                <a className="mt-2 inline-flex text-sm text-black/70 hover:text-black" href={`mailto:${email}`}>{email}</a>
              </div>
              <div className="card p-5">
                <div className="text-sm font-semibold">Hours</div>
                <div className="mt-2 text-sm text-black/70">Mon–Sat (flexible scheduling)</div>
                <div className="text-xs text-black/50">Same/next-day slots when available</div>
              </div>
            </div>
          </div>

          <div>
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

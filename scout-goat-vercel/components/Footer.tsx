import Link from 'next/link';
import Image from 'next/image';

const phone = process.env.NEXT_PUBLIC_BUSINESS_PHONE || '(251) 289-0478';
const email = process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'scoutgoat4733@gmail.com';
const city = process.env.NEXT_PUBLIC_CITY || 'Mobile, AL';

function telHref(p: string) {
  const digits = (p || '').replace(/\D/g, '');
  return digits ? `tel:${digits}` : '#';
}

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white/45">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center overflow-hidden rounded-xl bg-white shadow-soft ring-1 ring-black/10">
                <Image src="/logo.jpg" alt="Scout Goat logo" width={40} height={40} className="h-10 w-10 object-cover" />
              </div>
              <div className="leading-tight">
                <div className="font-semibold tracking-tight">Scout Goat</div>
                <div className="text-xs text-black/60">Fast • Friendly • Professional</div>
              </div>
            </div>

            <p className="mt-4 max-w-sm text-sm text-black/70">
              Premium junk removal, house cleaning, and pressure washing with simple pricing and fast photo quotes.
            </p>

            <ul className="mt-4 space-y-2 text-sm text-black/70">
              <li>
                <a className="hover:text-black" href={telHref(phone)}>
                  {phone}
                </a>
              </li>
              <li>
                <a className="hover:text-black" href={`mailto:${email}`}>
                  {email}
                </a>
              </li>
              <li>{city}</li>
            </ul>
          </div>

          <div>
            <div className="font-semibold">Services</div>
            <ul className="mt-2 space-y-2 text-sm text-black/70">
              <li><Link className="hover:text-black" href="/junk-removal">Junk Removal</Link></li>
              <li><Link className="hover:text-black" href="/house-cleaning">House Cleaning</Link></li>
              <li><Link className="hover:text-black" href="/pressure-washing">Pressure Washing</Link></li>
              <li><Link className="hover:text-black" href="/service-areas">Service Areas</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold">Get Started</div>
            <ul className="mt-2 space-y-2 text-sm text-black/70">
              <li><Link className="hover:text-black" href="/quote">Photo Quote Estimator</Link></li>
              <li><Link className="hover:text-black" href="/pricing">Pricing</Link></li>
              <li><Link className="hover:text-black" href="/contact">Contact</Link></li>
            </ul>
            <p className="mt-4 text-xs text-black/50">
              © {new Date().getFullYear()} Scout Goat Services. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

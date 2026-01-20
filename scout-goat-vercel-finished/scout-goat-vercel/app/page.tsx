import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const phone = process.env.NEXT_PUBLIC_BUSINESS_PHONE || '(251) 289-0478';
const city = process.env.NEXT_PUBLIC_CITY || 'Mobile, AL';
const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://scoutgoatservices.com';

function telHref(p: string) {
  const digits = (p || '').replace(/\D/g, '');
  return digits ? `tel:${digits}` : '#';
}

const valueBullets = [
  { t: 'Clear, photo-based pricing', d: 'Visuals + simple tiers so customers understand the quote instantly.' },
  { t: 'Fast scheduling', d: 'Same/next-day slots when available—plus clear arrival windows.' },
  { t: 'Premium finish', d: 'Protect floors, respect your space, and leave the area cleaner than we found it.' }
];

const services = [
  {
    title: 'Junk Removal & Hauling',
    desc: 'Cleanouts, furniture/appliance removal, yard debris, storage units, and small moves.',
    bullets: ['Up-front quote by text', 'Truck + trailer capacity', 'Dump fees explained']
  },
  {
    title: 'House Cleaning',
    desc: 'Move-in/move-out, recurring housekeeping, deep clean add-ons, and detail work.',
    bullets: ['Checklist-based', 'Add-ons available', 'Great for rentals']
  },
  {
    title: 'Pressure Washing',
    desc: 'Driveways, sidewalks, patios, fences, and exterior washes with pro equipment.',
    bullets: ['Before/after ready', 'Safe methods', 'Fast turnaround']
  }
];

const tiers = [
  { name: 'Small (1/8 load)', price: '$149+', d: 'A few items • quick pickup' },
  { name: 'Medium (1/4–1/2 load)', price: '$229–$399+', d: 'Most common • couch/bed/mixed piles' },
  { name: 'Large (3/4–Full)', price: '$549–$699+', d: 'Big cleanouts • trailers & multiple rooms' }
];

const addons = [
  { t: 'Heavy items / labor', d: 'Safes, pianos, large appliances, long carries, etc.' },
  { t: 'Stairs / access', d: 'Flights of stairs, elevator waits, or gated access.' },
  { t: 'Special disposal', d: 'Mattresses, tires, paint, electronics—priced clearly.' }
];

const reviews = [
  {
    q: '“Fast, professional, and the quote matched the photos. No surprises.”',
    who: 'Local homeowner'
  },
  {
    q: '“Showed up on time, worked fast, and were respectful of the space.”',
    who: 'Property manager'
  },
  {
    q: '“The Name Your Price option helped us stay on budget.”',
    who: 'Apartment resident'
  }
];

const faqs = [
  {
    q: 'Do I need to be home?',
    a: 'Not always. For curbside pickups, you can leave items outside. For indoor jobs, we can coordinate access and confirm by text.'
  },
  {
    q: 'How do quotes work?',
    a: 'Upload photos and select access details (stairs/heavy items). We send a clean quote by text and confirm before we roll out.'
  },
  {
    q: 'What about dump fees?',
    a: 'If your job includes special disposal or a dump run, we call it out clearly. No hidden “mystery fees.”'
  },
  {
    q: 'Can I get a cheaper option?',
    a: 'Yes—use Name Your Price. If your price doesn’t work for the photos and access, we’ll counter with the closest realistic option.'
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* HERO */}
        <section className="mx-auto max-w-6xl px-4 pb-10 pt-12 md:pb-16 md:pt-16">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <div className="badge">
                <span className="h-1.5 w-1.5 rounded-full bg-blush" />
                Same/next-day slots when available
              </div>
              <h1 className="mt-5 font-[var(--font-playfair)] text-4xl leading-[1.05] tracking-tight md:text-5xl">
                Premium service. Simple pricing. <span className="text-black/70">Fast quotes by text.</span>
              </h1>
              <p className="mt-4 max-w-xl text-base text-black/70">
                Scout Goat helps homeowners, renters, landlords, and small businesses in <b>{city}</b> with junk removal, house cleaning,
                and pressure washing—without the back-and-forth.
              </p>
              <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                <Link href="/quote" className="btn-primary">
                  Get an Instant Estimate
                </Link>
                <a href={telHref(phone)} className="btn-secondary">
                  Call / Text {phone}
                </a>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="badge">Licensed &amp; Insured</span>
                <span className="badge">Photo-based quotes</span>
                <span className="badge">4-payment plan available</span>
              </div>
            </div>

            <div className="card overflow-hidden">
              <div className="border-b border-black/10 bg-white/60 p-5">
                <div className="text-xs font-semibold uppercase tracking-widest text-black/50">What you get</div>
                <div className="mt-2 text-lg font-semibold">A premium experience built to book jobs</div>
              </div>
              <div className="p-5">
                <div className="grid gap-3">
                  {valueBullets.map((b) => (
                    <div key={b.t} className="rounded-xl border border-black/10 bg-white/55 p-4">
                      <div className="text-sm font-semibold">{b.t}</div>
                      <p className="mt-1 text-sm text-black/70">{b.d}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-xl border border-black/10 bg-white/55 p-4">
                  <div className="text-sm font-semibold">Pro tip</div>
                  <p className="mt-1 text-sm text-black/70">
                    Upload photos → get a clean quote → book in minutes. No more guessing what “3/4 of a truck” means.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="mx-auto max-w-6xl px-4 py-12">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="font-[var(--font-playfair)] text-3xl">Services</h2>
              <p className="mt-2 text-sm text-black/70">Three core offers, priced to be clear and easy to say yes to.</p>
            </div>
            <Link href="/quote" className="btn-secondary hidden sm:inline-flex">Get quote</Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {services.map((s) => (
              <div key={s.title} className="card p-6">
                <div className="text-lg font-semibold">{s.title}</div>
                <p className="mt-2 text-sm text-black/70">{s.desc}</p>
                <ul className="mt-4 space-y-2 text-sm text-black/70">
                  {s.bullets.map((it) => (
                    <li key={it} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black/50" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5">
                  <Link href="/quote" className="btn-primary w-full">Get estimate</Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="font-[var(--font-playfair)] text-3xl">Photo-driven pricing (clear, not confusing)</h2>
              <p className="mt-2 text-sm text-black/70">
                We price based on volume, access (stairs/long carry), heavy items, and special disposal. Upload photos and we’ll confirm the final number by text.
              </p>

              <div className="mt-5 grid gap-3">
                {tiers.map((t) => (
                  <div key={t.name} className="rounded-xl border border-black/10 bg-white/55 p-4">
                    <div className="flex items-baseline justify-between gap-3">
                      <div className="text-sm font-semibold">{t.name}</div>
                      <div className="text-sm font-semibold text-black/80">{t.price}</div>
                    </div>
                    <p className="mt-1 text-sm text-black/70">{t.d}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                <Link href="/quote" className="btn-primary">Get my estimate</Link>
                <a href={telHref(phone)} className="btn-secondary">Text photos</a>
              </div>
            </div>

            <div className="card p-6">
              <div className="text-xs font-semibold uppercase tracking-widest text-black/50">Common adjustments</div>
              <div className="mt-3 grid gap-3">
                {addons.map((a) => (
                  <div key={a.t} className="rounded-xl border border-black/10 bg-white/55 p-4">
                    <div className="text-sm font-semibold">{a.t}</div>
                    <p className="mt-1 text-sm text-black/70">{a.d}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-xl border border-black/10 bg-white/55 p-4">
                <div className="text-sm font-semibold">Simple 4-payment plan</div>
                <p className="mt-1 text-sm text-black/70">Need to spread it out? Ask us—fast approval, no awkward conversations.</p>
              </div>
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section id="reviews" className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="font-[var(--font-playfair)] text-3xl">High-trust experience</h2>
          <p className="mt-2 text-sm text-black/70">Replace these with your real Google reviews anytime—layout is ready.</p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {reviews.map((r) => (
              <div key={r.q} className="card p-6">
                <div className="text-sm text-black/80">★★★★★</div>
                <p className="mt-3 text-sm text-black/80">{r.q}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-black/50">{r.who}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="font-[var(--font-playfair)] text-3xl">FAQ</h2>
              <p className="mt-2 text-sm text-black/70">Fast answers that remove friction and help people book.</p>
            </div>
            <div className="space-y-3">
              {faqs.map((f) => (
                <details key={f.q} className="card p-5">
                  <summary className="cursor-pointer text-sm font-semibold">{f.q}</summary>
                  <p className="mt-2 text-sm text-black/70">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="mx-auto max-w-6xl px-4 pb-16 pt-6">
          <div className="card p-6 md:p-8">
            <div className="grid gap-6 md:grid-cols-2 md:items-center">
              <div>
                <h3 className="font-[var(--font-playfair)] text-3xl">Ready for a quote today?</h3>
                <p className="mt-2 text-sm text-black/70">Upload photos and we’ll text a clean quote—no pressure.</p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                <Link href="/quote" className="btn-primary">Get quote</Link>
                <a href={telHref(phone)} className="btn-secondary">Call/Text {phone}</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* LocalBusiness JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Scout Goat Services',
            url: site,
            telephone: phone,
            areaServed: ['Mobile, AL', 'Daphne, AL', 'Fairhope, AL', 'Spanish Fort, AL', 'Pensacola, FL', 'Biloxi, MS'],
            serviceType: ['Junk Removal', 'House Cleaning', 'Pressure Washing']
          })
        }}
      />
    </div>
  );
}

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const phone = process.env.NEXT_PUBLIC_BUSINESS_PHONE || '(251) 289-0478';

function telHref(p: string) {
  const digits = (p || '').replace(/\D/g, '');
  return digits ? `tel:${digits}` : '#';
}

const nav = [
  { label: 'Home', href: '/' },
  { label: 'Junk Removal', href: '/junk-removal' },
  { label: 'House Cleaning', href: '/house-cleaning' },
  { label: 'Pressure Washing', href: '/pressure-washing' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Service Areas', href: '/service-areas' },
  { label: 'Contact', href: '/contact' }
];

export function Header() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    function onClick(e: MouseEvent) {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      if (!panelRef.current) return;
      if (!panelRef.current.contains(t)) setOpen(false);
    }
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/55 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center overflow-hidden rounded-xl bg-white shadow-soft ring-1 ring-black/10">
            <Image src="/logo.jpg" alt="Scout Goat logo" width={40} height={40} className="h-10 w-10 object-cover" priority />
          </div>
          <div className="leading-tight">
            <div className="font-semibold tracking-tight">Scout Goat</div>
            <div className="text-xs text-black/60">Junk Removal • Cleaning • Pressure Washing</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-black/70 md:flex">
          <Link href="/junk-removal" className="hover:text-black">Junk Removal</Link>
          <Link href="/house-cleaning" className="hover:text-black">House Cleaning</Link>
          <Link href="/pressure-washing" className="hover:text-black">Pressure Washing</Link>
          <Link href="/pricing" className="hover:text-black">Pricing</Link>
          <Link href="/service-areas" className="hover:text-black">Service Areas</Link>
          <Link href="/contact" className="hover:text-black">Contact</Link>
        </nav>

        <div className="flex items-center gap-2" ref={panelRef}>
          <button
            type="button"
            className="btn-secondary inline-flex md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            Menu
          </button>

          <a href={telHref(phone)} className="btn-secondary hidden sm:inline-flex">
            Call {phone}
          </a>
          <Link href="/quote" className="btn-primary">
            Get a Quote
          </Link>
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t border-black/10 bg-white/80 backdrop-blur md:hidden">
          <div className="mx-auto max-w-6xl px-4 py-3">
            <div className="grid gap-2">
              {nav.map((i) => (
                <Link
                  key={i.href}
                  href={i.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-black/10 bg-white/70 px-4 py-3 text-sm text-black/80 hover:bg-white"
                >
                  {i.label}
                </Link>
              ))}
              <Link
                href="/quote"
                onClick={() => setOpen(false)}
                className="btn-primary justify-center"
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

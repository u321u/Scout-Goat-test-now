'use client';

import { useMemo, useState } from 'react';

function onlyDigits(s: string) {
  return (s || '').replace(/\D/g, '').slice(0, 10);
}

export function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [company, setCompany] = useState(''); // honeypot
  const [status, setStatus] = useState<{ t: 'idle' | 'sending' | 'ok' | 'err'; m?: string }>({ t: 'idle' });

  const phoneDigits = useMemo(() => onlyDigits(phone), [phone]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus({ t: 'sending' });

    if (!name.trim()) return setStatus({ t: 'err', m: 'Please add your name.' });
    if (phoneDigits.length !== 10) return setStatus({ t: 'err', m: 'Please enter a valid 10-digit phone number.' });
    if (!message.trim()) return setStatus({ t: 'err', m: 'Please tell us what you need help with.' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone: phoneDigits, email, message, company })
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || 'Send failed');

      setStatus({ t: 'ok', m: 'Sent! We’ll text you shortly.' });
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
      setCompany('');
    } catch (err: any) {
      setStatus({ t: 'err', m: err?.message || 'Something went wrong. Please try again.' });
    }
  }

  return (
    <form onSubmit={onSubmit} className="card p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-medium">Name</span>
          <input
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            autoComplete="name"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium">Phone (required)</span>
          <input
            className="input"
            value={phone}
            onChange={(e) => setPhone(onlyDigits(e.target.value))}
            placeholder="2512890478"
            inputMode="tel"
            autoComplete="tel"
          />
        </label>

        <label className="grid gap-2 md:col-span-2">
          <span className="text-sm font-medium">Email (optional)</span>
          <input
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            inputMode="email"
            autoComplete="email"
          />
        </label>

        <label className="grid gap-2 md:col-span-2">
          <span className="text-sm font-medium">What can we help with?</span>
          <textarea
            className="input min-h-[120px] resize-y"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Example: Cleanout of a garage, 1 couch removal, move-out deep clean, driveway wash…"
          />
        </label>

        {/* Honeypot */}
        <label className="hidden">
          Company
          <input value={company} onChange={(e) => setCompany(e.target.value)} />
        </label>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="btn-primary justify-center" disabled={status.t === 'sending'}>
          {status.t === 'sending' ? 'Sending…' : 'Send Message'}
        </button>
        {status.t !== 'idle' && (
          <div className={status.t === 'ok' ? 'text-sm text-black/80' : 'text-sm text-red-700'}>
            {status.m}
          </div>
        )}
      </div>

      <p className="mt-4 text-xs text-black/50">
        Prefer faster? Use the <a className="underline hover:text-black" href="/quote">Photo Quote Estimator</a>.
      </p>
    </form>
  );
}

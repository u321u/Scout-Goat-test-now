'use client';

import { useMemo, useState } from 'react';
import { calcPhotoQuote, formatPhoneForDisplay, money, normalizePhone, normalizeZip } from '@/lib/quote';

type Mode = 'estimate' | 'nameYourPrice';

const MAX_PHOTOS = 6; // keep uploads small for Vercel + Discord
const MAX_EACH_MB = 2;
const MAX_TOTAL_MB = 8;

async function compressImage(file: File, maxDim = 1600, quality = 0.82): Promise<File> {
  if (!file.type.startsWith('image/')) return file;
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    // Some phones produce formats browsers can’t decode (e.g., HEIC). Send original.
    return file;
  }
  const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height));
  const w = Math.max(1, Math.round(bitmap.width * scale));
  const h = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) return file;
  ctx.drawImage(bitmap, 0, 0, w, h);
  const blob: Blob | null = await new Promise((res) => canvas.toBlob((b) => res(b), 'image/jpeg', quality));
  if (!blob) return file;
  return new File([blob], file.name.replace(/\.[^.]+$/, '') + '.jpg', { type: 'image/jpeg' });
}

function mb(bytes: number) {
  return bytes / 1024 / 1024;
}

export function QuoteTool() {
  const [mode, setMode] = useState<Mode>('estimate');
  const [service, setService] = useState<'junk' | 'cleaning' | 'pressure'>('junk');
  const [junkType, setJunkType] = useState('mixed');
  const [volume, setVolume] = useState<'1/8' | '1/4' | '1/2' | '3/4' | 'full'>('1/4');
  const [stairs, setStairs] = useState<'none' | '1' | '2+'>('none');
  const [heavy, setHeavy] = useState<'none' | 'some' | 'lots'>('none');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [zip, setZip] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [priceOffer, setPriceOffer] = useState('');

  const [photos, setPhotos] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [status, setStatus] = useState<{ type: 'idle' | 'sending' | 'ok' | 'err'; message?: string }>({ type: 'idle' });

  const estimate = useMemo(() => {
    return calcPhotoQuote({
      service,
      junkType,
      volume,
      stairs,
      heavy,
      photosCount: photos.length,
      notes
    });
  }, [service, junkType, volume, stairs, heavy, photos.length, notes]);

  const phoneDigits = useMemo(() => normalizePhone(phone), [phone]);
  const zip5 = useMemo(() => normalizeZip(zip), [zip]);

  const totalMb = useMemo(() => photos.reduce((acc, f) => acc + mb(f.size), 0), [photos]);

  async function onPickFiles(files: FileList | null) {
    if (!files) return;
    setStatus({ type: 'idle' });

    const picked = Array.from(files).slice(0, MAX_PHOTOS);
    const out: File[] = [];
    const pv: string[] = [];

    for (const f of picked) {
      const compact = await compressImage(f);
      if (mb(compact.size) > MAX_EACH_MB) {
        setStatus({ type: 'err', message: `One photo is still too large (> ${MAX_EACH_MB}MB). Try a smaller image.` });
        continue;
      }
      out.push(compact);
      pv.push(URL.createObjectURL(compact));
    }

    const combined = [...photos, ...out].slice(0, MAX_PHOTOS);
    const combinedPv = [...previews, ...pv].slice(0, MAX_PHOTOS);

    const combinedMb = combined.reduce((acc, f) => acc + mb(f.size), 0);
    if (combinedMb > MAX_TOTAL_MB) {
      setStatus({ type: 'err', message: `Total photos are too large (> ${MAX_TOTAL_MB}MB). Remove a photo or use smaller ones.` });
      return;
    }

    setPhotos(combined);
    setPreviews(combinedPv);
  }

  function removePhoto(i: number) {
    const nextFiles = photos.filter((_, idx) => idx !== i);
    const nextPrev = previews.filter((_, idx) => idx !== i);
    setPhotos(nextFiles);
    setPreviews(nextPrev);
  }

  function validate() {
    if (!name.trim()) return 'Please enter your name.';
    if (!phoneDigits) return 'Please enter a valid phone number.';
    if (!zip5) return 'Please enter a valid 5-digit ZIP.';
    if (photos.length < 1) return 'Please add at least 1 photo.';
    if (mode === 'nameYourPrice' && (!priceOffer.trim() || isNaN(Number(priceOffer)))) {
      return 'Please enter the price you want to pay.';
    }
    return null;
  }

  async function submit() {
    const err = validate();
    if (err) {
      setStatus({ type: 'err', message: err });
      return;
    }

    setStatus({ type: 'sending', message: 'Sending…' });

    const fd = new FormData();
    fd.append('mode', mode);
    fd.append('service', service);
    fd.append('junkType', junkType);
    fd.append('volume', volume);
    fd.append('stairs', stairs);
    fd.append('heavy', heavy);
    fd.append('name', name);
    fd.append('phone', phoneDigits!);
    fd.append('email', email);
    fd.append('zip', zip5!);
    fd.append('address', address);
    fd.append('notes', notes);
    fd.append('offer', mode === 'nameYourPrice' ? String(Number(priceOffer)) : '');
    fd.append('estimateLow', String(estimate.low));
    fd.append('estimateHigh', String(estimate.high));
    fd.append('estimateClose', String(estimate.close));
    fd.append('confidence', estimate.confidence);

    photos.forEach((f, idx) => fd.append('photos', f, `photo_${idx + 1}_${f.name}`));

    try {
      const res = await fetch('/api/lead', { method: 'POST', body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || 'Send failed');

      setStatus({ type: 'ok', message: 'Sent! We’ll text you shortly.' });
      // keep the form values for convenience; clear photos
      setPhotos([]);
      setPreviews([]);
      setPriceOffer('');
    } catch (e: any) {
      setStatus({ type: 'err', message: e?.message || 'Something went wrong.' });
    }
  }

  const headline = mode === 'estimate' ? 'Instant Estimate + Fast Text Quote' : 'Name Your Price (Photos Required)';

  return (
    <div className="card p-5 md:p-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-black/50">Quote Tool</div>
          <h2 className="mt-1 font-[var(--font-playfair)] text-2xl md:text-3xl">{headline}</h2>
          <p className="mt-2 max-w-2xl text-sm text-black/70">
            Upload photos and we’ll send a clean, confident quote by text. This is the same workflow we use internally—now automated.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setMode('estimate')}
            className={mode === 'estimate' ? 'btn-primary' : 'btn-secondary'}
          >
            Instant Estimate
          </button>
          <button
            type="button"
            onClick={() => setMode('nameYourPrice')}
            className={mode === 'nameYourPrice' ? 'btn-primary' : 'btn-secondary'}
          >
            Name Your Price
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="text-sm font-semibold">Service</label>
              <select className="input mt-1" value={service} onChange={(e) => setService(e.target.value as any)}>
                <option value="junk">Junk Removal / Hauling</option>
                <option value="cleaning">House Cleaning</option>
                <option value="pressure">Pressure Washing</option>
              </select>
            </div>

            {service === 'junk' && (
              <div>
                <label className="text-sm font-semibold">Junk type</label>
                <select className="input mt-1" value={junkType} onChange={(e) => setJunkType(e.target.value)}>
                  <option value="mixed">Mixed household junk</option>
                  <option value="furniture">Furniture</option>
                  <option value="appliance">Appliances</option>
                  <option value="yard">Yard debris</option>
                  <option value="construction">Construction / demo debris</option>
                </select>
              </div>
            )}

            {service === 'junk' && (
              <div>
                <label className="text-sm font-semibold">Volume</label>
                <select className="input mt-1" value={volume} onChange={(e) => setVolume(e.target.value as any)}>
                  <option value="1/8">1/8 load (a few items)</option>
                  <option value="1/4">1/4 load (small pickup)</option>
                  <option value="1/2">1/2 load</option>
                  <option value="3/4">3/4 load</option>
                  <option value="full">Full load</option>
                </select>
              </div>
            )}

            <div>
              <label className="text-sm font-semibold">Stairs / Access</label>
              <select className="input mt-1" value={stairs} onChange={(e) => setStairs(e.target.value as any)}>
                <option value="none">No stairs / easy access</option>
                <option value="1">1 flight of stairs</option>
                <option value="2+">2+ flights / long carry</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold">Heavy items</label>
              <select className="input mt-1" value={heavy} onChange={(e) => setHeavy(e.target.value as any)}>
                <option value="none">None</option>
                <option value="some">1–2 heavy items</option>
                <option value="lots">Multiple heavy items</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-semibold">Photos (required)</label>
            <div className="mt-2 rounded-xl border border-dashed border-black/20 bg-white/40 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm text-black/70">
                  Add up to <b>{MAX_PHOTOS}</b> photos. Total: <b>{totalMb.toFixed(1)}MB</b>
                </div>
                <label className="btn-secondary cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => onPickFiles(e.target.files)}
                  />
                  Upload
                </label>
              </div>

              {previews.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {previews.map((src, i) => (
                    <div key={src} className="relative">
                      <img src={src} alt={`Photo ${i + 1}`} className="h-20 w-full rounded-lg object-cover" />
                      <button
                        type="button"
                        onClick={() => removePhoto(i)}
                        className="absolute right-1 top-1 grid h-7 w-7 place-items-center rounded-full bg-white/80 text-xs font-bold text-black shadow"
                        aria-label="Remove photo"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <p className="mt-3 text-xs text-black/50">
                Tip: take one wide photo of the whole pile + 1–2 closeups of heavy items.
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div>
              <label className="text-sm font-semibold">Name</label>
              <input className="input mt-1" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
            </div>
            <div>
              <label className="text-sm font-semibold">Phone (required)</label>
              <input className="input mt-1" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(251) 289-0478" />
              {phoneDigits && (
                <div className="mt-1 text-xs text-black/50">We’ll text: {formatPhoneForDisplay(phoneDigits)}</div>
              )}
            </div>
            <div>
              <label className="text-sm font-semibold">Email (optional)</label>
              <input className="input mt-1" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
            </div>
            <div>
              <label className="text-sm font-semibold">ZIP (required)</label>
              <input className="input mt-1" value={zip} onChange={(e) => setZip(e.target.value)} placeholder="36606" />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-semibold">Address / Area (optional)</label>
              <input className="input mt-1" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street, neighborhood, or landmark" />
            </div>

            {mode === 'nameYourPrice' && (
              <div className="md:col-span-2">
                <label className="text-sm font-semibold">Your price (USD)</label>
                <input
                  className="input mt-1"
                  value={priceOffer}
                  onChange={(e) => setPriceOffer(e.target.value)}
                  placeholder="e.g. 250"
                  inputMode="numeric"
                />
                <p className="mt-1 text-xs text-black/50">
                  We’ll confirm if it works for the photos & access—or counter with the closest realistic option.
                </p>
              </div>
            )}

            <div className="md:col-span-2">
              <label className="text-sm font-semibold">Notes</label>
              <textarea
                className="input mt-1 min-h-[110px]"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="What needs to go? Any heavy items, stairs, gate codes, time window, etc."
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              className="btn-primary"
              onClick={submit}
              disabled={status.type === 'sending'}
            >
              {status.type === 'sending' ? 'Sending…' : 'Send & Get Text Quote'}
            </button>

            {status.type !== 'idle' && (
              <div
                className={
                  status.type === 'ok'
                    ? 'text-sm font-semibold text-green-700'
                    : status.type === 'err'
                      ? 'text-sm font-semibold text-red-700'
                      : 'text-sm text-black/70'
                }
              >
                {status.message}
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="card p-5">
            <div className="text-xs font-semibold uppercase tracking-widest text-black/50">Your estimate</div>
            <div className="mt-2 font-[var(--font-playfair)] text-3xl">
              {money(estimate.low)} – {money(estimate.high)}
            </div>
            <div className="mt-1 text-sm text-black/70">
              Close price: <b>{money(estimate.close)}</b> · Confidence: <b className="capitalize">{estimate.confidence}</b>
            </div>

            <div className="mt-4 space-y-2 text-sm text-black/70">
              <div className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-black/50" />
                <p>We review the photos and confirm the final number by text before we roll out.</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-black/50" />
                <p>Dump fees / special items may adjust the final quote (we’ll call it out clearly).</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-black/50" />
                <p>Want it cheaper? Use <b>Name Your Price</b> and we’ll try to make it work.</p>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-black/10 bg-white/50 p-4">
              <div className="text-sm font-semibold">Same/next-day slots</div>
              <p className="mt-1 text-sm text-black/70">If you need it done today, add that in notes—we’ll prioritize your request.</p>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-black/10 bg-white/55 p-4">
            <div className="text-sm font-semibold">4-payment plan</div>
            <p className="mt-1 text-sm text-black/70">
              Ask about splitting your total into 4 simple payments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

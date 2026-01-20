import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function safe(v: unknown) {
  return String(v ?? '').trim();
}

function clampPhotos(files: File[], max = 6) {
  return files.slice(0, max);
}

function money(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

function telFmt(digits10: string) {
  const a = digits10.slice(0, 3);
  const b = digits10.slice(3, 6);
  const c = digits10.slice(6);
  return `(${a}) ${b}-${c}`;
}

export async function POST(req: Request) {
  const webhook = process.env.DISCORD_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ error: 'Server missing DISCORD_WEBHOOK_URL' }, { status: 500 });
  }

  const form = await req.formData();

  // Honeypot
  const company = safe(form.get('company'));
  if (company) {
    return NextResponse.json({ ok: true });
  }

  const mode = safe(form.get('mode'));
  const service = safe(form.get('service'));
  const junkType = safe(form.get('junkType'));
  const volume = safe(form.get('volume'));
  const stairs = safe(form.get('stairs'));
  const heavy = safe(form.get('heavy'));

  const name = safe(form.get('name'));
  const phoneDigits = safe(form.get('phone'));
  const email = safe(form.get('email'));
  const zip = safe(form.get('zip'));
  const address = safe(form.get('address'));
  const notes = safe(form.get('notes'));

  const offer = safe(form.get('offer'));
  const estimateLow = Number(safe(form.get('estimateLow')) || '0');
  const estimateHigh = Number(safe(form.get('estimateHigh')) || '0');
  const estimateClose = Number(safe(form.get('estimateClose')) || '0');
  const confidence = safe(form.get('confidence'));

  const photosRaw = form.getAll('photos').filter((x): x is File => x instanceof File);
  const photos = clampPhotos(photosRaw, 6);

  if (!name) return NextResponse.json({ error: 'Missing name' }, { status: 400 });
  if (!/^\d{10}$/.test(phoneDigits)) return NextResponse.json({ error: 'Invalid phone' }, { status: 400 });
  if (!/^\d{5}$/.test(zip)) return NextResponse.json({ error: 'Invalid ZIP' }, { status: 400 });
  if (photos.length < 1) return NextResponse.json({ error: 'Photos required' }, { status: 400 });

  // Simple size guard (best-effort)
  const totalBytes = photos.reduce((a, f) => a + (f.size || 0), 0);
  if (totalBytes > 8 * 1024 * 1024) {
    return NextResponse.json({ error: 'Photos too large (max ~8MB total).' }, { status: 400 });
  }

  const headline = mode === 'nameYourPrice' ? 'Name Your Price lead' : 'Instant Estimate lead';

  const quoteLine = mode === 'nameYourPrice'
    ? `Offer: **${money(Number(offer || 0) || 0)}**`
    : `Estimate: **${money(estimateLow)}–${money(estimateHigh)}** (close **${money(estimateClose)}**, ${confidence || '—'} confidence)`;

  const embed = {
    title: headline,
    description: `${quoteLine}\n\n**Service:** ${service}${service === 'junk' ? ` (${junkType || '—'})` : ''}`,
    color: 0xE7A9C5,
    fields: [
      { name: 'Name', value: name, inline: true },
      { name: 'Phone', value: telFmt(phoneDigits), inline: true },
      { name: 'ZIP', value: zip, inline: true },
      { name: 'Access', value: `Stairs: ${stairs || '—'}\nHeavy: ${heavy || '—'}\nVolume: ${volume || '—'}`, inline: false },
      { name: 'Address / Area', value: address || '—', inline: false },
      { name: 'Notes', value: notes || '—', inline: false },
      { name: 'Email', value: email || '—', inline: false }
    ],
    timestamp: new Date().toISOString()
  };

  const content = `📩 **New Scout Goat Lead** — ${name} — ${telFmt(phoneDigits)} — ZIP ${zip}`;

  // Send to Discord with photos
  const fd = new FormData();
  fd.append('payload_json', JSON.stringify({ content, embeds: [embed] }));
  photos.forEach((file, idx) => {
    fd.append(`files[${idx}]`, file, file.name || `photo_${idx + 1}.jpg`);
  });

  const discordRes = await fetch(webhook, { method: 'POST', body: fd });
  if (!discordRes.ok) {
    const text = await discordRes.text().catch(() => '');
    return NextResponse.json({ error: `Discord send failed: ${discordRes.status} ${text.slice(0, 160)}` }, { status: 502 });
  }

  // Optional backup: Formspree
  const formspree = process.env.FORMSPREE_ENDPOINT;
  if (formspree) {
    const backup = new FormData();
    backup.append('name', name);
    backup.append('phone', phoneDigits);
    backup.append('email', email);
    backup.append('zip', zip);
    backup.append('address', address);
    backup.append('notes', notes);
    backup.append('mode', mode);
    backup.append('service', service);
    backup.append('quote', quoteLine);
    try {
      await fetch(formspree, { method: 'POST', body: backup });
    } catch {
      // ignore backup failure
    }
  }

  return NextResponse.json({ ok: true });
}

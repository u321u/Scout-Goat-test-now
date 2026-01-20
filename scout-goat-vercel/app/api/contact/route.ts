import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function safe(v: unknown) {
  return String(v ?? '').trim();
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

  const body = await req.json().catch(() => ({} as any));

  // Honeypot
  const company = safe(body.company);
  if (company) return NextResponse.json({ ok: true });

  const name = safe(body.name);
  const phoneDigits = safe(body.phone);
  const email = safe(body.email);
  const message = safe(body.message);

  if (!name) return NextResponse.json({ error: 'Missing name' }, { status: 400 });
  if (!/^\d{10}$/.test(phoneDigits)) return NextResponse.json({ error: 'Invalid phone' }, { status: 400 });
  if (!message) return NextResponse.json({ error: 'Missing message' }, { status: 400 });

  const embed = {
    title: '📨 New Contact Message',
    description: message,
    color: 0xE7A9C5,
    fields: [
      { name: 'Name', value: name, inline: true },
      { name: 'Phone', value: telFmt(phoneDigits), inline: true },
      { name: 'Email', value: email || '—', inline: false }
    ],
    timestamp: new Date().toISOString()
  };

  const content = `📩 **Scout Goat Contact** — ${name} — ${telFmt(phoneDigits)}`;

  const res = await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, embeds: [embed] })
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    return NextResponse.json({ error: `Discord send failed: ${res.status} ${text.slice(0, 160)}` }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

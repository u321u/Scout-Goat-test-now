export type EstimateInput = {
  service: 'junk' | 'cleaning' | 'pressure';
  junkType?: string;
  volume?: '1/8' | '1/4' | '1/2' | '3/4' | 'full';
  stairs?: 'none' | '1' | '2+';
  heavy?: 'none' | 'some' | 'lots';
  photosCount: number;
  notes?: string;
};

export function normalizePhone(raw: string | null | undefined): string | null {
  const digits = (raw ?? '').replace(/\D/g, '');
  if (digits.length === 10) return digits;
  if (digits.length === 11 && digits.startsWith('1')) return digits.slice(1);
  return null;
}

export function normalizeZip(raw: string | null | undefined): string | null {
  const digits = (raw ?? '').replace(/\D/g, '');
  if (digits.length >= 5) return digits.slice(0, 5);
  return null;
}

export function money(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

const VOLUME_BASE: Record<NonNullable<EstimateInput['volume']>, number> = {
  '1/8': 149,
  '1/4': 229,
  '1/2': 399,
  '3/4': 549,
  'full': 699
};

export function calcPhotoQuote(input: EstimateInput) {
  // This is still a heuristic. Real photo analysis needs a backend vision model.
  let base = 0;

  if (input.service === 'junk') {
    base = VOLUME_BASE[input.volume ?? '1/4'];
    if (input.junkType && /construction|demo|concrete|dirt/i.test(input.junkType)) base += 120;
    if (input.junkType && /appliance|fridge|washer|dryer/i.test(input.junkType)) base += 60;
  } else if (input.service === 'cleaning') {
    base = 179;
  } else {
    base = 199;
  }

  const stairs = input.stairs ?? 'none';
  if (stairs === '1') base += 60;
  if (stairs === '2+') base += 120;

  const heavy = input.heavy ?? 'none';
  if (heavy === 'some') base += 80;
  if (heavy === 'lots') base += 160;

  // More photos usually means bigger / more detail — increase confidence and range.
  const photos = Math.max(0, input.photosCount);
  const confidence = photos >= 4 ? 'high' : photos >= 2 ? 'medium' : 'low';

  const variability = confidence === 'high' ? 0.12 : confidence === 'medium' ? 0.18 : 0.25;
  const low = Math.round(base * (1 - variability));
  const high = Math.round(base * (1 + variability));
  const close = Math.round(base * (confidence === 'high' ? 1.02 : 1.0));

  return { low, high, close, confidence };
}

export function formatPhoneForDisplay(digits10: string) {
  const a = digits10.slice(0, 3);
  const b = digits10.slice(3, 6);
  const c = digits10.slice(6);
  return `(${a}) ${b}-${c}`;
}

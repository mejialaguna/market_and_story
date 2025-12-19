import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]):string {
  return twMerge(clsx(inputs));
}

async function imageExists(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, {
      method: 'HEAD',
      cache: 'no-store',
    });

    return res.ok;
  } catch {
    return false;
  }
}

export async function resolveOpenGraphImage(
  images: string[] = []
): Promise<string[]> {
  const FALLBACK_IMAGE =
    'https://res.cloudinary.com/jlml/image/upload/v1765993699/market_and_story/logo.png';

  for (const url of images.slice(0, 2)) {
    if (await imageExists(url)) {
      return [url, FALLBACK_IMAGE];
    }
  }

  return [FALLBACK_IMAGE];
}

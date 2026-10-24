import { SHOPS } from '../constants/shops';
import type { Shop } from '../types/shop';

function toDomain(url: string): string | null {
  try {
    return new URL(url).hostname.split('.').slice(-2).join('.');
  } catch {
    return null;
  }
}

export function findShopByUrl(url: string): Shop | undefined {
  const domain = toDomain(url);
  if (domain === null) return undefined;
  return SHOPS.find((shop) => toDomain(shop.url) === domain);
}

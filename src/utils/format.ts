import { UNKNOWN_BRAND_LABEL } from '../constants/catalog';

const euroFormatter = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });

export function formatPrice(price: number): string {
  return euroFormatter.format(price);
}

export function formatBrand(brand: string | null): string {
  return brand ?? UNKNOWN_BRAND_LABEL;
}

export function formatFoundPiecesCount(count: number): string {
  return count > 1 ? `${count} pièces trouvées` : `${count} pièce trouvée`;
}

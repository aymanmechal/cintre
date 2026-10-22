import { UNKNOWN_BRAND_LABEL } from '../pieces/constants/brand';

const euroFormatter = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });
const ratingFormatter = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 });

export function formatPrice(price: number): string {
  return euroFormatter.format(price);
}

export function formatBrand(brand: string | null): string {
  return brand ?? UNKNOWN_BRAND_LABEL;
}

export function formatFoundPiecesCount(count: number): string {
  return count > 1 ? `${count} pièces trouvées` : `${count} pièce trouvée`;
}

export function formatPieceCount(count: number): string {
  return count > 1 ? `${count} pièces` : `${count} pièce`;
}

export function formatRating(rating: number): string {
  return `${ratingFormatter.format(rating)} / 5`;
}

export function formatStock(stock: number): string {
  return stock > 0 ? `${stock} en stock` : 'Rupture de stock';
}

export function formatPageTitle(pageName: string): string {
  return `${pageName} — Cintré`;
}

export function formatApiProductId(apiProductId: number | null): string {
  return apiProductId === null
    ? 'Pièce perso : enregistrée uniquement sur cet appareil'
    : `Réponse de l’API : produit n°${apiProductId}`;
}

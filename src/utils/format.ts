const priceFormatter = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });

/** 29.99 → "29,99 €" (virgule et espace à la française). */
export function formatPrice(price: number): string {
  return priceFormatter.format(price);
}

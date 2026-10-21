import type { Gender } from '../types/piece';

export interface Category {
  slug: string;
  label: string;
  gender: Gender;
}

/** Les catégories DummyJSON retenues pour Cintré (49 pièces au total). */
export const CATEGORIES: readonly Category[] = [
  { slug: 'mens-shirts', label: 'Chemises', gender: 'homme' },
  { slug: 'mens-shoes', label: 'Chaussures', gender: 'homme' },
  { slug: 'mens-watches', label: 'Montres', gender: 'homme' },
  { slug: 'tops', label: 'Hauts', gender: 'mixte' },
  { slug: 'womens-dresses', label: 'Robes', gender: 'femme' },
  { slug: 'womens-shoes', label: 'Chaussures', gender: 'femme' },
  { slug: 'womens-bags', label: 'Sacs', gender: 'femme' },
  { slug: 'womens-watches', label: 'Montres', gender: 'femme' },
  { slug: 'womens-jewellery', label: 'Bijoux', gender: 'femme' },
  { slug: 'sunglasses', label: 'Lunettes de soleil', gender: 'mixte' },
];

export function findCategory(slug: string): Category | undefined {
  return CATEGORIES.find((category) => category.slug === slug);
}

export function isClothingCategory(slug: string): boolean {
  return findCategory(slug) !== undefined;
}

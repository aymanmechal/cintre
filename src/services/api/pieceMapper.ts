import type { Piece, PieceDetail } from '../../types/piece';
import type { ApiProduct } from './dummyjsonTypes';

/** Traduit un produit DummyJSON en Piece : si l'API change, seul ce fichier bouge. */
export function toPiece(product: ApiProduct): Piece {
  return {
    id: product.id,
    title: product.title,
    brand: product.brand ?? null,
    category: product.category,
    price: product.price,
    rating: product.rating,
    stock: product.stock,
    thumbnail: product.thumbnail,
  };
}

export function toPieceDetail(product: ApiProduct): PieceDetail {
  return {
    ...toPiece(product),
    description: product.description ?? '',
    images: product.images ?? [product.thumbnail],
    warrantyInformation: product.warrantyInformation ?? '',
    shippingInformation: product.shippingInformation ?? '',
    returnPolicy: product.returnPolicy ?? '',
  };
}

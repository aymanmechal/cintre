import type { Piece, PieceDetail } from '../../types/piece';
import type { ApiProduct } from './dummyJsonTypes';

export function mapApiProductToPiece(product: ApiProduct): Piece {
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

export function mapApiProductToPieceDetail(product: ApiProduct): PieceDetail {
  return {
    ...mapApiProductToPiece(product),
    description: product.description ?? '',
    images: product.images ?? [product.thumbnail],
    warrantyInformation: product.warrantyInformation ?? '',
    shippingInformation: product.shippingInformation ?? '',
    returnPolicy: product.returnPolicy ?? '',
  };
}

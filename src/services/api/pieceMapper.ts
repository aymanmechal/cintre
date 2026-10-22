import type { PieceType } from '../../constants/categories';
import type { Piece, PieceDetail } from '../../types/piece';
import type { ApiProduct } from './dummyJsonTypes';

export function mapApiProductToPiece(product: ApiProduct, pieceType: PieceType): Piece {
  return {
    id: product.id,
    title: product.title,
    brand: product.brand ?? null,
    pieceType,
    price: product.price,
    rating: product.rating,
    stock: product.stock,
    thumbnail: product.thumbnail,
  };
}

export function mapApiProductToPieceDetail(product: ApiProduct, pieceType: PieceType): PieceDetail {
  return {
    ...mapApiProductToPiece(product, pieceType),
    description: product.description ?? '',
    images: product.images ?? [product.thumbnail],
    warrantyInformation: product.warrantyInformation ?? '',
    shippingInformation: product.shippingInformation ?? '',
    returnPolicy: product.returnPolicy ?? '',
  };
}

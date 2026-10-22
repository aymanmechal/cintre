import type { PieceType } from '../../constants/categories';
import type { Piece, PieceDetail } from '../../types/piece';
import type { ApiProduct, ApiSavedProduct } from './dummyJsonTypes';

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

export function mergeSavedProduct(piece: Piece, product: ApiSavedProduct): Piece {
  return {
    ...piece,
    title: product.title ?? piece.title,
    brand: product.brand ?? piece.brand,
    price: product.price ?? piece.price,
    thumbnail: product.thumbnail ?? piece.thumbnail,
  };
}

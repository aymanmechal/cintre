export interface Piece {
  id: number;
  title: string;
  brand: string | null;
  category: string;
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
}

export interface PieceDetail extends Piece {
  description: string;
  images: string[];
  warrantyInformation: string;
  shippingInformation: string;
  returnPolicy: string;
}

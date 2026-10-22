/** Types « métier » de l'app : ce que nos composants manipulent (pas le format brut de l'API). */

/** Une pièce telle qu'affichée dans le catalogue (carte). */
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

/** Une pièce avec toutes ses infos (fiche détail). */
export interface PieceDetail extends Piece {
  description: string;
  images: string[];
  warrantyInformation: string;
  shippingInformation: string;
  returnPolicy: string;
}

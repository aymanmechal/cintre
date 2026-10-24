import { PieceType } from '../../../shared/pieces/constants/categories';
import { PieceColor } from '../../../shared/pieces/constants/colors';
import { Season } from '../../../shared/pieces/constants/seasons';
import { Occasion } from '../../outfits/constants/occasions';
import { OwnershipStatus } from '../../wardrobe/constants/wardrobe';

export const DEMO_OUTFIT_ID_PREFIX = 'demo-outfit-';

export interface DemoPieceSpec {
  id: number;
  title: string;
  brand: string;
  pieceType: PieceType;
  price: number;
  color: PieceColor;
  season: Season;
  daysSinceWorn: number | null;
  status: OwnershipStatus;
}

export const DEMO_PIECES: DemoPieceSpec[] = [
  {
    id: -1,
    title: 'Jean droit',
    brand: 'Levi’s',
    pieceType: PieceType.Bottoms,
    price: 80,
    color: PieceColor.Blue,
    season: Season.AllYear,
    daysSinceWorn: 3,
    status: OwnershipStatus.Owned,
  },
  {
    id: -2,
    title: 'T-shirt blanc',
    brand: 'Uniqlo',
    pieceType: PieceType.Tops,
    price: 15,
    color: PieceColor.White,
    season: Season.Summer,
    daysSinceWorn: 10,
    status: OwnershipStatus.Owned,
  },
  {
    id: -3,
    title: 'Pull col roulé gris',
    brand: 'Zara',
    pieceType: PieceType.Tops,
    price: 35,
    color: PieceColor.Grey,
    season: Season.Winter,
    daysSinceWorn: 45,
    status: OwnershipStatus.Owned,
  },
  {
    id: -4,
    title: 'Chemise en lin',
    brand: 'Mango',
    pieceType: PieceType.Shirts,
    price: 40,
    color: PieceColor.Beige,
    season: Season.Summer,
    daysSinceWorn: null,
    status: OwnershipStatus.Owned,
  },
  {
    id: -5,
    title: 'Baskets blanches',
    brand: 'Veja',
    pieceType: PieceType.Shoes,
    price: 120,
    color: PieceColor.White,
    season: Season.AllYear,
    daysSinceWorn: 3,
    status: OwnershipStatus.Owned,
  },
  {
    id: -6,
    title: 'Bottines noires',
    brand: 'Kiabi',
    pieceType: PieceType.Shoes,
    price: 60,
    color: PieceColor.Black,
    season: Season.Winter,
    daysSinceWorn: 20,
    status: OwnershipStatus.Owned,
  },
  {
    id: -7,
    title: 'Robe fleurie',
    brand: 'Bershka',
    pieceType: PieceType.Dresses,
    price: 30,
    color: PieceColor.Pink,
    season: Season.Summer,
    daysSinceWorn: 60,
    status: OwnershipStatus.Owned,
  },
  {
    id: -8,
    title: 'Sac bandoulière',
    brand: 'Primark',
    pieceType: PieceType.Bags,
    price: 25,
    color: PieceColor.Brown,
    season: Season.AllYear,
    daysSinceWorn: 5,
    status: OwnershipStatus.Owned,
  },
  {
    id: -9,
    title: 'Chemise à carreaux',
    brand: 'ASOS',
    pieceType: PieceType.Shirts,
    price: 45,
    color: PieceColor.Green,
    season: Season.MidSeason,
    daysSinceWorn: null,
    status: OwnershipStatus.Wanted,
  },
];

export const DEMO_OUTFITS = [
  {
    id: `${DEMO_OUTFIT_ID_PREFIX}1`,
    name: 'Cool en ville',
    pieceIds: [-2, -1, -5],
    occasion: Occasion.Everyday,
  },
  {
    id: `${DEMO_OUTFIT_ID_PREFIX}2`,
    name: 'Hiver tout doux',
    pieceIds: [-3, -1, -6],
    occasion: Occasion.Class,
  },
  {
    id: `${DEMO_OUTFIT_ID_PREFIX}3`,
    name: 'Sortie d’été',
    pieceIds: [-7, -6, -8],
    occasion: Occasion.Party,
  },
];

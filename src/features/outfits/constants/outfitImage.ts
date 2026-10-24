import { PieceType } from '../../../shared/pieces/constants/categories';

export const OUTFIT_IMAGE_COLUMNS = 2;

export const OUTFIT_IMAGE_TILE_SIZE = 420;

export const OUTFIT_IMAGE_GAP = 24;

export const OUTFIT_IMAGE_PADDING = 48;

export const OUTFIT_IMAGE_HEADER_HEIGHT = 130;

export const OUTFIT_IMAGE_CAPTION_HEIGHT = 56;

export const OUTFIT_IMAGE_FOOTER_HEIGHT = 90;

export const OUTFIT_IMAGE_BACKGROUND = '#fff6e9';

export const OUTFIT_IMAGE_INK = '#0b2233';

export const OUTFIT_IMAGE_BRAND_COLOR = '#213ded';

export const OUTFIT_IMAGE_FONT = '"Bricolage Grotesque", system-ui, sans-serif';

export const OUTFIT_IMAGE_EXPORT_ERROR = 'Impossible de créer l’image. Réessaie dans un instant.';

export const OUTFIT_IMAGE_TILE_COLORS: Record<PieceType, string> = {
  [PieceType.Shirts]: '#5b78ff',
  [PieceType.Tops]: '#ff7a3d',
  [PieceType.Bottoms]: '#7be0c3',
  [PieceType.Dresses]: '#ff9ec7',
  [PieceType.Shoes]: '#3dd68c',
  [PieceType.Bags]: '#ffd23f',
  [PieceType.Watches]: '#5cc8ff',
  [PieceType.Jewellery]: '#b18cff',
  [PieceType.Sunglasses]: '#c8f169',
};

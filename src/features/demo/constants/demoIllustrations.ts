import { PieceType } from '../../../shared/pieces/constants/categories';
import { PIECE_COLOR_SWATCHES, PieceColor } from '../../../shared/pieces/constants/colors';

export const ILLUSTRATION_BACKGROUND = '#f4efe6';
export const ILLUSTRATION_STROKE = '#1f1f1f';

export const ILLUSTRATION_COLORS: Record<PieceColor, string> = {
  ...PIECE_COLOR_SWATCHES,
  [PieceColor.Black]: '#2b2b2b',
};

export const ILLUSTRATION_SHAPES: Record<PieceType, string> = {
  [PieceType.Shirts]:
    '<path d="M110 50 L150 70 L190 50 L250 85 L225 135 L205 125 L205 255 L95 255 L95 125 L75 135 L50 85 Z"/><path d="M150 70 L150 255"/>',
  [PieceType.Tops]:
    '<path d="M105 50 Q150 85 195 50 L255 90 L228 140 L205 128 L205 250 L95 250 L95 128 L72 140 L45 90 Z"/>',
  [PieceType.Jackets]:
    '<path d="M105 45 L150 75 L195 45 L258 90 L235 150 L208 135 L208 255 L92 255 L92 135 L65 150 L42 90 Z"/><path d="M150 75 L150 255"/>',
  [PieceType.Bottoms]:
    '<path d="M95 40 L205 40 L222 265 L160 265 L150 120 L140 265 L78 265 Z"/><path d="M95 40 L205 40 L205 58 L95 58 Z"/>',
  [PieceType.Dresses]:
    '<path d="M120 35 L140 35 L150 60 L160 35 L180 35 L185 110 L235 265 L65 265 L115 110 Z"/>',
  [PieceType.Shoes]:
    '<path d="M40 200 L40 150 Q95 150 115 120 L140 135 Q175 165 250 175 Q265 180 265 205 L265 220 L40 220 Z"/><path d="M40 205 L265 205"/>',
  [PieceType.Bags]:
    '<path d="M115 110 Q115 50 150 50 Q185 50 185 110" fill="none"/><path d="M65 105 L235 105 L250 255 L50 255 Z"/>',
  [PieceType.Watches]:
    '<path d="M125 30 L175 30 L180 95 L120 95 Z"/><path d="M120 205 L180 205 L175 270 L125 270 Z"/><circle cx="150" cy="150" r="60"/><path d="M150 150 L150 112 M150 150 L178 150" fill="none"/>',
  [PieceType.Jewellery]:
    '<path d="M70 50 Q150 270 230 50" fill="none"/><circle cx="150" cy="215" r="24"/>',
  [PieceType.Sunglasses]:
    '<rect x="35" y="115" width="100" height="75" rx="28"/><rect x="165" y="115" width="100" height="75" rx="28"/><path d="M135 140 Q150 128 165 140" fill="none"/>',
};

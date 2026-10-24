export enum PieceColor {
  Black = 'noir',
  White = 'blanc',
  Grey = 'gris',
  Beige = 'beige',
  Brown = 'marron',
  Blue = 'bleu',
  Green = 'vert',
  Red = 'rouge',
  Pink = 'rose',
  Yellow = 'jaune',
  Purple = 'violet',
  Multicolor = 'multicolore',
}

export const PIECE_COLOR_LABELS: Record<PieceColor, string> = {
  [PieceColor.Black]: 'Noir',
  [PieceColor.White]: 'Blanc',
  [PieceColor.Grey]: 'Gris',
  [PieceColor.Beige]: 'Beige',
  [PieceColor.Brown]: 'Marron',
  [PieceColor.Blue]: 'Bleu',
  [PieceColor.Green]: 'Vert',
  [PieceColor.Red]: 'Rouge',
  [PieceColor.Pink]: 'Rose',
  [PieceColor.Yellow]: 'Jaune',
  [PieceColor.Purple]: 'Violet',
  [PieceColor.Multicolor]: 'Multicolore',
};

export const PIECE_COLOR_SWATCHES: Record<PieceColor, string> = {
  [PieceColor.Black]: '#1f1f1f',
  [PieceColor.White]: '#ffffff',
  [PieceColor.Grey]: '#9e9e9e',
  [PieceColor.Beige]: '#e3d3b4',
  [PieceColor.Brown]: '#7b5134',
  [PieceColor.Blue]: '#3f6fd8',
  [PieceColor.Green]: '#3f9b5b',
  [PieceColor.Red]: '#d64141',
  [PieceColor.Pink]: '#f29ac0',
  [PieceColor.Yellow]: '#f2cf3d',
  [PieceColor.Purple]: '#8a5cc7',
  [PieceColor.Multicolor]: 'conic-gradient(#d64141, #f2cf3d, #3f9b5b, #3f6fd8, #8a5cc7, #d64141)',
};

export const PIECE_COLORS = Object.values(PieceColor);

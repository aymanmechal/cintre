export const ROUTES = {
  home: '/',
  catalog: '/catalogue',
  pieceDetail: '/piece/:id',
  wardrobe: '/garde-robe',
  addPiece: '/ajouter',
} as const;

export function buildPieceUrl(pieceId: number | string): string {
  return `/piece/${pieceId}`;
}

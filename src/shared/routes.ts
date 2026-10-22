export const ROUTES = {
  home: '/',
  catalog: '/catalogue',
  pieceDetail: '/piece/:id',
  wardrobe: '/garde-robe',
  addPiece: '/ajouter',
  editPiece: '/garde-robe/:id/modifier',
  outfits: '/tenues',
  calendar: '/calendrier',
} as const;

export function buildPieceUrl(pieceId: number | string): string {
  return `/piece/${pieceId}`;
}

export function buildEditPieceUrl(pieceId: number): string {
  return `/garde-robe/${pieceId}/modifier`;
}

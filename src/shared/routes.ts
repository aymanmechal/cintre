export const ROUTES = {
  home: '/',
  catalog: '/catalogue',
  wardrobe: '/garde-robe',
  addPiece: '/ajouter',
  editPiece: '/garde-robe/:id/modifier',
  outfits: '/tenues',
  outfitIdeas: '/tenues/idees/:ids',
  colorIdeas: '/tenues/couleur/:color',
  calendar: '/calendrier',
  trash: '/corbeille',
  archive: '/archives',
  backup: '/sauvegarde',
  stats: '/chiffres',
  suitcase: '/valise',
  wrapped: '/bilan',
  lookbook: '/lookbook',
  compatibility: '/associations',
  account: '/compte',
  stylist: '/styliste',
  styleProfile: '/profil',
  me: '/moi',
  sharedOutfit: '/partage/:id',
} as const;

export function buildOutfitIdeasUrl(...pieceIds: number[]): string {
  return `/tenues/idees/${pieceIds.join(',')}`;
}

export function buildColorIdeasUrl(color: string): string {
  return `/tenues/couleur/${color}`;
}

export function buildEditPieceUrl(pieceId: number): string {
  return `/garde-robe/${pieceId}/modifier`;
}

export function buildSharedOutfitUrl(shareId: string): string {
  return `/partage/${shareId}`;
}

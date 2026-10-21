/** Chemins de l'application : un seul endroit à modifier si une URL change. */
export const ROUTES = {
  home: '/',
  catalog: '/catalogue',
  pieceDetail: '/piece/:id',
  wardrobe: '/garde-robe',
  addPiece: '/ajouter',
} as const;

/** Construit l'URL de la fiche d'une pièce, ex. pieceUrl(12) → "/piece/12". */
export function pieceUrl(id: number | string): string {
  return `/piece/${id}`;
}

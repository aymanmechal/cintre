import type { OutfitIdea } from '../../outfits/types/outfit';

export interface StylistPiece {
  id: number;
  name: string;
  type: string;
  color: string | null;
  season: string | null;
  brand: string | null;
  tags: string[];
}

export interface StylistAnswer {
  pieceIds: number[];
  explanation: string;
}

export interface StylistSuggestion {
  idea: OutfitIdea;
  explanation: string;
}

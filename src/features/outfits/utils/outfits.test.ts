import { describe, expect, it } from 'vitest';
import { PieceType } from '../../../shared/pieces/constants/categories';
import { makeOutfit, makeWardrobeItem } from '../../../test/factories';
import { OwnershipStatus } from '../../wardrobe/constants/wardrobe';
import { MAX_ACCESSORIES_PER_OUTFIT, OutfitReadiness, OutfitSlot } from '../constants/outfits';
import {
  buildDefaultOutfitName,
  buildMissingPiecesHint,
  canAddAnotherPiece,
  countMissingPieces,
  createEmptySelection,
  findNextEmptySlot,
  formatPieceCount,
  getOutfitReadiness,
  removePieceFromSlot,
  resolveOutfitItems,
  resolveSelectedItems,
  selectItemsForSlot,
  selectMissingItems,
  selectShelfItems,
  selectSlotItems,
  sumPrices,
  toPieceIds,
  togglePieceInSlot,
} from './outfits';

const SHIRT = makeWardrobeItem({ id: 1, price: 30 });
const JEANS = makeWardrobeItem({ id: 2, pieceType: PieceType.Bottoms, price: 90 });
const SHOES = makeWardrobeItem({ id: 3, pieceType: PieceType.Shoes, price: 150 });
const WATCH = makeWardrobeItem({ id: 4, pieceType: PieceType.Watches, price: 500 });
const WISH_WATCH = makeWardrobeItem(
  { id: 5, pieceType: PieceType.Watches, price: 700 },
  { status: OwnershipStatus.Wanted },
);
const ITEMS = [SHIRT, JEANS, SHOES, WATCH, WISH_WATCH];

describe('sélection', () => {
  it('commence vide', () => {
    expect(toPieceIds(createEmptySelection())).toEqual([]);
  });

  it('range chaque pièce dans son emplacement', () => {
    expect(selectItemsForSlot(ITEMS, OutfitSlot.Top)).toEqual([SHIRT]);
    expect(selectItemsForSlot(ITEMS, OutfitSlot.Accessory)).toEqual([WATCH, WISH_WATCH]);
  });

  it("liste les ids dans l'ordre des emplacements", () => {
    const selection = {
      ...createEmptySelection(),
      [OutfitSlot.Shoes]: [3],
      [OutfitSlot.Top]: [1],
    };
    expect(toPieceIds(selection)).toEqual([1, 3]);
  });
});

describe('togglePieceInSlot', () => {
  it("remplace la pièce d'un emplacement à une seule place", () => {
    const selection = togglePieceInSlot(createEmptySelection(), OutfitSlot.Top, 1);
    expect(togglePieceInSlot(selection, OutfitSlot.Top, 9)[OutfitSlot.Top]).toEqual([9]);
  });

  it('retire la pièce quand on clique dessus une deuxième fois', () => {
    const selection = togglePieceInSlot(createEmptySelection(), OutfitSlot.Top, 1);
    expect(togglePieceInSlot(selection, OutfitSlot.Top, 1)[OutfitSlot.Top]).toEqual([]);
  });

  it('accepte plusieurs accessoires', () => {
    let selection = createEmptySelection();
    selection = togglePieceInSlot(selection, OutfitSlot.Accessory, 4);
    selection = togglePieceInSlot(selection, OutfitSlot.Accessory, 5);
    expect(selection[OutfitSlot.Accessory]).toEqual([4, 5]);
  });

  it('refuse un accessoire au-delà de la limite', () => {
    let selection = createEmptySelection();
    for (let id = 1; id <= MAX_ACCESSORIES_PER_OUTFIT + 2; id++) {
      selection = togglePieceInSlot(selection, OutfitSlot.Accessory, id);
    }
    expect(selection[OutfitSlot.Accessory]).toHaveLength(MAX_ACCESSORIES_PER_OUTFIT);
  });

  it("retire une pièce précise d'un emplacement", () => {
    const selection = { ...createEmptySelection(), [OutfitSlot.Accessory]: [4, 5] };
    expect(removePieceFromSlot(selection, OutfitSlot.Accessory, 4)[OutfitSlot.Accessory]).toEqual([
      5,
    ]);
  });
});

describe('canAddAnotherPiece', () => {
  it("est faux quand l'emplacement est vide", () => {
    expect(canAddAnotherPiece(createEmptySelection(), OutfitSlot.Accessory)).toBe(false);
  });

  it('est vrai pour les accessoires déjà commencés mais pas pleins', () => {
    const selection = { ...createEmptySelection(), [OutfitSlot.Accessory]: [4] };
    expect(canAddAnotherPiece(selection, OutfitSlot.Accessory)).toBe(true);
  });

  it('est faux pour un emplacement à une seule place', () => {
    const selection = { ...createEmptySelection(), [OutfitSlot.Top]: [1] };
    expect(canAddAnotherPiece(selection, OutfitSlot.Top)).toBe(false);
  });
});

describe('findNextEmptySlot', () => {
  it('passe au prochain emplacement vide', () => {
    const selection = { ...createEmptySelection(), [OutfitSlot.Top]: [1] };
    expect(findNextEmptySlot(selection, OutfitSlot.Top)).toBe(OutfitSlot.Bottom);
  });

  it('saute les emplacements déjà remplis', () => {
    const selection = {
      ...createEmptySelection(),
      [OutfitSlot.Top]: [1],
      [OutfitSlot.Bottom]: [2],
    };
    expect(findNextEmptySlot(selection, OutfitSlot.Top)).toBe(OutfitSlot.Shoes);
  });

  it('revient au début de la liste si besoin', () => {
    const selection = {
      ...createEmptySelection(),
      [OutfitSlot.Bottom]: [2],
      [OutfitSlot.Shoes]: [3],
      [OutfitSlot.Accessory]: [4],
    };
    expect(findNextEmptySlot(selection, OutfitSlot.Accessory)).toBe(OutfitSlot.Top);
  });

  it('reste sur place quand tout est rempli', () => {
    const selection = {
      [OutfitSlot.Top]: [1],
      [OutfitSlot.Bottom]: [2],
      [OutfitSlot.Shoes]: [3],
      [OutfitSlot.Accessory]: [4],
    };
    expect(findNextEmptySlot(selection, OutfitSlot.Shoes)).toBe(OutfitSlot.Shoes);
  });
});

describe('pièces manquantes et textes', () => {
  it('il faut au moins deux pièces', () => {
    const selection = { ...createEmptySelection(), [OutfitSlot.Top]: [1] };
    expect(countMissingPieces(createEmptySelection())).toBe(2);
    expect(countMissingPieces(selection)).toBe(1);
    expect(countMissingPieces({ ...selection, [OutfitSlot.Bottom]: [2] })).toBe(0);
  });

  it('accorde les mots', () => {
    expect(formatPieceCount(1)).toBe('1 pièce');
    expect(buildMissingPiecesHint(2)).toBe('Choisis encore 2 pièces pour créer la tenue.');
  });

  it('nomme les tenues par défaut', () => {
    expect(buildDefaultOutfitName(0)).toBe('Tenue n°1');
    expect(buildDefaultOutfitName(4)).toBe('Tenue n°5');
  });
});

describe('résolution des pièces', () => {
  it("retrouve les pièces d'une tenue et ignore celles qui n'existent plus", () => {
    const outfit = makeOutfit({ pieceIds: [1, 999, 3] });
    expect(resolveOutfitItems(outfit, ITEMS)).toEqual([SHIRT, SHOES]);
  });

  it("retrouve les pièces d'une sélection et d'un emplacement", () => {
    const selection = {
      ...createEmptySelection(),
      [OutfitSlot.Top]: [1],
      [OutfitSlot.Accessory]: [4, 5],
    };
    expect(resolveSelectedItems(selection, ITEMS)).toEqual([SHIRT, WATCH, WISH_WATCH]);
    expect(selectSlotItems(selection, OutfitSlot.Accessory, ITEMS)).toEqual([WATCH, WISH_WATCH]);
  });

  it("montre d'abord les pièces possédées dans l'étagère", () => {
    const wishFirst = [WISH_WATCH, WATCH];
    expect(selectShelfItems(wishFirst, OutfitSlot.Accessory)).toEqual([WATCH, WISH_WATCH]);
  });
});

describe('objectif ou prête', () => {
  it('une tenue avec une envie est un objectif', () => {
    expect(getOutfitReadiness([SHIRT, WISH_WATCH])).toBe(OutfitReadiness.Goal);
  });

  it('une tenue de pièces possédées est prête', () => {
    expect(getOutfitReadiness([SHIRT, JEANS])).toBe(OutfitReadiness.Ready);
  });

  it('liste les pièces à obtenir et additionne leur prix', () => {
    expect(selectMissingItems([SHIRT, WISH_WATCH])).toEqual([WISH_WATCH]);
    expect(sumPrices([SHIRT, JEANS])).toBe(120);
    expect(sumPrices([])).toBe(0);
  });
});

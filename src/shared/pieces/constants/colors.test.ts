import { describe, expect, it } from 'vitest';
import { PIECE_COLORS, PIECE_COLOR_LABELS, PIECE_COLOR_SWATCHES, PieceColor } from './colors';

const HEX_COLOR = /^#[0-9a-f]{6}$/i;

const EXPECTED_LABELS: Record<string, string> = {
  noir: 'Noir',
  gris: 'Gris',
  blanc: 'Blanc',
  creme: 'Crème',
  beige: 'Beige',
  abricot: 'Abricot',
  orange: 'Orange',
  corail: 'Corail',
  rouge: 'Rouge',
  bordeaux: 'Bordeaux',
  rose: 'Rose',
  violet: 'Violet',
  bleu: 'Bleu',
  'bleu-marine': 'Bleu marine',
  'bleu-clair': 'Bleu clair',
  turquoise: 'Turquoise',
  vert: 'Vert',
  'vert-fonce': 'Vert foncé',
  kaki: 'Kaki',
  jaune: 'Jaune',
  moutarde: 'Moutarde',
  marron: 'Marron',
  argente: 'Argenté',
  dore: 'Doré',
};

describe('couleurs des pièces', () => {
  it('propose les 24 couleurs du contrat, sans multicolore', () => {
    expect([...PIECE_COLORS].sort()).toEqual(Object.keys(EXPECTED_LABELS).sort());
    expect(PIECE_COLORS as string[]).not.toContain('multicolore');
  });

  it('donne un libellé français à chaque couleur', () => {
    for (const color of PIECE_COLORS) {
      expect(PIECE_COLOR_LABELS[color]).toBe(EXPECTED_LABELS[color]);
    }
  });

  it('donne une pastille hexadécimale à chaque couleur', () => {
    for (const color of PIECE_COLORS) {
      expect(PIECE_COLOR_SWATCHES[color]).toMatch(HEX_COLOR);
    }
  });

  it('a des libellés et des pastilles tous différents', () => {
    const labels = PIECE_COLORS.map((color) => PIECE_COLOR_LABELS[color]);
    const swatches = PIECE_COLORS.map((color) => PIECE_COLOR_SWATCHES[color].toLowerCase());
    expect(new Set(labels).size).toBe(PIECE_COLORS.length);
    expect(new Set(swatches).size).toBe(PIECE_COLORS.length);
  });

  it('garde la valeur de stockage des anciennes couleurs', () => {
    expect(PieceColor.Black).toBe('noir');
    expect(PieceColor.White).toBe('blanc');
    expect(PieceColor.Grey).toBe('gris');
    expect(PieceColor.Beige).toBe('beige');
    expect(PieceColor.Brown).toBe('marron');
    expect(PieceColor.Blue).toBe('bleu');
    expect(PieceColor.Green).toBe('vert');
    expect(PieceColor.Red).toBe('rouge');
    expect(PieceColor.Pink).toBe('rose');
    expect(PieceColor.Yellow).toBe('jaune');
    expect(PieceColor.Purple).toBe('violet');
  });
});

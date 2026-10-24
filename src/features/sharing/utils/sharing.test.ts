import { describe, expect, it } from 'vitest';
import {
  buildShareTitle,
  buildShareUrl,
  buildVoteChoices,
  countVotes,
  formatVoteSummary,
  parseMyShares,
  parseSharedOutfit,
} from './sharing';

const look = { name: 'Brunch', image: 'data:image/jpeg;base64,x' };

describe('parseSharedOutfit', () => {
  it('lit une tenue partagée valide', () => {
    expect(
      parseSharedOutfit({
        id: 'a',
        title: 'Brunch',
        looks: [look, { name: 1 }],
        votes: ['love', 2],
      }),
    ).toEqual({ id: 'a', title: 'Brunch', looks: [look], votes: ['love'] });
  });

  it('refuse une réponse vide ou sans tenue', () => {
    expect(parseSharedOutfit(null)).toBeNull();
    expect(parseSharedOutfit({ id: 'a', title: 'x', looks: [] })).toBeNull();
  });
});

describe('parseMyShares', () => {
  it('récupère les avis de chaque partage', () => {
    expect(
      parseMyShares([{ id: 'a', title: 'Brunch', look_votes: [{ choice: 'fire' }] }, { id: 2 }]),
    ).toEqual([{ id: 'a', title: 'Brunch', votes: ['fire'] }]);
    expect(parseMyShares('oups')).toEqual([]);
  });
});

describe('votes', () => {
  it('compte les avis par choix', () => {
    expect(countVotes(['love', 'fire', 'love'])).toEqual({ love: 2, fire: 1 });
  });

  it('résume les avis en emojis', () => {
    expect(formatVoteSummary(['love', 'love', '1'])).toBe('😍 2 · 2️⃣ 1');
    expect(formatVoteSummary([])).toBe('Pas encore d’avis');
  });

  it('propose des réactions pour une tenue et un vote pour un sondage', () => {
    const single = { id: 'a', title: 't', looks: [look], votes: [] };
    expect(buildVoteChoices(single).map((choice) => choice.value)).toEqual([
      'love',
      'fire',
      'unsure',
    ]);
    const poll = { ...single, looks: [look, { ...look, name: 'Soirée' }] };
    expect(buildVoteChoices(poll)).toEqual([
      { value: '0', emoji: '1️⃣', label: 'Brunch' },
      { value: '1', emoji: '2️⃣', label: 'Soirée' },
    ]);
  });
});

describe('liens', () => {
  it('donne un titre de sondage', () => {
    expect(buildShareTitle(['Brunch'])).toBe('Brunch');
    expect(buildShareTitle(['Brunch', 'Soirée'])).toBe('Brunch ou Soirée ?');
  });

  it('construit le lien public', () => {
    expect(buildShareUrl('https://cintre.fr', '/', 'abc')).toBe('https://cintre.fr/partage/abc');
    expect(buildShareUrl('https://x.io', '/app', 'abc')).toBe('https://x.io/app/partage/abc');
  });
});

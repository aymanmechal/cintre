import { describe, expect, it } from 'vitest';
import { makeWardrobeItem } from '../../../test/factories';
import { Availability, OwnershipStatus } from '../../wardrobe/constants/wardrobe';
import { pickChallengeItem, selectChallengeCandidates } from './forgottenChallenge';

const TODAY = new Date('2025-03-31T12:00:00');
const OLD = '2025-01-01';

describe('forgottenChallenge', () => {
  it('ne garde que les pièces oubliées, possédées et disponibles', () => {
    const forgotten = makeWardrobeItem({ id: 1 }, { lastWornOn: OLD });
    const recent = makeWardrobeItem({ id: 2 }, { lastWornOn: '2025-03-30' });
    const dirty = makeWardrobeItem(
      { id: 3 },
      { lastWornOn: OLD, availability: Availability.Dirty },
    );
    const wanted = makeWardrobeItem({ id: 4 }, { status: OwnershipStatus.Wanted });
    expect(selectChallengeCandidates([forgotten, recent, dirty, wanted], TODAY)).toEqual([
      forgotten,
    ]);
  });

  it('classe la pièce portée le plus loin en premier', () => {
    const older = makeWardrobeItem({ id: 1 }, { lastWornOn: '2025-01-01' });
    const never = makeWardrobeItem({ id: 2 }, { lastWornOn: null });
    expect(selectChallengeCandidates([older, never], TODAY)).toEqual([never, older]);
  });

  it('choisit la même pièce toute la journée, une autre après « un autre défi »', () => {
    const candidates = [makeWardrobeItem({ id: 1 }), makeWardrobeItem({ id: 2 })];
    const first = pickChallengeItem(candidates, TODAY, 0);
    expect(pickChallengeItem(candidates, TODAY, 0)).toBe(first);
    expect(pickChallengeItem(candidates, TODAY, 1)).not.toBe(first);
    expect(pickChallengeItem(candidates, TODAY, 2)).toBe(first);
  });

  it("ne propose rien quand rien n'est oublié", () => {
    expect(pickChallengeItem([], TODAY, 0)).toBeNull();
  });
});

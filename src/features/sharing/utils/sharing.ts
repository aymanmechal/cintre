import { isRecord } from '../../../shared/utils/isRecord';
import { buildSharedOutfitUrl } from '../../../shared/routes';
import { POLL_EMOJIS, REACTION_EMOJIS, REACTION_LABELS, Reaction } from '../constants/sharing';
import type { MyShare, SharedLook, SharedOutfit, VoteChoice } from '../types/sharing';

function toStrings(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((entry) => typeof entry === 'string') : [];
}

function toSharedLook(value: unknown): SharedLook | null {
  if (!isRecord(value) || typeof value.name !== 'string' || typeof value.image !== 'string') {
    return null;
  }
  return { name: value.name, image: value.image };
}

function toLooks(value: unknown): SharedLook[] {
  if (!Array.isArray(value)) return [];
  return value.map(toSharedLook).filter((look) => look !== null);
}

export function parseSharedOutfit(value: unknown): SharedOutfit | null {
  if (!isRecord(value) || typeof value.id !== 'string' || typeof value.title !== 'string') {
    return null;
  }
  const looks = toLooks(value.looks);
  if (looks.length === 0) return null;
  return { id: value.id, title: value.title, looks, votes: toStrings(value.votes) };
}

function toVoteChoices(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((vote) => (isRecord(vote) ? vote.choice : null)).filter(isString);
}

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function toMyShare(value: unknown): MyShare | null {
  if (!isRecord(value) || typeof value.id !== 'string' || typeof value.title !== 'string') {
    return null;
  }
  return { id: value.id, title: value.title, votes: toVoteChoices(value.look_votes) };
}

export function parseMyShares(value: unknown): MyShare[] {
  if (!Array.isArray(value)) return [];
  return value.map(toMyShare).filter((share) => share !== null);
}

export function countVotes(votes: readonly string[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const vote of votes) counts[vote] = (counts[vote] ?? 0) + 1;
  return counts;
}

export function isPoll(shared: SharedOutfit): boolean {
  return shared.looks.length > 1;
}

export function buildVoteChoices(shared: SharedOutfit): VoteChoice[] {
  if (isPoll(shared)) {
    return shared.looks.map((look, index) => ({
      value: String(index),
      emoji: POLL_EMOJIS[index] ?? '👉',
      label: look.name,
    }));
  }
  return Object.values(Reaction).map((reaction) => ({
    value: reaction,
    emoji: REACTION_EMOJIS[reaction],
    label: REACTION_LABELS[reaction],
  }));
}

function choiceEmoji(choice: string): string {
  return REACTION_EMOJIS[choice as Reaction] ?? POLL_EMOJIS[Number(choice)] ?? choice;
}

export function formatVoteSummary(votes: readonly string[]): string {
  if (votes.length === 0) return 'Pas encore d’avis';
  const counts = countVotes(votes);
  const choices = [...new Set(votes)];
  return choices.map((choice) => `${choiceEmoji(choice)} ${counts[choice]}`).join(' · ');
}

export function buildShareTitle(names: readonly string[]): string {
  return names.length > 1 ? `${names.join(' ou ')} ?` : (names[0] ?? 'Ma tenue');
}

export function buildShareUrl(origin: string, basename: string, shareId: string): string {
  const prefix = basename === '/' ? '' : basename;
  return `${origin}${prefix}${buildSharedOutfitUrl(shareId)}`;
}

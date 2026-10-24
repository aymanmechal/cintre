import { normalizeForSearch } from '../../utils/text';

const TAG_SEPARATOR = ',';

export function parseTags(text: string): string[] {
  const tags = text
    .split(TAG_SEPARATOR)
    .map((tag) => normalizeForSearch(tag).replace(/^#/, ''))
    .filter((tag) => tag !== '');
  return [...new Set(tags)];
}

export function formatTags(tags: readonly string[]): string {
  return tags.join(`${TAG_SEPARATOR} `);
}

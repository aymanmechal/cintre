const FAVICON_SERVICE = 'https://www.google.com/s2/favicons';
const FAVICON_SIZE = 128;

export function buildShopLogoUrl(shopUrl: string): string {
  const domain = new URL(shopUrl).hostname.replace(/^(www2?|shop|fr)\./, '');
  return `${FAVICON_SERVICE}?domain=${domain}&sz=${FAVICON_SIZE}`;
}

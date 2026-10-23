const ROOT_PATH = '/';

function removeTrailingSlash(path: string): string {
  return path.endsWith(ROOT_PATH) ? path.slice(0, -1) : path;
}

export function toRouterBasename(baseUrl: string): string {
  return removeTrailingSlash(baseUrl) || ROOT_PATH;
}

export function toPublicAssetUrl(baseUrl: string, fileName: string): string {
  return `${removeTrailingSlash(baseUrl)}/${fileName}`;
}

export const ROUTER_BASENAME = toRouterBasename(import.meta.env.BASE_URL);

export function publicAssetUrl(fileName: string): string {
  return toPublicAssetUrl(import.meta.env.BASE_URL, fileName);
}

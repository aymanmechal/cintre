const CACHE_NAME = 'cintre-v1';
const APP_SHELL_URL = new URL('./', self.registration.scope).href;

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.add(APP_SHELL_URL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))),
      )
      .then(() => self.clients.claim()),
  );
});

async function openAppShell(request) {
  try {
    const response = await fetch(request);
    const cache = await caches.open(CACHE_NAME);
    await cache.put(APP_SHELL_URL, response.clone());
    return response;
  } catch {
    return caches.match(APP_SHELL_URL);
  }
}

async function serveAsset(request) {
  const cached = await caches.match(request);
  const network = fetch(request).then(async (response) => {
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, response.clone());
    }
    return response;
  });
  return cached ?? network;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const isSameOrigin = new URL(request.url).origin === self.location.origin;
  if (request.method !== 'GET' || !isSameOrigin) return;
  event.respondWith(request.mode === 'navigate' ? openAppShell(request) : serveAsset(request));
});

import { publicAssetUrl } from '../utils/basePath';

const SERVICE_WORKER_FILE = 'sw.js';

export function registerServiceWorker(): void {
  if (!('serviceWorker' in navigator)) return;
  window.addEventListener('load', () => {
    void navigator.serviceWorker.register(publicAssetUrl(SERVICE_WORKER_FILE));
  });
}

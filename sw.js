const CACHE_NAME = 'mylocalfit-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/offline.html',
  '/styles/main.css',
  '/data/exercises.js',
  '/logic/storage.js',
  '/logic/timer.js',
  '/components/ui.js',
  '/logic/app.js',
  '/assets/icons/icon-192-192.png',
  '/assets/icons/icon-512-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          // Don't cache opaque responses (like cross-origin when CORS not allowed)
          if (!response || response.status !== 200 || response.type === 'opaque') return response;
          const respClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, respClone));
          return response;
        })
        .catch(() => {
          // If navigation request, serve offline page
          if (event.request.mode === 'navigate') return caches.match('/offline.html');
          return caches.match('/index.html');
        });
    })
  );
});

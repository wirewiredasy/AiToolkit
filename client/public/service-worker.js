// Service Worker for caching optimization
const CACHE_NAME = 'suntyn-ai-v1';
const urlsToCache = [
  '/',
  '/src/main.tsx',
  '/src/index.css',
  // Add other static assets as needed
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
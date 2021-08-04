const STATIC_CACHE = 'static-cache-v1';
const static_assets = [
  '/',
  '/index.html',
  // '/script.js',
  '/img/logo24.png',
  '/img/logo32.png',
  '/img/logo48.png',
  '/img/logo64.png',
  '/img/logo72.png',
  '/img/logo96.png',
  '/img/logo128.png',
  '/img/logo256.png',
  '/img/logo512.png',
];

// storing static assets in cache on service worker install
// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      cache.addAll(static_assets);
    })
  );
});

// returning static assets from cache
// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

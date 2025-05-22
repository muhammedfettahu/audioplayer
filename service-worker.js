const CACHE_NAME = 'nasheed-player-v1';
const FILES_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './index.js',
  './manifest.json',
  './icon.png',
  'assets/1.mp3', 'assets/2.mp3', 'assets/3.mp3', 'assets/4.mp3',
  'assets/5.mp3', 'assets/6.mp3', 'assets/7.mp3', 'assets/8.mp3', 'assets/9.mp3',
  'assets/1.jpg', 'assets/2.jpg', 'assets/3.jpg', 'assets/4.jpg',
  'assets/5.jpg', 'assets/6.jpg', 'assets/7.jpg', 'assets/8.jpg', 'assets/9.jpg'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => key !== CACHE_NAME && caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});

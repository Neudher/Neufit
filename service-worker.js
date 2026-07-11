const CACHE_NAME = 'neufit-v1';
const urlsToCache = ['/', '/index.html', '/style.css', '/app.js', '/db.js', '/utils.js', '/main.js'];
self.addEventListener('install', event => {
    event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});
self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request).then(response => response || fetch(event.request)).catch(() => caches.match('index.html')));
});
self.addEventListener('activate', event => {
    event.waitUntil(caches.keys().then(cacheNames => Promise.all(cacheNames.map(c => c !== CACHE_NAME ? caches.delete(c) : null))));
});
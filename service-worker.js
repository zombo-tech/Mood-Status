const CACHE_NAME = 'mood-status-v1';
const urlsToCache = [
    './index.html',
    './manifest.json',
    // The main dependencies (Tailwind and Firebase SDKs) are external and usually handled by the browser cache
];

self.addEventListener('install', event => {
    // Perform installation steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                // Cache all required assets
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    // Intercepts network requests. For simplicity, we only cache the core files.
    // Dynamic content (Firebase/network requests) are not cached here.
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                // No cache match, proceed to network
                return fetch(event.request);
            })
    );
});
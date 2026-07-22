const CACHE = 'linkup-admin-v17';
const STATIC = [];

self.addEventListener('install', e => {
  e.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = e.request.url;
  if (e.request.method !== 'GET') return;
  if (url.includes('firestore') || url.includes('googleapis') || url.includes('gstatic') || url.includes('fonts') || url.includes('leaflet')) return;
  // Never serve HTML from cache — always fetch fresh
  if (url.includes('.html') || url.endsWith('/')) {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
    return;
  }
  e.respondWith(
    fetch(e.request)
      .then(res => {
        if (res && res.status === 200) {
          const toCache = res.clone();
          caches.open(CACHE).then(cache => cache.put(e.request, toCache));
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});

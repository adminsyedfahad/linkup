const CACHE = 'linkup-v13';
const STATIC = ['/index.html'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(STATIC))
      .then(() => self.skipWaiting())
  );
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
  if (url.includes('firestore') || url.includes('googleapis') || url.includes('gstatic') || url.includes('emailjs') || url.includes('leaflet') || url.includes('fonts')) return;
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

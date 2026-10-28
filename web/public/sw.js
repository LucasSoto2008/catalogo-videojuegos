// Service Worker de GameDex
// Estrategia: network-first para páginas (si no hay red, usa la copia en caché
// o la página offline.html) y cache-first para archivos estáticos.
const CACHE = "gamedex-v1";
const PRECACHE = ["/", "/offline.html", "/manifest.json", "/icons/icon-192.png", "/icons/icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET" || !req.url.startsWith(self.location.origin)) return;

  // Páginas HTML y datos RSC de Next: network-first
  if (req.mode === "navigate" || req.headers.get("RSC")) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copia = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copia));
          return res;
        })
        .catch(async () => {
          const enCache = await caches.match(req);
          if (enCache) return enCache;
          return req.mode === "navigate" ? caches.match("/offline.html") : Response.error();
        })
    );
    return;
  }

  // Estáticos (JS, CSS, imágenes): cache-first
  event.respondWith(
    caches.match(req).then(
      (enCache) =>
        enCache ||
        fetch(req).then((res) => {
          const copia = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copia));
          return res;
        })
    )
  );
});

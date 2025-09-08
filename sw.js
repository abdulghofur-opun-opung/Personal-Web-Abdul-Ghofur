self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("ag-link-v1").then(cache => {
      return cache.addAll([
        "/",
        "index.html",
        "manifest.json",
        "./assets/css/style.css",
        "./assets/css/bootstraps.css",
        "./assets/js/maen.js",
        "./assets/js/script.js",
        "./assets/img/fotoku.png"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
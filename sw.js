let cacheName = "rest-app-v1";
let toCache = [
  "./",
  "index.html",
  "restaurant.html",
  "css/styles.css",
  "data/restaurants.json",
  "js/dbhelper.js",
  "js/main.js",
  "js/restaurant_info.js",
  "img/1.jpg",
  "img/2.jpg",
  "img/3.jpg",
  "img/4.jpg",
  "img/5.jpg",
  "img/6.jpg",
  "img/7.jpg",
  "img/8.jpg",
  "img/9.jpg",
  "img/10.jpg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(cacheName)
    .then(cache => cache.addAll(toCache))
    .then(self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(cacheNames.map(cache => {
      if (cache !== cacheName) {
        return caches.delete(cache);
      }
    })))
  );
})

self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);
  if (url.origin == location.origin) {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  }
});

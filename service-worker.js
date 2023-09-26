const CACHE_NAME = "credit-card-pwa-v1";
const urlsToCache = [
  "/",
  "index.html",
  "assets",
  "/styles/shared-style.css",
  "/indexController.js",
  "/ui-components/peripherals.js",
  "/ui-components/button.js",
  "/manifest.json",
  "/styles/custom-button-style.css",
  "/communicators/observer.js",
  "/constants/button-styling-constants.js",
  "/constants/element-insertion-positions.js",
  "/constants/observer-topics.js",
  "/controllers/barcode-scanner-controller.js",
  "/controllers/card-reader-controller.js",
  "/controllers/e-signature-controller.js",
  "/indexView.js",
  "/constants/device-title-id.js",
  "/logo192.png",
  "/views/barcode-scanner-view.js",
  "/models/products-list.js",
  "/communicators/communicator.js",
  "/models/card-reader-model.js",
  "/views/card-reader-view.js",
  "/services/card-reader-extractor.js",
  "/exceptions/card-details-exception.js",
  "/views/e-signature-view.js",
  "/models/card-information.js",
  "/favicon.ico",
  "/service-worker.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

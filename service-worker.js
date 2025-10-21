const CACHE_NAME = 'unity-cache-v20251022'; // ← バージョンを更新

const urlsToCache = [
  // ルート構成
  'index.html',
  'manifest.json',
  'service-worker.js',

  // アイコン
  'assets/icon-192.png',
  'assets/icon-512.png',

  // PC版
  'PCBuild/index.html',
  'PCBuild/Build/PCGame.js',
  'PCBuild/Build/PCGame.wasm',
  'PCBuild/Build/PCGame.data',

  // Mobile版
  'MobileBuild/index.html',
  'MobileBuild/Build/MobileGame.js',
  'MobileBuild/Build/MobileGame.wasm',
  'MobileBuild/Build/MobileGame.data'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

// ★ 古いキャッシュを削除する処理を追加
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (name) {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
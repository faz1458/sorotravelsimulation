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

// インストール時にキャッシュ登録
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

// 古いキャッシュを削除
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

// ネットワーク優先の fetch 処理
self.addEventListener('fetch', function (event) {
  event.respondWith(
    fetch(event.request).catch(function () {
      return caches.match(event.request);
    })
  );
});
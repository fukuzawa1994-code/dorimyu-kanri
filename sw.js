// Service Worker (最小構成: network-only パススルー)
// 目的: Chrome/Edge の PWA インストール要件 (fetch ハンドラ必須) を満たすことのみ。
// キャッシュは一切行わない → 既存の APP_VERSION / version.txt キャッシュバストと完全両立。
self.addEventListener('install', function(event) {
  self.skipWaiting();
});
self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', function(event) {
  event.respondWith(fetch(event.request));
});

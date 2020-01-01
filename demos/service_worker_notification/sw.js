self.addEventListener('notificationclick', function (event) {
  var messageId = event.notification.data;

  event.notification.close();
  // 通过设置的 actions 来做适当的响应
  if (event.action === 'like') {
  }
  clients.openWindow("https://insistandinsist.github.io");
}, false);


// 安装阶段跳过等待，直接进入 active
self.addEventListener('install', function (event) {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    Promise.all([

      // 更新客户端
      self.clients.claim(),

      // 清理旧版本
      caches.keys().then(function (cacheList) {
        return Promise.all(
          cacheList.map(function (cacheName) {
            if (cacheName !== 'my-test-cache-v1') {
              return caches.delete(cacheName);
            }
          })
        );
      })
    ])
  );
});
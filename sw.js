const cacheName = 'v2';

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll([
               '/',
                '/index.html',
                'http://localhost/testPWA/app.js',
                'http://localhost/testPWA/style.css'
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

// L'événement 'push' permet de gérer les notifications push.
self.addEventListener('push', (event) => {
    let data = { title: 'Notification', body: 'Vous avez un nouveau message.', icon: '/icon.png' };

    if (event.data) {
        data = event.data.json();
    }

    const options = {
        body: data.body,
        icon: data.icon,
        badge: 'icon.png',
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// L'événement 'notificationclick' gère les clics sur les notifications.
self.addEventListener('notificationclick', (event) => {
    event.notification.close(); // Ferme la notification

    // Vous pouvez ajouter des actions spécifiques lors du clic sur la notification, par exemple ouvrir une URL.
    event.waitUntil(
        clients.openWindow('http://localhost/testPWA/')
    );
});
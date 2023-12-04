import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js";

const firebaseConfig = {
    apiKey: "AIzaSyC5a0-8TDkgyxqLeu7jzvJd8PdUcALjJm8",
    authDomain: "pwa-test-dc6f1.firebaseapp.com",
    projectId: "pwa-test-dc6f1",
    storageBucket: "pwa-test-dc6f1.appspot.com",
    messagingSenderId: "757986966701",
    appId: "1:757986966701:web:fbaa3678631a527a939a24",
    measurementId: "G-C4FE6K5GKE"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Enregistrez le service worker et demandez la permission pour les notifications push
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
    .then((registration) => {
        console.log('Service Worker Registered');

        // Gérez les messages entrants
        onMessage(messaging, (payload) => {
            console.log('Message received. ', payload);
            console.log('Title: ', payload.notification.title);
        });

        // Demandez la permission pour recevoir les notifications push
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                console.log('Notification permission granted.');

                getToken(messaging, { vapidKey: 'BFKzb8AK06lSFuG8_tMMp60c7fn1Mcld3WotLuEl7bv-tGJM8RnfFNmsDmJa_V9gyk7UiN5whfmw1NgZnILGBCQ', serviceWorkerRegistration: registration })
                .then((currentToken) => {
                    if (currentToken) {
                        console.log('Notification Token:', currentToken);
                    } else {
                        console.log('No registration token available. Request permission to generate one.');
                    }
                }).catch((err) => {
                    console.log('An error occurred while retrieving token. ', err);
                });
            }
        });
    }).catch((err) => {
        console.log('Service Worker Registration Failed', err);
    });
}

// Photo upload using cache API
/*document.getElementById('photo-input').addEventListener('change', async function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = async function(e) {
            const imgSrc = e.target.result;
            document.getElementById('photo-preview').src = imgSrc;

            // Mise en cache de l'image
            const cache = await caches.open('my-photo-cache');
            const response = new Response(imgSrc);
            await cache.put('my-photo', response);
        };
        reader.readAsDataURL(file);
    }
});*/

// Photo upload using IndexedDB API
document.getElementById('photo-input').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imgSrc = e.target.result;
            document.getElementById('photo-preview').src = imgSrc;

            // Stockage dans IndexedDB
            const dbRequest = indexedDB.open('myDatabase', 1);
            dbRequest.onupgradeneeded = function(event) {
                const db = event.target.result;
                db.createObjectStore('photos', { autoIncrement: true });
            };
            dbRequest.onsuccess = function(event) {
                const db = event.target.result;
                const transaction = db.transaction('photos', 'readwrite');
                transaction.objectStore('photos').add(imgSrc);
            };
        };
        reader.readAsDataURL(file);
    }
});

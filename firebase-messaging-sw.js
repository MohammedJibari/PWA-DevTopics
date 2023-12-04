// Importez et configurez le SDK Firebase
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js');

// Votre configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC5a0-8TDkgyxqLeu7jzvJd8PdUcALjJm8",
    authDomain: "pwa-test-dc6f1.firebaseapp.com",
    projectId: "pwa-test-dc6f1",
    storageBucket: "pwa-test-dc6f1.appspot.com",
    messagingSenderId: "757986966701",
    appId: "1:757986966701:web:fbaa3678631a527a939a24",
    measurementId: "G-C4FE6K5GKE"
};

// Initialiser Firebase
firebase.initializeApp(firebaseConfig);

// Récupérer une instance de Firebase Messaging pour pouvoir recevoir des notifications push
const messaging = firebase.messaging();

// Gestionnaire d'événements en arrière-plan pour les notifications push entrantes
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  // Personnaliser la notification ici
  const notificationTitle = 'PWA TEST';
  const notificationOptions = {
    title: 'PWA TEST',
    body: payload.notification.body,
    icon: '/firebase-logo.png' // Assurez-vous d'avoir une icône appropriée accessible à cette URL
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});

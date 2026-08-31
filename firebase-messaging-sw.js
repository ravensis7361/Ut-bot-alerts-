importScripts(
  "https://www.gstatic.com/firebasejs/12.18.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/12.18.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyDQ8dW7aLuCZszYdBwxUAPbKoZu9WWOLh0",
  authDomain: "ut-bot-alerts-53c09.firebaseapp.com",
  projectId: "ut-bot-alerts-53c09",
  storageBucket: "ut-bot-alerts-53c09.firebasestorage.app",
  messagingSenderId: "997617891332",
  appId: "1:997617891332:web:254c814da5577f11301d51",
  measurementId: "G-DGJCTYP9LE"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || "UT Bot Alert";
  const options = {
    body: payload.notification?.body || "New trading signal",
    icon: "/ut-bot-alerts/icon.png"
  };

  self.registration.showNotification(title, options);
});

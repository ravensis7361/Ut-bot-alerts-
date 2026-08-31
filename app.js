import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import {
  getMessaging,
  getToken,
  onMessage
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-messaging.js";

const firebaseConfig = {
apiKey: "AIzaSyDQ8dW7aLuCZszYdBwxUAPbKoZu9WWOLh0",
  authDomain: "ut-bot-alerts-53c09.firebaseapp.com",
  projectId: "ut-bot-alerts-53c09",
  storageBucket: "ut-bot-alerts-53c09.firebasestorage.app",
  messagingSenderId: "997617891332",
  appId: "1:997617891332:web:254c814da5577f11301d51",
  measurementId: "G-DGJCTYP9LE"  
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const status = document.getElementById("status");
const button = document.getElementById("enableNotifications");

button.addEventListener("click", async () => {
  const permission = await Notification.requestPermission();

  if (permission !== "granted") {
    status.textContent = "Notification permission denied.";
    return;
  }

  try {
    const token = await getToken(messaging, {
      vapidKey: BHB5L2oZtOyVrYG-WgqLrdPpXNuwZIiTeNge-HtLLMY2XkzFAMZ_NfDOurYXDKndzofgeckEK_rZqXWsCUjeDYA
    });

    console.log("FCM TOKEN:", token);
    status.textContent = "Notifications enabled.";

    new Notification("UT Bot Alerts", {
      body: "Firebase push notification is ready."
    });

  } catch (error) {
    console.error(error);
    status.textContent = "Firebase setup error. Check the configuration.";
  }
});

onMessage(messaging, (payload) => {
  const title = payload.notification?.title || "UT Bot Alert";
  const body = payload.notification?.body || "New signal";

  new Notification(title, { body });
});

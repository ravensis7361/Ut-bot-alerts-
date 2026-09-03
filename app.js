// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQ8dW7aLuCZszYdBwxUAPbKoZu9WWOLh0",
  authDomain: "ut-bot-alerts-53c09.firebaseapp.com",
  projectId: "ut-bot-alerts-53c09",
  storageBucket: "ut-bot-alerts-53c09.firebasestorage.app",
  messagingSenderId: "997617891332",
  appId: "1:997617891332:web:254c814da5577f11301d51",
  measurementId: "G-DGJCTYP9LE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const status = document.getElementById("status");
const button = document.getElementById("enableNotifications");

button.addEventListener("click", async () => {
  try {
    status.textContent = "Starting Firebase...";

    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);

    status.textContent = "Firebase started. Asking permission...";

    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      status.textContent = "Notification permission denied.";
      return;
    }

    status.textContent = "Getting notification token...";

    const token = await getToken(messaging, {
      vapidKey: BHB5L2oZtOyVrYG-WgqLrdPpXNuwZIiTeNge-HtLLMY2XkzFAMZ_NfDOurYXDKndzofgeckEK_rZqXWsCUjeDYA
    });

    if (!token) {
      status.textContent = "No FCM token was generated.";
      return;
    }

    console.log("FCM TOKEN:", token);
    status.textContent = "SUCCESS! Firebase notifications are connected.";

  } catch (error) {
    console.error("Firebase error:", error);
    status.textContent = "ERROR: " + error.code + " | " + error.message;
  }
});

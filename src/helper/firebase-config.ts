/* eslint-disable @typescript-eslint/no-explicit-any */
// firebase-config.ts
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { getFirestore } from "firebase/firestore";

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || true,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || true,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || true,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || true,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "",
};

const firebaseApp: any = initializeApp(firebaseConfig);

// Get Firebase Messaging instance
const messaging = getMessaging(firebaseApp);

const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY;

export const requestFCMToken = async () => {
  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
    });

    return token || "";
  } else if (permission === "denied") {
    console.log("You denied for the notification");
  }
};

const db = getFirestore(firebaseApp);

export { messaging, db };

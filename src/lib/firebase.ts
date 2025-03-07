import { initializeApp } from "firebase/app";
import { initializeFirestore, persistentLocalCache } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Configuración de Firebase usando las variables de entorno
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// 🔥 Activar caché local en Firestore para reducir lecturas
const db = initializeFirestore(app, {
  localCache: persistentLocalCache({ cacheSizeBytes: 50 * 1024 * 1024 }), // 50MB de caché
});

// Obtener Storage
const storage = getStorage(app);

export { db, storage, app };

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

export const getFirebaseApp = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDiMy49SM6x58Y535VN93kTduE0HZ0m0F0",
    authDomain: "chat-app-12f06.firebaseapp.com",
    projectId: "chat-app-12f06",
    storageBucket: "chat-app-12f06.firebasestorage.app",
    messagingSenderId: "955288887072",
    appId: "1:955288887072:web:7736b806c57d66c61f0145",
  };

  return initializeApp(firebaseConfig);
};

export const getDatabaseInstance = () => {
  const app = getFirebaseApp();
  return getDatabase(
    app,
    "https://chat-app-12f06-default-rtdb.asia-southeast1.firebasedatabase.app"
  );
};

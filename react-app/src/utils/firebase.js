import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDqIVa6ZSBopFYL5hDKt4LJRbRJPRSja2A",
  authDomain: "noodleshopsaifor101.firebaseapp.com",
  databaseURL: "https://noodleshopsaifor101-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "noodleshopsaifor101",
  storageBucket: "noodleshopsaifor101.firebasestorage.app",
  messagingSenderId: "167920622903",
  appId: "1:167920622903:web:e27b37600235422fa30eb2",
  measurementId: "G-KH5F5B63RB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and Database
export const auth = getAuth(app);
export const database = getDatabase(app);

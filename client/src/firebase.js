import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCDUPXzJ-LkTHCJm-pKCpSnSo0TAOy7zjA",
  authDomain: "app-auth-firebase-d2c60.firebaseapp.com",
  projectId: "app-auth-firebase-d2c60",
  storageBucket: "app-auth-firebase-d2c60.appspot.com",
  messagingSenderId: "302213569217",
  appId: "1:302213569217:web:72bd5718f27ef4976d1240",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

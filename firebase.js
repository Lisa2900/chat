import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDUzM_aJbUxYuB13JGS7tZ4HGC0r2d4Cso",
    authDomain: "chat-f3ac1.firebaseapp.com",
    projectId: "chat-f3ac1",
    storageBucket: "chat-f3ac1.appspot.com",
    messagingSenderId: "573712458493",
    appId: "1:573712458493:web:7394adc43132229fabd494",
    measurementId: "G-K8QLSML098"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

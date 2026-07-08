import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA6mi7YIs7jSs8zOR4dMJLbE3vclOl3o3M",
    authDomain: "smart-health-ai-25c7b.firebaseapp.com",
    projectId: "smart-health-ai-25c7b",
    storageBucket: "smart-health-ai-25c7b.firebasestorage.app",
    messagingSenderId: "100875769097",
    appId: "1:100875769097:web:279e8d293c779268086fd8",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
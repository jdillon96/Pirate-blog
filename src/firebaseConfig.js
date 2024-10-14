// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsY7hlbLjH2aB4H96uCdZ_uEdvPjzMUlc",
  authDomain: "best-blog-d880b.firebaseapp.com",
  projectId: "best-blog-d880b",
  storageBucket: "best-blog-d880b.appspot.com",
  messagingSenderId: "946999424987",
  appId: "1:946999424987:web:7fd815cd6124385c43d9fe"
};

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
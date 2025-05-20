// src/firebaseConfig.js
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

// Твоя конфігурація Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAS1kDaPYQm1l_Whdaj5XgVx_tBJvaJTCI",
  authDomain: "pole-system-4b71b.firebaseapp.com",
  projectId: "pole-system-4b71b",
  storageBucket: "pole-system-4b71b.appspot.com", // ❗ виправив помилку: було .firebasestorage.app
  messagingSenderId: "709806595782",
  appId: "1:709806595782:web:4328109ce051924f28c1c7"
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)

// firebaseConfig.js
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAS1kDaPYQm1l_Whdaj5XgVx_tBJvaJTCI",
  authDomain: "pole-system-4b71b.firebaseapp.com",
  projectId: "pole-system-4b71b",
  storageBucket: "pole-system-4b71b.appspot.com",
  messagingSenderId: "709806595782",
  appId: "1:709806595782:web:4328109ce051924f28c1c7"
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

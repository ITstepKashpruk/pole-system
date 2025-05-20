import { auth, db } from '../firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { ref } from 'vue'
import { useAuthStore } from '../stores/authStore' // 👈 нове

const user = ref(null)

const initUser = async (firebaseUser) => {
  if (!firebaseUser) return

  const uid = firebaseUser.uid
  const userRef = doc(db, 'users', uid)
  const userSnap = await getDoc(userRef)

  const authStore = useAuthStore() // 👈 ініціалізуємо store

  if (!userSnap.exists()) {
    // якщо новий користувач — створюємо
    await setDoc(userRef, {
      phone: firebaseUser.phoneNumber,
      role: 'client',
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      active: true
    })

    authStore.setUser(firebaseUser, 'client') // 👈 запис у store
  } else {
    const userData = userSnap.data()
    await setDoc(userRef, {
      ...userData,
      lastLogin: serverTimestamp()
    })

    authStore.setUser(firebaseUser, userData.role) // 👈 роль з бази
  }

  user.value = { uid, ...firebaseUser }
}

const watchAuth = () => {
  onAuthStateChanged(auth, (firebaseUser) => {
    initUser(firebaseUser)
  })
}

export function useAuth() {
  return { user, watchAuth }
}

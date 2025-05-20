import { db, app } from '../firebaseConfig'
import { getAuth } from 'firebase/auth'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { useAuthStore } from '../stores/authStore'
const auth = getAuth(app)
const initUser = async (firebaseUser) => {
  const authStore = useAuthStore()

  if (!firebaseUser) {
    authStore.logout()
    return
  }

  try {
    const uid = firebaseUser.uid
    const userRef = doc(db, 'users', uid)
    const userSnap = await getDoc(userRef)

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        phone: firebaseUser.phoneNumber,
        role: 'client',
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        active: true
      })
      authStore.setUser(firebaseUser, 'client')
    } else {
      const userData = userSnap.data()
      await setDoc(userRef, {
        ...userData,
        lastLogin: serverTimestamp()
      })
      authStore.setUser(firebaseUser, userData.role)
    }
  } catch (err) {
    console.error('initUser помилка:', err)
    authStore.logout()
  }
}

export const useAuth = () => {
  const authStore = useAuthStore()

  const watchAuth = () => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      await initUser(firebaseUser)
    })
  }

  return { watchAuth }
}
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const role = ref(null)
  const isAuthReady = ref(false) // 👈 нове

  const setUser = (firebaseUser, userRole) => {
    user.value = firebaseUser
    role.value = userRole
    isAuthReady.value = true
  }

  const logout = () => {
    user.value = null
    role.value = null
    isAuthReady.value = true // 👈 навіть у разі виходу
  }

  return { user, role, isAuthReady, setUser, logout }
})
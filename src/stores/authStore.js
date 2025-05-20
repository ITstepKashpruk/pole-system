import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const role = ref(null)

  const setUser = (u, r) => {
    user.value = u
    role.value = r
  }

  const logout = () => {
    user.value = null
    role.value = null
  }

  return {
    user,
    role,
    setUser,
    logout
  }
})

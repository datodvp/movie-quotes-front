import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const authValue = localStorage.isAuthenticated
  ? JSON.parse(localStorage.isAuthenticated)
  : (localStorage.isAuthenticated = false)

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()

  const isAuthenticated = ref(authValue)

  const getIsAuthenticated = computed(() => isAuthenticated.value)

  const setIsAuthenticated = (payload) => {
    isAuthenticated.value = payload
    localStorage.isAuthenticated = payload
    router.push({ name: 'newsFeed' })
  }

  return {
    getIsAuthenticated,
    setIsAuthenticated
  }
})

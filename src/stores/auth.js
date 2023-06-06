import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const authValue = localStorage.isAuthenticated
  ? JSON.parse(localStorage.isAuthenticated)
  : (localStorage.isAuthenticated = false)

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(authValue)

  const locale = ref('ka')

  const getLocale = computed(() => locale.value)

  const getIsAuthenticated = computed(() => isAuthenticated.value)

  const setIsAuthenticated = (payload) => {
    isAuthenticated.value = payload
    localStorage.isAuthenticated = payload
  }

  return {
    getLocale,
    isAuthenticated,
    getIsAuthenticated,
    setIsAuthenticated
  }
})

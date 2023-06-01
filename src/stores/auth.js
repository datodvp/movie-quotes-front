import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)

  const getIsAuthenticated = computed(() => isAuthenticated.value)

  function setIsAuthenticated(payload) {
    isAuthenticated.value = payload
  }
  return { isAuthenticated, getIsAuthenticated, setIsAuthenticated }
})

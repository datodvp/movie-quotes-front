import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const authValue = localStorage.isAuthenticated
  ? JSON.parse(localStorage.isAuthenticated)
  : (localStorage.isAuthenticated = false)
console.log(authValue)
export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(authValue)

  const getIsAuthenticated = computed(() => isAuthenticated.value)

  function setIsAuthenticated(payload) {
    isAuthenticated.value = payload
  }
  return { isAuthenticated, getIsAuthenticated, setIsAuthenticated }
})

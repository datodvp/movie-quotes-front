import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { authClient } from '../services/AuthService'

const authValue = localStorage.isAuthenticated
  ? JSON.parse(localStorage.isAuthenticated)
  : (localStorage.isAuthenticated = false)

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(authValue)

  const getIsAuthenticated = computed(() => isAuthenticated.value)

  const setIsAuthenticated = (payload) => {
    isAuthenticated.value = payload
  }

  const checkAuthentication = async () => {
    // checks if user is authenticated and sets isAuthenticated value properly
    try {
      const response = await authClient.get('/api/check-authentication')
      setIsAuthenticated(true)
      return response
    } catch (error) {
      setIsAuthenticated(false)
      return error
    }
  }

  const login = async (payload) => {
    try {
      await authClient.get('/sanctum/csrf-cookie')
      const response = await authClient.post('/api/login', payload)
      setIsAuthenticated(true)
      return response
    } catch (error) {
      setIsAuthenticated(false)
      return error
    }
  }

  const authGoogle = () => {
    location.href = `${import.meta.env.VITE_VUE_APP_API_URL}/api/auth/redirect`
  }

  const register = async (payload) => {
    try {
      const response = await authClient.post('/api/register', payload)
      return response
    } catch (error) {
      return error
    }
  }

  const logout = async () => {
    try {
      const response = await authClient.post('/api/logout')
      setIsAuthenticated(false)
      return response
    } catch (error) {
      return error
    }
  }

  const forgotPassword = async (payload) => {
    try {
      const response = await authClient.post('/api/forgot-password', payload)
      return response
    } catch (error) {
      return error
    }
  }

  const resetPassword = async (payload) => {
    try {
      return await authClient.post('/api/reset-password', payload)
    } catch (error) {
      return error
    }
  }

  return {
    isAuthenticated,
    getIsAuthenticated,
    setIsAuthenticated,
    checkAuthentication,
    login,
    authGoogle,
    register,
    logout,
    forgotPassword,
    resetPassword
  }
})

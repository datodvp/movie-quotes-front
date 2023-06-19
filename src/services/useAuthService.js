import axios from 'axios'
import { useUserStore } from '@/stores/user'
import { useAuthStore } from '@/stores/auth'

export const useAuthService = () => {
  const userStore = useUserStore()

  const authClient = axios.create({
    baseURL: import.meta.env.VITE_VUE_APP_API_URL,
    // required to handle the CSRF token
    withCredentials: true,
    headers: {
      'Accept-Language': userStore.getLocale
    }
  })

  // If ever request returns 401 or 419 that will set Authenticated state to FALSE
  authClient.interceptors.response.use(
    (response) => {
      return response
    },
    function (error) {
      const authStore = useAuthStore()
      if (error.response && [401, 419].includes(error.response.status)) {
        authStore.setIsAuthenticated(false)
      }
      return Promise.reject(error)
    }
  )

  return {
    async authGoogle() {
      location.href = `${import.meta.env.VITE_VUE_APP_API_URL}/api/auth/redirect`
    },
    async login(payload) {
      await authClient.get('/sanctum/csrf-cookie')
      return authClient.post('/api/login', payload)
    },
    async logout() {
      return authClient.post('/api/logout')
    },
    async register(payload) {
      return authClient.post('/api/register', payload)
    },
    async forgotPassword(payload) {
      return authClient.post('/api/forgot-password', payload)
    },
    async resetPassword(payload) {
      return authClient.post('/api/reset-password', payload)
    }
  }
}

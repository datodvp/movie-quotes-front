import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import { useInterfaceStore } from '@/stores/interface'

export const useAuthService = () => {
  axios.defaults.withCredentials = true

  const interfaceStore = useInterfaceStore()

  const authClient = axios.create({
    baseURL: import.meta.env.VITE_VUE_APP_API_URL,
    // required to handle the CSRF token
    withCredentials: true,
    headers: {
      'Accept-Language': interfaceStore.getLocale
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
    },
    async getUserData() {
      return authClient.get('/api/user-data')
    },
    async changePassword(payload) {
      return authClient.post('/api/change-user-credentials', payload)
    },
    async getMovies() {
      return authClient.get('/api/movies')
    },
    async postMovie(payload) {
      return authClient.post('/api/movies', payload)
    },
    async getGenres() {
      return authClient.get('/api/movie-genres')
    },
    async getQuotes() {
      return authClient.get('/api/quotes')
    },
    async postQuote(payload) {
      return authClient.post('/api/quotes', payload)
    },
    async getAllMovies() {
      return authClient.get('/api/movies-list')
    },
    async postComment(payload) {
      return authClient.post('/api/comment', payload)
    },
    async postLike(payload) {
      return authClient.post('/api/quote-like', payload)
    },
    async removeLike(payload) {
      return authClient.post('/api/quote-destroy-like', payload)
    },
    async getNotifications() {
      return authClient.get('/api/notifications')
    },
    async markAllNotificationsRead() {
      return authClient.get('/api/notifications/mark-all-read')
    },
    async searchQuotes(payload) {
      return authClient.post('/api/quotes/search', payload)
    }
  }
}

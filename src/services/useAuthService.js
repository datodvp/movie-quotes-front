import axios from 'axios'
import { useUserStore } from '../stores/user'

// import store from '@/store'
/*
 * Add a response interceptor
 */
// authClient.interceptors.response.use(
//   (response) => {
//     return response
//   },
//   function (error) {
//     if (
//       error.response &&
//       [401, 419].includes(error.response.status) &&
//       store.getters['auth/authUser'] &&
//       !store.getters['auth/guest']
//     ) {
//       store.dispatch('auth/logout')
//     }
//     return Promise.reject(error)
//   }
// )

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

  return {
    async authGoogle() {
      location.href = `${import.meta.env.VITE_VUE_APP_API_URL}/api/auth/redirect`
    },
    async login(payload) {
      await authClient.get('/sanctum/csrf-cookie')
      return authClient.post('/api/login', payload)
    },
    async checkAuthentication() {
      return authClient.get('/api/check-authentication')
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
    // async forgotPassword(payload) {
    //   return authClient.post('/forgot-password', payload)
    // },
    // getAuthUser() {
    //   return authClient.get('/api/users/auth')
    // },
    // async resetPassword(payload) {
    //   return authClient.post('/reset-password', payload)
    // },
    // updatePassword(payload) {
    //   return authClient.put('/user/password', payload)
    // },

    // sendVerification(payload) {
    //   return authClient.post('/email/verification-notification', payload)
    // },
    // updateUser(payload) {
    //   return authClient.put('/user/profile-information', payload)
    // }
  }
}

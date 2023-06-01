import axios from 'axios'
// import store from '@/store'

export const authClient = axios.create({
  baseURL: import.meta.env.VITE_VUE_APP_API_URL,
  // required to handle the CSRF token
  withCredentials: true
})

export default {
  authGoogle() {
    location.href = `${import.meta.env.VITE_VUE_APP_API_URL}/api/auth/redirect`
  },
  async login(payload) {
    await authClient.get('/sanctum/csrf-cookie')
    return await authClient.post('/api/login', payload)
  },

  async checkAuthentication() {
    return await authClient.get('/api/check-authentication')
  },

  async logout() {
    return await authClient.post('/api/logout')
  }
}

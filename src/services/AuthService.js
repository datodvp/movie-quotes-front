import axios from 'axios'
// import store from '@/store'

export const authClient = axios.create({
  baseURL: import.meta.env.VITE_VUE_APP_API_URL,
  // required to handle the CSRF token
  withCredentials: true
})

export default {
  // authGoogle() {
  //   location.href = `${import.meta.env.VITE_VUE_APP_API_URL}/api/auth/redirect`
  // }
}

import axios from 'axios'
// import store from '@/store'

export const authClient = (locale = 'en') => {
  const client = axios.create({
    baseURL: import.meta.env.VITE_VUE_APP_API_URL,
    // required to handle the CSRF token
    withCredentials: true,
    headers: {
      'Accept-Language': locale
    }
  })
  return client
}

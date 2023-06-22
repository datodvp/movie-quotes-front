import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'

const userDataLocalStorage = localStorage.userData
  ? JSON.parse(localStorage.userData)
  : (localStorage.userData = JSON.stringify({
      username: '',
      email: '',
      avatarUrl: ''
    }))

export const useUserStore = defineStore('user', () => {
  const userData = reactive(userDataLocalStorage)

  const getUserData = computed(() => userData)

  const setUserData = (key, value) => {
    userData[key] = value
    localStorage.userData = JSON.stringify(userData)
  }

  return {
    getUserData,
    setUserData
  }
})

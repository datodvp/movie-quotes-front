import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'

export const useUserStore = defineStore('user', () => {
  const userData = reactive({
    username: '',
    email: '',
    avatarUrl: ''
  })

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

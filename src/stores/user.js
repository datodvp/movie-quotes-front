import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'

export const useUserStore = defineStore('user', () => {
  const userData = reactive({
    id: '',
    username: '',
    email: '',
    avatarUrl: '',
    image: '',
    notifications: []
  })

  const getUserData = computed(() => userData)

  const setUserData = (key, value) => {
    userData[key] = value
  }

  return {
    getUserData,
    setUserData
  }
})

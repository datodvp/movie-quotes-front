import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      authenticated: null
    }
  },

  getters: {
    isAuthenticated: (state) => state.authenticated
  },

  actions: {}
})

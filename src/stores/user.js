import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const localeValue = localStorage.locale ? localStorage.locale : (localStorage.locale = 'en')

export const useUserStore = defineStore('user', () => {
  const locale = ref(localeValue)

  const getLocale = computed(() => locale.value)

  const setLocale = (payload) => {
    locale.value = payload
    localStorage.locale = payload
  }

  return {
    getLocale,
    setLocale
  }
})

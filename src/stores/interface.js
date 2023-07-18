import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const localeLocalStorage = localStorage.locale ? localStorage.locale : (localStorage.locale = 'en')

export const useInterfaceStore = defineStore('interface', () => {
  const locale = ref(localeLocalStorage)

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

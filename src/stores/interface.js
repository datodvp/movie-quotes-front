import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const localeLocalStorage = localStorage.locale ? localStorage.locale : (localStorage.locale = 'en')

export const useInterfaceStore = defineStore('interface', () => {
  const locale = ref(localeLocalStorage)
  const showNavigation = ref(false)
  const showNotifications = ref(false)

  const getLocale = computed(() => locale.value)
  const setLocale = (payload) => {
    locale.value = payload
    localStorage.locale = payload
  }

  const getShowNavigation = computed(() => showNavigation.value)
  const toggleShowNavigation = () => {
    showNavigation.value = !showNavigation.value
  }

  const getShowNotifications = computed(() => showNotifications.value)
  const toggleShowNotifications = () => {
    showNotifications.value = !showNotifications.value
  }

  return {
    getLocale,
    setLocale,
    getShowNavigation,
    toggleShowNavigation,
    getShowNotifications,
    toggleShowNotifications
  }
})

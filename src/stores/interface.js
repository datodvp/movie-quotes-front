import { defineStore } from 'pinia'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLocale as setLocaleValidation } from '@vee-validate/i18n'

const localeLocalStorage = localStorage.locale ? localStorage.locale : (localStorage.locale = 'en')

export const useInterfaceStore = defineStore('interface', () => {
  const i18n = useI18n()

  const locale = ref(localeLocalStorage)
  const showNavigation = ref(false)

  // Set the locale on component mount
  onMounted(() => {
    setLocaleValidation(locale.value)
    i18n.locale.value = locale.value
  })

  const getLocale = computed(() => locale.value)
  const setLocale = (payload) => {
    locale.value = payload
    i18n.locale.value = payload
    setLocaleValidation(locale.value)
    localStorage.locale = payload
  }
  const getShowNavigation = computed(() => showNavigation.value)
  const toggleShowNavigation = () => {
    showNavigation.value = !showNavigation.value
  }

  return {
    getLocale,
    setLocale,
    getShowNavigation,
    toggleShowNavigation
  }
})

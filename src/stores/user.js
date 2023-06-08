import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLocale as setLocaleValidation } from '@vee-validate/i18n'

const localeValue = localStorage.locale ? localStorage.locale : (localStorage.locale = 'en')

export const useUserStore = defineStore('user', () => {
  const locale = ref(localeValue)

  // set locale for i18n and validation on load
  const i18n = useI18n()
  setLocaleValidation(locale.value)
  i18n.locale.value = locale.value

  const getLocale = computed(() => locale.value)

  const setLocale = (payload) => {
    locale.value = payload
    localStorage.locale = payload
    i18n.locale.value = payload
    setLocaleValidation(locale.value)
  }

  return {
    getLocale,
    setLocale
  }
})

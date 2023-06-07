import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const localeValue = localStorage.locale ? localStorage.locale : (localStorage.locale = 'en')

export const useUserStore = defineStore('user', () => {
  const locale = ref(localeValue)

  // set locale for i18 on load
  const i18n = useI18n()

  i18n.locale.value = locale.value

  const getLocale = computed(() => locale.value)

  const setLocale = (payload) => {
    locale.value = payload
    localStorage.locale = payload
    i18n.locale.value = payload
  }

  return {
    getLocale,
    setLocale
  }
})

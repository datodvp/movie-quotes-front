<script setup>
import { onMounted, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { setLocale } from '@vee-validate/i18n'
import instantiatePusher from '@/helpers/instantiatePusher'

const authStore = useAuthStore()
const route = useRoute()

onMounted(async () => {
  instantiatePusher()
  setLocale(localStorage.getItem('locale') || 'en')

  // checks if route query has google token and sets user on authenticated
  watch(route, (state) => {
    if (state.query.tokenGoogle) {
      authStore.setIsAuthenticated(true)
    }
  })
})
</script>

<template>
  <div class="max-w-[1920px] m-auto from-[#11101A] via-[#08080D] to-[#000000]">
    <RouterView />
  </div>
</template>

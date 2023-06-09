<script setup>
import { onBeforeMount } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { useAuthService } from './services/useAuthService'
import { useAuthStore } from './stores/auth'

const authService = useAuthService()
const authStore = useAuthStore()
const router = useRouter()

onBeforeMount(async () => {
  authStore.$subscribe((_, state) => {
    if (state.isAuthenticated) {
      router.push({ name: 'home' })
    } else if (!state.isAuthenticated) {
      router.push({ name: 'landing' })
    }
  })

  try {
    await authService.checkAuthentication()
    authStore.setIsAuthenticated(true)
  } catch (_) {
    authStore.setIsAuthenticated(false)
  }
})
</script>

<template>
  <div class="max-w-[1920px] m-auto from-[#11101A] via-[#08080D] to-[#000000]">
    <RouterView />
  </div>
</template>

<style>
html {
  scroll-behavior: smooth;
}
body {
  color: #ddccaa;
  background: #08080d;
}
</style>

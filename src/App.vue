<script setup>
import { onMounted, watch } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

onMounted(async () => {
  // checks if user authentication status changes and pushes on according page
  authStore.$subscribe((_, state) => {
    if (state.isAuthenticated) {
      router.push({ name: 'home' })
    } else if (!state.isAuthenticated) {
      router.push({ name: 'landing' })
    }
  })

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

<style>
html {
  scroll-behavior: smooth;
}
body {
  color: white;
  background: #08080d;
}
</style>

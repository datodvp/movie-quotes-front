<script setup>
import { onMounted, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const route = useRoute()

onMounted(async () => {
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
  background: linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0d0b14 98.75%);
  min-height: 100vh;
  height: 100%;
}
</style>

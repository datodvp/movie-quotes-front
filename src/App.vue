<script setup>
import { onBeforeMount } from 'vue';
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth'
import AuthService from './services/AuthService';
import { useRouter } from 'vue-router';

onBeforeMount(() => {
  const authStore = useAuthStore()
  const router = useRouter()
  AuthService.checkAuthentication().then(() => {
    authStore.setIsAuthenticated(true)
    router.push({ name: 'home' })

  }).catch(() => {
    authStore.setIsAuthenticated(false)
    router.push({ name: 'landing' })
  })
})

</script>

<template>
  <div class="w-screen h-screen  from-[#11101A] via-[#08080D] to-[#000000]">

    <RouterView />

  </div>
</template>

<style>
body {
  color: #DDCCAA;
}
</style>

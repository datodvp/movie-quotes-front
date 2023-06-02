<script setup>
import { onBeforeMount } from 'vue';
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth'
import { useRouter } from 'vue-router';

onBeforeMount(() => {
  const authStore = useAuthStore()
  const router = useRouter()


  // subsribe to isAuthenticated state to redirect the user if state changes
  authStore.$subscribe((_, state) => {
    if (state.isAuthenticated) {
      router.push({ name: 'home' })
    } else if (!state.isAuthenticated) {
      router.push({ name: 'landing' })
    }
    localStorage.isAuthenticated = state.isAuthenticated
  })

  // check authentication in case it was not set correctly in the store from localstorage
  authStore.checkAuthentication()
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

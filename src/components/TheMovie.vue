<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthService } from '@/services/useAuthService.js'

const route = useRoute()
const authService = useAuthService()

onMounted(() => {
  authService.getMovie(route.params.id).then((response) => console.log(response))
})
</script>

<template>
  <div></div>
</template>

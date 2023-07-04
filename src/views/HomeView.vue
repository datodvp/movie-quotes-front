<script setup>
import { onMounted } from 'vue'
import { useAuthService } from '@/services/useAuthService'
import { useUserStore } from '../stores/user'
import AuthorizedLayout from '@/layouts/AuthorizedLayout.vue'

const userStore = useUserStore()
const authService = useAuthService()

onMounted(async () => {
  const response = await authService.getUserData()
  const userData = response.data.data.user
  userStore.setUserData('username', userData.username)
  userStore.setUserData('email', userData.email)
  userStore.setUserData('googleId', userData.google_id)
  userStore.setUserData('image', userData.image)
})
</script>

<template>
  <AuthorizedLayout>
    <RouterView></RouterView>
  </AuthorizedLayout>
</template>

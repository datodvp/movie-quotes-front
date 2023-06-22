<script setup>
import { onMounted } from 'vue'
import { useAuthService } from '@/services/useAuthService'
import { useUserStore } from '../stores/user'
import AuthorizedLayout from '@/layouts/AuthorizedLayout.vue'

const userStore = useUserStore()
const authService = useAuthService()

onMounted(async () => {
  try {
    const response = await authService.getUserData()
    const userData = response.data.data.user
    userStore.setUserData('username', userData.username)
  } catch (err) {
    console.log(err)
  }
})
</script>

<template>
  <AuthorizedLayout>
    <RouterView></RouterView>
  </AuthorizedLayout>
</template>

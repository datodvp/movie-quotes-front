<script setup>
import { onMounted } from 'vue'
import { useAuthService } from '@/services/useAuthService'
import { useUserStore } from '../stores/user'
import AuthorizedLayout from '@/layouts/AuthorizedLayout.vue'
import { useNotificationsStore } from '../stores/notifications'

const userStore = useUserStore()
const authService = useAuthService()
const notificationsStore = useNotificationsStore()

onMounted(async () => {
  const response = await authService.getUserData()
  const userData = response.data.data.user
  userStore.setUserData('id', userData.id)
  userStore.setUserData('username', userData.username)
  userStore.setUserData('email', userData.email)
  userStore.setUserData('googleId', userData.google_id)
  userStore.setUserData('image', userData.image)

  const notificationsResponse = await authService.getNotifications()
  notificationsStore.setNotifications(notificationsResponse.data.data.notifications.reverse())
})
</script>

<template>
  <AuthorizedLayout>
    <RouterView></RouterView>
  </AuthorizedLayout>
</template>

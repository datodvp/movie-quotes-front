<script setup>
import IconQuote from '@/components/icons/IconQuote.vue'
import IconHeart from '@/components/icons/IconHeart.vue'
import DefaultAvatar from '@/assets/images/defaultAvatar.png'
import IconPolygon from '@/components/icons/IconPolygon.vue'
import { useNotificationsStore } from '@/stores/notifications'
import { useAuthService } from '@/services/useAuthService'

defineProps({
  userStore: {
    type: Object,
    required: true
  }
})

const notificationsStore = useNotificationsStore()

const authService = useAuthService()

const markAllNotificationsRead = () => {
  authService.markAllNotificationsRead().then((response) => {
    const notifications = response.data.data.notifications
    notificationsStore.setNotifications(notifications.reverse())
  })
}

const backend_API_URL = import.meta.env.VITE_VUE_APP_API_URL

const avatarLink = (notification) => {
  if (notification.notifiable.user && notification.notifiable.user.image) {
    return `${backend_API_URL}/${notification.notifiable.user.image}`
  } else if (notification.notifiable.image) {
    return `${backend_API_URL}/${notification.notifiable.image}`
  }
  return DefaultAvatar
}
</script>

<template>
  <div
    class="absolute md:w-[51%] md:right-[64px] rounded-xl flex flex-col w-full py-6 bg-black h-fit top-full px-11"
  >
    <IconPolygon class="absolute right-[30px] md:right-[265px] -top-4" />
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-medium">Notifications</h2>
      <p @click="markAllNotificationsRead" class="underline cursor-pointer hover:text-[#6C757D]">
        Mark all as read
      </p>
    </div>
    <div
      class="flex flex-col gap-4 md:h-fit md:max-h-[500px] h-fit max-h-[700px] overflow-y-auto pr-3"
    >
      <template v-for="notification in notificationsStore.getNotifications" :key="notification.id">
        <div
          class="flex hover:text-[#6C757D] duration-100 md:flex-row md:justify-between cursor-pointer flex-col py-[18px] px-[25px] border-[#6C757D80] border rounded-[4px]"
        >
          <div class="flex">
            <div class="min-w-[60px] mix-h-[60px] mr-4">
              <img
                :src="avatarLink(notification)"
                alt="avatar"
                class="w-[60px] h-[60px] rounded-full object-cover"
                :class="notification.is_active && 'border-[#198754] border-[3px] rounded-full'"
              />
            </div>
            <div class="flex flex-col justify-center gap-1">
              <p>{{ notification.username }}</p>
              <p class="flex gap-3">
                <IconQuote
                  v-if="notification.text === 'Commented to your movie quote'"
                  class="w-6 h-6"
                />
                <IconHeart v-else class="w-6 h-6" />{{ notification.text }}
              </p>
            </div>
          </div>

          <div class="flex md:flex-col-reverse md:justify-end whitespace-nowrap">
            <p v-show="notification.is_active" class="md:ml-0 ml-3 mr-7 text-[#198754]">New</p>
            <p :class="!notification.is_active && 'ml-[4.7rem]'">{{ notification.created_ago }}</p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

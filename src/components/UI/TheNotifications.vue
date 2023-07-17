<script setup>
import IconQuote from '@/components/icons/IconQuote.vue'
import IconHeart from '@/components/icons/IconHeart.vue'
import DefaultAvatar from '@/assets/images/defaultAvatar.png'
import IconPolygon from '@/components/icons/IconPolygon.vue'
import { useNotificationsStore } from '@/stores/notifications'
import { useAuthService } from '@/services/useAuthService'
import timeDiff from 'time-diff-for-humans'
import { useRouter } from 'vue-router'

defineProps({
  userStore: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

const notificationsStore = useNotificationsStore()

const router = useRouter()

const authService = useAuthService()

const markAllNotificationsRead = () => {
  authService.markAllNotificationsRead().then((response) => {
    const notifications = response.data.data.notifications
    notificationsStore.setNotifications(notifications.reverse())
  })
}

const handleClick = async (notification) => {
  // mark as notified
  const response = await authService.markAsRead(notification.id)
  const notifications = response.data.data.notifications
  notificationsStore.setNotifications(notifications.reverse())
  emit('close')
  router.push({ name: 'quotePage', params: { id: notification.quote.id } })
}

const avatarLink = (notification) => {
  if (notification.notifiable.user && notification.notifiable.user.image) {
    return notification.notifiable.user.image
  } else if (notification.notifiable.image) {
    return notification.notifiable.image
  }
  return DefaultAvatar
}

const activeNotificationImageBorder = (notification) => {
  if (notification.is_active) return 'border-[#198754] border-[3px] rounded-full'
}

const activeNotificationStyling = (notification) => {
  if (!notification.is_active) return 'ml-[4.7rem]'
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
          @click="handleClick(notification)"
          class="flex hover:text-[#6C757D] duration-100 md:flex-row md:justify-between cursor-pointer flex-col py-[18px] px-[25px] border-[#6C757D80] border rounded-[4px]"
        >
          <div class="flex">
            <div class="min-w-[60px] mix-h-[60px] mr-4">
              <img
                :src="avatarLink(notification)"
                alt="avatar"
                class="w-[60px] h-[60px] rounded-full object-cover"
                :class="activeNotificationImageBorder(notification)"
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
            <p :class="activeNotificationStyling">
              {{ timeDiff(notification.created_at) }}
            </p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

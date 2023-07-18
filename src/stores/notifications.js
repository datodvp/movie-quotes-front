import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useNotificationsStore = defineStore('notifications', () => {
  const notifications = ref([])

  const getNotifications = computed(() => notifications.value)

  const addNotification = (newNotification) => {
    notifications.value.unshift(newNotification[0])
  }

  const setNotifications = (notificationsList) => {
    notifications.value = notificationsList
  }

  const updateNotification = (updatedNotification) => {
    notifications.value = notifications.value.map((notification) => {
      if (notification.id === updatedNotification.id) {
        return updatedNotification
      }
      return notification
    })
  }

  return {
    getNotifications,
    addNotification,
    setNotifications,
    updateNotification
  }
})

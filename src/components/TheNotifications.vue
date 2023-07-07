<script setup>
import IconQuote from '@/components/icons/IconQuote.vue'
import DefaultAvatar from '@/assets/images/defaultAvatar.png'
import IconPolygon from '@/components/icons/IconPolygon.vue'
import { useInterfaceStore } from '@/stores/interface'

defineProps({
  userStore: {
    type: Object,
    required: true
  }
})

const interfaceStore = useInterfaceStore()
</script>

<template>
  <div
    class="absolute md:w-[51%] md:right-[64px] rounded-xl flex flex-col w-full py-6 bg-black h-fit top-full px-11"
  >
    <IconPolygon class="absolute right-[30px] md:right-[240px] -top-4" />
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-medium">Notifications</h2>
      <p class="underline">Mark all as read</p>
    </div>
    <div class="flex flex-col w-full h-fit gap-y-2">
      <div
        v-for="notification in userStore.getUserData.notifications"
        :key="notification.id"
        @click="interfaceStore.toggleShowNotifications"
        class="p-4 border cursor-pointer border-[#6C757D80] gap-x-3 flex rounded-[4px]"
      >
        <div class="flex flex-col items-center gap-y-[5px]">
          <img :src="DefaultAvatar" alt="avatar" class="w-[60px] h-[60px]" />
          <p class="text-[#198754]">New</p>
        </div>
        <div>
          <p class="text-xl">
            {{ notification.username }}
          </p>
          <p class="text-[#CED4DA]">{{ notification.text }}</p>
          <p class="flex gap-3 mt-2"><IconQuote class="w-6 h-6" />{{ notification.created_ago }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

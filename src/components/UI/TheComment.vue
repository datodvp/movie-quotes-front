<script setup>
import DefaultAvatar from '@/assets/images/defaultAvatar.png'

defineProps({
  comment: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="mt-6">
    <div class="flex items-center gap-6">
      <img
        :src="comment.user.image ? comment.user.image : DefaultAvatar"
        alt="avatar"
        class="w-[52px] h-[52px] object-cover rounded-full"
      />
      <p class="text-xl font-medium">{{ comment.user.username }}</p>
    </div>
    <div class="pl-[4.8rem] text-xl">
      <p>
        {{ comment.text }}
      </p>
      <hr class="border-[#EFEFEF4D] mt-6" />
    </div>
  </div>
</template>

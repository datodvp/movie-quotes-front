<script setup>
import DefaultAvatar from '@/assets/images/defaultAvatar.png'
import IconComment from '@/components/icons/IconComment.vue'
import IconLike from '@/components/icons/IconLike.vue'
import TheComment from '@/components/TheComment.vue'
import AddComment from '@/components/AddComment.vue'
import { useInterfaceStore } from '@/stores/interface'

defineProps({
  quote: {
    type: Object,
    required: true
  }
})

const interfaceStore = useInterfaceStore()
</script>

<template>
  <div class="w-full bg-[#11101A] p-6 rounded-xl mb-10">
    <div class="flex items-center gap-4 mb-4">
      <img :src="DefaultAvatar" alt="avatar" class="w-[52px] h-[52px]" />
      <p>{{ quote.user.username }}</p>
    </div>
    <p class="mb-7">{{ quote.text }} - {{ quote.movie.name[interfaceStore.getLocale] }} (YEAR)</p>
    <img
      :src="DefaultAvatar"
      alt="avatar"
      class="w-full bg-white h-[31.3rem] rounded-[10px] mb-6"
    />
    <div class="flex gap-6">
      <p class="flex gap-3">3 <IconComment /></p>
      <p class="flex gap-3">10 <IconLike /></p>
    </div>
    <hr class="border-[#EFEFEF4D] mt-6" />
    <div v-for="comment in quote.comments" :key="comment.id">
      <TheComment :comment="comment" />
    </div>
    <AddComment />
  </div>
</template>

<script setup>
import DefaultAvatar from '@/assets/images/defaultAvatar.png'
import IconQuote from '@/components/icons/IconQuote.vue'

defineProps({
  movie: {
    type: Object,
    required: true
  }
})

const backend_API_URL = import.meta.env.VITE_VUE_APP_API_URL
</script>

<template>
  <div class="w-[26.5rem] min-h-[28.5rem]">
    <img
      :src="movie.image ? `${backend_API_URL}/${movie.image}` : DefaultAvatar"
      alt="image"
      class="h-[371px] bg-white w-full object-cover rounded-xl"
    />
    <div class="my-4 text-2xl font-medium">{{ movie.name }} {{ `(${movie.year})` }}</div>

    <div class="flex items-center gap-3"><span>10</span> <IconQuote /></div>
  </div>
</template>

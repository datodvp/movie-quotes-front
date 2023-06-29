<script setup>
import DefaultAvatar from '@/assets/images/defaultAvatar.png'
import IconQuote from '@/components/icons/IconQuote.vue'

defineProps({
  movie: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="w-[26.5rem] min-h-[28.5rem]">
    <img :src="DefaultAvatar" alt="image" class="h-[371px] bg-white w-full rounded-xl" />
    <div class="my-4 text-2xl font-medium">{{ movie.name }} {{ `(${movie.year})` }}</div>

    <div class="flex items-center gap-3"><span>10</span> <IconQuote /></div>
  </div>
</template>

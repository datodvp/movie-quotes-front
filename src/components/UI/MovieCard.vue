<script setup>
import DefaultAvatar from '@/assets/images/defaultAvatar.png'
import IconQuote from '@/components/icons/IconQuote.vue'
import { useInterfaceStore } from '@/stores/interface'
import { RouterLink } from 'vue-router'

defineProps({
  movie: {
    type: Object,
    required: true
  }
})
const interfaceStore = useInterfaceStore()
const backend_API_URL = import.meta.env.VITE_VUE_APP_API_URL
</script>

<template>
  <RouterLink
    :to="{ name: 'moviePage', params: { id: movie.id } }"
    class="w-[26.5rem] block min-h-[28.5rem] border-transparent border rounded-md p-4 hover:border-gray-500 hover:cursor-pointer hover:text-gray-500"
  >
    <img
      :src="movie.image ? `${backend_API_URL}/${movie.image}` : DefaultAvatar"
      alt="image"
      class="h-[371px] bg-white w-full object-cover rounded-xl"
    />
    <div class="my-4 text-2xl font-medium">
      {{ movie.name[interfaceStore.getLocale] }} {{ `(${movie.year})` }}
    </div>

    <div class="flex items-center gap-3">
      <span>{{ movie.quotes.length }}</span> <IconQuote />
    </div>
  </RouterLink>
</template>

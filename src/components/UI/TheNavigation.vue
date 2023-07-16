<script setup>
import DefaultAvatar from '@/assets/images/defaultAvatar.png'
import IconMoviesList from '@/components/icons/IconMoviesList.vue'
import IconNewsFeed from '@/components/icons/IconNewsFeed.vue'
import { useUserStore } from '@/stores/user'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const userData = useUserStore().getUserData

defineEmits(['close'])

const backend_API_URL = import.meta.env.VITE_VUE_APP_API_URL
</script>

<template>
  <div
    class="bg-[#11101A] fixed md:static md:block pb-11 min-w-[400px] z-10 pr-8 md:bg-transparent w-[90%] md:w-[28%]"
  >
    <div class="flex flex-col sticky top-[84px] pt-10 md:pl-[4.5rem] md:pt-8 pl-11 gap-11">
      <RouterLink
        :to="{ name: 'profile' }"
        @click="$emit('close')"
        class="flex items-center hover:text-[#6C757D] duration-300 gap-6 cursor-pointer"
      >
        <img
          :src="userData.image ? `${backend_API_URL}/${userData.image}` : DefaultAvatar"
          alt="avatar"
          :class="route.name === 'profile' && 'border-red-700 border-2'"
          class="w-[60px] h-[60px] object-cover rounded-full"
        />
        <div>
          <p class="text-xl md:text-2xl">{{ userData.username }}</p>
          <p class="text-sm md:text-base text-[#CED4DA;]">{{ $t('texts.edit_your_profile') }}</p>
        </div>
      </RouterLink>

      <RouterLink
        :to="{ name: 'newsFeed' }"
        @click="$emit('close')"
        class="flex items-center gap-[43px] ml-[10px] cursor-pointer duration-300 hover:text-[#6C757D]"
      >
        <div class="flex items-center justify-center">
          <IconNewsFeed
            :class="route.name === 'newsFeed' && 'text-red-700 duration-300'"
            class="w-6 h-6 md:h-8 md:w-8"
          />
        </div>

        <p class="text-xl md:text-2xl">{{ $t('texts.news_feed') }}</p>
      </RouterLink>

      <RouterLink
        :to="{ name: 'moviesList' }"
        @click="$emit('close')"
        class="flex items-center gap-[43px] ml-[10px] cursor-pointer duration-300 hover:text-[#6C757D]"
      >
        <div class="flex items-center justify-center">
          <IconMoviesList
            :class="route.name === 'moviesList' && 'text-red-700 duration-300'"
            class="w-6 h-6 md:h-8 md:w-8"
          />
        </div>

        <p class="text-xl md:text-2xl">{{ $t('texts.list_of_movies') }}</p>
      </RouterLink>
    </div>
  </div>
</template>

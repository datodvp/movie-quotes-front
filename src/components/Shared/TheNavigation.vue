<script setup>
import DefaultAvatar from '@/assets/images/defaultAvatar.png'
import IconMoviesList from '@/components/icons/IconMoviesList.vue'
import IconNewsFeed from '@/components/icons/IconNewsFeed.vue'
import { useUserStore } from '../../stores/user'
import { useInterfaceStore } from '@/stores/interface'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const userData = useUserStore().getUserData
const interfaceStore = useInterfaceStore()

const backend_API_URL = import.meta.env.VITE_VUE_APP_API_URL
</script>

<template>
  <div
    :class="!interfaceStore.getShowNavigation && 'hidden md:block'"
    class="bg-[#11101A] absolute md:static md:block pb-11 min-w-fit pr-8 md:bg-transparent w-[90%] md:w-[28%]"
  >
    <div class="flex flex-col sticky top-[84px] pt-10 md:pl-[4.5rem] md:pt-8 pl-11 gap-11">
      <RouterLink
        :to="{ name: 'profile' }"
        class="flex items-center hover:text-[#6C757D] gap-6 cursor-pointer"
      >
        <img
          :src="userData.image ? `${backend_API_URL}/${userData.image}` : DefaultAvatar"
          alt="avatar"
          :class="route.name === 'profile' && 'border-red-700 border-2'"
          class="w-[60px] h-[60px] rounded-full"
        />
        <div>
          <p class="text-xl md:text-2xl">{{ userData.username }}</p>
          <p class="text-sm md:text-base text-[#CED4DA;]">{{ $t('texts.edit_your_profile') }}</p>
        </div>
      </RouterLink>

      <RouterLink
        :to="{ name: 'newsFeed' }"
        class="flex items-center gap-[43px] ml-[10px] cursor-pointer hover:text-[#6C757D]"
      >
        <div class="flex items-center justify-center">
          <IconNewsFeed
            :class="route.name === 'newsFeed' && 'text-red-700'"
            class="w-6 h-6 md:h-8 md:w-8"
          />
        </div>

        <p class="text-xl md:text-2xl">{{ $t('texts.news_feed') }}</p>
      </RouterLink>

      <RouterLink
        :to="{ name: 'moviesList' }"
        class="flex items-center gap-[43px] ml-[10px] cursor-pointer hover:text-[#6C757D]"
      >
        <div class="flex items-center justify-center">
          <IconMoviesList
            :class="route.name === 'moviesList' && 'text-red-700'"
            class="w-6 h-6 md:h-8 md:w-8"
          />
        </div>

        <p class="text-xl md:text-2xl">{{ $t('texts.list_of_movies') }}</p>
      </RouterLink>
    </div>
  </div>
</template>

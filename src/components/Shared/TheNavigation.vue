<script setup>
import DefaultAvatar from '@/assets/images/defaultAvatar.png'
import IconMoviesList from '@/components/icons/IconMoviesList.vue'
import IconNewsFeed from '@/components/icons/IconNewsFeed.vue'
import { useUserStore } from '../../stores/user'
import { useInterfaceStore } from '@/stores/interface'

const userData = useUserStore().getUserData
const interfaceStore = useInterfaceStore()
</script>

<template>
  <div
    :class="!interfaceStore.getShowNavigation && 'hidden md:block'"
    class="bg-[#11101A] absolute md:static md:block pb-11 min-w-fit pr-8 md:bg-transparent w-[90%] md:w-[28%]"
  >
    <div class="flex flex-col pt-10 md:pl-[4.5rem] md:pt-8 pl-11 gap-11">
      <div
        class="flex items-center hover:text-[#6C757D] gap-6 cursor-pointer [&>*:first-child]:hover:border-2 [&>*:first-child]:border-red-700"
      >
        <img :src="DefaultAvatar" alt="avatar" class="w-[60px] h-[60px] rounded-full" />
        <div>
          <p class="text-xl md:text-2xl">{{ userData.username }}</p>
          <p class="text-sm md:text-base text-[#CED4DA;]">Edit your profile</p>
        </div>
      </div>

      <div class="flex items-center gap-[43px] ml-[10px] cursor-pointer hover:text-[#6C757D]">
        <div class="flex items-center justify-center">
          <IconNewsFeed class="w-6 h-6 md:h-8 md:w-8" />
        </div>

        <p class="text-xl md:text-2xl">News feed</p>
      </div>

      <div class="flex items-center gap-[43px] ml-[10px] cursor-pointer hover:text-[#6C757D]">
        <div class="flex items-center justify-center">
          <IconMoviesList class="w-6 h-6 md:h-8 md:w-8" />
        </div>

        <p class="text-xl md:text-2xl">List of movies</p>
      </div>
    </div>
  </div>
</template>

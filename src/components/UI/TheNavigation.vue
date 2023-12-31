<script setup>
import DefaultAvatar from '@/assets/images/defaultAvatar.png'
import IconMoviesList from '@/components/icons/IconMoviesList.vue'
import IconNewsFeed from '@/components/icons/IconNewsFeed.vue'
import { useUserStore } from '@/stores/user'
import { computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useAuthService } from '@/services/useAuthService.js'
import { useAuthStore } from '@/stores/auth.js'

const route = useRoute()
const userData = useUserStore().getUserData
const authService = useAuthService()
const authStore = useAuthStore()
const router = useRouter()

const logout = async () => {
  try {
    await authService.logout()
  } catch (error) {
    // it will not throw unexpected error just logs out user
  }
  authStore.setIsAuthenticated(false)
  router.push({ name: 'landing' })
}

defineEmits(['close'])

const routeIsProfile = computed(() => route.name === 'profile' && 'border-red-700 border-2')
const routeIsNewsFeed = computed(() => route.name === 'newsFeed' && 'text-red-700 duration-300')
const routeIsMoviesList = computed(() => route.name === 'moviesList' && 'text-red-700 duration-300')
</script>

<template>
  <div
    class="bg-[#11101A] fixed md:static md:block pb-11 min-w-[25rem] z-10 pr-8 md:bg-transparent w-[90%] md:w-[28%]"
  >
    <div class="flex flex-col sticky top-[5.25rem] pt-10 md:pl-[4.5rem] md:pt-8 pl-11 gap-11">
      <RouterLink
        :to="{ name: 'profile' }"
        @click="$emit('close')"
        class="flex items-center hover:text-[#6C757D] duration-300 gap-6 cursor-pointer"
      >
        <img
          :src="userData.image ? userData.image : DefaultAvatar"
          alt="avatar"
          :class="routeIsProfile"
          class="w-[3.25rem] h-[3.25rem] object-cover rounded-full"
        />
        <div>
          <p class="text-xl md:text-2xl">{{ userData.username }}</p>
          <p class="text-sm md:text-base text-[#CED4DA;]">{{ $t('texts.edit_your_profile') }}</p>
        </div>
      </RouterLink>

      <RouterLink
        :to="{ name: 'newsFeed' }"
        @click="$emit('close')"
        class="flex items-center gap-[2.688rem] ml-[0.625rem] cursor-pointer duration-300 hover:text-[#6C757D]"
      >
        <div class="flex items-center justify-center">
          <IconNewsFeed :class="routeIsNewsFeed" class="w-6 h-6 md:h-8 md:w-8" />
        </div>

        <p class="text-xl md:text-2xl">{{ $t('texts.news_feed') }}</p>
      </RouterLink>

      <RouterLink
        :to="{ name: 'moviesList' }"
        @click="$emit('close')"
        class="flex items-center gap-[2.688rem] ml-[0.625rem] cursor-pointer duration-300 hover:text-[#6C757D]"
      >
        <div class="flex items-center justify-center">
          <IconMoviesList :class="routeIsMoviesList" class="w-6 h-6 md:h-8 md:w-8" />
        </div>

        <p class="text-xl md:text-2xl">{{ $t('texts.list_of_movies') }}</p>
      </RouterLink>
      <div @click="logout" class="mt-10 text-xl cursor-pointer md:hidden hover:text-red-500">
        Log out
      </div>
    </div>
  </div>
</template>

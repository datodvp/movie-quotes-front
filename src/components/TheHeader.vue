<script setup>
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue'
import IconArrow from '@/components/icons/IconArrow.vue'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'
import SecondaryButton from '@/components/Buttons/SecondaryButton.vue'
import IconNotification from '@/components/icons/IconNotification.vue'
import IconBurger from '@/components/icons/IconBurger.vue'
import IconSearch from '@/components/icons/IconSearch.vue'

import { useAuthService } from '@/services/useAuthService'
import { useInterfaceStore } from '@/stores/interface'

import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import TheNotifications from '@/components/TheNotifications.vue'
import { useNotificationsStore } from '../stores/notifications'

const authStore = useAuthStore()
const userStore = useUserStore()
const interfateStore = useInterfaceStore()
const authService = useAuthService()
const router = useRouter()
const notificationsStore = useNotificationsStore()

const { t } = useI18n()

const isLanguageOpen = ref(false)
const currentLanguageLabel = computed(() => {
  if (interfateStore.getLocale === 'en') {
    return t('header.eng')
  } else {
    return t('header.geo')
  }
})

const logout = async () => {
  try {
    await authService.logout()
  } catch (error) {
    // it will not throw unexpected error just logs out user
  }
  authStore.setIsAuthenticated(false)
  router.push({ name: 'landing' })
}

const setLocale = (locale) => {
  interfateStore.setLocale(locale)
}

const toggleLanguage = () => {
  isLanguageOpen.value = !isLanguageOpen.value
}

const activeNotificationsNumber = computed(() => {
  return notificationsStore.getNotifications.filter((notification) => notification.is_active).length
})
</script>

<template>
  <header class="sticky top-0 z-20">
    <Transition>
      <TheNotifications
        v-if="interfateStore.getShowNotifications && authStore.getIsAuthenticated"
        :userStore="userStore"
      />
    </Transition>
    <div
      class="w-full max-w-[1920px] px-9 py-6 md:px-16"
      :class="authStore.getIsAuthenticated && 'bg-[#222030]'"
    >
      <nav class="flex items-center justify-between">
        <IconBurger
          @click="interfateStore.toggleShowNavigation"
          v-if="authStore.getIsAuthenticated"
          class="cursor-pointer md:hidden"
        />
        <h1 :class="authStore.getIsAuthenticated && 'hidden md:block'">MOVIE QUOTES</h1>
        <div class="relative flex items-center gap-8">
          <IconSearch v-if="authStore.getIsAuthenticated" class="cursor-pointer md:hidden" />
          <div
            @click="interfateStore.toggleShowNotifications"
            v-if="authStore.getIsAuthenticated"
            class="relative"
          >
            <span
              class="absolute cursor-pointer left-[14px] top-[-6px] bg-[#E33812] w-[25px] h-[25px] text-center rounded-full"
            >
              {{ activeNotificationsNumber }}
            </span>
            <IconNotification class="cursor-pointer" />
          </div>

          <div
            tabindex="0"
            @click="toggleLanguage"
            @focusout="!isLanguageOpen && toggleLanguage"
            class="items-center justify-center hidden gap-2 cursor-pointer md:flex mr-7"
          >
            {{ currentLanguageLabel }}
            <IconArrow />
            <div
              v-if="isLanguageOpen"
              class="absolute top-[100%] border w-fit bg-slate-800 flex flex-col"
            >
              <p class="p-1 cursor-pointer hover:bg-slate-700" @click="setLocale('en')">
                {{ $t('header.english') }}
              </p>
              <p class="p-1 cursor-pointer hover:bg-slate-700" @click="setLocale('ka')">
                {{ $t('header.georgian') }}
              </p>
            </div>
          </div>

          <div
            v-if="!authStore.getIsAuthenticated"
            class="flex flex-row-reverse gap-2 md:gap-4 md:flex-row"
          >
            <PrimaryButton>
              <RouterLink to="sign-up">{{ $t('header.sign_up') }}</RouterLink>
            </PrimaryButton>
            <SecondaryButton>
              <RouterLink :to="{ name: 'login' }">
                {{ $t('header.log_in') }}
              </RouterLink>
            </SecondaryButton>
          </div>
          <div v-else class="flex-row-reverse hidden w-[130px] gap-2 md:flex md:gap-4 md:flex-row">
            <SecondaryButton @click="logout">
              <a>{{ $t('header.log_out') }}</a>
            </SecondaryButton>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>

<script setup>
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue'
import IconArrow from '@/components/icons/IconArrow.vue'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'
import SecondaryButton from '@/components/Buttons/SecondaryButton.vue'
import IconNotification from '@/components/icons/IconNotification.vue'
import IconBurger from '@/components/icons/IconBurger.vue'
import { setLocale as setLocaleValidation } from '@vee-validate/i18n'
import { useAuthService } from '@/services/useAuthService'
import { useInterfaceStore } from '@/stores/interface'

import { useRouter } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import TheNotifications from '@/components/UI/TheNotifications.vue'
import { useNotificationsStore } from '@/stores/notifications'
import TheNavigation from '@/components/UI/TheNavigation.vue'

const authStore = useAuthStore()
const userStore = useUserStore()
const interfateStore = useInterfaceStore()
const authService = useAuthService()
const router = useRouter()
const notificationsStore = useNotificationsStore()

const { t } = useI18n()
const i18n = useI18n()

const isLanguageOpen = ref(false)
const currentLanguageLabel = computed(() => {
  if (interfateStore.getLocale === 'en') {
    return t('header.eng')
  } else {
    return t('header.geo')
  }
})

onMounted(async () => {
  const response = await authService.getUserData()
  const userData = response.data.data.user
  userStore.setUserData('id', userData.id)
  userStore.setUserData('username', userData.username)
  userStore.setUserData('email', userData.email)
  userStore.setUserData('googleId', userData.google_id)
  userStore.setUserData('image', userData.image)

  const notificationsResponse = await authService.getNotifications()
  notificationsStore.setNotifications(notificationsResponse.data.data.notifications.reverse())

  window.Echo.private(`notifications.${userStore.getUserData.id}`).listen(
    'NotificationAdded',
    (data) => {
      const { notification } = data
      notificationsStore.addNotification(notification)
    }
  )
})

onMounted(async () => {})

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
  i18n.locale.value = locale
  setLocaleValidation(locale)
}

const toggleLanguage = () => {
  isLanguageOpen.value = !isLanguageOpen.value
}

const activeNotificationsNumber = computed(() => {
  return notificationsStore.getNotifications.filter((notification) => notification.is_active).length
})

const showNotifications = ref(false)
const closeNotifications = () => {
  showNotifications.value = false
}
const toggleShowNotifications = () => {
  showNotifications.value = !showNotifications.value
}

const showNavbar = ref(false)
const toggleNavbar = () => {
  showNavbar.value = !showNavbar.value
}
const closeNavbar = () => {
  showNavbar.value = false
}

const showOrHideNavbar = computed(() => (showNavbar.value ? 'static' : 'hidden'))
const authenticatedBackground = computed(() => authStore.getIsAuthenticated && 'bg-[#222030]')
const showNotificationsOnAuthenticated = computed(
  () => showNotifications.value && authStore.getIsAuthenticated
)
</script>

<template>
  <header class="sticky top-0 z-20">
    <Transition>
      <TheNotifications
        v-if="showNotificationsOnAuthenticated"
        @close="closeNotifications"
        :userStore="userStore"
      />
    </Transition>
    <div class="w-full max-w-[1920px] px-9 py-6 md:px-16" :class="authenticatedBackground">
      <nav class="flex items-center justify-between">
        <IconBurger
          @click="toggleNavbar"
          v-if="authStore.getIsAuthenticated"
          class="cursor-pointer md:hidden mr-11"
        />
        <h1 :class="authStore.getIsAuthenticated && 'hidden md:block'">MOVIE QUOTES</h1>
        <div
          :class="
            authStore.getIsAuthenticated
              ? 'flex-row-reverse md:flex-row justify-between w-full md:w-min'
              : ''
          "
          class="relative flex items-center gap-8"
        >
          <div
            @click="toggleShowNotifications"
            v-if="authStore.getIsAuthenticated"
            class="relative group"
          >
            <span
              class="absolute cursor-pointer left-[14px] top-[-6px] bg-[#E33812] w-[25px] h-[25px] text-center rounded-full"
            >
              {{ activeNotificationsNumber }}
            </span>
            <IconNotification class="cursor-pointer group-hover:text-[#6C757D] duration-100" />
          </div>

          <div
            tabindex="0"
            @click="toggleLanguage"
            @focusout="!isLanguageOpen && toggleLanguage"
            class="cursor-pointer"
            :class="!authStore.getIsAuthenticated && 'hidden'"
          >
            <div class="flex items-center gap-2 group">
              <p class="group-hover:text-[#6C757D]">{{ currentLanguageLabel }}</p>
              <IconArrow class="group-hover:text-[#6C757D]" />
            </div>

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
    <TheNavigation @close="closeNavbar" :class="showOrHideNavbar" class="md:hidden" />
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

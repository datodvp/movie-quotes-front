<script setup>
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue'
import IconArrow from '@/components/icons/IconArrow.vue'
import { useAuthStore } from '@/stores/auth'
import SecondaryButton from '@/components/Buttons/SecondaryButton.vue'
import IconNotification from '@/components/icons/IconNotification.vue'
import IconBurger from '@/components/icons/IconBurger.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import { useAuthService } from '@/services/useAuthService'
import { useInterfaceStore } from '@/stores/interface'
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const authStore = useAuthStore()
const interfateStore = useInterfaceStore()
const authService = useAuthService()
const router = useRouter()

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
</script>

<template>
  <header>
    <div
      class="w-full max-w-[1920px] px-9 py-6 md:px-16 z-10"
      :class="authStore.getIsAuthenticated ? 'bg-[#222030]' : 'fixed'"
    >
      <nav class="flex items-center justify-between">
        <IconBurger
          @click="interfateStore.toggleShowNavigation"
          v-if="authStore.getIsAuthenticated"
          class="cursor-pointer md:hidden"
        />
        <h1 :class="authStore.getIsAuthenticated && 'hidden md:block'">MOVIE QUOTES</h1>
        <div class="relative flex items-center gap-5">
          <IconSearch v-if="authStore.getIsAuthenticated" class="cursor-pointer md:hidden" />
          <IconNotification v-if="authStore.getIsAuthenticated" class="cursor-pointer" />
          <div
            tabindex="0"
            @click="toggleLanguage"
            @focusout="!isLanguageOpen && toggleLanguage"
            class="items-center justify-center hidden gap-2 cursor-pointer md:flex mr-7"
          >
            {{ currentLanguageLabel }}
            <IconArrow />
            <div v-if="isLanguageOpen" class="absolute top-[100%] border w-fit flex flex-col">
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
          <div v-else class="flex-row-reverse hidden gap-2 md:flex md:gap-4 md:flex-row">
            <SecondaryButton @click="logout">
              <a>{{ $t('header.log_out') }}</a>
            </SecondaryButton>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

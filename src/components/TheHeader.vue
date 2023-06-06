<script setup>
import PrimaryButton from '../components/Buttons/PrimaryButton.vue';
import IconArrow from '../components/icons/IconArrow.vue'
import { useAuthStore } from '../stores/auth';
import SecondaryButton from './Buttons/SecondaryButton.vue';
import IconNotification from '../components/icons/IconNotification.vue'
import { useAuthService } from '../services/useAuthService';
import { useUserStore } from '../stores/user';
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';


const authStore = useAuthStore()
const userStore = useUserStore()
const authService = useAuthService()
const router = useRouter()

const isLanguageOpen = ref(false)
const currentLanguageLabel = computed(() => {
    if (userStore.getLocale === 'en') {
        return 'Eng'
    } else {
        return 'Geo'
    }
})

const logout = async () => {
    await authService.logout()
    authStore.setIsAuthenticated(false)
    router.push({ name: 'landing' })
}

const setLocale = (locale) => {
    userStore.setLocale(locale)
}

const toggleLanguage = () => {
    isLanguageOpen.value = !isLanguageOpen.value
}

</script>

<template>
    <header>
        <div class="px-4 py-6 md:px-16 wrapper" :class="authStore.isAuthenticated && 'bg-[#222030]'">
            <nav class="flex justify-between">
                <h1>MOVIE QUOTES</h1>
                <div class="flex items-center gap-4">
                    <IconNotification v-if="authStore.isAuthenticated" class="mr-11" />
                    <div tabindex="0" @click="toggleLanguage" @focusout="!isLanguageOpen && toggleLanguage"
                        class="items-center justify-center hidden gap-2 cursor-pointer md:flex mr-7">
                        {{ currentLanguageLabel }}
                        <IconArrow />
                        <div v-if="isLanguageOpen" class="absolute top-[7%] border w-fit flex flex-col">
                            <p class="p-1 cursor-pointer hover:bg-slate-700" @click="setLocale('en')">English</p>
                            <p class="p-1 cursor-pointer hover:bg-slate-700" @click="setLocale('ka')">Georgian</p>
                        </div>
                    </div>

                    <div v-if="!authStore.isAuthenticated" class="flex flex-row-reverse gap-2 md:gap-4 md:flex-row">
                        <PrimaryButton>
                            <RouterLink to="sign-up">Sign up</RouterLink>
                        </PrimaryButton>
                        <SecondaryButton>
                            <RouterLink :to="{ name: 'login' }">
                                Log in
                            </RouterLink>
                        </SecondaryButton>
                    </div>
                    <div v-else class="flex flex-row-reverse gap-2 md:gap-4 md:flex-row">
                        <SecondaryButton @click="logout">
                            <a>Log out</a>
                        </SecondaryButton>
                    </div>

                </div>
            </nav>
        </div>
    </header>
</template>
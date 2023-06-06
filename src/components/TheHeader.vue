<script setup>
import PrimaryButton from '../components/Buttons/PrimaryButton.vue';
import IconArrow from '../components/icons/IconArrow.vue'
import { useAuthStore } from '../stores/auth';
import SecondaryButton from './Buttons/SecondaryButton.vue';
import IconNotification from '../components/icons/IconNotification.vue'
import { useAuthService } from '../services/useAuthService';
import { useRouter } from 'vue-router';

const authStore = useAuthStore()
const authService = useAuthService()
const router = useRouter()

const logout = async () => {
    await authService.logout()
    authStore.setIsAuthenticated(false)
    router.push({ name: 'landing' })
}

</script>

<template>
    <header>
        <div class="px-4 py-6 md:px-16 wrapper" :class="authStore.isAuthenticated && 'bg-[#222030]'">
            <nav class="flex justify-between">
                <h1>MOVIE QUOTES</h1>
                <div class="flex items-center gap-4">
                    <IconNotification v-if="authStore.isAuthenticated" class="mr-11" />
                    <div class="items-center justify-center hidden gap-2 md:flex mr-7">Eng
                        <IconArrow />
                        <div class="absolute top-[7%] border w-fit p-1 flex flex-col gap-1">
                            <p class="cursor-pointer" @click="setLocale('en')">English</p>
                            <p class="cursor-pointer" @click="setLocale('ka')">Georgian</p>
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
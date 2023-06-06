<script setup>
import PrimaryButton from '../components/Buttons/PrimaryButton.vue';
import IconArrow from '../components/icons/IconArrow.vue'
import { useAuthStore } from '../stores/auth';
import SecondaryButton from './Buttons/SecondaryButton.vue';
import IconNotification from '../components/icons/IconNotification.vue'
import { ref } from 'vue';

const authStore = useAuthStore()

const languageIsOpen = ref(false)

const toggleLanguage = (payload) => {
    languageIsOpen.value = payload
}

const logout = () => {
    authStore.logout()
}

const setLocale = (payload) => {
    authStore.setLocale(payload)
    languageIsOpen.value = false
}
</script>

<template>
    <header>
        <div class="px-4 py-6 md:px-16 wrapper" :class="authStore.isAuthenticated && 'bg-[#222030]'">
            <nav class="flex justify-between">
                <h1>MOVIE QUOTES</h1>
                <div class="flex items-center gap-4">
                    <IconNotification v-if="authStore.isAuthenticated" class="mr-11" />
                    <div tabindex="0" @focus="toggleLanguage(true)" @focusout="toggleLanguage(false)"
                        class="items-center justify-center hidden gap-2 md:flex mr-7">Eng
                        <IconArrow />
                        <div v-if="languageIsOpen" class="absolute top-[7%] border w-fit p-1 flex flex-col gap-1">
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
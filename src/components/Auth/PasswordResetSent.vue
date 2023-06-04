<script setup>
import PopUpCard from '../PopUpCard.vue';
import IconMailSent from '@/components/icons/IconMailSent.vue'
</script>

<template>
    <PopUpCard>
        <div class="flex flex-col items-center justify-center max-w-[385px] text-center">
            <IconMailSent />
            <h1 class=" font-medium text-[32px] mt-4 mb-6">Check your email</h1>
            <p class="mb-10">We have sent a password recover instructions
                to your email</p>

            <a href="https://gmail.com" target="_blank"
                class="bg-[#E31221] w-full px-6 h-9 flex whitespace-nowrap justify-center items-center rounded">Go to my
                email</a>

            <RouterLink :to="{ name: 'landing' }" class="text-[#6C757D] mt-8">Skip, I’ll confirm later</RouterLink>
        </div>

    </PopUpCard>
</template>
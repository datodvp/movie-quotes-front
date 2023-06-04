<script setup>
import PopUpCard from '../PopUpCard.vue';
import IconMailSent from '@/components/icons/IconMailSent.vue'
import PrimaryButton from '../Buttons/PrimaryButton.vue';
</script>

<template>
    <PopUpCard>
        <div class="flex flex-col items-center justify-center max-w-[385px] text-center">
            <IconMailSent />
            <h1 class=" font-medium text-[32px] mt-4 mb-6">Thank you!</h1>
            <p class="mb-10">Please check your email and follow the instructions to
                activate your account.</p>

            <PrimaryButton>
                <a href="https://gmail.com" target="_blank">Go to my
                    email</a>
            </PrimaryButton>

        </div>

    </PopUpCard>
</template>
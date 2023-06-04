<script setup>
import PopUpCard from '../PopUpCard.vue';
import IconSuccess from '@/components/icons/IconSuccess.vue'
import PrimaryButton from '../Buttons/PrimaryButton.vue';
</script>

<template>
    <PopUpCard>
        <div class="flex flex-col items-center justify-center max-w-[385px] text-center">
            <IconSuccess />
            <h1 class=" font-medium text-[32px] mt-4 mb-6">Thank you!</h1>
            <p class="mb-10">Your account has been activated.</p>

            <PrimaryButton>
                <RouterLink to="login">Go to login page</RouterLink>
            </PrimaryButton>
        </div>

    </PopUpCard>
</template>
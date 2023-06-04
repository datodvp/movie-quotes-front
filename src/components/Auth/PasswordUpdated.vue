<script setup>
import PopUpCard from '../PopUpCard.vue';
import IconSuccess from '@/components/icons/IconSuccess.vue'
import PrimaryLinkButton from '../Buttons/PrimaryLinkButton.vue';
</script>

<template>
    <PopUpCard>
        <div class="flex flex-col items-center justify-center max-w-[385px] text-center">
            <IconSuccess />
            <h1 class=" font-medium text-[32px] mt-4 mb-6">Success!</h1>
            <p class="mb-10">Your Password changed successfully.</p>

            <PrimaryLinkButton to="login"
                class="bg-[#E31221] w-full px-6 h-9 flex whitespace-nowrap justify-center items-center rounded">Go to login
                page</PrimaryLinkButton>
        </div>

    </PopUpCard>
</template>
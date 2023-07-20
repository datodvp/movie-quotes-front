<script setup>
import PopUpCard from '@/components/UI/PopUpCard.vue'
import IconMailSent from '@/components/icons/IconMailSent.vue'
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue'
</script>

<template>
  <PopUpCard>
    <div class="flex flex-col items-center justify-center max-w-[24rem] text-center">
      <IconMailSent />
      <h1 class="font-medium text-[2rem] mt-4 mb-6">{{ $t('auth.thank_you') }}</h1>
      <p class="mb-10">{{ $t('auth.check_your_email_verification') }}</p>

      <PrimaryButton>
        <a href="https://gmail.com" target="_blank">{{ $t('auth.go_to_my_email') }}</a>
      </PrimaryButton>
    </div>
  </PopUpCard>
</template>

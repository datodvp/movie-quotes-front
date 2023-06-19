<script setup>
import PopUpCard from '@/components/PopUpCard.vue'
import IconSuccess from '@/components/icons/IconSuccess.vue'
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue'
</script>

<template>
  <PopUpCard>
    <div class="flex flex-col items-center justify-center max-w-[385px] text-center">
      <IconSuccess />
      <h1 class="font-medium text-[32px] mt-4 mb-6">{{ $t('auth.thank_you') }}</h1>
      <p class="mb-10">{{ $t('auth.account_activated') }}</p>

      <PrimaryButton>
        <RouterLink to="login">{{ $t('auth.go_to_log_in') }}</RouterLink>
      </PrimaryButton>
    </div>
  </PopUpCard>
</template>

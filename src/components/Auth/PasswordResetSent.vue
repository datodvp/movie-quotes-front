<script setup>
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue'
import PopUpCard from '@/components/UI/PopUpCard.vue'
import IconMailSent from '@/components/icons/IconMailSent.vue'
</script>

<template>
  <PopUpCard>
    <div class="flex flex-col items-center justify-center max-w-[24rem] text-center">
      <IconMailSent />
      <h1 class="font-medium text-[2rem] mt-4 mb-6">{{ $t('auth.check_your_email') }}</h1>
      <p class="mb-10">{{ $t('auth.we_have_sent_email') }}</p>

      <PrimaryButton>
        <a href="https://gmail.com" target="_blank">{{ $t('auth.go_to_my_email') }}</a>
      </PrimaryButton>

      <RouterLink :to="{ name: 'landing' }" class="text-[#6C757D] mt-8"
        >{{ $t('auth.i_will_confirm_later') }}
      </RouterLink>
    </div>
  </PopUpCard>
</template>

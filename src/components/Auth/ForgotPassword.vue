<script setup>
import PopUpCard from '@/components/UI/PopUpCard.vue'
import TextInput from '@/components/Form/TextInput.vue'
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue'
import IconBackArrow from '@/components/icons/IconBackArrow.vue'
import { useAuthService } from '@/services/useAuthService'
import { Form } from 'vee-validate'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import ServerErrorMessage from '@/components/UI/ServerErrorMessage.vue'

const authService = useAuthService()
const router = useRouter()

const email = ref('')

const errorMessage = ref('')

const onSubmit = async (values) => {
  try {
    await authService.forgotPassword(values)
    router.push({ name: 'passwordResetSent' })
  } catch (error) {
    errorMessage.value = error.response.data.errors.message
  }
}

const emailRules = computed(() => ({ required: true, email: true }))
</script>

<template>
  <PopUpCard>
    <div class="flex flex-col items-center justify-center w-full">
      <h1 class="text-3xl font-medium">{{ $t('auth.forgot_password') }}</h1>
      <p class="text-[#6C757D] mt-3 max-w-[21rem] text-center">{{ $t('auth.enter_email') }}</p>
      <Form @submit="onSubmit" class="w-full px-4 md:px-0">
        <TextInput
          :label="$t('auth.email')"
          name="email"
          :placeholder="$t('auth.email_placeholder')"
          v-model="email"
          :rules="emailRules"
        />

        <ServerErrorMessage :errorMessage="errorMessage" />

        <PrimaryButton class="mt-6">
          <button>{{ $t('auth.send_instructions') }}</button>
        </PrimaryButton>

        <RouterLink
          :to="{ name: 'login' }"
          class="flex justify-center items-center mt-8 text-[#6C757D] gap-3"
        >
          <IconBackArrow />{{ $t('auth.back_to_log_in') }}
        </RouterLink>
      </Form>
    </div>
  </PopUpCard>
</template>

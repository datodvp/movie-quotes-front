<script setup>
import PopUpCard from '@/components/UI/PopUpCard.vue'
import TextInput from '@/components/Form/TextInput.vue'
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue'
import IconBackArrow from '@/components/icons/IconBackArrow.vue'
import { useAuthService } from '@/services/useAuthService'
import { Form } from 'vee-validate'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ServerErrorMessage from '@/components/UI/ServerErrorMessage.vue'

const authService = useAuthService()

const password = ref('')
const passwordConfirmation = ref('')

const route = useRoute()
const router = useRouter()

const errorMessage = ref('')

const onSubmit = async (values) => {
  // add email and token behind the scenes for backend validation
  values.email = route.query.email
  values.token = route.query.token

  try {
    await authService.resetPassword(values)
    router.push({ name: 'passwordUpdated' })
  } catch (error) {
    errorMessage.value = error.response.data.errors.message
  }
}

const passwordRules = { required: true, min: 8, max: 15, latin: true }
const passwordConfirmationRules = { required: true, confirmed: password }
</script>

<template>
  <PopUpCard>
    <div class="flex flex-col items-center justify-center w-full">
      <h1 class="text-3xl font-medium">{{ $t('auth.create_new_password') }}</h1>
      <p class="text-[#6C757D] mt-3 max-w-[21rem] text-center">
        {{ $t('auth.different_password') }}
      </p>
      <Form @submit="onSubmit" class="w-full px-4 md:px-0">
        <TextInput
          type="password"
          :label="$t('auth.password')"
          name="password"
          :placeholder="$t('auth.password_placeholder')"
          v-model="password"
          :rules="passwordRules"
        />

        <TextInput
          type="password"
          :label="$t('auth.confirm_password')"
          name="password_confirmation"
          :placeholder="$t('auth.confirm_password_placeholder')"
          v-model="passwordConfirmation"
          :rules="passwordConfirmationRules"
        />

        <ServerErrorMessage :errorMessage="errorMessage" />

        <PrimaryButton class="mt-6">
          <button>{{ $t('auth.reset_password') }}</button>
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

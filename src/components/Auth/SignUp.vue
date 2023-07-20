<script setup>
import PopUpCard from '@/components/UI/PopUpCard.vue'
import TextInput from '@/components/Form/TextInput.vue'
import { Form } from 'vee-validate'
import { computed, ref } from 'vue'
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue'
import SecondaryButton from '@/components/Buttons/SecondaryButton.vue'
import IconGoogle from '@/components/icons/IconGoogle.vue'
import { useAuthService } from '@/services/useAuthService'
import { useRouter } from 'vue-router'
import ServerErrorMessage from '@/components/UI/ServerErrorMessage.vue'

const authService = useAuthService()
const router = useRouter()

const username = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')

const errorMessage = ref('')
const sendingMail = ref(false)

const register = async (values) => {
  sendingMail.value = true
  try {
    await authService.register(values)
    router.push({ name: 'mailSent' })
  } catch (error) {
    errorMessage.value = error.response.data.message
  }
  sendingMail.value = false
}

const registerGoogle = async () => {
  authService.authGoogle()
}

const usernameRules = computed(() => ({ required: true, min: 3, max: 15, latin: true }))
const emailRules = computed(() => ({ required: true, email: true }))
const passwordRules = computed(() => ({ required: true, min: 8, max: 15, latin: true }))
const passwordConfirmationRules = computed(() => ({ required: true, confirmed: password.value }))
</script>

<template>
  <PopUpCard>
    <div class="flex flex-col items-center justify-center w-full">
      <div
        v-if="sendingMail"
        class="absolute z-10 flex items-center justify-center w-full h-full text-2xl font-black bg-gray-700 bg-opacity-70"
      >
        <p>Sending mail...</p>
      </div>
      <h1 class="text-3xl font-medium">{{ $t('auth.create_an_account') }}</h1>
      <p class="text-[#6C757D] mt-3">{{ $t('auth.start_your_journey') }}</p>
      <Form @submit="register" class="w-full px-4 md:px-0">
        <TextInput
          :label="$t('auth.name')"
          name="username"
          :placeholder="$t('auth.name_placeholder')"
          v-model="username"
          :rules="usernameRules"
        />
        <TextInput
          :label="$t('auth.email')"
          name="email"
          :placeholder="$t('auth.email_placeholder')"
          v-model="email"
          :rules="emailRules"
        />
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

        <PrimaryButton class="mt-6"
          ><button>{{ $t('auth.get_started') }}</button></PrimaryButton
        >

        <SecondaryButton @click="registerGoogle" class="mt-4">
          <button type="button"><IconGoogle class="mr-2" />{{ $t('auth.sign_up_google') }}</button>
        </SecondaryButton>

        <div class="flex justify-center gap-1 mt-8">
          <p>{{ $t('auth.have_account') }}</p>
          <RouterLink to="/login" class="text-[#0D6EFD] underline">{{
            $t('auth.log_in')
          }}</RouterLink>
        </div>
      </Form>
    </div>
  </PopUpCard>
</template>

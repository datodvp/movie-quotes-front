<script setup>
import PopUpCard from '@/components/PopUpCard.vue'
import TextInput from '@/components/Form/TextInput.vue'
import { Field, Form } from 'vee-validate'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import IconGoogle from '@/components/icons/IconGoogle.vue'
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue'
import SecondaryButton from '@/components/Buttons/SecondaryButton.vue'
import ServerErrorMessage from '@/components/ServerErrorMessage.vue'
import { useAuthService } from '@/services/useAuthService'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const authService = useAuthService()

const login = ref('')
const password = ref('')
const remember_me = ref(null)

const errorMessage = ref('')

const authorize = async (values) => {
  try {
    await authService.login(values)
    authStore.setIsAuthenticated(true)
  } catch (error) {
    errorMessage.value = error.response.data.message
  }
}

const loginGoogle = async () => {
  authService.authGoogle()
}
</script>

<template>
  <PopUpCard>
    <div class="flex flex-col items-center justify-center w-full">
      <h1 class="p-4 text-3xl font-medium">{{ $t('auth.log_in_to_your_account') }}</h1>
      <p class="p-4 text-[#6C757D] mt-3">{{ $t('auth.welcome_back') }}</p>
      <Form @submit="authorize" class="w-full px-4 md:px-0">
        <TextInput
          :label="$t('auth.email_or_username')"
          name="login"
          :placeholder="$t('auth.email_or_username_placeholder')"
          v-model="login"
          :rules="{ required: true }"
        />
        <TextInput
          type="password"
          :label="$t('auth.password')"
          name="password"
          :placeholder="$t('auth.password_placeholder')"
          v-model="password"
          :rules="{ required: true, latin: true, min: 8, max: 15 }"
        />
        <div class="flex justify-between mt-4">
          <label class="flex items-center gap-2 cursor-pointer w-fit">
            <Field
              type="checkbox"
              name="remember"
              v-model="remember_me"
              class="w-[16px] h-[16px]"
            />
            {{ $t('auth.remember_me') }}
          </label>
          <RouterLink
            :to="{ name: 'forgotPassword' }"
            class="text-[#0D6EFD] underline flex justify-center items-center"
            >{{ $t('auth.forgot_password') }}
          </RouterLink>
        </div>

        <ServerErrorMessage :errorMessage="errorMessage" />

        <PrimaryButton class="mt-4">
          <button>{{ $t('auth.sign_in') }}</button>
        </PrimaryButton>

        <SecondaryButton @click="loginGoogle" class="mt-4">
          <button type="button"><IconGoogle class="mr-2" />{{ $t('auth.sign_in_google') }}</button>
        </SecondaryButton>

        <div class="flex justify-center gap-1 mt-8">
          <p>{{ $t('auth.dont_have_account') }}</p>
          <RouterLink to="/sign-up" class="text-[#0D6EFD] underline">{{
            $t('auth.sign_up')
          }}</RouterLink>
        </div>
      </Form>
    </div>
  </PopUpCard>
</template>

<script setup>
import DefaultAvatar from '@/assets/images/defaultAvatar.png'
import TextInput from '@/components/Form/TextInput.vue'
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue'
import IconBackArrow from '@/components/icons/IconBackArrow.vue'
import ServerErrorMessage from '@/components/UI/ServerErrorMessage.vue'
import TheNavigation from '@/components/UI/TheNavigation.vue'
import { useUserStore } from '@/stores/user'
import { useAuthService } from '@/services/useAuthService'
import { computed, ref } from 'vue'
import { Form, Field } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import MailSentNotification from '../../../components/Auth/MailSentNotification.vue'
import TheHeader from '@/components/UI/TheHeader.vue'

const { t } = useI18n()
const userStore = useUserStore()
const authService = useAuthService()

const newUsername = ref('')
const newPassword = ref('')
const newPasswordConfirmation = ref('')
const newEmail = ref('')

const imagePreviewUrl = ref(null)

const changingPassword = ref(false)
const changingUsername = ref(false)
const changingEmail = ref(false)
const changingImage = ref(false)

const emailUpdated = ref(false)

const errorMessage = ref('')
const successMessage = ref('')

const changingUser = computed(
  () =>
    changingPassword.value || changingUsername.value || changingEmail.value || changingImage.value
)

const openChangingImage = (e) => {
  changingImage.value = true
  imagePreviewUrl.value = URL.createObjectURL(e.target.files[0])
}

const toggleChangingEmail = () => {
  changingEmail.value = !changingEmail.value
}

const toggleChangingPassword = () => {
  changingPassword.value = !changingPassword.value
}

const toggleChangingUsername = () => {
  changingUsername.value = !changingUsername.value
}

const closeAllInputs = () => {
  changingPassword.value = false
  changingUsername.value = false
  changingEmail.value = false
  changingImage.value = false
}

const changePassword = async () => {
  successMessage.value = ''
  errorMessage.value = ''
  const form = document.getElementById('password-form')
  const formData = new FormData(form)
  formData.append('_method', 'patch')

  try {
    const response = await authService.changePassword(formData)

    const userData = response.data.data.user
    userStore.setUserData('username', userData.username)
    userStore.setUserData('email', userData.email)
    userStore.setUserData('image', userData.image)
    if (changingEmail.value) {
      emailUpdated.value = true
    }
    closeAllInputs()
    successMessage.value = 'Your profile has been updated.'
  } catch (error) {
    errorMessage.value = error.response.data.message
  }
}

const usernameRules = computed(() => ({ required: true, min: 3, max: 15, latin: true }))
const emailRules = computed(() => ({ required: true, email: true }))
const passwordRules = computed(() => ({ required: true, latin: true, min: 8, max: 15 }))
const passwordConfirmationRules = computed(() => ({ required: true, confirmed: newPassword.value }))
</script>
<template>
  <TheHeader />
  <div class="flex">
    <TheNavigation class="hidden md:block" />
    <div class="flex flex-col w-full">
      <MailSentNotification v-if="emailUpdated" class="left-0" />
      <div class="mt-4 mb-4 ml-8 text-2xl md:mt-8 md:mb-32">
        <h2 class="hidden md:block">{{ $t('texts.my_profile') }}</h2>
        <RouterLink :to="{ name: 'newsFeed' }">
          <IconBackArrow class="w-5 h-5 md:hidden" />
        </RouterLink>
      </div>

      <Form
        @submit="changePassword"
        id="password-form"
        class="w-full md:w-[70%] h-fit bg-[#11101A] rounded-xl pb-32 flex items-center flex-col"
      >
        <img
          :src="
            imagePreviewUrl
              ? imagePreviewUrl
              : userStore.getUserData.image
              ? userStore.getUserData.image
              : DefaultAvatar
          "
          alt="image"
          class="w-[11.5rem] h-[11.5rem] object-cover rounded-full md:-mt-20 mt-6"
        />
        <label class="cursor-pointer">
          <Field type="file" name="image" @change="openChangingImage" class="hidden" />
          <p class="mt-2 text-xl mb-9 hover:text-[#CED4DA80]">{{ $t('texts.upload_image') }}</p>
        </label>

        <div class="flex flex-col gap-11 w-[80%] md:w-[53%]">
          <div class="relative flex items-end justify-between gap-8">
            <div class="w-full">
              <p class="pb-1">{{ $t('texts.username') }}</p>
              <div
                class="flex p-2 border-[#CED4DA80] md:bg-white md:rounded-md justify-between md:border md: border-b w-full"
              >
                <p class="md:text-[#212529]">
                  {{ userStore.getUserData.username }}
                </p>
                <p @click="toggleChangingUsername" class="cursor-pointer md:absolute md:-right-16">
                  Edit
                </p>
              </div>
            </div>
          </div>

          <div v-if="changingUsername" class="flex items-end gap-8">
            <TextInput
              :label="t('texts.new_username')"
              name="username"
              placeholder="New username"
              v-model="newUsername"
              :rules="usernameRules"
            />
          </div>

          <div class="relative flex items-end justify-between gap-8">
            <div class="w-full">
              <p class="pb-1">{{ $t('texts.email') }}</p>
              <div
                class="flex p-2 border-[#CED4DA80] md:bg-white md:rounded-md justify-between md:border md: border-b w-full"
              >
                <p class="md:text-[#212529]">
                  {{ userStore.getUserData.email }}
                </p>
                <p
                  v-if="!userStore.getUserData.googleId"
                  @click="toggleChangingEmail"
                  class="cursor-pointer md:absolute md:-right-16"
                >
                  Edit
                </p>
              </div>
            </div>
          </div>

          <div v-if="changingEmail" class="flex items-end gap-8">
            <TextInput
              :label="t('texts.new_email')"
              name="email"
              placeholder="New email"
              v-model="newEmail"
              :rules="emailRules"
            />
          </div>

          <div class="relative flex items-end justify-between gap-8">
            <div class="w-full">
              <p class="pb-1">{{ $t('texts.password') }}</p>
              <div
                class="flex p-2 border-[#CED4DA80] md:bg-white md:rounded-md justify-between md:border md: border-b w-full"
              >
                <p type="password" class="text-[#212529]">************</p>
                <p @click="toggleChangingPassword" class="cursor-pointer md:absolute md:-right-16">
                  Edit
                </p>
              </div>
            </div>
          </div>

          <div v-if="changingPassword" class="flex flex-col gap-2">
            <div class="h-fit p-6 border-[#CED4DA33] border rounded-[4px]">
              <p class="mb-4">{{ $t('texts.password_should_contain') }}</p>
              <ul class="ml-4 list-disc text-[#9C9A9A]">
                <li>{{ $t('texts.8_characters') }}</li>
                <li>{{ $t('texts.15_characters') }}</li>
              </ul>
            </div>

            <div class="flex items-end gap-8">
              <TextInput
                type="password"
                :label="t('texts.new_password')"
                name="password"
                placeholder="New password"
                v-model="newPassword"
                :rules="passwordRules"
              />
            </div>

            <div class="flex items-end gap-8">
              <TextInput
                type="password"
                :label="t('texts.confirm_new_password')"
                name="password_confirmation"
                placeholder="Confirm new password"
                v-model="newPasswordConfirmation"
                :rules="passwordConfirmationRules"
              />
            </div>
          </div>
        </div>
        <ServerErrorMessage :errorMessage="errorMessage" />
        <p class="text-green-700 mt-5 text-center max-w-[24rem]">{{ successMessage }}</p>
      </Form>

      <div class="w-[70%]">
        <div v-if="changingUser" class="flex self-end justify-end my-5 md:my-16 justify-self-end">
          <div @click="closeAllInputs" class="flex items-center justify-center cursor-pointer mr-7">
            Cancel
          </div>
          <PrimaryButton class="w-32"
            ><button type="submit" form="password-form">Save changes</button></PrimaryButton
          >
        </div>
      </div>
    </div>
  </div>
</template>

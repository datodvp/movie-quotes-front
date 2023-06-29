<script setup>
import DefaultAvatar from '@/assets/images/defaultAvatar.png'
import TextInput from '@/components/Form/TextInput.vue'
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue'
import IconBackArrow from '@/components/icons/IconBackArrow.vue'
import ServerErrorMessage from '@/components/ServerErrorMessage.vue'
import { useUserStore } from '@/stores/user'
import { useAuthService } from '@/services/useAuthService'
import { ref } from 'vue'
import { Form } from 'vee-validate'

const userStore = useUserStore()
const authService = useAuthService()

const newUsername = ref('')
const newPassword = ref('')
const newPasswordConfirmation = ref('')
const newEmail = ref('')

const changingPassword = ref(false)
const changingUsername = ref(false)
const changingEmail = ref(false)

const errorMessage = ref('')
const successMessage = ref('')

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
}

const changePassword = async (values) => {
  successMessage.value = ''
  errorMessage.value = ''
  try {
    const response = await authService.changePassword(values)
    const userData = response.data.data.user
    userStore.setUserData('username', userData.username)
    userStore.setUserData('email', userData.email)
    closeAllInputs()
    successMessage.value = 'Your profile has been updated.'
  } catch (error) {
    errorMessage.value = error.response.data.message
  }
}
</script>
<template>
  <div class="flex flex-col w-full">
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
        :src="DefaultAvatar"
        alt="image"
        class="w-[11.5rem] h-[11.5rem] rounded-full md:-mt-20 mt-6"
      />

      <p class="mt-2 text-xl mb-9">Upload new photo</p>
      <div class="flex flex-col gap-11 w-[80%] md:w-[53%]">
        <div
          class="relative flex justify-between pb-4 items-end gap-8 border-b-[#CED4DA80] border-b"
        >
          <div class="">
            <p class="pb-1">Username</p>
            <p>{{ userStore.getUserData.username }}</p>
          </div>
          <p @click="toggleChangingUsername" class="cursor-pointer md:absolute md:-right-16">
            Edit
          </p>
        </div>

        <div v-if="changingUsername" class="flex items-end gap-8">
          <TextInput
            label="New username"
            name="username"
            placeholder="New username"
            v-model="newUsername"
            :rules="{ required: true, min: 3, max: 15, latin: true }"
          />
        </div>

        <div
          class="relative flex justify-between pb-4 items-end gap-8 border-b-[#CED4DA80] border-b"
        >
          <div>
            <p class="pb-1">Email</p>
            <p>{{ userStore.getUserData.email }}</p>
          </div>
          <p
            v-if="!userStore.getUserData.googleId"
            @click="toggleChangingEmail"
            class="cursor-pointer md:absolute md:-right-16"
          >
            Edit
          </p>
        </div>

        <div v-if="changingEmail" class="flex items-end gap-8">
          <TextInput
            label="Email"
            name="email"
            placeholder="New email"
            v-model="newEmail"
            :rules="{ required: true, email: true }"
          />
        </div>

        <div
          class="relative flex justify-between pb-4 items-end gap-8 border-b-[#CED4DA80] border-b"
        >
          <div>
            <p class="pb-1">Password</p>
            <p type="password">************</p>
          </div>
          <p @click="toggleChangingPassword" class="cursor-pointer md:absolute md:-right-16">
            Edit
          </p>
        </div>

        <div v-if="changingPassword" class="flex flex-col gap-2">
          <div class="h-fit p-6 border-[#CED4DA33] border rounded-[4px]">
            <p class="mb-4">Passwords should contain:</p>
            <ul class="ml-4 list-disc text-[#9C9A9A]">
              <li>8 or more characters</li>
              <li>15 lowercase character</li>
            </ul>
          </div>

          <div class="flex items-end gap-8">
            <TextInput
              type="password"
              label="New password"
              name="password"
              placeholder="New password"
              v-model="newPassword"
              :rules="{ required: true, latin: true, min: 8, max: 15 }"
            />
          </div>

          <div class="flex items-end gap-8">
            <TextInput
              type="password"
              label="Confirm new password"
              name="password_confirmation"
              placeholder="Confirm new password"
              v-model="newPasswordConfirmation"
              :rules="{ required: true, confirmed: newPassword }"
            />
          </div>
        </div>
      </div>
      <ServerErrorMessage :errorMessage="errorMessage" />
      <p class="text-green-700 mt-5 text-center max-w-[384px]">{{ successMessage }}</p>
    </Form>

    <div class="w-[70%]">
      <div
        v-if="changingPassword || changingUsername || changingEmail"
        class="flex self-end justify-end my-5 md:my-16 justify-self-end"
      >
        <div @click="closeAllInputs" class="flex items-center justify-center cursor-pointer mr-7">
          Cancel
        </div>
        <PrimaryButton class="w-[8rem]"
          ><button type="submit" form="password-form">Save changes</button></PrimaryButton
        >
      </div>
    </div>
  </div>
</template>

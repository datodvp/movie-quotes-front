<script setup>
import DefaultAvatar from '@/assets/images/defaultAvatar.png'
import TextInput from '@/components/Form/TextInput.vue'
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue'
import { useUserStore } from '@/stores/user'
import { useAuthService } from '@/services/useAuthService'
import { ref } from 'vue'
import { Form } from 'vee-validate'

const userStore = useUserStore()
const authService = useAuthService()

const newUsername = ref('')
const newPassword = ref('')
const newPasswordConfirmation = ref('')

const changingPassword = ref(false)
const changingUsername = ref(false)

const toggleChangingPassword = () => {
  changingPassword.value = !changingPassword.value
}

const toggleChangingUsername = () => {
  changingUsername.value = !changingUsername.value
}

const closeAllInputs = () => {
  changingPassword.value = false
  changingUsername.value = false
}

const changePassword = async (values) => {
  console.log(values)
  const response = await authService.changePassword(values)
  console.log(response)
}
</script>
<template>
  <div class="w-full">
    <h2 class="mt-8 mb-32 ml-8 text-2xl">{{ $t('texts.my_profile') }}</h2>
    <Form
      @submit="changePassword"
      id="password-form"
      class="w-full md:w-[70%] h-fit pb-40 bg-[#11101A] rounded-xl flex items-center flex-col"
    >
      <img :src="DefaultAvatar" alt="image" class="w-[11.5rem] h-[11.5rem] rounded-full -mt-20" />

      <p class="mt-2 mb-9">Upload new photo</p>
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
          <div class="">
            <p class="pb-1">Email</p>
            <p>{{ userStore.getUserData.email }}</p>
          </div>
          <p @click="toggleChangingUsername" class="cursor-pointer md:absolute md:-right-16">
            Edit
          </p>
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
    </Form>
    <div v-if="changingPassword || changingUsername" class="flex justify-end">
      <div @click="closeAllInputs" class="flex items-center justify-center cursor-pointer mr-7">
        Cancel
      </div>
      <PrimaryButton class="my-16 w-28"
        ><button type="submit" form="password-form">Save changes</button></PrimaryButton
      >
    </div>
  </div>
</template>

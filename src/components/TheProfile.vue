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

const newPassword = ref('')
const newPasswordConfirmation = ref('')
const changingPassword = ref(false)

const toggleChangingPassword = () => {
  changingPassword.value = !changingPassword.value
}

const closeAllInputs = () => {
  changingPassword.value = false
}

const changePassword = async (values) => {
  console.log(values)
  const response = await authService.changePassword(values)
  console.log(response)
}
</script>
<template>
  <div>
    <h2 class="mt-8 mb-32 ml-8 text-2xl">{{ $t('texts.my_profile') }}</h2>
    <div class="w-[998px] h-fit pb-40 bg-[#11101A] rounded-xl flex items-center flex-col">
      <img :src="DefaultAvatar" alt="image" class="w-[11.5rem] h-[11.5rem] rounded-full -mt-20" />

      <p class="mt-2 mb-9">Upload new photo</p>
      <div class="flex flex-col gap-11">
        <div class="flex items-end gap-8">
          <TextInput
            name="username-disabled"
            label="Username"
            :modelValue="userStore.getUserData.username"
            disabled
            class="w-[33rem]"
          />
          <p class="mb-2">Edit</p>
        </div>

        <div class="flex items-end gap-8">
          <TextInput
            name="email-disabled"
            label="Email"
            :modelValue="userStore.getUserData.email"
            disabled
            class="w-[33rem]"
          />
          <p class="mb-2">Edit</p>
        </div>

        <div class="flex items-end gap-8">
          <TextInput
            name="password-disabled"
            label="Password"
            modelValue="************"
            type="password"
            disabled
            class="w-[33rem]"
          />
          <p @click="toggleChangingPassword" class="mb-2 cursor-pointer">Edit</p>
        </div>

        <Form
          @submit="changePassword"
          id="password-form"
          v-if="changingPassword"
          class="flex flex-col gap-2"
        >
          <div class="w-[528px] h-[134px] p-6 border-[#CED4DA33] border rounded-[4px]">
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
              class="w-[33rem]"
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
              class="w-[33rem]"
            />
          </div>
        </Form>
      </div>
    </div>
    <div v-if="changingPassword" class="flex justify-end">
      <div @click="closeAllInputs" class="flex items-center justify-center cursor-pointer mr-7">
        Cancel
      </div>
      <PrimaryButton class="w-40 my-16"
        ><button type="submit" form="password-form">Save changes</button></PrimaryButton
      >
    </div>
  </div>
</template>

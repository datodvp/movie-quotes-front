<script setup>
import DefaultAvatar from '@/assets/images/defaultAvatar.png'
import TextInput from '@/components/Form/TextInput.vue'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
</script>
<template>
  <div>
    <h2 class="mt-8 mb-32 ml-8 text-2xl">{{ $t('texts.my_profile') }}</h2>
    <form class="w-[998px] h-fit pb-40 bg-[#11101A] rounded-xl flex items-center flex-col">
      <img :src="DefaultAvatar" alt="image" class="w-[11.5rem] h-[11.5rem] rounded-full -mt-20" />

      <p class="mt-2 mb-9">Upload new photo</p>
      <div class="flex flex-col gap-11">
        <div class="flex items-end gap-8">
          <TextInput label="Username" :modelValue="userStore.getUserData.username" disabled />
          <p class="mb-2">Edit</p>
        </div>

        <div class="flex items-end gap-8">
          <TextInput label="Email" :modelValue="userStore.getUserData.email" disabled />
          <p class="mb-2">Edit</p>
        </div>

        <div class="flex items-end gap-8">
          <TextInput label="Password" modelValue="************" type="password" disabled />
          <p class="mb-2">Edit</p>
        </div>
      </div>
    </form>
  </div>
</template>

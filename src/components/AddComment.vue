<script setup>
import DefaultAvatar from '@/assets/images/defaultAvatar.png'
import { Field, Form } from 'vee-validate'
import { ref } from 'vue'

const newComment = ref('')

const onSubmit = (value) => {
  console.log(value)
}
</script>

<template>
  <div class="mt-6">
    <div class="flex items-center gap-6">
      <img :src="DefaultAvatar" alt="avatar" class="w-[52px] h-[52px]" />
      <Form @submit="onSubmit" class="flex w-full">
        <Field
          v-model="newComment"
          name="comment"
          placeholder="Write a comment"
          class="px-[27px] py-[11px] outline-none bg-[#24222F] w-full rounded-[10px]"
        />
      </Form>
    </div>
  </div>
</template>

<script setup>
import DefaultAvatar from '@/assets/images/defaultAvatar.png'
import { Field, Form } from 'vee-validate'
import { ref } from 'vue'
import { useAuthService } from '@/services/useAuthService.js'
import { useUserStore } from '@/stores/user'

const props = defineProps({
  quoteId: {
    type: Number,
    required: true
  }
})

const newComment = ref('')
const authService = useAuthService()
const userStore = useUserStore()

const emit = defineEmits(['addComment'])

const onSubmit = () => {
  const commentData = {
    text: newComment.value,
    quote_id: props.quoteId,
    user: {
      id: userStore.getUserData.id,
      image: userStore.getUserData.image,
      username: userStore.getUserData.username
    }
  }

  authService.postComment(commentData)
  emit('addComment', commentData)
  newComment.value = ''
}
</script>

<template>
  <div class="">
    <div class="flex items-center gap-6">
      <img
        :src="userStore.getUserData.image ? userStore.getUserData.image : DefaultAvatar"
        alt="avatar"
        class="w-[3.25rem] h-[3.25rem] rounded-full object-cover"
      />
      <Form @submit="onSubmit" class="flex w-full">
        <Field
          v-model="newComment"
          name="comment"
          placeholder="Write a comment"
          class="px-[1.688rem] py-[0.688rem] outline-none bg-[#24222F] w-full rounded-[0.625rem]"
          rules="required"
        />
      </Form>
    </div>
  </div>
</template>

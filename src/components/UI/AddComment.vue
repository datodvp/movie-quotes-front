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
        class="w-[52px] h-[52px] rounded-full object-cover"
      />
      <Form @submit="onSubmit" class="flex w-full">
        <Field
          v-model="newComment"
          name="comment"
          placeholder="Write a comment"
          class="px-[27px] py-[11px] outline-none bg-[#24222F] w-full rounded-[10px]"
          rules="required"
        />
      </Form>
    </div>
  </div>
</template>

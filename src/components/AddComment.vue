<script setup>
import DefaultAvatar from '@/assets/images/defaultAvatar.png'
import { Field, Form } from 'vee-validate'
import { ref } from 'vue'
import { useAuthService } from '@/services/useAuthService.js'
import { useQuotesStore } from '@/stores/quotes'
import { useUserStore } from '@/stores/user'

const props = defineProps({
  quoteId: {
    type: Number,
    required: true
  }
})

const newComment = ref('')
const authService = useAuthService()
const quotesStore = useQuotesStore()
const userStore = useUserStore()

const onSubmit = async () => {
  const data = {
    text: newComment.value,
    quote_id: props.quoteId
  }

  const response = await authService.postComment(data)
  quotesStore.updateQuote(response.data.data.newComment.quote)

  newComment.value = ''
}

const backend_API_URL = import.meta.env.VITE_VUE_APP_API_URL
</script>

<template>
  <div class="mt-6">
    <div class="flex items-center gap-6">
      <img
        :src="
          userStore.getUserData.image
            ? `${backend_API_URL}/${userStore.getUserData.image}`
            : DefaultAvatar
        "
        alt="avatar"
        class="w-[52px] h-[52px] rounded-full"
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

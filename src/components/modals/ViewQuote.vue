<script setup>
import ModalCard from '@/components/UI/ModalCard.vue'
import DefaultAvatar from '@/assets/images/defaultAvatar.png'
import { useUserStore } from '@/stores/user.js'
import { computed, inject, onMounted, ref } from 'vue'
import TheComment from '@/components/UI/TheComment.vue'
import IconComment from '@/components/icons/IconComment.vue'
import IconLike from '@/components/icons/IconLike.vue'
import { useAuthService } from '@/services/useAuthService.js'
import AddComment from '@/components/UI/AddComment.vue'

const props = defineProps({
  quoteId: {
    type: Number,
    required: true
  },
  closeModal: {
    type: Function,
    required: false
  }
})

const updateQuote = inject('updateQuote')

const authService = useAuthService()
const quote = ref(null)

onMounted(() => {
  authService.getQuote(props.quoteId).then((response) => (quote.value = response.data.data.quote))
})

const userStore = useUserStore().getUserData

const reversedComments = computed(() => quote.value.comments.slice().reverse())
const seeMore = ref(false)

const hasLikedQuote = computed(() =>
  quote.value.likes.some((like) => like.pivot.user_id === userStore.id)
)

const addComment = (comment) => {
  quote.value.comments.push(comment)
  updateQuote(quote.value)
}

const likePost = () => {
  const data = {
    quote_id: quote.value.id
  }
  if (!hasLikedQuote.value) {
    authService.postLike(data).then((response) => {
      quote.value.likes.push(response.data.data.like)
    })
  } else {
    authService.removeLike(data).then((response) => {
      const removedlike = response.data.data.like
      quote.value.likes = quote.value.likes.filter((like) => {
        if (like.pivot.user_id === removedlike.pivot.user_id) {
          return false
        }
        return true
      })
    })
  }
  updateQuote(quote.value)
}

const hasLikedStyling = computed(() => hasLikedQuote.value && 'text-red-700')
const showMoreComments = () => {
  seeMore.value = true
}
const showLessComments = () => {
  seeMore.value = false
}
const moreThanTwoComments = computed(() => !seeMore.value && quote.value.comments.length > 2)
</script>

<template>
  <ModalCard v-if="quote" @close="closeModal">
    <template #header><h2>View Quote</h2></template>
    <template #body>
      <div class="flex flex-col overflow-x-hidden overflow-y-auto gap-7">
        <div class="flex items-center gap-4 text-xl">
          <img
            :src="userStore.image ? userStore.image : DefaultAvatar"
            alt="avatar"
            class="w-[3.25rem] h-[3.25rem] object-cover rounded-full"
          />
          {{ userStore.username }}
        </div>
        <div class="flex flex-col gap-5 text-lg italic">
          <div class="border flex justify-between border-[#6C757DB2] p-2 rounded-[4px]">
            <p>"{{ quote.text.en }}"</p>
            <p class="text-[#6C757D] not-italic">Eng</p>
          </div>
          <div class="border flex justify-between border-[#6C757DB2] p-2 rounded-[4px]">
            <p>"{{ quote.text.ka }}"</p>
            <p class="text-[#6C757D] not-italic">ქარ</p>
          </div>
        </div>

        <div class="w-full h-[18.75rem] md:h-[31.25rem]">
          <img
            :src="quote.image"
            alt="quote"
            class="object-cover w-full h-full rounded-[0.625rem]"
          />
        </div>
        <div class="flex gap-6 text-xl">
          <div class="flex gap-3">{{ quote.comments.length }}<IconComment /></div>
          <div @click="likePost" :class="hasLikedStyling" class="flex gap-3 cursor-pointer">
            {{ quote.likes.length }}<IconLike />
          </div>
        </div>
        <div class="">
          <template v-for="(comment, index) in reversedComments" :key="comment.id">
            <TheComment v-if="index < 2 && !seeMore" :comment="comment" />
            <TheComment v-else-if="seeMore" :comment="comment" />
          </template>
        </div>
        <button
          @click="showMoreComments"
          v-if="moreThanTwoComments"
          class="ml-20 text-blue-600 hover:underline"
        >
          See more...
        </button>
        <button
          @click="showLessComments"
          v-if="seeMore"
          class="mt-1 ml-20 text-blue-600 hover:underline"
        >
          See less
        </button>
        <AddComment :quoteId="quote.id" @addComment="addComment" />
      </div>
    </template>
  </ModalCard>
</template>

<style scoped></style>

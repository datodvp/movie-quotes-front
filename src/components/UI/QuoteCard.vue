<script setup>
import DefaultAvatar from '@/assets/images/defaultAvatar.png'
import IconComment from '@/components/icons/IconComment.vue'
import IconLike from '@/components/icons/IconLike.vue'
import TheComment from '@/components/UI/TheComment.vue'
import AddComment from '@/components/UI/AddComment.vue'
import { useInterfaceStore } from '@/stores/interface'
import { computed, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useAuthService } from '@/services/useAuthService'

const props = defineProps({
  quote: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['addLike', 'removeLike', 'addComment'])

const reversedComments = computed(() => props.quote.comments.slice().reverse())
const seeMore = ref(false)
const interfaceStore = useInterfaceStore()
const userStore = useUserStore()
const authService = useAuthService()

const hasLikedQuote = computed(() =>
  props.quote.likes.some((like) => like.pivot.user_id === userStore.getUserData.id)
)

const likePost = (quoteId) => {
  const data = {
    quote_id: quoteId
  }
  const likeData = {
    pivot: { user_id: userStore.getUserData.id, quote_id: quoteId }
  }
  if (!hasLikedQuote.value) {
    emit('addLike', likeData)
    authService.postLike(data)
  } else {
    emit('removeLike', likeData)
    authService.removeLike(data)
  }
}

const addComment = (comment) => {
  emit('addComment', comment)
}

const hasLikedStyling = computed(() => hasLikedQuote.value && 'text-red-700')
const moreThanTwoComments = computed(() => !seeMore.value && props.quote.comments.length > 2)
</script>

<template>
  <div class="w-full bg-[#11101A] p-6 rounded-xl mb-10">
    <div class="flex items-center gap-4 mb-4">
      <img
        :src="quote.user.image ? quote.user.image : DefaultAvatar"
        alt="avatar"
        class="w-[3.25rem] h-[3.25rem] object-cover rounded-full"
      />
      <p class="text-xl">{{ quote.user.username }}</p>
    </div>
    <p class="text-xl mb-7">
      "{{ quote.text[interfaceStore.getLocale] }}" -
      {{ quote.movie.name[interfaceStore.getLocale] }} ({{ quote.movie.year }})
    </p>
    <img
      :src="quote.image"
      alt="avatar"
      class="w-full object-cover h-[15.6rem] md:h-[31.25rem] rounded-[10px] mb-6"
    />
    <div class="flex gap-6 text-xl">
      <p class="flex gap-3">{{ quote.comments.length }} <IconComment /></p>
      <p class="flex gap-3">
        {{ quote.likes.length }}
        <IconLike
          @click="likePost(quote.id)"
          :class="hasLikedStyling"
          class="transition-all transform cursor-pointer hover:text-[#6C757D] duration-300"
        />
      </p>
    </div>
    <hr class="border-[#EFEFEF4D] mt-6" />
    <div class="max-h-[31.25rem] overflow-y-auto">
      <template v-for="(comment, index) in reversedComments" :key="comment.id">
        <TheComment v-if="index < 2 && !seeMore" :comment="comment" />
        <TheComment v-else-if="seeMore" :comment="comment" />
      </template>
    </div>
    <button
      @click="seeMore = true"
      v-if="moreThanTwoComments"
      class="mt-1 ml-20 text-blue-600 hover:underline"
    >
      See more...
    </button>
    <button
      @click="seeMore = false"
      v-if="seeMore"
      class="mt-1 ml-20 text-blue-600 hover:underline"
    >
      See less
    </button>
    <AddComment :quoteId="quote.id" @addComment="addComment" class="mt-6" />
  </div>
</template>

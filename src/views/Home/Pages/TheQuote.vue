<script setup>
import DefaultAvatar from '@/assets/images/defaultAvatar.png'
import IconComment from '@/components/icons/IconComment.vue'
import IconLike from '@/components/icons/IconLike.vue'
import TheComment from '@/components/UI/TheComment.vue'
import AddComment from '@/components/UI/AddComment.vue'
import { useInterfaceStore } from '@/stores/interface'
import { computed, onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useAuthService } from '@/services/useAuthService'
import { useRoute } from 'vue-router'
import TheNavigation from '@/components/UI/TheNavigation.vue'

const quote = ref(null)

const route = useRoute()

onMounted(() => {
  authService.getQuote(route.params.id).then((response) => (quote.value = response.data.data.quote))
})

defineEmits(['addLike', 'removeLike', 'addComment'])

const reversedComments = computed(() => quote.value.comments.slice().reverse())
const seeMore = ref(false)
const interfaceStore = useInterfaceStore()
const backend_API_URL = import.meta.env.VITE_VUE_APP_API_URL
const userStore = useUserStore()
const authService = useAuthService()

const hasLikedQuote = computed(() =>
  quote.value.likes.some((like) => like.pivot.user_id === userStore.getUserData.id)
)

const likePost = (quoteId) => {
  const data = {
    quote_id: quoteId
  }
  if (!hasLikedQuote.value) {
    authService
      .postLike(data)
      .then((response) => response.data.data.like)
      .then((like) => quote.value.likes.push(like))
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
}

const addComment = (comment) => {
  quote.value.comments.push(comment)
}
</script>

<template>
  <TheNavigation class="hidden md:block" />
  <div v-if="quote" class="w-full bg-[#11101A] p-6 mt-16 max-w-[900px] rounded-xl mb-10">
    <div class="flex items-center gap-4 mb-4">
      <img
        :src="quote.user.image ? `${backend_API_URL}/${quote.user.image}` : DefaultAvatar"
        alt="avatar"
        class="w-[52px] h-[52px] object-cover rounded-full"
      />
      <p class="text-xl">{{ quote.user.username }}</p>
    </div>
    <p class="text-xl mb-7">
      "{{ quote.text[interfaceStore.getLocale] }}" -
      {{ quote.movie.name[interfaceStore.getLocale] }} ({{ quote.movie.year }})
    </p>
    <img
      :src="`${backend_API_URL}/${quote.image}`"
      alt="avatar"
      class="w-full object-cover h-[250px] md:h-[500px] rounded-[10px] mb-6"
    />
    <div class="flex gap-6 text-xl">
      <p class="flex gap-3">{{ quote.comments.length }} <IconComment /></p>
      <p class="flex gap-3">
        {{ quote.likes.length }}
        <IconLike
          @click="likePost(quote.id)"
          :class="hasLikedQuote && 'text-red-700'"
          class="transition-all transform cursor-pointer hover:text-[#6C757D] duration-300"
        />
      </p>
    </div>
    <hr class="border-[#EFEFEF4D] mt-6" />
    <div class="max-h-[500px] overflow-y-auto">
      <template v-for="(comment, index) in reversedComments" :key="comment.id">
        <TheComment v-if="index < 2 && !seeMore" :comment="comment" />
        <TheComment v-else-if="seeMore" :comment="comment" />
      </template>
    </div>
    <button
      @click="seeMore = true"
      v-if="!seeMore && quote.comments.length > 2"
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
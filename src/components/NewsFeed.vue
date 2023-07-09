<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useAuthService } from '@/services/useAuthService'
import { useQuotesStore } from '@/stores/quotes'
import QuoteCard from '@/components/QuoteCard.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import IconWriteQuote from '@/components/icons/IconWriteQuote.vue'
import AddQuote from '@/components/AddQuote.vue'
import { useUserStore } from '../stores/user'

const authService = useAuthService()
const quotesStore = useQuotesStore()
const userStore = useUserStore()
const showSearch = ref(false)

const showModal = ref(false)
const closeModal = () => (showModal.value = false)
const openModal = () => (showModal.value = true)

const openSearch = () => {
  showSearch.value = true
}

onMounted(async () => {
  const response = await authService.getQuotes()
  quotesStore.setQuotes(response.data.data.quotes)
})

onMounted(() => {
  window.Echo.channel('quote-like-action').listen('QuoteLikeAction', (data) => {
    const { like } = data
    if (userStore.getUserData.id !== like[0].pivot.user_id) quotesStore.addLike(like[0])
  })
  window.Echo.channel('quote-unlike-action').listen('QuoteUnlikeAction', (data) => {
    const { like } = data
    if (userStore.getUserData.id !== like[0].pivot.user_id) quotesStore.removeLike(like[0])
  })
  window.Echo.channel('comment-quote').listen('QuoteCommented', (data) => {
    const { comment } = data
    if (userStore.getUserData.id !== comment.user_id) quotesStore.addComment(comment)
  })
})

onUnmounted(() => {
  window.Echo.channel('quote-like-action').stopListening('QuoteLikeAction')
  window.Echo.channel('comment-quote').stopListening('QuoteCommented')
})
</script>
<template>
  <div class="w-full pt-8">
    <AddQuote :showModal="showModal" :closeModal="closeModal" />
    <div class="w-[67%]">
      <div class="flex justify-between gap-6 h-[3.25rem] mb-6 items-center">
        <button
          @click="openModal"
          class="bg-[#24222F] p-[11px] whitespace-nowrap flex-1 rounded-[10px] flex text-xl gap-4"
        >
          <IconWriteQuote /> Write new quote
        </button>

        <IconSearch class="w-[20px] h-[20px]" />
        <input
          @click="openSearch"
          :placeholder="
            showSearch ? 'Enter @ to search movies, Enter # to search quotes' : 'Search by'
          "
          class="bg-transparent outline-none transition-all w-[15%] focus:w-[55%] transform duration-500"
        />
      </div>
      <div v-for="quote in quotesStore.getQuotes" :key="quote.id">
        <QuoteCard :quote="quote" />
      </div>
    </div>
  </div>
</template>

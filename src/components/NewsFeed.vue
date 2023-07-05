<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useAuthService } from '@/services/useAuthService'
import { useQuotesStore } from '@/stores/quotes'
import QuoteCard from '@/components/QuoteCard.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import IconWriteQuote from '@/components/icons/IconWriteQuote.vue'
import AddQuote from '@/components/AddQuote.vue'

const authService = useAuthService()
const quotesStore = useQuotesStore()
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
    const { updatedQuote } = data
    quotesStore.updateQuote(updatedQuote)
  })
  window.Echo.channel('comment-quote').listen('QuoteCommented', (data) => {
    const { updatedQuote } = data
    quotesStore.updateQuote(updatedQuote)
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
        <div
          @focusin="openSearch"
          tabindex="0"
          :class="showSearch ? 'w-[70%]' : 'w-32'"
          class="flex items-center gap-4 overflow-hidden transition-all duration-500 ease-in-out cursor-pointer whitespace-nowrap"
        >
          <IconSearch class="w-[20px] h-[20px]" />
          <p v-if="!showSearch">Search by</p>
          <input
            v-if="showSearch"
            placeholder="Enter @ to search movies, Enter # to search quotes"
            class="w-full bg-transparent outline-none"
          />
        </div>
      </div>
      <div v-for="quote in quotesStore.getQuotes" :key="quote.id">
        <QuoteCard :quote="quote" />
      </div>
    </div>
  </div>
</template>

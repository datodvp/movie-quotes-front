<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useAuthService } from '@/services/useAuthService'
import { useQuotesStore } from '@/stores/quotes'
import QuoteCard from '@/components/QuoteCard.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import IconWriteQuote from '@/components/icons/IconWriteQuote.vue'
import AddQuote from '@/components/AddQuote.vue'
import { useUserStore } from '../stores/user'
import { Field, Form } from 'vee-validate'

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

const closeSearch = () => {
  showSearch.value = false
}

const search = (values) => {
  console.log(values)
  authService.searchQuotes(values).then((response) => {
    quotesStore.setQuotes(response.data.data.quotes)
  })
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
  window.Echo.channel('quote-unlike-action').stopListening('QuoteUnlikeAction')
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
        <Form
          :onSubmit="search"
          class="flex gap-4 duration-500 ease-out"
          :class="showSearch ? 'w-[100%]' : 'w-[20%]'"
        >
          <IconSearch />
          <Field
            @focusin="openSearch"
            @focusout="closeSearch"
            name="search"
            :placeholder="
              showSearch ? 'Enter @ to search movies, Enter # to search quotes' : 'Search by'
            "
            class="w-full transition-all duration-500 transform bg-transparent outline-none"
          />
        </Form>
      </div>
      <div v-for="quote in quotesStore.getQuotes" :key="quote.id">
        <QuoteCard :quote="quote" />
      </div>
      <div v-if="!quotesStore.getQuotes.length" class="mt-24 text-3xl text-center text-red-500">
        We could not find any movies!
        <p>^^ :P</p>
      </div>
    </div>
  </div>
</template>

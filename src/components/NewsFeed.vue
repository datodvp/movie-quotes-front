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
import _ from 'lodash'

const authService = useAuthService()
const quotesStore = useQuotesStore()
const userStore = useUserStore()
const showSearch = ref(false)

const currentPage = ref(1)
const scrollElement = ref(null)

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
  // if user searches anything infinite scroll functionality will stop
  window.removeEventListener('scroll', handleScroll)

  authService.searchQuotes(values).then((response) => {
    quotesStore.setQuotes(response.data.data.quotes)
  })
}

const handleScroll = () => {
  let element = scrollElement.value
  if (element.getBoundingClientRect().bottom < window.innerHeight) {
    LoadMoreQuotes()
  }
}

const LoadMoreQuotes = _.debounce(() => {
  currentPage.value = currentPage.value + 1
  authService.getQuotes(currentPage.value).then((response) => {
    const quotes = response.data.data.quotes.data
    quotes.forEach((quote) => {
      quotesStore.loadQuote(quote)
    })
  })

  // if (quote) quotesStore.addQuote(quote)
}, 500)

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
// onUnmounted(( ))

onMounted(async () => {
  const response = await authService.getQuotes(currentPage.value)
  quotesStore.setQuotes(response.data.data.quotes.data)
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
    <div class="w-[67%]" ref="scrollElement">
      <div class="flex justify-between gap-6 h-[3.25rem] mb-6 items-center">
        <button
          @click="openModal"
          class="bg-[#24222F] p-[11px] whitespace-nowrap hover:text-[#6C757D] duration-100 flex-1 rounded-[10px] flex text-xl gap-4"
        >
          <IconWriteQuote /> Write new quote
        </button>
        <Form
          :onSubmit="search"
          class="flex gap-4 duration-500 border-[#EFEFEF4D] ease-out"
          :class="showSearch ? 'w-[100%] border-b  pb-3 ' : 'w-[20%]'"
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
        We could not find any quotes!
        <p>^^ :P</p>
      </div>
    </div>
  </div>
</template>

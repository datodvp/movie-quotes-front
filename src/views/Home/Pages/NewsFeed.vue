<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useAuthService } from '@/services/useAuthService'
import QuoteCard from '@/components/UI/QuoteCard.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import IconWriteQuote from '@/components/icons/IconWriteQuote.vue'
import AddQuote from '@/components/modals/AddQuote.vue'
import { useUserStore } from '@/stores/user'
import { Field, Form } from 'vee-validate'
import _ from 'lodash'

const quotes = ref([])

const addQuote = (quote) => {
  quotes.value.unshift(quote)
}

const loadQuote = (quote) => {
  quotes.value.push(quote)
}

const setQuotes = (quotesList) => {
  quotes.value = quotesList
}

const addComment = (comment) => {
  quotes.value.map((quote) => {
    if (comment.quote_id === quote.id) {
      return quote.comments.push(comment)
    }
    return quote
  })
}

const addLike = (like) => {
  quotes.value.map((quote) => {
    if (like.pivot.quote_id === quote.id) {
      return quote.likes.push(like)
    }
    return quote
  })
}

const removeLike = (removedlike) => {
  quotes.value.map((quote) => {
    if (removedlike.pivot.quote_id === quote.id) {
      quote.likes = quote.likes.filter((like) => {
        if (like.pivot.user_id === removedlike.pivot.user_id) {
          return false
        }
        return true
      })
    }
    return quote
  })
}

const authService = useAuthService()
const userStore = useUserStore()
const showSearch = ref(false)

const currentPage = ref(1)
const scrollElement = ref(null)

const showCreateQuote = ref(false)
const closeModal = () => (showCreateQuote.value = false)
const openModal = () => (showCreateQuote.value = true)

const openSearch = () => {
  showSearch.value = true
}

const closeSearch = () => {
  showSearch.value = false
}

const search = (values) => {
  // if user searches anything infinite scroll functionality will stop
  window.removeEventListener('scroll', handleScroll)

  const encodedString = encodeURIComponent(values.search)

  authService.searchQuotes(encodedString).then((response) => {
    if (encodedString.length) setQuotes(response.data.data.quotes)
  })
}

const handleScroll = () => {
  let element = scrollElement.value
  if (element.getBoundingClientRect().bottom - 1000 < window.innerHeight) {
    LoadMoreQuotes()
  }
}

const LoadMoreQuotes = _.debounce(() => {
  currentPage.value = currentPage.value + 1
  authService.getQuotes(currentPage.value).then((response) => {
    const quotes = response.data.data.quotes
    quotes.forEach((quote) => {
      loadQuote(quote)
    })
  })
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
  setQuotes(response.data.data.quotes)
})

onMounted(() => {
  window.Echo.channel('quote-like-action').listen('QuoteLikeAction', (data) => {
    const { like } = data
    if (userStore.getUserData.id !== like[0].pivot.user_id) addLike(like[0])
  })
  window.Echo.channel('quote-unlike-action').listen('QuoteUnlikeAction', (data) => {
    const { like } = data
    if (userStore.getUserData.id !== like[0].pivot.user_id) removeLike(like[0])
  })
  window.Echo.channel('comment-quote').listen('QuoteCommented', (data) => {
    const { comment } = data
    if (userStore.getUserData.id !== comment.user_id) addComment(comment)
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
    <Transition name="modal">
      <AddQuote v-if="showCreateQuote" @addQuote="addQuote" :closeModal="closeModal" />
    </Transition>

    <div class="md:w-[67%] md:px-3" ref="scrollElement">
      <div class="flex justify-between gap-6 h-[3.25rem] mb-6 items-center">
        <button
          @click="openModal"
          class="bg-[#24222F] p-[11px] whitespace-nowrap hover:text-[#6C757D] duration-100 flex-1 rounded-[10px] flex text-xl gap-4"
        >
          <IconWriteQuote /> Write new quote
        </button>
        <Form
          :onSubmit="search"
          class="hidden gap-4 md:flex duration-500 border-[#EFEFEF4D] ease-out"
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
      <div v-for="quote in quotes" :key="quote.id" class="h-[fit]">
        <QuoteCard
          :quote="quote"
          @addLike="addLike"
          @removeLike="removeLike"
          @addComment="addComment"
        />
      </div>
      <div v-if="!quotes.length" class="mt-24 text-3xl text-center">
        We could not find any quotes!
        <p>^^ :P</p>
      </div>
    </div>
  </div>
</template>

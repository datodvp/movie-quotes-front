import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useQuotesStore = defineStore('quotes', () => {
  const quotes = ref([])

  const getQuotes = computed(() => quotes.value)

  const addQuote = (quote) => {
    quotes.value.unshift(quote)
  }

  const loadQuote = (quote) => {
    quotes.value.push(quote)
  }

  const setQuotes = (quotesList) => {
    quotes.value = quotesList
  }

  const updateQuote = (updatedQuote) => {
    quotes.value = quotes.value.map((quote) => {
      if (quote.id === updatedQuote.id) {
        return updatedQuote
      }
      return quote
    })
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

  return {
    getQuotes,
    addQuote,
    loadQuote,
    setQuotes,
    updateQuote,
    addComment,
    addLike,
    removeLike
  }
})

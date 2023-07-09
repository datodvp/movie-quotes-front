import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useQuotesStore = defineStore('quotes', () => {
  const quotes = ref([])

  const getQuotes = computed(() => quotes.value)

  const addQuote = (quote) => {
    quotes.value.unshift(quote)
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

  return {
    getQuotes,
    addQuote,
    setQuotes,
    updateQuote,
    addComment
  }
})

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useQuotesStore = defineStore('quotes', () => {
  const quotes = ref([])

  const getQuotes = computed(() => quotes.value)

  const addQuote = (quote) => {
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

  return {
    getQuotes,
    addQuote,
    setQuotes,
    updateQuote
  }
})

<script setup>
import { onMounted, ref } from 'vue'
import { useAuthService } from '@/services/useAuthService'
import QuoteCard from '@/components/QuoteCard.vue'

const authService = useAuthService()
const quotes = ref([])

onMounted(async () => {
  const response = await authService.getQuotes()
  quotes.value = response.data.data.quotes
})
</script>
<template>
  <div class="w-full pt-8">
    <div v-for="quote in quotes" :key="quote.id">
      <QuoteCard :quote="quote" />
    </div>
  </div>
</template>

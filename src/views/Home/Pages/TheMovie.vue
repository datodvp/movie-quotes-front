<script setup>
import { onMounted, provide, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthService } from '@/services/useAuthService.js'
import { useInterfaceStore } from '@/stores/interface.js'
import IconPencil from '@/components/icons/IconPencil.vue'
import IconTrash from '@/components/icons/IconTrash.vue'
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import AddQuoteToMovie from '@/components/modals/AddQuoteToMovie.vue'
import EditMovie from '@/components/modals/EditMovie.vue'
import { useRouter } from 'vue-router'
import SmallQuoteCard from '@/components/UI/SmallQuoteCard.vue'
import TheNavigation from '@/components/UI/TheNavigation.vue'

const route = useRoute()
const router = useRouter()
const authService = useAuthService()
const interfaceStore = useInterfaceStore()

const showAddQuoteToMovie = ref(false)
const openAddQuoteToMovie = () => (showAddQuoteToMovie.value = true)
const closeAddQuoteToMovie = () => (showAddQuoteToMovie.value = false)

const showEditMovie = ref(false)
const openEditMovie = () => (showEditMovie.value = true)
const closeEditMovie = () => (showEditMovie.value = false)

const movie = ref(null)
const quotes = ref(null)

const changeMovie = (updatedMovie) => {
  movie.value = updatedMovie
}

const addQuote = (newQuote) => {
  quotes.value.push(newQuote)
}

const updateQuote = (updatedQuote) => {
  quotes.value = quotes.value.map((quote) => (quote.id === updatedQuote.id ? updatedQuote : quote))
}

const removeQuote = (quoteId) => {
  authService
    .deleteQuote(quoteId)
    .then(() => (quotes.value = quotes.value.filter((quote) => quote.id !== quoteId)))
}

onMounted(() => {
  authService.getMovie(route.params.id).then((response) => {
    movie.value = response.data.data.movie
    quotes.value = response.data.data.movie.quotes.reverse()
  })
})

const deleteMovie = (movieId) => {
  authService.deleteMovie(movieId).then(() => {
    router.push({ name: 'moviesList' })
  })
}

provide('updateQuote', updateQuote)
</script>

<template>
  <TheNavigation class="hidden md:block" />
  <div v-if="movie" class="pt-8 h-fit w-full p-[35px] md:pr-[72px]">
    <Transition name="modal">
      <AddQuoteToMovie
        :movie="movie"
        v-if="showAddQuoteToMovie"
        @addQuote="addQuote"
        :closeModal="closeAddQuoteToMovie"
      />
    </Transition>

    <Transition name="modal">
      <EditMovie
        :movie="movie"
        :changeMovie="changeMovie"
        v-if="showEditMovie"
        :closeModal="closeEditMovie"
      />
    </Transition>

    <h1 class="text-2xl">{{ $t('texts.movie_description') }}</h1>
    <div class="flex flex-col gap-5 mt-8 md:flex-row">
      <div class="min-w-[60%] h-[441px]">
        <img :src="movie.image" alt="image" class="object-cover w-full h-full rounded-xl" />
      </div>
      <div class="w-full">
        <div class="flex justify-between">
          <h2 class="text-2xl whitespace-nowrap text-[#DDCCAA]">
            {{ movie.name[interfaceStore.getLocale] }} ({{ movie.year }})
          </h2>
          <div class="flex items-center gap-6 px-5 py-2 bg-[#24222F] rounded-[10px]">
            <p @click="openEditMovie" class="cursor-pointer"><IconPencil /></p>
            <p class="text-[#6C757D]">|</p>
            <p @click="deleteMovie(movie.id)" class="cursor-pointer"><IconTrash /></p>
          </div>
        </div>
        <div class="flex flex-wrap gap-2 mt-6">
          <div v-for="genre in movie.genres" :key="genre.id">
            <span class="px-4 py-2 text-lg font-bold bg-[#6C757D] rounded-[4px]">
              {{ genre.name[interfaceStore.getLocale] }}
            </span>
          </div>
        </div>
        <div class="flex mt-5 text-lg gap-[10px]">
          <span class="text-[#CED4DA] font-bold">{{ $t('texts.director') }}:</span>
          <span class="font-medium">{{ movie.director[interfaceStore.getLocale] }}</span>
        </div>
        <div class="mt-5">
          <p class="text-[#CED4DA] text-lg">
            {{ movie.description[interfaceStore.getLocale] }}
          </p>
        </div>
      </div>
    </div>
    <div class="flex gap-4 mt-12">
      <div class="text-2xl">
        {{ $t('texts.quotes') }} ({{ $t('texts.total') }} {{ quotes.length }})
      </div>
      <span class="text-[#6C757D] text-2xl"> | </span>
      <div>
        <PrimaryButton class="px-5"
          ><button @click="openAddQuoteToMovie" class="flex gap-2">
            <IconPlus />{{ $t('texts.add_quote') }}
          </button></PrimaryButton
        >
      </div>
    </div>
    <div class="mt-[3.25rem] flex flex-col gap-10 max-w-[808px]">
      <div v-for="quote in quotes" :key="quote.id">
        <SmallQuoteCard :quote="quote" @removeQuote="removeQuote" />
      </div>
    </div>
  </div>
</template>

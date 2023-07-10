<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthService } from '@/services/useAuthService.js'
import { useInterfaceStore } from '@/stores/interface.js'
import IconPencil from '@/components/icons/IconPencil.vue'
import IconTrash from '@/components/icons/IconTrash.vue'
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import AddQuoteToMovie from '@/components/AddQuoteToMovie.vue'
import IconThreeDots from '@/components/icons/IconThreeDots.vue'
import IconComment from '@/components/icons/IconComment.vue'
import IconLike from '@/components/icons/IconLike.vue'
import EditMovie from '@/components/EditMovie.vue'

const route = useRoute()
const authService = useAuthService()
const interfaceStore = useInterfaceStore()

const showAddQuoteToMovie = ref(false)
const openAddQuoteToMovie = () => (showAddQuoteToMovie.value = true)
const closeAddQuoteToMovie = () => (showAddQuoteToMovie.value = false)

const showEditMovie = ref(false)
const openEditMovie = () => (showEditMovie.value = true)
const closeEditMovie = () => (showEditMovie.value = false)

const movie = ref(null)

const changeMovie = (updatedMovie) => {
  movie.value = updatedMovie
}

onMounted(() => {
  authService.getMovie(route.params.id).then((response) => (movie.value = response.data.data.movie))
})

const backend_API_URL = import.meta.env.VITE_VUE_APP_API_URL
</script>

<template>
  <div v-if="movie" class="pt-8 h-fit w-full p-[35px] md:pr-[72px]">
    <AddQuoteToMovie
      :movie="movie"
      :showModal="showAddQuoteToMovie"
      :closeModal="closeAddQuoteToMovie"
    />
    <EditMovie
      :movie="movie"
      :changeMovie="changeMovie"
      :showModal="showEditMovie"
      :closeModal="closeEditMovie"
    />
    <h1 class="text-2xl">Movie description</h1>
    <div class="flex flex-col gap-5 mt-8 md:flex-row">
      <div class="min-w-[60%] h-[441px]">
        <img
          :src="`${backend_API_URL}/${movie.image}`"
          alt="image"
          class="object-cover w-full h-full rounded-xl"
        />
      </div>
      <div class="w-full">
        <div class="flex justify-between">
          <h2 class="text-2xl whitespace-nowrap text-[#DDCCAA]">
            {{ movie.name[interfaceStore.getLocale] }} ({{ movie.year }})
          </h2>
          <div class="flex items-center gap-6 px-5 py-2 bg-[#24222F] rounded-[10px]">
            <p @click="openEditMovie" class="cursor-pointer"><IconPencil /></p>
            <p class="text-[#6C757D]">|</p>
            <p class="cursor-pointer"><IconTrash /></p>
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
          <span class="text-[#CED4DA] font-bold">Director:</span>
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
      <div class="text-2xl">Quotes (total {{ movie.quotes.length }})</div>
      <span class="text-[#6C757D] text-2xl"> | </span>
      <div>
        <PrimaryButton class="px-5"
          ><button @click="openAddQuoteToMovie" class="flex gap-2">
            <IconPlus />Add quote
          </button></PrimaryButton
        >
      </div>
    </div>
    <div class="mt-[60px] flex flex-col gap-10 max-w-[808px]">
      <div v-for="quote in movie.quotes" :key="quote.id">
        <div class="px-8 py-6 bg-[#11101A] rounded-[14px]">
          <div class="flex items-center gap-[34px] relative">
            <div class="w-[226px] h-[140px]">
              <img
                :src="`${backend_API_URL}/${quote.image}`"
                alt="quote image"
                class="object-cover w-full h-full rounded-sm"
              />
            </div>
            <div>
              <p class="text-2xl text-[#CED4DA]">"{{ quote.text[interfaceStore.getLocale] }}"</p>
            </div>
            <div class="absolute top-0 right-0 hover:text-[#EFEFEF33] cursor-pointer duration-100">
              <IconThreeDots />
            </div>
          </div>
          <hr class="my-6 border-[#EFEFEF33]" />
          <div class="flex gap-8">
            <div>
              <div class="flex items-center gap-4">
                {{ quote.comments.length }}
                <IconComment />
              </div>
            </div>
            <div>
              <div class="flex items-center gap-4">
                {{ quote.likes.length }}
                <IconLike />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

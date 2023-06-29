<script setup>
import { onMounted, ref } from 'vue'
import { useAuthService } from '@/services/useAuthService'
import { useMoviesStore } from '@/stores/movies'
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue'
import MovieCard from './MovieCard.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import AddMovie from './AddMovie.vue'

const authService = useAuthService()
const moviesStore = useMoviesStore()

const showModal = ref(false)
const closeModal = () => (showModal.value = false)
const openModal = () => (showModal.value = true)

onMounted(async () => {
  const response = await authService.getMovies()

  moviesStore.setMovies(response.data.data.movies)
})
</script>

<template>
  <AddMovie :showModal="showModal" :closeModal="closeModal" />

  <div class="w-[102%] pr-16">
    <div class="flex items-center justify-between">
      <h2 class="mt-8 text-2xl font-medium">
        My list of movies (Total {{ moviesStore.getMovies.length }})
      </h2>
      <div class="flex items-center gap-8 text-xl">
        <div class="flex items-center gap-4">
          <IconSearch />
          <p>Search</p>
        </div>

        <PrimaryButton class="px-4" @click="openModal"><button>Add movie</button></PrimaryButton>
      </div>
    </div>

    <!-- section for movies list -->
    <section class="flex flex-wrap gap-x-12 gap-y-14 mt-14">
      <div v-for="movie in moviesStore.getMovies" :key="movie.id">
        <MovieCard :movie="movie" />
      </div>
    </section>
  </div>
</template>

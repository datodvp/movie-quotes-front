<script setup>
import { onMounted, ref } from 'vue'
import { useAuthService } from '@/services/useAuthService'
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue'
import MovieCard from '@/components/UI/MovieCard.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import AddMovie from '@/components/modals/AddMovie.vue'
import { Field, Form } from 'vee-validate'

const authService = useAuthService()

const movies = ref([])

const addMovie = (movie) => {
  movies.value.push(movie)
}

const setMovies = (moviesList) => {
  movies.value = moviesList
}

const showAddMovie = ref(false)
const closeModal = () => (showAddMovie.value = false)
const openModal = () => (showAddMovie.value = true)
const showSearch = ref(false)

const openSearch = () => {
  showSearch.value = true
}

const closeSearch = () => {
  showSearch.value = false
}

const search = (values) => {
  authService.searchMovies(values.search).then((response) => {
    setMovies(response.data.data.movies)
  })
}

onMounted(async () => {
  const response = await authService.getMovies()

  setMovies(response.data.data.movies)
})
</script>

<template>
  <Transition name="modal">
    <AddMovie v-if="showAddMovie" @addMovie="addMovie" :closeModal="closeModal" />
  </Transition>

  <div class="w-[102%] pr-16">
    <div class="flex items-center justify-between mt-8">
      <h2 class="text-2xl font-medium">My list of movies (Total {{ movies.length }})</h2>
      <div class="flex items-center justify-end gap-4 text-xl">
        <Form
          :onSubmit="search"
          class="hidden gap-4 p-3 duration-500 ease-out border rounded-md md:flex"
          :class="showSearch ? 'w-[100%]  border-[#6C757D]' : 'w-[30%] border-transparent'"
        >
          <IconSearch />
          <Field
            @focusin="openSearch"
            @focusout="closeSearch"
            name="search"
            placeholder="Search"
            class="w-full transition-all duration-500 transform bg-transparent outline-none"
          />
        </Form>

        <PrimaryButton class="px-4 py-6" @click="openModal"
          ><button class="flex gap-2"><IconPlus /> Add movie</button></PrimaryButton
        >
      </div>
    </div>

    <!-- section for movies list -->
    <section class="flex flex-wrap gap-x-12 gap-y-14 mt-14">
      <div v-for="movie in movies" :key="movie.id">
        <MovieCard :movie="movie" />
      </div>
    </section>
    <RouterView></RouterView>
  </div>
</template>

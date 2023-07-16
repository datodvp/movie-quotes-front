<script setup>
import { onMounted, ref } from 'vue'
import { useAuthService } from '@/services/useAuthService'
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue'
import MovieCard from '@/components/UI/MovieCard.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import IconBackArrow from '@/components/icons/IconBackArrow.vue'
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
  closeSearch()
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

  <div class="w-[100%] md:pr-16">
    <div class="flex items-center justify-between p-5 mt-8">
      <h2 class="text-2xl font-medium">My list of movies (Total {{ movies.length }})</h2>
      <div class="flex items-center justify-end gap-4 text-xl">
        <Form
          :onSubmit="search"
          class="fixed right-0 z-20 duration-500 ease-out rounded-md md:z-10 md:border md:p-3 md:gap-4 md:static md:flex"
          :class="
            showSearch
              ? 'w-[100%] flex items-start border-[#6C757D] bg-[#12101A] h-[90%] -right-0 top-0 md:bg-transparent'
              : 'w-[30%] border-transparent top-7 '
          "
        >
          <IconBackArrow
            @click="closeSearch"
            class="md:hidden w-[32px] h-[32px] mt-3 ml-6 mr-3"
            :class="showSearch ? '' : 'hidden md:block'"
          />
          <IconSearch :class="showSearch ? 'hidden md:block' : 'fixed md:static'" />
          <Field
            @click="openSearch"
            @focusout="closeSearch"
            name="search"
            placeholder="Search"
            :class="
              showSearch
                ? ' border-b p-3 pl-2 md:p-0 md:border-none w-full'
                : 'opacity-0 fixed md:static w-[30px] md:w-full md:opacity-100'
            "
            class="transition-all border-[#646363] duration-500 transform bg-transparent outline-none md:placeholder-current"
          />
        </Form>

        <PrimaryButton class="px-4 py-6" @click="openModal"
          ><button class="flex gap-2"><IconPlus /> Add movie</button></PrimaryButton
        >
      </div>
    </div>

    <!-- section for movies list -->
    <section class="flex flex-wrap gap-x-12 gap-y-14 mt-14">
      <div v-for="movie in movies" :key="movie.id" class="w-fit">
        <MovieCard :movie="movie" />
      </div>
    </section>
    <RouterView></RouterView>
  </div>
</template>

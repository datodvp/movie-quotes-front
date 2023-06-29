import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useMoviesStore = defineStore('movies', () => {
  const movies = ref([])

  const getMovies = computed(() => movies.value)

  const addMovie = (movie) => {
    movies.value.push(movie)
  }

  const setMovies = (moviesList) => {
    movies.value = moviesList
  }

  return {
    getMovies,
    addMovie,
    setMovies
  }
})

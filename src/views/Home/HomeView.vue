<script setup>
import TheHeader from '@/components/UI/TheHeader.vue'
import TheProfile from '@/views/Home/Pages/TheProfile.vue'
import NewsFeed from '@/views/Home/Pages/NewsFeed.vue'
import TheMovie from '@/views/Home/Pages/TheMovie.vue'
import TheQuote from '@/views/Home/Pages/TheQuote.vue'
import ListOfMovies from '@/views/Home/Pages/ListOfMovies.vue'
</script>

<template>
  <TheHeader />
  <div class="flex">
    <TheProfile />
  </div>
</template>

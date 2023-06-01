<script setup>
import TheHeader from '@/components/TheHeader.vue'

</script>

<template>
  <div class="relative flex flex-col h-full bg-gradient-to-b">
    <TheHeader />

    <RouterView />

    <main class="flex items-center justify-center flex-grow">
      <div class="text-2xl font-bold md:text-6xl w-72 md:w-[43rem] text-center">
        Find any quote in
        millions of movie lines
      </div>
    </main>
  </div>
</template>

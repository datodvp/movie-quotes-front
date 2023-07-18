<script setup>
import ImageNotFound from '@/assets/images/notFound.png'
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen gap-9">
    <div>
      <img :src="ImageNotFound" alt="not found" />
    </div>
    <h1 class="text-[47px] font-bold">Whoops!</h1>
    <p class="text-2xl font-medium">We can't see the page you are looking for</p>
    <PrimaryButton><RouterLink :to="{ name: 'newsFeed' }">Return home</RouterLink></PrimaryButton>
  </div>
</template>

<script setup>
import ImageGandalf from '@/assets/images/gandalf.png'
import ImageGandalfBackground from '@/assets/images/gandalfBackground.png'
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="flex items-center justify-center w-screen h-screen">
    <div>
      <div
        class="flex items-center justify-center px-4 bg-bottom bg-no-repeat"
        :style="`background-image:url('${ImageGandalfBackground}')`"
      >
        <img :src="ImageGandalf" alt="" />
      </div>
      <div class="flex flex-col items-center">
        <h2 class="text-[47px] font-bold mt-8">You shall not pass!</h2>
        <p class="mt-4 text-2xl font-medium">
          Sorry, but you don’t have permission to access this page
        </p>
        <PrimaryButton class="mt-10 w-fit px-7"
          ><RouterLink :to="{ name: 'newsFeed' }">Return home</RouterLink></PrimaryButton
        >
      </div>
    </div>
  </div>
</template>

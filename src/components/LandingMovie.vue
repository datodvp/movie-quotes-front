<script setup>
import IconLine from '@/components/icons/IconLine.vue'

defineProps({
  image: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  name: {
    tyle: String,
    required: true
  }
})
</script>
<template>
  <div class="sticky top-0 h-screen">
    <img :src="image" alt="movie" class="object-cover w-screen h-screen" />
    <div class="absolute top-[40%] left-[15%] flex">
      <div
        class="relative"
        v-motion
        :initial="{
          x: 500,
          opacity: 0
        }"
        :visible="{
          x: 0,
          opacity: 1,
          transition: {
            duration: 1500
          }
        }"
      >
        <IconLine class="absolute w-[17px] -left-7 top-4 lg:-left-16 lg:top-10 lg:w-fit" />
        <h2 class="text-[20px] lg:text-[50px] max-w-[761px] font-bold">
          {{ text }}
        </h2>

        <p class="lg:text-[30px] font-bold mt-4">{{ name }}</p>
      </div>
    </div>
  </div>
</template>

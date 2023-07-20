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
  <div
    class="z-10 h-screen bg-center bg-no-repeat bg-cover"
    :style="`background-image:url('${image}')`"
  >
    <div class="relative">
      <div class="absolute top-[25rem] left-[15%] flex">
        <div
          class="relative"
          v-motion
          :initial="{
            x: -200,
            opacity: 0
          }"
          :visible="{
            x: 0,
            opacity: 1,
            transition: {
              duration: 1000
            }
          }"
        >
          <IconLine class="absolute w-[1.063rem] -left-7 top-4 lg:-left-16 lg:top-10 lg:w-fit" />
          <h2 class="text-[1.25rem] lg:text-[3.125rem] max-w-[47.5rem] font-bold">
            {{ text }}
          </h2>

          <p class="lg:text-[1.875rem] font-bold mt-4">{{ name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

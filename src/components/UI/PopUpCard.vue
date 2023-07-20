<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import IconX from '@/components/icons/IconX.vue'

const router = useRouter()
const show = ref(false)

const closePopUp = () => {
  router.push({ name: 'landing' })
}

onMounted(() => {
  show.value = true
})
</script>

<template>
  <div v-if="show" class="fixed top-0 z-20 w-full h-full">
    <div class="relative w-full h-full">
      <div class="w-full h-full bg-[#0000008A] relative" @click="closePopUp"></div>
      <div
        class="absolute flex justify-center top-0 bottom-0 m-auto left-0 right-0 md:w-[601px] md:h-fit bg-[#222030] rounded-[0.625rem] py-[3.3rem] md:px-[7.5rem]"
      >
        <div>
          <slot></slot>
        </div>
        <div @click="closePopUp" class="absolute top-[2rem] right-[3rem] cursor-pointer">
          <IconX />
        </div>
      </div>
    </div>
  </div>
</template>

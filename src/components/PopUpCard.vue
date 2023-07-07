<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const show = ref(false)

const closePopUp = () => {
  router.push('/')
}

onMounted(() => {
  show.value = true
})
</script>

<template>
  <Transition>
    <div v-if="show" class="fixed z-20 w-full h-full">
      <div class="relative w-full h-full">
        <div class="w-full h-full bg-[#0000008A] relative" @click="closePopUp"></div>
        <div
          class="absolute flex justify-center top-0 bottom-0 m-auto left-0 right-0 md:w-fit md:h-fit bg-[#222030] rounded-[10px] py-[3.3rem] md:px-[7.5rem]"
        >
          <slot></slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>

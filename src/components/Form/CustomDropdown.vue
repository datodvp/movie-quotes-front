<script setup>
import IconCamera from '@/components/icons/IconCamera.vue'
import IconArrow from '@/components/icons/IconArrow.vue'
import { useInterfaceStore } from '@/stores/interface'
import { ref } from 'vue'

const interfaceStore = useInterfaceStore()

const show = ref(false)

defineProps({
  items: {
    type: Object,
    required: true
  },
  chosenItem: {
    required: true
  },
  setChosenItem: {
    type: Function,
    required: true
  }
})
</script>

<template>
  <div class="relative">
    <div @click="show = !show" class="flex items-center justify-between gap-3 p-5 bg-black relative">
      <IconCamera class="absolute" />
      <p class="pl-[2.5rem]">
        {{ (chosenItem.name && chosenItem.name[interfaceStore.getLocale]) || 'Choose a movie' }}
      </p>

      <IconArrow />
    </div>
    <div
      v-show="show"
      @click="show = !show"
      class="absolute w-[90%] max-h-[9.3rem] overflow-y-auto border"
    >
      <div v-for="item in items" :key="item.id">
        <div @click="setChosenItem(item)" class="w-full px-5 py-2 bg-black hover:bg-gray-600">
          {{ item.name[interfaceStore.getLocale] }}
        </div>
      </div>
    </div>
  </div>
</template>

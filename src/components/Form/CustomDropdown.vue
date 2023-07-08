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
  <div class="">
    <div @click="show = !show" class="bg-black p-5 flex items-center justify-between gap-3">
      <IconCamera class="absolute" />
      <p class="pl-[40px]">
        {{ (chosenItem.name && chosenItem.name[interfaceStore.getLocale]) || 'Choose a movie' }}
      </p>

      <IconArrow />
    </div>
    <div v-show="show" @click="show = !show" class="absolute w-[90%] border">
      <div v-for="item in items" :key="item.id">
        <div @click="setChosenItem(item)" class="bg-black w-full px-5 py-2 hover:bg-gray-600">
          {{ item.name[interfaceStore.getLocale] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useInterfaceStore } from '@/stores/interface.js'
import IconThreeDots from '@/components/icons/IconThreeDots.vue'
import IconComment from '@/components/icons/IconComment.vue'
import IconLike from '@/components/icons/IconLike.vue'
import IconEye from '@/components/icons/IconEye.vue'
import IconPencil from '@/components/icons/IconPencil.vue'
import IconTrash from '@/components/icons/IconTrash.vue'
import EditQuote from '@/components/modals/EditQuote.vue'
import ViewQuote from '@/components/modals/ViewQuote.vue'
import { ref } from 'vue'

defineProps({
  quote: {
    type: Object,
    required: true
  }
})

const showEditQuote = ref(false)
const openEditQuote = () => (showEditQuote.value = true)
const closeEditQuote = () => (showEditQuote.value = false)

const showViewQuote = ref(false)
const openViewQuote = () => (showViewQuote.value = true)
const closeViewQuote = () => (showViewQuote.value = false)

const showPopup = ref(false)

const interfaceStore = useInterfaceStore()
</script>

<template>
  <div class="px-8 py-6 bg-[#11101A] rounded-[14px]">
    <Transition name="modal">
      <EditQuote :quoteId="quote.id" v-if="showEditQuote" :closeModal="closeEditQuote" />
    </Transition>
    <Transition name="modal">
      <ViewQuote :quoteId="quote.id" v-if="showViewQuote" :closeModal="closeViewQuote" />
    </Transition>

    <div class="flex items-center gap-[34px] relative">
      <div class="w-[14.1rem] h-[8.75rem]">
        <img :src="quote.image" alt="quote image" class="object-cover w-full h-full rounded-sm" />
      </div>
      <div>
        <p class="text-2xl text-[#CED4DA]">"{{ quote.text[interfaceStore.getLocale] }}"</p>
      </div>
      <div
        @click="showPopup = !showPopup"
        class="absolute top-0 right-0 hover:text-[#EFEFEF33] cursor-pointer duration-100"
      >
        <IconThreeDots />
      </div>
      <div
        v-if="showPopup"
        class="absolute rounded-[10px] p-7 -right-[30%] top-8 w-[15.6rem] h-[12.5rem] bg-[#24222F]"
      >
        <div class="flex flex-col justify-around h-full">
          <div
            @click="openViewQuote"
            class="flex items-center gap-4 p-2 duration-300 cursor-pointer hover:bg-slate-700"
          >
            <IconEye />{{ $t('texts.view_quote') }}
          </div>
          <div
            @click="openEditQuote"
            class="flex items-center gap-4 p-2 duration-300 cursor-pointer hover:bg-slate-700"
          >
            <IconPencil />{{ $t('texts.edit') }}
          </div>
          <div
            @click="$emit('removeQuote', quote.id)"
            class="flex items-center gap-4 p-2 duration-300 cursor-pointer hover:bg-slate-700"
          >
            <IconTrash />{{ $t('texts.delete') }}
          </div>
        </div>
      </div>
    </div>
    <hr class="my-6 border-[#EFEFEF33]" />
    <div class="flex gap-8">
      <div>
        <div class="flex items-center gap-4">
          {{ quote.comments.length }}
          <IconComment />
        </div>
      </div>
      <div>
        <div class="flex items-center gap-4">
          {{ quote.likes.length }}
          <IconLike />
        </div>
      </div>
    </div>
  </div>
</template>

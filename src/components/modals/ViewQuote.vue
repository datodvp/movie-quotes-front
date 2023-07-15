<script setup>
import ModalCard from '@/components/UI/ModalCard.vue'
import DefaultAvatar from '@/assets/images/defaultAvatar.png'
import { useAuthService } from '@/services/useAuthService'
import { useUserStore } from '@/stores/user.js'
import { computed, onMounted, ref } from 'vue'
import TheComment from '@/components/UI/TheComment.vue'
import IconComment from '@/components/icons/IconComment.vue'
import IconLike from '@/components/icons/IconLike.vue'

const props = defineProps({
  quote: {
    type: Object,
    required: true
  },
  showModal: {
    type: Boolean,
    required: true
  },
  closeModal: {
    type: Function,
    required: false
  }
})

const backend_API_URL = import.meta.env.VITE_VUE_APP_API_URL
const userStore = useUserStore().getUserData
const authService = useAuthService()

const reversedComments = computed(() => props.quote.comments.slice().reverse())
const seeMore = ref(false)
</script>

<template>
  <ModalCard :show="showModal" @close="closeModal">
    <template #header><h2>View Quote</h2></template>
    <template #body>
      <div class="flex flex-col overflow-x-hidden overflow-y-auto gap-7">
        <div class="flex items-center gap-4 text-xl">
          <img
            :src="userStore.image ? `${backend_API_URL}/${userStore.image}` : DefaultAvatar"
            alt="avatar"
            class="w-[60px] h-[60px] object-cover rounded-full"
          />
          {{ userStore.username }}
        </div>
        <div class="flex flex-col gap-5 text-lg italic">
          <div class="border flex justify-between border-[#6C757DB2] p-2 rounded-[4px]">
            <p>"{{ quote.text.en }}"</p>
            <p class="text-[#6C757D] not-italic">Eng</p>
          </div>
          <div class="border flex justify-between border-[#6C757DB2] p-2 rounded-[4px]">
            <p>"{{ quote.text.ka }}"</p>
            <p class="text-[#6C757D] not-italic">ქარ</p>
          </div>
        </div>

        <div class="w-[900px] h-[500px]">
          <img :src="`${backend_API_URL}/${quote.image}`" alt="quote" class="w-full h-full" />
        </div>
        <div class="flex gap-6 text-xl">
          <div class="flex gap-3">{{ quote.comments.length }}<IconComment /></div>
          <div class="flex gap-3">{{ quote.likes.length }}<IconLike /></div>
        </div>
        <div class="">
          <template v-for="(comment, index) in reversedComments" :key="comment.id">
            <TheComment v-if="index < 2 && !seeMore" :comment="comment" />
            <TheComment v-else-if="seeMore" :comment="comment" />
          </template>
        </div>
        <button
          @click="seeMore = true"
          v-if="!seeMore && quote.comments.length > 2"
          class="ml-20 text-blue-600 hover:underline"
        >
          See more...
        </button>
        <button
          @click="seeMore = false"
          v-if="seeMore"
          class="mt-1 ml-20 text-blue-600 hover:underline"
        >
          See less
        </button>
      </div>
    </template>
  </ModalCard>
</template>

<style scoped></style>

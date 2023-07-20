<script setup>
import { onMounted, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { setLocale } from '@vee-validate/i18n'
import instantiatePusher from '@/helpers/instantiatePusher'

const authStore = useAuthStore()
const route = useRoute()

onMounted(async () => {
  instantiatePusher()
  setLocale(localStorage.getItem('locale') || 'en')

  // checks if route query has google token and sets user on authenticated
  watch(route, (state) => {
    if (state.query.tokenGoogle) {
      authStore.setIsAuthenticated(true)
    }
  })
})
</script>

<template>
  <div class="max-w-[120rem] m-auto from-[#11101A] via-[#08080D] to-[#000000]">
    <RouterView />
  </div>
</template>

<style>
.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>

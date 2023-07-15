<script setup>
import TheHeader from '@/components/UI/TheHeader.vue'
import TheNavigation from '@/components/UI/TheNavigation.vue'
</script>

<template>
  <TheHeader />
  <div class="flex">
    <TheNavigation />
    <slot></slot>
  </div>
</template>

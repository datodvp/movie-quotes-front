<script setup>
import TheHeader from '@/components/TheHeader.vue'
import TheNavigation from '@/components/Shared/TheNavigation.vue'
</script>

<template>
  <TheHeader />
  <div class="flex">
    <TheNavigation />
    <slot></slot>
  </div>
</template>

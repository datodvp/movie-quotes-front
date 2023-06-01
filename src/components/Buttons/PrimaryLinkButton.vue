<script setup>
import { RouterLink } from 'vue-router';

defineProps({
    to: {
        type: String,
        required: true
    }
})
</script>

<template>
    <RouterLink :to="to" class="bg-[#E31221] w-full px-6 h-9 flex whitespace-nowrap justify-center items-center rounded">
        <slot class="w-full"></slot>
    </RouterLink>
</template>

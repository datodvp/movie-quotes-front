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
    <RouterLink :to="to" class="bg-[#E31221] w-full h-9 flex justify-center items-center rounded">
        <slot></slot>
    </RouterLink>
</template>

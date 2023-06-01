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
    <RouterLink :to="to" class="flex items-center justify-center w-full px-6 border rounded h-9">
        <slot></slot>
    </RouterLink>
</template>

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
    <RouterLink :to="to" class="flex items-center justify-center w-24 border rounded h-9">
        <slot></slot>
    </RouterLink>
</template>

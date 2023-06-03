<script setup>
defineProps({
    errorMessage: {
        type: String,
        required: false
    }
})
</script>

<template>
    <p v-if="errorMessage" class="text-[#DC3545] mt-5 text-center max-w-[384px]">{{ errorMessage }}</p>
</template>
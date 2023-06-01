<script setup>
defineProps({
    type: {
        type: String,
        required: false
    }
})
</script>

<template>
    <button :type="type" class="flex items-center justify-center w-full gap-2 px-5 border rounded h-9">
        <slot></slot>
    </button>
</template>

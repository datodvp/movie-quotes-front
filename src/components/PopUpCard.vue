<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

const closePopUp = () => {
    router.push('/')
}
</script>

<template>
    <div class="absolute w-full h-full ">
        <div class="relative w-full h-full">
            <div class="w-full h-full bg-[#0000008A] relative" @click="closePopUp"></div>
            <div
                class="absolute top-0 bottom-0 m-auto left-0 right-0 w-fit h-fit bg-[#222030] rounded-[10px] py-[3.3rem] px-[7.5rem]">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
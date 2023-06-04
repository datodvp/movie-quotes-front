<template>
    <div class="bg-[#E31221] h-9 w-full rounded hover:bg-[#CC0E10] focus:bg-[#B80D0F] disabled:bg-[#EC4C57]">
        <slot></slot>
    </div>
</template>

<style scoped>
:slotted(a) {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    white-space: nowrap;
    padding-left: 1.2rem;
    padding-right: 1.2rem;
}

:slotted(button) {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    white-space: nowrap;
}
</style>

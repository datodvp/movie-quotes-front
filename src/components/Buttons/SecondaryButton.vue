<template>
    <div class="w-full border rounded h-9 whitespace-nowrap">
        <slot></slot>
    </div>
</template>

<style scoped>
:slotted(a) {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    padding-left: 1.2rem;
    padding-right: 1.2rem;
    white-space: nowrap;
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
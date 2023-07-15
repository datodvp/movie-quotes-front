<!-- This component is taken from Vue JS official website -->
<script setup>
import IconX from '@/components/icons/IconX.vue'
</script>

<template>
  <div class="modal-mask backdrop-blur-[1px]">
    <div
      class="bg-[#11101A] md:w-[47%] min-h-[10%] modal-container flex flex-col relative h-fit max-h-[100%] md:max-h-[90%]"
    >
      <button class="absolute modal-default-button" @click="$emit('close')"><IconX /></button>
      <div class="flex justify-center text-2xl font-medium">
        <slot name="header"></slot>
      </div>
      <hr class="absolute left-0 w-full top-16 mb-8 border-[#EFEFEF33]" />
      <div class="h-full pr-3 overflow-y-auto mt-14">
        <slot name="body"></slot>
      </div>
    </div>
  </div>
</template>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-default-button {
  right: 20px;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: grey;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #5e5656;
}
</style>

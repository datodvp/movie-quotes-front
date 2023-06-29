<!-- This component is taken from Vue JS official website -->
<script setup>
defineProps({
  show: {
    type: Boolean,
    required: true
  }
})
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask backdrop-blur-[1px]">
      <div class="bg-[#11101A] w-[55%] min-h-[10%] modal-container relative h-[95%]">
        <button class="float-right modal-default-button" @click="$emit('close')">X</button>
        <div class="flex justify-center">
          <slot name="header"></slot>
        </div>
        <hr class="absolute left-0 w-full mt-6 mb-8 border-[#EFEFEF33]" />
        <div class="max-h-[92%] overflow-y-auto mt-14">
          <slot name="body"></slot>
        </div>
      </div>
    </div>
  </Transition>
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

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>

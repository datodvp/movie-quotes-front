<script setup>
import { Field, ErrorMessage } from 'vee-validate'

defineProps({
  name: {
    type: String,
    required: false,
    default: ''
  },
  modelValue: {
    type: String,
    required: false
  },
  placeholder: {
    type: String,
    required: false
  },
  rules: {
    type: Object,
    required: false,
    default: new Object({
      required: true
    })
  },
  label: {
    type: String,
    required: false
  },
  type: {
    type: String,
    required: false,
    default: 'text'
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false
  },
  language: {
    type: String,
    required: false
  }
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="relative">
    <Field
      v-slot="{ field }"
      :name="name"
      :value="modelValue"
      :rules="rules"
      @input="$emit('update:modelValue', $event.target.value)"
    >
      <div
        class="bg-transparent w-full border border-[#6C757D] flex items-center rounded-[4.8px] text-xl pl-4 pr-12 py-2"
      >
        <span class="text-[#6C757D] whitespace-nowrap text-base pr-2">{{ placeholder }}</span>
        <input
          v-bind="field"
          :name="name"
          :value="modelValue"
          :id="name"
          :type="type"
          :disabled="disabled"
          class="w-full text-xl bg-transparent outline-none"
        />
      </div>
    </Field>
    <p class="text-[#6C757D] absolute top-3 right-4">{{ language }}</p>
    <ErrorMessage :name="name" class="max-w-[300px] text-[#DC3545] mt-1" />
  </div>
</template>

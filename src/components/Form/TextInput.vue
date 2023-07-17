<script setup>
import { Field, ErrorMessage } from 'vee-validate'
import IconValidationWarning from '@/components/icons/IconValidationWarning.vue'
import IconValidationSuccess from '@/components/icons/IconValidationSuccess.vue'
import IconPasswordHide from '@/components/icons/IconPasswordHide.vue'
import { computed } from 'vue'

const props = defineProps({
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
    default: new Object()
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
  }
})

defineEmits(['update:modelValue'])

const typeIsPassword = computed(() => props.type === 'password')
</script>

<template>
  <div class="flex flex-col w-full mt-4">
    <label :for="name"
      >{{ label }}<span v-if="props.rules.required" class="ml-1 text-red-800">*</span></label
    >

    <Field
      v-slot="{ field, meta }"
      :name="name"
      :value="modelValue"
      :rules="rules"
      @input="$emit('update:modelValue', $event.target.value)"
    >
      <div class="relative flex items-center justify-end mt-2 md:w-full h-fit">
        <input
          v-bind="field"
          :name="name"
          :value="modelValue"
          :id="name"
          :placeholder="placeholder"
          :type="type"
          :disabled="disabled"
          :class="
            !meta.valid && meta.touched
              ? 'border-[1px] border-[#DC3545]'
              : meta.valid && meta.touched && 'border-[1px] border-[#198754]'
          "
          class="rounded-md text-[#212529] py-[7px] w-full pl-3 pr-11 bg-[#CED4DA] md:h-12 border-[1px] border-[#CED4DA] outline-none focus:shadow-[0px_0px_0px_4px_#0D6EFD40]"
        />

        <IconValidationWarning
          v-if="!meta.valid && meta.validated && type !== 'password'"
          class="absolute right-3"
        />
        <IconValidationSuccess
          v-if="meta.valid && meta.validated && type !== 'password'"
          class="absolute right-3"
        />
        <IconPasswordHide v-if="typeIsPassword" class="absolute right-3" />
      </div>
    </Field>

    <ErrorMessage :name="name" class="max-w-[300px] text-[#DC3545] mt-1" />
  </div>
</template>

<script setup>
import { Field, ErrorMessage } from 'vee-validate';
import IconValidationWarning from '../icons/IconValidationWarning.vue';
import IconValidationSuccess from '../icons/IconValidationSuccess.vue';
import IconPasswordHide from '../icons/IconPasswordHide.vue'
const props = defineProps({
    name: {
        type: String,
        required: true
    },
    modelValue: {
        type: String,
        required: true
    },
    placeholder: {
        type: String,
        required: true
    },
    rules: {
        type: Object,
        required: false
    },
    label: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: false,
        default: 'text'
    }
})

defineEmits(['update:modelValue'])


</script>

<template>
    <div class="flex flex-col mt-4">
        <label :for="name">{{ label }}<span v-if="props.rules.required" class="ml-1 text-red-800">*</span></label>

        <Field v-slot="{ field, meta }" :name="name" :value="modelValue" :rules="rules"
            @input="$emit('update:modelValue', $event.target.value)">

            <div class="relative flex items-center justify-end mt-2 w-fit h-fit">

                <input v-bind="field" :name="name" :value="modelValue" :id="name" :placeholder="placeholder" :type="type"
                    :class="!meta.valid && meta.touched ? 'border-[1px] border-[#DC3545]' : meta.valid && meta.touched && 'border-[1px] border-[#198754]'"
                    class="rounded-md py-[7px] pl-3 pr-11 bg-[#CED4DA] text-[#6C757D] lg:w-96 border-[1px] border-[#CED4DA] outline-none focus:shadow-[0px_0px_0px_4px_#0D6EFD40]">

                <IconValidationWarning v-if="!meta.valid && meta.validated && type !== 'password'"
                    class="absolute right-3" />
                <IconValidationSuccess v-if="meta.valid && meta.validated && type !== 'password'"
                    class="absolute right-3" />
                <IconPasswordHide v-if="type === 'password'" class="absolute right-3" />

            </div>

        </Field>


        <ErrorMessage :name="name" class="max-w-[300px] text-[#DC3545] mt-1" />
    </div>
</template>
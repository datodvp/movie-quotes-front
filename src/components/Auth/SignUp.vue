<script setup>
import PopUpCard from '../PopUpCard.vue'
import TextInput from '../Form/TextInput.vue'
import { Form } from 'vee-validate'
import { ref } from 'vue';

const username = ref('')
</script>

<template>
    <PopUpCard>
        <div class="flex flex-col items-center justify-center">
            <h1 class="text-3xl font-medium">Create an account</h1>
            <p class="text-[#6C757D] mt-3">Start your journey!</p>
            <Form>
                <TextInput name="username" placeholder="At least 3 & max.15 lower case characters" v-model="username"
                    :rules="{ required: true, min: 3, max: 15, latin: true }" />
            </Form>
        </div>
    </PopUpCard>
</template>
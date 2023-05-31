<script setup>
import PopUpCard from '../PopUpCard.vue'
import TextInput from '../Form/TextInput.vue'
import { Form } from 'vee-validate'
import { ref } from 'vue';
import { authClient } from '../../services/AuthService'
import Auth from '../../services/AuthService'

const username = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')

const onSubmit = async (values) => {
    // await authClient.get("/sanctum/csrf-cookie");
    await Auth.registerUser(values).then(response => console.log(response))
    console.log('dato')
}
</script>

<template>
    <PopUpCard>
        <div class="flex flex-col items-center justify-center">
            <h1 class="text-3xl font-medium">Create an account</h1>
            <p class="text-[#6C757D] mt-3">Start your journey!</p>
            <Form @submit="onSubmit">
                <TextInput label="Name" name="username" placeholder="At least 3 & max.15 lower case characters"
                    v-model="username" :rules="{ required: true, min: 3, max: 15, latin: true }" />
                <TextInput label="Email" name="email" placeholder="Enter your email" v-model="email"
                    :rules="{ required: true, email: true }" />
                <TextInput type="password" label="Password" name="password"
                    placeholder="At least 8 & max.15 lower case characters" v-model="password"
                    :rules="{ required: true, latin: true, min: 8, max: 15 }" />
                <TextInput type="password" label="Confirm password" name="password_confirmation"
                    placeholder="Confirm password" v-model="passwordConfirmation"
                    :rules="{ required: true, confirmed: 'password' }" />

                <button to="sign-up" class="bg-[#E31221] w-full mt-6 h-9 flex justify-center items-center rounded">
                    Get Started
                </button>

                <button to="login" class="flex items-center justify-center w-full gap-2 mt-4 border rounded h-9">
                    <IconGoogle />Sign up with Google
                </button>
                <div class="flex justify-center gap-1 mt-8">
                    <p>Already have an account?</p>
                    <RouterLink to="/login" class="text-[#0D6EFD] underline">Log in</RouterLink>
                </div>
            </Form>
        </div>
    </PopUpCard>
</template>
<script setup>
import PopUpCard from '../PopUpCard.vue'
import TextInput from '../Form/TextInput.vue'
import { Form } from 'vee-validate'
import { ref } from 'vue';
import Auth from '../../services/AuthService'
import PrimaryButton from '../Buttons/PrimaryButton.vue';
import SecondaryButton from '../Buttons/SecondaryButton.vue'
import IconGoogle from '../icons/IconGoogle.vue';

const username = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')

const onSubmit = async (values) => {
    await Auth.registerUser(values).then(response => console.log(response))
}

const registerGoogle = async () => {
    Auth.authGoogle()
}
</script>

<template>
    <PopUpCard>
        <div class="flex flex-col items-center justify-center w-full">
            <h1 class="p-4 text-3xl font-medium">Create an account</h1>
            <p class="p-4 text-[#6C757D] mt-3">Start your journey!</p>
            <Form @submit="onSubmit" class="w-full px-4 md:px-0">

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

                <PrimaryButton class="mt-6">Get Started</PrimaryButton>

                <SecondaryButton @click="registerGoogle" type="button">
                    <IconGoogle />Sign up with Google
                </SecondaryButton>

                <div class="flex justify-center gap-1 mt-8">
                    <p>Already have an account?</p>
                    <RouterLink to="/login" class="text-[#0D6EFD] underline">Log in</RouterLink>
                </div>
            </Form>
        </div>
    </PopUpCard>
</template>
<script setup>
import PopUpCard from '../PopUpCard.vue'
import TextInput from '../Form/TextInput.vue'
import { Field, Form } from 'vee-validate'
import { ref } from 'vue';
import Auth from '../../services/AuthService'
import { RouterLink } from 'vue-router';
import IconGoogle from '../../components/icons/IconGoogle.vue'
import PrimaryButton from '../Buttons/PrimaryButton.vue';
import SecondaryButton from '../Buttons/SecondaryButton.vue';

const login = ref('')
const password = ref('')
const remember_me = ref(null)

const onSubmit = async (values) => {
    // await authClient.get("/sanctum/csrf-cookie");
    await Auth.login(values);
    console.log('dato')
}
</script>

<template>
    <PopUpCard>
        <div class="flex flex-col items-center justify-center">
            <h1 class="text-3xl font-medium">Log in to your account</h1>
            <p class="text-[#6C757D] mt-3">Welcome back! Please enter your details.</p>
            <Form @submit="onSubmit">
                <TextInput label="Email or Username" name="login" placeholder="Enter your email or username" v-model="login"
                    :rules="{ required: true }" />
                <TextInput type="password" label="Password" name="password" placeholder="Password" v-model="password"
                    :rules="{ required: true, latin: true, min: 8, max: 15 }" />
                <div class="flex justify-between mt-4">
                    <label class="flex items-center gap-2 cursor-pointer w-fit">
                        <Field type="checkbox" name="remember" v-model="remember_me" class="w-[16px] h-[16px]" />
                        Remember me
                    </label>
                    <RouterLink to="/" class="text-[#0D6EFD] underline flex justify-center items-center">Forgot password
                    </RouterLink>
                </div>

                <PrimaryButton class="mt-4">
                    Sign in
                </PrimaryButton>

                <SecondaryButton type="button">
                    <IconGoogle />Sign in with Google
                </SecondaryButton>

                <div class="flex justify-center gap-1 mt-8">
                    <p>Don't have an account?</p>
                    <RouterLink to="/sign-up" class="text-[#0D6EFD] underline">Sign up</RouterLink>
                </div>

            </Form>
        </div>
    </PopUpCard>
</template>
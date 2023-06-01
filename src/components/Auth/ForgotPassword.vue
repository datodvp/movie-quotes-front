<script setup>
import PopUpCard from '../PopUpCard.vue';
import TextInput from '../Form/TextInput.vue'
import PrimaryButton from '../Buttons/PrimaryButton.vue';
import IconBackArrow from '@/components/icons/IconBackArrow.vue'
import AuthService from '../../services/AuthService';
import { Form } from 'vee-validate';
import { ref } from 'vue';

const email = ref('')

const onSubmit = (values) => {
    AuthService.forgotPassword(values).then(() => {
        console.log('password reset instruction sent!')
    }).catch((error) => {
        console.log('could not sent instuction sorry... :(')
    })
}
</script>

<template>
    <PopUpCard>
        <div class="flex flex-col items-center justify-center w-full">
            <h1 class="text-3xl font-medium">Forgot Password</h1>
            <p class="text-[#6C757D] mt-3 max-w-[21rem] text-center">Enter the email and we’ll send an email with
                instructions to reset your password</p>
            <Form @submit="onSubmit" class="w-full px-4 md:px-0">
                <TextInput label="Email" name="email" placeholder="Enter your email" v-model="email"
                    :rules="{ required: true, email: true }" />

                <PrimaryButton class="mt-6">
                    Send instructions
                </PrimaryButton>

                <RouterLink :to="{ name: 'login' }" class="flex justify-center items-center mt-8 text-[#6C757D] gap-3">
                    <IconBackArrow />Back to log in
                </RouterLink>

            </Form>
        </div>
    </PopUpCard>
</template>
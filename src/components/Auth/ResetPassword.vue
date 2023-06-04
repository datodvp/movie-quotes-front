<script setup>
import PopUpCard from '../PopUpCard.vue';
import TextInput from '../Form/TextInput.vue'
import PrimaryButton from '../Buttons/PrimaryButton.vue';
import IconBackArrow from '@/components/icons/IconBackArrow.vue'
import { useAuthStore } from '../../stores/auth'
import { Form } from 'vee-validate';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ServerErrorMessage from '../ServerErrorMessage.vue';

const authStore = useAuthStore()

const password = ref('')
const passwordConfirmation = ref('')

const route = useRoute()
const router = useRouter();

const errorMessage = ref('')

const onSubmit = async (values) => {
    // add email and token behind the scenes for backend validation
    values.email = route.query.email
    values.token = route.query.token

    const response = await authStore.resetPassword(values)

    if (response.status === 200) {
        router.push({ name: 'passwordUpdated' })
    } else {
        errorMessage.value = response.response.data.errors.message;
    }
}
</script>

<template>
    <PopUpCard>
        <div class="flex flex-col items-center justify-center w-full">
            <h1 class="text-3xl font-medium">Create new password</h1>
            <p class="text-[#6C757D] mt-3 max-w-[21rem] text-center">Your new password must be different from
                previous used passwords</p>
            <Form @submit="onSubmit" class="w-full px-4 md:px-0">

                <TextInput type="password" label="Password" name="password"
                    placeholder="At least 8 & max.15 lower case characters" v-model="password"
                    :rules="{ required: true, min: 8, max: 15, latin: true }" />

                <TextInput type="password" label="Confirm password" name="password_confirmation"
                    placeholder="Confirm password" v-model="passwordConfirmation"
                    :rules="{ required: true, confirmed: 'password' }" />

                <ServerErrorMessage :errorMessage="errorMessage" />

                <PrimaryButton class="mt-6">
                    <button>Reset password</button>
                </PrimaryButton>

                <RouterLink :to="{ name: 'login' }" class="flex justify-center items-center mt-8 text-[#6C757D] gap-3">
                    <IconBackArrow />Back to log in
                </RouterLink>

            </Form>
        </div>
    </PopUpCard>
</template>
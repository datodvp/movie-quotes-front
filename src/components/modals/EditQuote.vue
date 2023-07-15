<script setup>
import CustomInput from '@/components/Form/CustomInput.vue'
import { Form } from 'vee-validate'
import ServerErrorMessage from '@/components/UI/ServerErrorMessage.vue'
import ModalCard from '@/components/UI/ModalCard.vue'
import DefaultAvatar from '@/assets/images/defaultAvatar.png'
import { useAuthService } from '@/services/useAuthService'
import { useUserStore } from '@/stores/user.js'
import { inject, onMounted, ref } from 'vue'
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue'
import IconPhoto from '@/components/icons/IconPhoto.vue'

const props = defineProps({
  quoteId: {
    type: Number,
    required: true
  },
  closeModal: {
    type: Function,
    required: false
  }
})

const updateQuote = inject('updateQuote')

const quote = ref(null)

const userStore = useUserStore().getUserData
const authService = useAuthService()

const form = ref(null)
const imageInputElement = ref(null)
const imagePreview = ref(null)

// these are filled to trigger validation true on first load
const quoteEn = ref('filled')
const quoteKa = ref('filled')

const successMessage = ref('')
const errorMessage = ref('')
const backend_API_URL = import.meta.env.VITE_VUE_APP_API_URL

onMounted(() => {
  authService.getQuote(props.quoteId).then((response) => {
    quote.value = response.data.data.quote
    quoteEn.value = quote.value.text.en
    quoteKa.value = quote.value.text.ka
    imagePreview.value = `${backend_API_URL}/${quote.value.image}`
  })
})

const handleImagePreview = (e) => {
  const image = e.target.files[0]
  imagePreview.value = URL.createObjectURL(image)
}

const editQuote = async (values) => {
  errorMessage.value = ''
  successMessage.value = ''

  const formElement = document.querySelector('#edit-quote-form')

  const formData = new FormData(formElement)

  formData.append('_method', 'patch')

  try {
    const response = await authService.editQuote(quote.value.id, formData)
    updateQuote(response.data.data.movie)
    successMessage.value = 'Quote edited succesfully!'
  } catch (error) {
    errorMessage.value = error.response.data.message
  }
}
</script>

<template>
  <ModalCard @close="closeModal">
    <template #header><h2>Edit Quote</h2></template>
    <template #body>
      <Form
        @submit="editQuote"
        enctype="multipart/form-data"
        id="edit-quote-form"
        ref="form"
        class="flex flex-col overflow-x-hidden overflow-y-auto gap-7"
      >
        <div class="flex items-center gap-4 text-xl">
          <img
            :src="userStore.image ? `${backend_API_URL}/${userStore.image}` : DefaultAvatar"
            alt="avatar"
            class="w-[60px] h-[60px] object-cover rounded-full"
          />
          {{ userStore.username }}
        </div>
        <CustomInput name="text[en]" v-model="quoteEn" placeholder="Quote:" language="Eng" />
        <CustomInput name="text[ka]" v-model="quoteKa" placeholder="ციტატა:" language="ქარ" />
        <label
          class="relative flex border-[#6C757D] border rounded text-lg h-fit"
          for="image-input"
        >
          <div class="absolute flex items-center justify-center w-full h-full">
            <div
              class="bg-black opacity-80 w-[135px] h-[85px] flex items-center justify-center flex-col rounded-[10px]"
            >
              <IconPhoto />
              <p>Change Photo</p>
            </div>
          </div>
          <img
            class="object-cover"
            :class="imagePreview && 'w-full h-[300px] md:h-[500px]'"
            :src="imagePreview"
          />
          <div class="flex items-center">
            <input
              type="file"
              name="image"
              id="image-input"
              ref="imageInputElement"
              class="absolute h-full left-0 text-[0px] w-full cursor-pointer opacity-0"
              @change="handleImagePreview"
            />
          </div>
        </label>

        <div class="flex justify-center">
          <ServerErrorMessage :errorMessage="errorMessage" />
          <p class="text-green-700 text-center max-w-[384px]">{{ successMessage }}</p>
        </div>
        <PrimaryButton><button class="p-2">Save changes</button></PrimaryButton>
      </Form>
    </template>
  </ModalCard>
</template>

<style scoped></style>

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

onMounted(() => {
  authService.getQuote(props.quoteId).then((response) => {
    quote.value = response.data.data.quote
    quoteEn.value = quote.value.text.en
    quoteKa.value = quote.value.text.ka
    imagePreview.value = quote.value.image
  })
})

const handleImagePreview = (e) => {
  const image = e.target.files[0]
  const maxSize = 2.8 * 1024 * 1024; // 2.8 MB in bytes

  if(image.size > maxSize){
       alert("Image is too big! Please choose smaller size.");
       imagePreview.value = "";
    } else {
      imagePreview.value = URL.createObjectURL(image)
    }
}


const editQuote = async () => {
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

const previewImageStyling = imagePreview.value && 'w-full h-[18.75rem] md:h-[31.25rem]'
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
            :src="userStore.image ? userStore.image : DefaultAvatar"
            alt="avatar"
            class="w-[3.25rem] h-[3.25rem] object-cover rounded-full"
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
              class="bg-black opacity-80 w-[7.8rem] h-[5.3rem] flex items-center justify-center flex-col rounded-[0.625rem]"
            >
              <IconPhoto />
              <p>Change Photo</p>
            </div>
          </div>
          <img class="object-cover" :class="previewImageStyling" :src="imagePreview" />
          <div class="flex items-center">
            <input
              type="file"
              name="image"
              id="image-input"
              ref="imageInputElement"
              class="absolute h-full left-0 text-[0rem] w-full cursor-pointer opacity-0"
              @change="handleImagePreview"
            />
          </div>
        </label>

        <div class="flex justify-center">
          <ServerErrorMessage :errorMessage="errorMessage" />
          <p class="text-green-700 text-center max-w-[24rem]">{{ successMessage }}</p>
        </div>
        <PrimaryButton><button class="p-2">Save changes</button></PrimaryButton>
      </Form>
    </template>
  </ModalCard>
</template>

<style scoped></style>

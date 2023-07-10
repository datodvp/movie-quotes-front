<script setup>
import CustomInput from '@/components/Form/CustomInput.vue'
import { Form } from 'vee-validate'
import ServerErrorMessage from '@/components/ServerErrorMessage.vue'
import ModalCard from '@/components/Shared/ModalCard.vue'
import DefaultAvatar from '@/assets/images/defaultAvatar.png'
import { useAuthService } from '@/services/useAuthService'
import { useUserStore } from '@/stores/user.js'
import { onMounted, ref } from 'vue'
import PrimaryButton from './Buttons/PrimaryButton.vue'
import { useInterfaceStore } from '@/stores/interface'
import { useQuotesStore } from '@/stores/quotes'
import IconPhoto from '@/components/icons/IconPhoto.vue'

const props = defineProps({
  showModal: {
    type: Boolean,
    required: true
  },
  closeModal: {
    type: Function,
    required: false
  },
  movie: {
    type: Object,
    required: true
  }
})

const userStore = useUserStore().getUserData
const authService = useAuthService()
const quotesStore = useQuotesStore()
const interfaceStore = useInterfaceStore()

const form = ref(null)
const imageInputElement = ref(null)
const imagePreview = ref(null)

const quoteEn = ref('')
const quoteKa = ref('')

const successMessage = ref('')
const errorMessage = ref('')

const moviesList = ref([])
const chosenMovie = ref(props.movie)

onMounted(async () => {
  const response = await authService.getAllMovies()
  moviesList.value = response.data.data.movies
})

const handleImagePreview = (e) => {
  const image = e.target.files[0]
  imagePreview.value = URL.createObjectURL(image)
}

const addQuote = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  const formElement = document.querySelector('#add-quote-form')

  const formData = new FormData(formElement)
  formData.append('movie_id', chosenMovie.value.id)

  try {
    const response = await authService.postQuote(formData)
    quotesStore.addQuote(response.data.data.quote)
    successMessage.value = 'Quote added succesfully!'
    clearInputs()
  } catch (error) {
    errorMessage.value = error.response.data.message
  }
}

const clearInputs = () => {
  form.value.resetForm()
  quoteEn.value = ''
  quoteKa.value = ''
  imageInputElement.value.value = null
  imagePreview.value = null
}

const backend_API_URL = import.meta.env.VITE_VUE_APP_API_URL
</script>

<template>
  <ModalCard :show="showModal" @close="closeModal">
    <template #header><h2>Add Quote</h2></template>
    <template #body>
      <Form
        @submit="addQuote"
        enctype="multipart/form-data"
        id="add-quote-form"
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
        <div class="flex gap-[27px]">
          <div class="min-w-[35%] h-[158px]">
            <img
              :src="`${backend_API_URL}/${movie.image}`"
              alt="image"
              class="object-cover w-full h-full rounded-[12px]"
            />
          </div>
          <div>
            <p class="mb-6 text-2xl font-medium text-[#DDCCAA]">
              {{ movie.name[interfaceStore.getLocale] }}
            </p>
            <div class="flex flex-wrap gap-2">
              <div v-for="genre in movie.genres" :key="genre.id">
                <span class="px-3 py-1 text-lg font-bold bg-gray-600 rounded-md">{{
                  genre.name[interfaceStore.getLocale]
                }}</span>
              </div>
            </div>
            <div class="mt-5 text-lg flex gap-[10px]">
              <span class="font-bold text-[#CED4DA]">Director:</span>
              <span class="font-medium">{{ movie.director[interfaceStore.getLocale] }}</span>
            </div>
          </div>
        </div>
        <CustomInput name="text[en]" v-model="quoteEn" placeholder="Quote:" language="Eng" />
        <CustomInput name="text[ka]" v-model="quoteKa" placeholder="ციტატა:" language="ქარ" />
        <label
          class="relative flex gap-4 border-[#6C757D] border rounded text-lg h-fit py-[21px] px-6"
          for="image-input"
        >
          <img
            class="max-h-[180px] object-cover"
            :class="imagePreview && 'w-[50%]'"
            :src="imagePreview"
          />
          <div class="flex items-center flex-1">
            <div class="flex flex-col items-center w-full">
              <p v-if="imagePreview" class="text-base">REPLACE PHOTO</p>
              <div class="flex items-center gap-4" :class="imagePreview && 'flex-col'">
                <div class="flex">
                  <IconPhoto class="ml-4 mr-2" />
                  <p class="text-xl">Drag & drop your image here or</p>
                </div>

                <p class="bg-[#9747FF] p-[10px] ml-4">Choose file</p>
              </div>
            </div>

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
        <PrimaryButton><button class="p-2">Add movie</button></PrimaryButton>
      </Form>
    </template>
  </ModalCard>
</template>

<style scoped></style>

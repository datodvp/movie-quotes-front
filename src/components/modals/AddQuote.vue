<script setup>
import CustomInput from '@/components/Form/CustomInput.vue'
import { Form } from 'vee-validate'
import ServerErrorMessage from '@/components/UI/ServerErrorMessage.vue'
import ModalCard from '@/components/UI/ModalCard.vue'
import DefaultAvatar from '@/assets/images/defaultAvatar.png'
import { useAuthService } from '@/services/useAuthService'
import { useUserStore } from '@/stores/user.js'
import { computed, onMounted, ref } from 'vue'
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue'
import IconPhoto from '@/components/icons/IconPhoto.vue'
import CustomDropdown from '@/components/Form/CustomDropdown.vue'

defineProps({
  closeModal: {
    type: Function,
    required: false
  }
})

const emit = defineEmits(['addQuote'])

const userStore = useUserStore().getUserData
const authService = useAuthService()

const form = ref(null)
const imageInputElement = ref(null)
const imagePreview = ref(null)

const quoteEn = ref('')
const quoteKa = ref('')

const successMessage = ref('')
const errorMessage = ref('')

const moviesList = ref([])
const chosenMovie = ref('')

const setChosenMovie = (newMovie) => {
  chosenMovie.value = newMovie
}

onMounted(async () => {
  const response = await authService.getMovies()
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
    emit('addQuote', response.data.data.quote)
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

const previewImageWidth = computed(() => imagePreview.value && 'w-[50%]')
const previewImageColumn = computed(() => imagePreview.value && 'flex-col')
</script>

<template>
  <ModalCard @close="closeModal">
    <template #header><h2>Write new quote</h2></template>
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
            :src="userStore.image ? userStore.image : DefaultAvatar"
            alt="avatar"
            class="w-[3.75rem] h-[3.75rem] object-cover rounded-full"
          />
          {{ userStore.username }}
        </div>
        <CustomInput name="text[en]" v-model="quoteEn" placeholder="Quote:" language="Eng" />
        <CustomInput name="text[ka]" v-model="quoteKa" placeholder="ციტატა:" language="ქარ" />
        <label
          class="relative flex gap-4 border-[#6C757D] border rounded text-lg h-fit py-[21px] px-6"
          for="image-input"
        >
          <img
            class="max-h-[11.25rem] object-cover"
            :class="previewImageWidth"
            :src="imagePreview"
          />
          <div class="flex items-center flex-1">
            <div class="flex flex-col items-center w-full">
              <p v-if="imagePreview" class="text-base">REPLACE PHOTO</p>
              <div class="flex items-center gap-4" :class="previewImageColumn">
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
        <CustomDropdown
          :items="moviesList"
          :chosenItem="chosenMovie"
          :setChosenItem="setChosenMovie"
        />

        <div class="flex justify-center">
          <ServerErrorMessage :errorMessage="errorMessage" />
          <p class="text-green-700 text-center max-w-[24rem]">{{ successMessage }}</p>
        </div>
        <PrimaryButton><button class="p-2">Add movie</button></PrimaryButton>
      </Form>
    </template>
  </ModalCard>
</template>

<style scoped></style>

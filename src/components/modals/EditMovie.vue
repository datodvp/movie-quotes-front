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
import { useInterfaceStore } from '@/stores/interface'
import IconPhoto from '@/components/icons/IconPhoto.vue'

const props = defineProps({
  movie: {
    type: Object,
    required: true
  },
  changeMovie: {
    type: Function,
    requinred: true
  },
  closeModal: {
    type: Function,
    required: false
  }
})

const userStore = useUserStore().getUserData
const authService = useAuthService()
const interfaceStore = useInterfaceStore()

const form = ref(null)
const imageInputElement = ref(null)
const imagePreview = ref(props.movie.image)

const showDropdown = ref(false)

const nameEn = ref(props.movie.name.en)
const nameKa = ref(props.movie.name.ka)
const genres = ref(props.movie.genres)
const year = ref(props.movie.year.toString())
const directorEn = ref(props.movie.director.en)
const directorKa = ref(props.movie.director.ka)
const descriptionEn = ref(props.movie.description.en)
const descriptionKa = ref(props.movie.description.ka)

const successMessage = ref('')
const errorMessage = ref('')

const genresList = ref([])

onMounted(async () => {
  const response = await authService.getGenres()
  genresList.value = response.data.data.genres
})

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const handleImagePreview = (e) => {
  const image = e.target.files[0]
  imagePreview.value = URL.createObjectURL(image)
}

const alreadyIsChosen = (id) => {
  return genres.value.some((item) => item.id === id) && 'bg-slate-500 underline'
}

const addChosenGenre = (genre) => {
  if (!alreadyIsChosen(genre.id)) {
    genres.value.push(genre)
  }
}

const removeChosenGenre = (id) => {
  genres.value = genres.value.filter((genre) => genre.id !== id)
}

const EditMovie = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  const formElement = document.querySelector('#edit-movie-form')

  const formData = new FormData(formElement)

  formData.append('_method', 'patch')

  // genre is an array and needs to be stringified for formData
  if (genres.value.length) {
    const genresArray = genres.value.map((genre) => genre.id)
    formData.set('genres', JSON.stringify(genresArray))
  }

  try {
    const response = await authService.editMovie(props.movie.id, formData)
    props.changeMovie(response.data.data.movie)
    successMessage.value = 'Movie edited succesfully!'
  } catch (error) {
    errorMessage.value = error.response.data.message
  }
}

const previewImageWidth = computed(() => imagePreview.value && 'w-[50%]')
const userImage = computed(() => (userStore.image ? userStore.image : DefaultAvatar))
const yearRule = computed(() => ({ required: true, digits: 4 }))
</script>

<template>
  <ModalCard @close="closeModal">
    <template #header><h2>Edit Movie</h2></template>
    <template #body>
      <Form
        @submit="EditMovie"
        enctype="multipart/form-data"
        id="edit-movie-form"
        ref="form"
        class="flex flex-col overflow-x-hidden overflow-y-auto gap-7"
      >
        <div class="flex items-center gap-4 text-xl">
          <img
            :src="userImage"
            alt="avatar"
            class="w-[3.75rem] h-[3.75rem] object-cover rounded-full"
          />
          {{ userStore.username }}
        </div>
        <CustomInput name="name[en]" v-model="nameEn" placeholder="Movie name:" language="Eng" />
        <CustomInput name="name[ka]" v-model="nameKa" placeholder="ფილმის სახელი:" language="ქარ" />
        <div
          @click="toggleDropdown"
          class="bg-transparent relative py-[11px] w-full border border-[#6C757D] flex flex-wrap h-fit gap-2 items-center rounded-[4.8px] text-xl pl-4 pr-12"
        >
          <div class="absolute left-0 z-10 w-full top-full bg-slate-600">
            <div v-if="showDropdown">
              <div
                v-for="genre in genresList"
                :key="genre.id"
                @click="addChosenGenre(genre)"
                class="p-1 cursor-pointer hover:bg-slate-500"
                :class="alreadyIsChosen(genre.id)"
              >
                <p>
                  {{ genre.name[interfaceStore.getLocale] }}
                </p>
              </div>
            </div>
          </div>
          <span class="text-[#6C757D] whitespace-nowrap text-base pr-2">ჟანრი/Genres:</span>
          <p
            v-for="genre in genres"
            :key="genre.id"
            @click="removeChosenGenre(genre.id)"
            class="text-sm bg-[#6C757D] mr-1 py-[5px] px-[6px] whitespace-nowrap"
          >
            {{ genre.name[interfaceStore.getLocale] }} x
          </p>
        </div>
        <CustomInput name="year" v-model="year" placeholder="წელი/Year:" :rules="yearRule" />
        <CustomInput
          name="director[en]"
          v-model="directorEn"
          placeholder="Director:"
          language="Eng"
        />
        <CustomInput
          name="director[ka]"
          v-model="directorKa"
          placeholder="რეჟისორი:"
          language="ქარ"
        />
        <CustomInput
          name="description[en]"
          v-model="descriptionEn"
          placeholder="Description:"
          language="Eng"
        />
        <CustomInput
          name="description[ka]"
          v-model="descriptionKa"
          placeholder="ფილმის აღწერა:"
          language="ქარ"
        />
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
          <p class="text-green-700 text-center max-w-[24rem]">{{ successMessage }}</p>
        </div>
        <PrimaryButton><button class="p-2">Edit movie</button></PrimaryButton>
      </Form>
    </template>
  </ModalCard>
</template>

<style scoped></style>

<script setup>
import TheHeader from '@/components/TheHeader.vue'
import LandingMovie from '../components/LandingMovie.vue'
import ImageInterstellar from '@/assets/images/interstellar.png'
import ImageTenenbaums from '@/assets/images/tenenbaums.png'
import ImageLotr from '@/assets/images/lotr.png'
</script>

<template>
  <div class="relative flex flex-col h-full bg-gradient-to-b">
    <TheHeader class="z-10" />

    <RouterView class="z-10" />

    <main class="flex items-center justify-center flex-grow min-h-[808px]">
      <div class="text-2xl font-bold md:text-6xl w-72 md:w-[43rem] text-center">
        {{ $t('texts.find_any_movies') }}
      </div>
    </main>

    <LandingMovie
      :image="ImageInterstellar"
      text="“You have to leave somethig 
            behind to go forward”"
      name="Interstellar, 2014"
    />
    <LandingMovie
      :image="ImageTenenbaums"
      text="I think we’re just gonna have
            to be secretly in love with earch other
            and leave it that"
      name="The Royal Tenenbaums, 2001"
    />
    <LandingMovie :image="ImageLotr" text="You shall not pass" name="The Lord of the rings, 2001" />
  </div>
</template>

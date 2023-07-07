<script setup>
import LandingMovie from '@/components/LandingMovie.vue'
import ImageInterstellar from '@/assets/images/interstellar.png'
import ImageTenenbaums from '@/assets/images/tenenbaums.png'
import ImageLotr from '@/assets/images/lotr.png'
import UnauthorizedLayout from '../layouts/UnauthorizedLayout.vue'
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue'
</script>

<template>
  <UnauthorizedLayout class="relative flex flex-col h-full bg-gradient-to-b">
    <RouterView class="z-10" />

    <main
      class="flex bg-scroll bg-gradient-to-b from-[#11101A] via-[#08080D] to-[#000000] items-center justify-center flex-grow min-h-[710px]"
    >
      <div
        class="text-2xl fixed flex flex-col items-center gap-y-6 font-bold md:text-6xl w-72 md:w-[43rem] text-center"
      >
        {{ $t('texts.find_any_movies') }}
        <PrimaryButton class="w-32">
          <RouterLink to="sign-up" class="text-xl font-normal">{{ $t('Get started') }}</RouterLink>
        </PrimaryButton>
      </div>
    </main>

    <LandingMovie
      :image="ImageInterstellar"
      text="“You have to leave somethig 
            behind to go forward”"
      name="Interstellar, 2014"
      class="bg-fixed"
    />
    <LandingMovie
      :image="ImageTenenbaums"
      text="I think we’re just gonna have
            to be secretly in love with earch other
            and leave it that"
      name="The Royal Tenenbaums, 2001"
      class="bg-fixed"
    />
    <LandingMovie
      :image="ImageLotr"
      text="You shall not pass"
      name="The Lord of the rings, 2001"
      class="bg-fixed"
    />
    <footer class="py-[15px] pl-[4%] text-xs">© 2022 movie quotes. All rights reserved.</footer>
  </UnauthorizedLayout>
</template>

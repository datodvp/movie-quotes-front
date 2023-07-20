<script setup>
import LandingMovie from '@/components/UI/LandingMovie.vue'
import ImageInterstellar from '@/assets/images/interstellar.png'
import ImageTenenbaums from '@/assets/images/tenenbaums.png'
import ImageLotr from '@/assets/images/lotr.png'
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue'
import TheHeader from '@/components/UI/TheHeader.vue'
</script>

<template>
  <div class="bg-gradient-to-b from-[#11101A] via-[#08080D] to-[#00000000]">
    <TheHeader />
    <div class="relative flex flex-col min-h-screen bg-gradient-to-b">
      <RouterView v-slot="{ Component }" class="z-10">
        <Transition mode="out-in">
          <Component :is="Component" />
        </Transition>
      </RouterView>

      <main
        class="flex bg-gradient-to-b from-[#11101A] via-[#08080D] to-[#000000] items-center justify-center flex-grow min-h-[35rem] h-[35rem] md:min-h-[44.375rem]"
      >
        <div
          class="text-2xl fixed text-[#DDCCAA] flex flex-col items-center gap-y-6 font-bold md:text-6xl w-72 md:w-[43rem] text-center"
        >
          {{ $t('texts.find_any_movies') }}
          <PrimaryButton class="w-32">
            <RouterLink to="sign-up" class="text-xl font-normal">{{
              $t('texts.get_started')
            }}</RouterLink>
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
      <footer class="py-[0.938rem] pl-[4%] text-xs">
        © 2022 movie quotes. All rights reserved.
      </footer>
    </div>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  scale: 1.1;
}
</style>

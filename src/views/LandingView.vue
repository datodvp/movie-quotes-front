<script setup>
import PrimaryLinkButton from '../components/Buttons/PrimaryLinkButton.vue';
import SecondaryLinkButton from '../components/Buttons/SecondaryLinkButton.vue';
import IconArrow from '../components/icons/IconArrow.vue'

</script>

<template>
  <div class="relative flex flex-col h-full">

    <header>
      <div class="px-4 mt-6 lg:px-16 wrapper">
        <nav class="flex justify-between">
          <h1>MOVIE QUOTES</h1>
          <div class="flex gap-4">
            <div class="items-center justify-center hidden gap-2 lg:flex mr-7">Eng
              <IconArrow />
            </div>
            <div class="flex gap-2 lg:gap-4">
              <PrimaryLinkButton to="sign-up">Sign up</PrimaryLinkButton>
              <SecondaryLinkButton to="login">Log in</SecondaryLinkButton>
            </div>

          </div>
        </nav>
      </div>
    </header>

    <RouterView />

    <main class="flex items-center justify-center flex-grow">
      <div class="text-2xl font-bold lg:text-6xl w-72 lg:w-[43rem] text-center">
        Find any quote in
        millions of movie lines
      </div>
    </main>
  </div>
</template>

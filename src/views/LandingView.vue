<script setup>
import IconArrow from '../components/icons/IconArrow.vue'

</script>

<template>
  <div class="relative flex flex-col h-full">

    <header>
      <div class="px-16 mt-6 wrapper">
        <nav class="flex justify-between">
          <h1>MOVIE QUOTES</h1>
          <div class="flex gap-4">
            <div class="flex items-center justify-center gap-2 mr-7">Eng
              <IconArrow />
            </div>
            <RouterLink to="sign-up" class="bg-[#E31221] w-28 h-9 flex justify-center items-center rounded">Sign up
            </RouterLink>
            <RouterLink to="login" class="flex items-center justify-center w-24 border rounded h-9">Log in</RouterLink>
          </div>
        </nav>
      </div>
    </header>

    <RouterView />

    <main class="flex items-center justify-center flex-grow">
      <div class="text-6xl w-[43rem] text-center">
        Find any quote in
        millions of movie lines
      </div>
    </main>
  </div>
</template>

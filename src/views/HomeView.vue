<script setup>

</script>

<template>
  <div class="flex flex-col h-full relative">

    <header>
      <div class="wrapper">
        <nav class="flex justify-between">
          <h1>MOVIE QUOTES</h1>
          <div class="flex gap-4">
            <span>Eng V</span>
            <RouterLink to="sign-up">Sign up</RouterLink>
            <span>Log in</span>
          </div>
        </nav>
      </div>
    </header>


    <RouterView />

    <main class="flex flex-grow justify-center items-center">
      <div class="text-6xl w-[43rem] text-center">
        Find any quote in
        millions of movie lines
      </div>
    </main>
  </div>
</template>

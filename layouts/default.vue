<template>
  <div class="relative h-screen">
    <header class="bg-gray-900">
      <div class="container mx-auto flex h-14 items-center">
        <NuxtLink to="/" class="flex items-center">
          <Icon name="arcticons:movielab" class="h-12 w-12 bg-white" />

          <h1 class="ml-2 text-3xl">Movie Search</h1>
        </NuxtLink>

        <div class="ml-auto relative block">
          <Icon
            name="material-symbols:search"
            size="28"
            class="absolute right-2 top-1 flex items-center pl-3 cursor-pointer"
          />
          <input
            type="text"
            class="bg-transparent w-96 placeholder:text-slate-400 text-white text-sm border border-gray-600 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow"
            placeholder="Search"
          />
        </div>
      </div>
    </header>

    <slot />

    <footer
      class="bg-slate-950 flex justify-end py-4 container mx-auto absolute bottom-0 left-0"
    >
      <span class="text-sm mr-2"> powered by </span>
      <img src="/assets/TMDB-Logo.svg" width="100" height="100" />
    </footer>
  </div>
</template>

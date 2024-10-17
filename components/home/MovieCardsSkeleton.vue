<template>
  <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-5 gap-y-10">
    <div v-for="card in 10" class="flex flex-col">
      <div
        class="relative h-[436px] w-full animate-pulse bg-slate-700 rounded-lg"
      ></div>

      <div class="mt-5 w-48 h-5 animate-pulse bg-slate-700 rounded"></div>
      <div class="w-48 h-5 animate-pulse bg-slate-700 rounded mt-2"></div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

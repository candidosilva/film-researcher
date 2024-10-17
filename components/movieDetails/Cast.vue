<template>
  <div class="flex flex-1 flex-wrap gap-4 justify-center sm:justify-normal">
    <div
      v-for="(card, index) in cast"
      :key="index"
      class="flex flex-col bg-white rounded-xl h-72"
    >
      <NuxtImg
        :src="`https://image.tmdb.org/t/p/original/${card.profile_path}`"
        class="rounded-t-lg w-36"
      />

      <div class="p-2">
        <div class="text-zinc-900 text-base font-bold">
          {{ card.name }}
        </div>
        <div class="text-zinc-900 text-sm">
          {{ card.character }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({ cast: Array });
</script>

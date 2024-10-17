<template>
  <div class="flex flex-1 flex-wrap gap-4 justify-center sm:justify-normal">
    <div
      v-for="(card, index) in cast"
      :key="index"
      class="flex flex-col bg-white rounded-xl h-72"
    >
      <Icon
        name="mdi:image-off-outline"
        v-if="card.profile_path === null"
        class="w-full h-full"
      />
      <NuxtImg
        v-else
        :src="`https://image.tmdb.org/t/p/original/${card.profile_path}`"
        class="rounded-t-lg w-36"
      />

      <div class="p-2">
        <div
          class="text-zinc-900 text-base font-bold max-w-[14ch] overflow-hidden whitespace-nowrap"
        >
          {{ card.name }}
        </div>
        <div
          class="text-zinc-900 text-sm max-w-[16ch] overflow-hidden whitespace-nowrap"
        >
          {{ card.character }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Cast {
  profile_path: string;
  name: string;
  character: string;
}
interface Props {
  cast: Cast[];
}
defineProps<Props>();
</script>

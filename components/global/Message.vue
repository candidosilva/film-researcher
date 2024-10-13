<template>
  <div
    :class="{ hidden: !messageStore.showMessage }"
    class="overflow-y-auto overflow-x-hidden fixed top-0 left-0 z-50 justify-center items-center w-full h-full"
  >
    <div
      class="relative top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex w-96 p-6 flex-col rounded-md border-none bg-zinc-950"
    >
      <p>{{ messageStore.message }}</p>

      <button
        class="text-blue-400 ml-auto cursor-pointer"
        @click="messageStore.showMessage = false"
      >
        close
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const messageStore = useMessageStore();
</script>

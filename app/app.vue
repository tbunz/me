<template>
  <NuxtLayout>
    <NuxtPage :transition="pageTransition" />
  </NuxtLayout>
</template>

<script setup lang="ts">
const pageTransition = {
  name: 'page',
  mode: 'out-in' as const,
}
</script>

<style lang="scss">
.page-enter-active,
.page-leave-active {
  transition: opacity $duration-normal $ease-out;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>

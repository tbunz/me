<template>
  <NuxtLayout>
    <NuxtPage :transition="pageTransition" />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { lenis } = useLenis()

// Reset to the top of the incoming page. Fires after the outgoing page has
// fully left (out-in), so the old page fades out in place instead of snapping.
// Going through Lenis also resets its internal scroll so the jump sticks.
function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
  else window.scrollTo(0, 0)
}

const pageTransition = {
  name: 'page',
  mode: 'out-in' as const,
  onBeforeEnter: scrollToTop,
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

<template>
  <NuxtLayout>
    <NuxtPage :transition="pageTransition" />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { lenis } = useLenis()

// Shared with the layout so the sticky footer (which lives outside <NuxtPage>)
// can fade in sync with the page transition. Router guards fire too early —
// before the visual out-in transition runs — so we drive this off the
// transition's own leave/enter hooks instead.
const navigating = useState('navigating', () => false)

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
  // Fade the footer out as the old page leaves...
  onBeforeLeave: () => { navigating.value = true },
  onBeforeEnter: scrollToTop,
  // ...and back in once the new page has entered (scroll is already at the top,
  // so this happens off-screen).
  onAfterEnter: () => { navigating.value = false },
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

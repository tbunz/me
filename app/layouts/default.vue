<template>
  <div class="site" :style="{ '--nav-height': `${navHeight}px` }">
    <SiteNav ref="navRef" />
    <div v-if="navRef?.menuOpen" class="menu-backdrop" @click="navRef?.closeMenu()" />
    <div class="site-content">
      <main :class="{ 'is-blurred': navRef?.menuOpen }">
        <slot />
      </main>
    </div>
    <SiteFooter :class="{ 'is-navigating': navigating }" />
    <Transition name="cover">
      <div v-if="!ready" class="page-cover" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
const navRef = ref<{ $el: HTMLElement; menuOpen: boolean; closeMenu: () => void } | null>(null)
const navHeight = ref(0)
const ready = ref(false)

// The footer lives outside <NuxtPage>, so the page transition never fades it.
// Its opacity is driven by `navigating`, toggled from the page transition's
// leave/enter hooks in app.vue (shared via useState). A revealed footer fades
// out with the leaving page, then fades back in off-screen after the scroll
// has snapped to the top.
const navigating = useState('navigating', () => false)

let observer: ResizeObserver | null = null

onMounted(() => {
  const el = navRef.value?.$el
  if (!el) return

  navHeight.value = el.offsetHeight

  observer = new ResizeObserver((entries) => {
    navHeight.value = entries[0]?.borderBoxSize[0]?.blockSize ?? el.offsetHeight
  })
  observer.observe(el)

  ready.value = true
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<style lang="scss" scoped>
.site {
  // lvh (static "toolbar-hidden" height) so the toolbar toggling never resizes
  // the page — guarantees full coverage at the tallest viewport without jumps.
  min-height: 100lvh;
}

// Opaque, full-width layer that covers the sticky footer until you scroll
// past the content — this is what creates the reveal.
.site-content {
  position: relative;
  z-index: 1;
  min-height: 100lvh; // static (see .site) — no resize on toolbar toggle
  background: $bg-base;
}

main {
  // Single source of truth for the page's horizontal gutter. Full-bleed
  // components (e.g. HeroImage) break out by referencing this, so they stay
  // in sync when the value changes per-breakpoint.
  --page-gutter: 16px;

  max-width: 1600px;
  margin: 0 auto;
  // Standard site-wide bottom padding for every page.
  padding: calc(var(--nav-height, 0px) + 16px) var(--page-gutter) 175px;
  overflow-x: clip;
  transition: filter $duration-normal $ease-out;

  // Tighter side padding on mobile buys a little more line width for prose.
  @include mobile {
    --page-gutter: 12px;
  }

  &.is-blurred {
    filter: blur(4px);
    pointer-events: none;
  }
}

.menu-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
}

.page-cover {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
  background: $bg-base;
  pointer-events: none;
}

.cover-leave-active {
  transition: opacity $duration-slow $ease-out;
}

.cover-leave-to {
  opacity: 0;
}
</style>

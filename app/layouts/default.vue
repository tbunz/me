<template>
  <div class="site" :style="{ '--nav-height': `${navHeight}px` }">
    <SiteNav ref="navRef" />
    <main :class="{ 'is-blurred': navRef?.menuOpen }">
      <slot />
    </main>
    <Transition name="cover">
      <div v-if="!ready" class="page-cover" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
const navRef = ref<{ $el: HTMLElement; menuOpen: boolean } | null>(null)
const navHeight = ref(0)
const ready = ref(false)

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
  min-height: 100dvh;
}

main {
  max-width: 1600px;
  margin: 0 auto;
  padding: calc(var(--nav-height, 0px) + 16px) 16px 0;
  transition: filter $duration-normal $ease-out;

  &.is-blurred {
    filter: blur(4px);
    pointer-events: none;
  }
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

<template>
  <div class="site" :style="{ '--nav-height': `${navHeight}px` }">
    <SiteNav ref="navRef" />
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const navRef = ref<{ $el: HTMLElement } | null>(null)
const navHeight = ref(0)

let observer: ResizeObserver | null = null

onMounted(() => {
  const el = navRef.value?.$el
  if (!el) return

  navHeight.value = el.offsetHeight

  observer = new ResizeObserver((entries) => {
    navHeight.value = entries[0]?.borderBoxSize[0]?.blockSize ?? el.offsetHeight
  })
  observer.observe(el)
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
  padding-top: var(--nav-height, 0px);
}
</style>

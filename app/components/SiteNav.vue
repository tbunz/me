<template>
  <header class="site-header">
    <nav ref="navEl" class="site-nav">
      <NavLink to="/">Work</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/contact">Contact</NavLink>
    </nav>
  </header>
</template>

<script setup lang="ts">
import gsap from 'gsap'

const navEl = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!navEl.value) return
  const links = navEl.value.querySelectorAll('.nav-link')

  gsap.from(links, {
    opacity: 0,
    y: -8,
    duration: 0.4,
    ease: 'power3.out',
    stagger: 0.06,
  })
})
</script>

<style lang="scss" scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: $bg-base;
  border-bottom: 1px solid $tan-light;
}

.site-nav {
  max-width: 1600px;
  margin: 0 auto;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 24px;
}
</style>

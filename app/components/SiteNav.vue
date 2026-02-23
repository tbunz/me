<template>
  <nav class="site-nav">
    <NuxtLink to="/">Home</NuxtLink>
    <NuxtLink to="/about">About</NuxtLink>
    <NuxtLink to="/contact">Contact</NuxtLink>
  </nav>
</template>

<style lang="scss" scoped>
.site-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 0 24px;
  background: $bg-base;
  border-bottom: 1px solid $tan-light;
}
</style>

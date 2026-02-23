<template>
  <NuxtLink :to="to" class="nav-link">
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  to: string
}>()
</script>

<style lang="scss" scoped>
.nav-link {
  position: relative;
  display: inline-block;
  font-size: $text-caption;
  font-weight: $weight-medium;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: $brown-light;
  text-decoration: none;
  transition: color $duration-fast $ease-out;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1.5px;
    background: $terracotta;
    transition: width $duration-normal $ease-out;
  }

  &:hover {
    color: $text-primary;

    &::after {
      width: 100%;
    }
  }

  &.router-link-active {
    color: $text-primary;
    font-weight: $weight-bold;

    &::after {
      width: 100%;
      background: $text-primary;
    }
  }
}
</style>

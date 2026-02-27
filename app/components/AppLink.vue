<template>
  <NuxtLink :to="to" class="app-link">
    <span class="app-link-text app-link-text--out"><slot /></span>
    <span class="app-link-text app-link-text--in"><slot /></span>
    <span class="app-link-sizer"><slot /></span>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  to: string
}>()
</script>

<style lang="scss" scoped>
.app-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  color: $brown-dark;
  text-decoration: none;
  padding: 2px 0;
  overflow: hidden;
  mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent);

  @include desktop {
    &:hover .app-link-text--out {
      transform: translateY(120%);
      transition: transform 0.4s $ease-in-out;
    }

    &:hover .app-link-text--in {
      transform: translateY(0);
      transition: transform 0.4s $ease-in-out;
      transition-delay: 0.05s;
    }
  }
}

.app-link-text {
  white-space: nowrap;
  position: absolute;
  z-index: 1;

  &--out {
    color: $brown-dark;
    transform: translateY(0);
    transition: transform 0.4s $ease-in-out;
    transition-delay: 0.05s;
  }

  &--in {
    color: $sage;
    transform: translateY(-120%);
    transition: transform 0.4s $ease-in-out;
  }
}

.app-link-sizer {
  white-space: nowrap;
  visibility: hidden;
  position: static;
}
</style>

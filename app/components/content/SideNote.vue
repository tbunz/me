<template>
  <aside class="side-note">
    <slot />
  </aside>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
.side-note {
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
  background: $tan;
  border-radius: 0;
  padding: 1.5rem 2rem;
  margin-top: 2rem;

  @include mobile {
    max-width: 100%;
  }

  @include type-caption;
  color: $text-primary;

  a {
    text-decoration: underline;
    transition: color $duration-normal $ease-out;

    &:hover {
      color: $sage;
    }
  }
}
</style>

<template>
  <aside class="side-note">
    <slot />
  </aside>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
.side-note {
  @include content-column;
  background: $tan;
  border-radius: 0;
  padding: 1.5rem 2rem;
  margin-top: 2rem;

  @include type-caption;
  color: $text-primary;

  // Tighter padding on mobile so the note doesn't eat into the
  // already-narrow reading width.
  @include mobile {
    padding: 1rem;
  }

  a {
    @include link-underline;
  }
}
</style>

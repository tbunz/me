<template>
  <div class="component-showcase">
    <slot />
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
.component-showcase {
  background: $bg-surface;
  border-radius: 6px;
  padding: 2rem;
  overflow: hidden;
}
</style>

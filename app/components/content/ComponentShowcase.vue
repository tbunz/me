<template>
  <div class="component-showcase">
    <slot />
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
.component-showcase {
  background: mix($tan, $bg-base, 15%);
  border-radius: 6px;
  padding: 2rem;
  overflow: hidden;
}
</style>

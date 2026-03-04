<template>
  <div
    class="text-block"
    :class="[
      `text-block--${variant || 'body'}`,
      `text-block--${align || 'left'}`
    ]"
    :style="maxWidth ? { maxWidth } : undefined"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  variant?: 'lead' | 'body' | 'caption'
  align?: 'left' | 'center' | 'right'
  maxWidth?: string
}>()
</script>

<style lang="scss">
.text-block {
  &--lead {
    font-size: $text-h3;
    font-weight: $weight-regular;
    line-height: 1.5;
    color: $text-secondary;
  }

  &--body {
    @include type-body;
    color: $text-primary;
  }

  &--caption {
    @include type-caption;
    color: $text-secondary;
  }

  &--left { text-align: left; }
  &--center { text-align: center; margin-left: auto; margin-right: auto; }
  &--right { text-align: right; margin-left: auto; }
}
</style>

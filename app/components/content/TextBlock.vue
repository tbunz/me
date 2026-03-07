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
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;

  @include mobile {
    max-width: 100%;
  }

  &--lead {
    font-size: $text-h3;
    font-weight: $weight-regular;
    line-height: 1.5;
    color: $text-secondary;
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
  }

  &--body {
    @include type-body;
    color: $text-primary;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  &--caption {
    @include type-caption;
    color: $text-secondary;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
  }

  &--left { text-align: left; }
  &--center { text-align: center; margin-left: auto; margin-right: auto; }
  &--right { text-align: right; margin-left: auto; }
}
</style>

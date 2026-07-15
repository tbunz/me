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
  @include content-column;

  &--lead {
    font-size: $text-h3;
    font-weight: $weight-regular;
    line-height: 1.5;
    color: $text-primary;
    padding: $space-block 0 0;

    @include mobile {
      font-size: $text-h3-mobile;
    }
  }

  &--body {
    @include type-body;
    color: $text-primary;
    padding: $space-block 0 0;
  }

  &--caption {
    @include type-caption;
    color: $text-primary;
    padding: $space-block 0 0;
  }

  ul, ol {
    padding-left: 1.25em;
    margin: 0.75em 0;

    li {
      list-style: disc;
      margin-bottom: 0.35em;
    }
  }

  ol li {
    list-style: decimal;
  }

  a {
    @include link-underline;
  }

  &--left { text-align: left; }
  &--center { text-align: center; margin-left: auto; margin-right: auto; }
  &--right { text-align: right; margin-left: auto; }
}
</style>

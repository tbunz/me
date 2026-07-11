<template>
  <div class="title-block" :class="`title-block--${align || 'left'}`">
    <h2 v-if="title" class="title-block__title">{{ title }}</h2>
    <div v-if="$slots.default" class="title-block__title">
      <slot />
    </div>
    <p v-if="subtitle" class="title-block__subtitle">{{ subtitle }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  subtitle?: string
  align?: 'left' | 'center' | 'right'
}>()
</script>

<style lang="scss">
.title-block {
  @include content-column;
  padding: $space-block 0 0;

  &--left { text-align: left; }
  &--center { text-align: center; }
  &--right { text-align: right; }

  &__title {
    @include type-h2;
    color: $text-primary;

    a {
      @include link-underline;
    }
  }

  &__subtitle {
    @include type-h3;
    font-weight: $weight-regular;
    color: $text-primary;
    margin-top: 0.5rem;
  }
}
</style>

<template>
  <div class="title-block" :class="`title-block--${align || 'left'}`">
    <h2 class="title-block__title">{{ title }}</h2>
    <p v-if="subtitle" class="title-block__subtitle">{{ subtitle }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
  align?: 'left' | 'center' | 'right'
}>()
</script>

<style lang="scss">
.title-block {
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
  padding: 3rem 0 1rem;

  @include mobile {
    max-width: 100%;
  }

  &--left { text-align: left; }
  &--center { text-align: center; }
  &--right { text-align: right; }

  &__title {
    @include type-h2;
    color: $text-primary;
  }

  &__subtitle {
    @include type-h3;
    font-weight: $weight-regular;
    color: $text-secondary;
    margin-top: 0.5rem;
  }
}
</style>

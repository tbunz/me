<template>
  <div class="hero-image">
    <img
      :src="src"
      :alt="alt || ''"
      class="hero-image__bg"
    />
    <div
      v-if="title || subtitle"
      class="hero-image__overlay"
      :class="`hero-image__overlay--${position || 'center'}`"
    >
      <h2 v-if="title" class="hero-image__title">{{ title }}</h2>
      <p v-if="subtitle" class="hero-image__subtitle">{{ subtitle }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  src: string
  alt?: string
  title?: string
  subtitle?: string
  position?: 'left' | 'center' | 'right'
}>()
</script>

<style lang="scss">
.hero-image {
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  height: 100dvh;
  position: relative;
  overflow: hidden;

  &__bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &__overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 3rem;
    background: linear-gradient(to top, rgba($bg-dark, 0.7) 0%, transparent 60%);
    color: $bg-base;

    &--left { align-items: flex-start; text-align: left; }
    &--center { align-items: center; text-align: center; }
    &--right { align-items: flex-end; text-align: right; }
  }

  &__title {
    @include type-h1;
    color: $bg-base;
  }

  &__subtitle {
    @include type-h3;
    color: rgba($bg-base, 0.85);
    margin-top: 0.5rem;
  }

  @include mobile {
    margin-left: -16px;
    width: calc(100% + 32px);
  }
}
</style>

<template>
  <component :is="href ? 'a' : 'div'" :href="href" :target="href ? '_blank' : undefined" :rel="href ? 'noopener noreferrer' : undefined" class="hero-image">
    <img
      :src="src"
      :alt="alt || ''"
      class="hero-image__bg"
    />
    <div v-if="title || subtitle" class="hero-image__overlay">
      <h1 v-if="title" class="hero-image__title">{{ title }}</h1>
      <p v-if="subtitle" class="hero-image__subtitle">{{ subtitle }}</p>
    </div>
  </component>
</template>

<script setup lang="ts">
defineProps<{
  src: string
  alt?: string
  title?: string
  subtitle?: string
  href?: string
}>()
</script>

<style lang="scss">
.hero-image {
  display: block;
  width: min(100vw, 1568px);
  margin-left: calc(-1 * min(50vw, 784px) + 50%);
  height: 100dvh;
  position: relative;
  overflow: hidden;

  &__bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
    display: block;
  }

  &__overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &__title {
    @include type-h1;
    color: #000;
    text-align: center;
  }

  &__subtitle {
    @include type-h3;
    color: #000;
    text-align: center;
    margin-top: 0.5rem;
  }

  @include mobile {
    margin-left: -16px;
    width: calc(100% + 32px);
  }
}
</style>

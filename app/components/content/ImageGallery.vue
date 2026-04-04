<template>
  <div class="image-gallery" :class="[`image-gallery--cols-${columns || 2}`, `image-gallery--${aspect || 'landscape'}`]">
    <figure
      v-for="(image, index) in images"
      :key="index"
      class="image-gallery__item"
    >
      <img
        :src="image.src"
        :alt="image.alt || ''"
        class="image-gallery__img"
        loading="lazy"
      />
      <figcaption v-if="image.caption || image.link" class="image-gallery__caption">
        <span v-if="image.caption">{{ image.caption }}</span>
        <a v-if="image.link" :href="image.link" target="_blank" rel="noopener noreferrer">{{ image.linkText || image.link }}</a>
      </figcaption>
    </figure>
  </div>
</template>

<script setup lang="ts">
interface GalleryImage {
  src: string
  alt?: string
  caption?: string
  link?: string
  linkText?: string
}

defineProps<{
  images: GalleryImage[]
  columns?: 1 | 2 | 4
  aspect?: 'landscape' | 'tall'
}>()
</script>

<style lang="scss">
.image-gallery {
  display: grid;
  gap: 1rem;
  padding: 3rem 0 0;

  &--cols-1 {
    grid-template-columns: 1fr;

    .image-gallery__img {
      aspect-ratio: 2 / 1;
    }
  }

  &--cols-2 {
    @include desktop { grid-template-columns: repeat(2, 1fr); }
  }

  &--cols-4 {
    grid-template-columns: repeat(2, 1fr);
    @include desktop { grid-template-columns: repeat(4, 1fr); }
  }

  &__item {
    overflow: hidden;
    margin: 0;
  }

  &__img {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    display: block;
  }

  &--tall &__img {
    aspect-ratio: 9 / 16;
  }

  &--cols-1#{&}--tall {
    max-width: 720px;
    margin-left: auto;
    margin-right: auto;
  }

  &__caption {
    @include type-caption;
    color: $brown-dark;
    margin-top: 0.5rem;

    a {
      margin-left: 0.5em;
      text-decoration: underline;
      transition: color $duration-normal $ease-out;

      &:hover {
        color: $sage;
      }
    }
  }
}
</style>

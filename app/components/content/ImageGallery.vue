<template>
  <div class="image-gallery" :class="`image-gallery--cols-${columns || 2}`">
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
      <figcaption v-if="image.caption" class="image-gallery__caption">
        {{ image.caption }}
      </figcaption>
    </figure>
  </div>
</template>

<script setup lang="ts">
interface GalleryImage {
  src: string
  alt?: string
  caption?: string
}

defineProps<{
  images: GalleryImage[]
  columns?: 1 | 2 | 4
}>()
</script>

<style lang="scss">
.image-gallery {
  display: grid;
  gap: 1rem;

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
    aspect-ratio: 16 / 10;
    object-fit: cover;
    display: block;
  }

  &__caption {
    @include type-caption;
    color: $brown-dark;
    margin-top: 0.5rem;
  }
}
</style>

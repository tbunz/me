<template>
  <div class="home">
    <div class="tiles">
      <NuxtLink
        v-for="project in projects"
        :key="project.path"
        :to="project.path"
        class="tile"
        @mouseenter="onTileEnter"
        @mouseleave="onTileLeave"
      >
        <div v-if="project.thumbnails?.length" class="tile-images">
          <img
            v-for="(src, i) in project.thumbnails"
            :key="i"
            :src="src"
            :alt="`${project.title} thumbnail ${i + 1}`"
          />
        </div>
        <h2>{{ project.title }}</h2>
        <p v-if="project.tagline" class="tile-tagline">{{ project.tagline }}</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap'

const { data: projects } = await useAsyncData('projects', () =>
  queryCollection('work').order('stem', 'ASC').all()
)

function onTileEnter(e: MouseEvent) {
  gsap.to(e.currentTarget, {
    y: -4,
    scale: 1.02,
    boxShadow: '0 8px 24px rgba(28, 20, 16, 0.08)',
    duration: 0.3,
    ease: 'power2.out',
  })
}

function onTileLeave(e: MouseEvent) {
  gsap.to(e.currentTarget, {
    y: 0,
    scale: 1,
    boxShadow: '0 0px 0px rgba(28, 20, 16, 0)',
    duration: 0.4,
    ease: 'power2.out',
  })
}
</script>

<style lang="scss" scoped>
.home {
  color: $text-secondary;
}

.tiles {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
}

.tile {
  border: 1px solid $tan;
  padding: 24px;
  border-radius: 8px;
  will-change: transform;
}

.tile-images {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;

  img {
    width: 100%;
    height: auto;
    border-radius: 4px;
    object-fit: cover;
  }
}

.tile-tagline {
  margin-top: 8px;
  @include type-caption;
  color: $text-secondary;
}
</style>

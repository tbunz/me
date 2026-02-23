<template>
  <div class="home">
    <h1>Projects</h1>
    <div class="tiles">
      <NuxtLink
        v-for="project in projects"
        :key="project.slug"
        :to="`/work/${project.slug}`"
        class="tile"
        @mouseenter="onTileEnter"
        @mouseleave="onTileLeave"
      >
        <h2>{{ project.name }}</h2>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap'

const projects = [
  { slug: 'project-alpha', name: 'Project Alpha' },
  { slug: 'project-beta', name: 'Project Beta' },
  { slug: 'project-gamma', name: 'Project Gamma' },
]

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
  max-width: 900px;
}

.tiles {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  margin-top: 24px;
}

.tile {
  border: 1px solid $tan;
  padding: 24px;
  border-radius: 8px;
  will-change: transform;
}
</style>

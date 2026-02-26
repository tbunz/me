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
        <div v-if="project.thumbnails?.length" class="tile-strip">
          <img
            v-for="(src, i) in project.thumbnails"
            :key="i"
            :src="src"
            :alt="`${project.title} thumbnail ${i + 1}`"
            class="tile-thumb"
          />
        </div>
        <div class="tile-info">
          <h2><span>{{ project.title }}</span></h2>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap'

const { data: projects } = await useAsyncData('projects', () =>
  queryCollection('work').order('stem', 'ASC').all()
)

const SCALE = 1.12

function onTileEnter(e: MouseEvent) {
  const tile = e.currentTarget as HTMLElement
  const strip = tile.querySelector('.tile-strip') as HTMLElement
  if (!strip) return

  gsap.killTweensOf(strip)

  const count = strip.children.length
  const tileWidth = tile.offsetWidth

  // Zoom in
  gsap.fromTo(strip,
    { scale: 1, x: 0 },
    { scale: SCALE, duration: 0.5, ease: 'power2.out' },
  )

  // Pan through images like a ticker
  if (count > 1) {
    const travel = tileWidth * (count - 1)
    gsap.to(strip, {
      x: -travel,
      duration: (count - 1) * 3,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })
  }
}

function onTileLeave(e: MouseEvent) {
  const tile = e.currentTarget as HTMLElement
  const strip = tile.querySelector('.tile-strip') as HTMLElement
  if (!strip) return

  gsap.killTweensOf(strip)
  gsap.to(strip, { scale: 1, x: 0, duration: 0.4, ease: 'power2.out' })
}
</script>

<style lang="scss" scoped>
.home {
  color: $text-secondary;
  padding-bottom: 128px;
}

.tiles {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.tile {
  position: relative;
  overflow: hidden;

  &:hover .tile-info {
    opacity: 0;
    transform: translateY(8px);
  }
}

.tile-strip {
  display: flex;
  will-change: transform;
}

.tile-thumb {
  flex: 0 0 100%;
  height: auto;
  object-fit: cover;
}

.tile-info {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 12px;
  transition: opacity $duration-normal $ease-out, transform $duration-normal $ease-out;

  h2 span {
    background: $bg-base;
    padding: 2px 6px;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
  }
}
</style>

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
        <div v-if="project.thumbnails?.length" class="tile-media">
          <img
            v-for="(src, i) in project.thumbnails"
            :key="i"
            :src="src"
            :alt="`${project.title} thumbnail ${i + 1}`"
            class="tile-thumb"
          />
        </div>
        <div class="tile-info">
          <h2>{{ project.title }}</h2>
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

const { isMobile } = useBreakpoints()
const cleanups = new Map<HTMLElement, () => void>()

function onTileEnter(e: MouseEvent) {
  if (isMobile.value) return
  const tile = e.currentTarget as HTMLElement
  const media = tile.querySelector('.tile-media') as HTMLElement
  if (!media) return

  cleanups.get(media)?.()
  cleanups.delete(media)

  const imgs = [...media.querySelectorAll('.tile-thumb')] as HTMLElement[]
  const count = imgs.length

  gsap.killTweensOf(imgs)

  if (count <= 1) return

  const gapPx = 1
  const cellWidth = 100 / count

  // Image 0 is visible and full-width. Images 1+ are pre-positioned at
  // their final film strip slots but invisible — no lateral travel needed.
  imgs.forEach((img, i) => {
    if (i === 0) {
      gsap.set(img, { width: '100%', height: '100%', left: '0%', opacity: 1 })
    } else {
      gsap.set(img, {
        width: `calc(${cellWidth}% - ${gapPx * (count - 1) / count}px)`,
        height: '100%',
        left: `calc(${cellWidth * i}% + ${gapPx * i / count}px)`,
        opacity: 0,
      })
    }
  })

  // Shrink image 0 to its cell width — reveals the images beneath
  gsap.to(imgs[0]!, {
    width: `calc(${cellWidth}% - ${gapPx * (count - 1) / count}px)`,
    duration: 0.5,
    ease: 'power3.out',
  })

  // Fade in the remaining images — borders appear naturally with the fade
  imgs.slice(1).forEach((img) => {
    gsap.to(img, {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
    })
  })
}

function onTileLeave(e: MouseEvent) {
  if (isMobile.value) return
  const tile = e.currentTarget as HTMLElement
  const media = tile.querySelector('.tile-media') as HTMLElement
  if (!media) return

  cleanups.get(media)?.()
  cleanups.delete(media)

  const imgs = [...media.querySelectorAll('.tile-thumb')] as HTMLElement[]

  imgs.forEach((img, i) => {
    gsap.to(img, {
      width: '100%',
      left: '0%',
      opacity: i === 0 ? 1 : 0,
      duration: 0.4,
      ease: 'power2.out',
    })
  })
}
</script>

<style lang="scss" scoped>
.home {
  color: $text-secondary;
  padding-bottom: 128px;
}

.tiles {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @include desktop {
    grid-template-columns: repeat(3, 1fr);
  }
}

.tile {
  position: relative;
  overflow: hidden;
  color: $bg-base;

  @include desktop {
    &:hover .tile-info {
      opacity: 0;
      transform: translateY(8px);
    }
  }
}

.tile-media {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: $bg-dark;
}

.tile-thumb {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  will-change: transform, opacity, width, left;

  &:not(:first-child) {
    opacity: 0;
  }
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
  transition: opacity $duration-slow $ease-out, transform $duration-slow $ease-out;
}
</style>

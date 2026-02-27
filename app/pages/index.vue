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

const SCALE = 1.12
const PAN = 3 // xPercent — GPU-composited, no sub-pixel jitter
const HOLD = 1.4
const FADE = 0.6

const cleanups = new Map<HTMLElement, () => void>()

function onTileEnter(e: MouseEvent) {
  const tile = e.currentTarget as HTMLElement
  const media = tile.querySelector('.tile-media') as HTMLElement
  if (!media) return

  cleanups.get(media)?.()
  cleanups.delete(media)

  const imgs = [...media.querySelectorAll('.tile-thumb')] as HTMLElement[]
  const count = imgs.length

  gsap.killTweensOf(imgs)

  // Reset all images
  imgs.forEach((img, i) => {
    gsap.set(img, { scale: 1, xPercent: 0, opacity: i === 0 ? 1 : 0 })
  })

  // Zoom images directly — avoids sub-pixel wobble from scaling a parent container
  gsap.to(imgs, { scale: SCALE, duration: 0.5, ease: 'power2.out', force3D: true })

  if (count <= 1) return

  // Callback-driven slideshow: each crossfade is individually scheduled,
  // so the last→first wrap is just another smooth crossfade — no timeline
  // repeat boundary to pop or snap positions.
  let active = 0
  let scheduled: gsap.core.Tween | null = null
  let stopped = false

  function next() {
    if (stopped) return
    const from = imgs[active]!
    active = (active + 1) % count
    const to = imgs[active]!

    gsap.to(from, { opacity: 0, duration: FADE, ease: 'power1.inOut' })
    gsap.fromTo(to, { opacity: 0 }, { opacity: 1, duration: FADE, ease: 'power1.inOut' })
    gsap.fromTo(to, { xPercent: 0 }, { xPercent: PAN, duration: HOLD + FADE, ease: 'none', force3D: true })
    scheduled = gsap.delayedCall(HOLD, next)
  }

  gsap.to(imgs[0]!, { xPercent: PAN, duration: HOLD + FADE, ease: 'none', force3D: true })
  scheduled = gsap.delayedCall(HOLD, next)

  cleanups.set(media, () => {
    stopped = true
    scheduled?.kill()
    gsap.killTweensOf(imgs)
  })
}

function onTileLeave(e: MouseEvent) {
  const tile = e.currentTarget as HTMLElement
  const media = tile.querySelector('.tile-media') as HTMLElement
  if (!media) return

  cleanups.get(media)?.()
  cleanups.delete(media)

  const imgs = [...media.querySelectorAll('.tile-thumb')] as HTMLElement[]

  imgs.forEach((img, i) => {
    gsap.to(img, { scale: 1, xPercent: 0, opacity: i === 0 ? 1 : 0, duration: 0.4, ease: 'power2.out' })
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

  &:hover .tile-info {
    opacity: 0;
    transform: translateY(8px);
  }
}

.tile-media {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
}

.tile-thumb {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  will-change: transform, opacity;

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

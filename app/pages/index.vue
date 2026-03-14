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

  const strip = imgs.slice(1) // image 0 is the cover, not part of the strip
  const stripCount = strip.length

  if (stripCount < 1) return

  const gapPx = 1
  const cellWidth = 100 / stripCount
  const cellWidthCalc = `calc(${cellWidth}% - ${gapPx * (stripCount - 1) / stripCount}px)`

  function slotLeft(s: number) {
    return `calc(${cellWidth * s}% + ${gapPx * s / stripCount}px)`
  }

  // Position strip images at their slots, offset vertically for slide-in
  strip.forEach((img, i) => {
    const fromTop = i % 2 === 0
    gsap.set(img, {
      width: cellWidthCalc,
      height: '100%',
      left: slotLeft(i),
      yPercent: fromTop ? -100 : 100,
      opacity: 1,
    })
  })

  // Fade out the cover image and fade in gap background
  gsap.to(imgs[0]!, {
    opacity: 0,
    duration: 0.35,
    ease: 'power2.in',
  })
  gsap.fromTo(media, { backgroundColor: 'transparent' }, {
    backgroundColor: '#1a1a1a',
    duration: 0.5,
    delay: 0.2,
    ease: 'power2.out',
  })

  // Slide in strip panels from top/bottom with stagger
  strip.forEach((img, i) => {
    gsap.to(img, {
      yPercent: 0,
      duration: 0.5,
      delay: i * 0.06,
      ease: 'power3.out',
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

  const strip = imgs.slice(1)

  // Slide strip panels back out
  strip.forEach((img, i) => {
    const toTop = i % 2 === 0
    gsap.to(img, {
      yPercent: toTop ? -100 : 100,
      duration: 0.35,
      ease: 'power2.in',
    })
  })

  // Restore cover image and clear background
  gsap.to(imgs[0]!, {
    opacity: 1,
    width: '100%',
    left: '0%',
    duration: 0.35,
    ease: 'power2.out',
  })
  gsap.to(media, {
    backgroundColor: 'transparent',
    duration: 0.25,
    ease: 'power2.in',
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

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

// Track whether each tile has been set up (first hover positions the strip)
const initialized = new WeakSet<HTMLElement>()

function getStripLayout(stripCount: number) {
  const gapPx = 1
  const cellWidth = 100 / stripCount
  const width = `calc(${cellWidth}% - ${gapPx * (stripCount - 1) / stripCount}px)`
  const lefts = Array.from({ length: stripCount }, (_, i) =>
    `calc(${cellWidth * i}% + ${gapPx * i / stripCount}px)`,
  )
  return { width, lefts }
}

function onTileEnter(e: MouseEvent) {
  if (isMobile.value) return
  const tile = e.currentTarget as HTMLElement
  const media = tile.querySelector('.tile-media') as HTMLElement
  if (!media) return

  const imgs = [...media.querySelectorAll('.tile-thumb')] as HTMLElement[]
  const strip = imgs.slice(1)
  if (strip.length < 1) return

  // Kill all running tweens so new ones animate from current positions
  gsap.killTweensOf(imgs)
  gsap.killTweensOf(media)

  const { width, lefts } = getStripLayout(strip.length)

  // First hover: position strip images at their slots off-screen
  if (!initialized.has(media)) {
    initialized.add(media)
    strip.forEach((img, i) => {
      gsap.set(img, {
        width,
        height: '100%',
        left: lefts[i],
        yPercent: i % 2 === 0 ? -100 : 100,
        opacity: 1,
      })
    })
  }

  // Fade out cover image
  gsap.to(imgs[0]!, {
    opacity: 0,
    duration: 0.35,
    ease: 'power2.in',
  })

  // Slide strip panels to yPercent: 0 from wherever they currently are
  strip.forEach((img, i) => {
    gsap.to(img, {
      yPercent: 0,
      duration: 0.5,
      delay: i * 0.06,
      ease: 'power3.out',
      overwrite: 'auto',
    })
  })
}

function onTileLeave(e: MouseEvent) {
  if (isMobile.value) return
  const tile = e.currentTarget as HTMLElement
  const media = tile.querySelector('.tile-media') as HTMLElement
  if (!media) return

  const imgs = [...media.querySelectorAll('.tile-thumb')] as HTMLElement[]
  const strip = imgs.slice(1)

  // Kill all running tweens so new ones animate from current positions
  gsap.killTweensOf(imgs)
  gsap.killTweensOf(media)

  // Slide strip panels back out from current position
  strip.forEach((img, i) => {
    gsap.to(img, {
      yPercent: i % 2 === 0 ? -100 : 100,
      duration: 0.35,
      ease: 'power2.in',
      overwrite: 'auto',
    })
  })

  // Restore cover image
  gsap.to(imgs[0]!, {
    opacity: 1,
    duration: 0.35,
    ease: 'power2.out',
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
  background: $bg-base;
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

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
        <div class="tile-overlay">
          <h2 class="tile-title">{{ project.title }}</h2>
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

const initialized = new WeakSet<HTMLElement>()

function getStripLayout(stripCount: number) {
  const gapPx = 2
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

  gsap.killTweensOf(imgs)
  gsap.killTweensOf(media)

  const { width, lefts } = getStripLayout(strip.length)

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

  gsap.to(imgs[0]!, {
    opacity: 0,
    duration: 0.35,
    ease: 'power2.in',
  })

  strip.forEach((img) => {
    gsap.to(img, {
      yPercent: 0,
      duration: 0.5,
      ease: 'power3.out',
      overwrite: 'auto',
    })
  })

  // Hide title on hover
  const overlay = tile.querySelector('.tile-overlay') as HTMLElement
  if (overlay) {
    gsap.to(overlay, {
      opacity: 0,
      y: 8,
      duration: 0.35,
      ease: 'power2.out',
    })
  }
}

function onTileLeave(e: MouseEvent) {
  if (isMobile.value) return
  const tile = e.currentTarget as HTMLElement
  const media = tile.querySelector('.tile-media') as HTMLElement
  if (!media) return

  const imgs = [...media.querySelectorAll('.tile-thumb')] as HTMLElement[]
  const strip = imgs.slice(1)

  gsap.killTweensOf(imgs)
  gsap.killTweensOf(media)

  strip.forEach((img, i) => {
    gsap.to(img, {
      yPercent: i % 2 === 0 ? -100 : 100,
      duration: 0.35,
      ease: 'power2.in',
      overwrite: 'auto',
    })
  })

  gsap.to(imgs[0]!, {
    opacity: 1,
    duration: 0.35,
    ease: 'power2.out',
  })

  // Show title on leave
  const overlay = tile.querySelector('.tile-overlay') as HTMLElement
  if (overlay) {
    gsap.to(overlay, {
      opacity: 1,
      y: 0,
      duration: 0.35,
      ease: 'power2.out',
    })
  }
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

.tile-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tile-title {
  color: #000;
  text-align: center;
}
</style>

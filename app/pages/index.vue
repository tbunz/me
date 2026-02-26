<template>
  <div class="home">
    <div class="tiles">
      <NuxtLink
        v-for="project in projects"
        :key="project.path"
        :to="project.path"
        class="tile"
        @mouseenter="onTileEnter($event, project)"
        @mouseleave="onTileLeave"
      >
        <img
          v-if="project.thumbnails?.length"
          :src="project.thumbnails[0]"
          :alt="`${project.title} thumbnail`"
          class="tile-thumb"
        />
        <div class="tile-info">
          <h2><span>{{ project.title }}</span></h2>
        </div>
      </NuxtLink>
    </div>

    <Teleport to="body">
      <div
        v-if="preview"
        ref="previewEl"
        class="preview-modal"
        :style="previewStyle"
      >
        <img
          v-for="(src, i) in preview.thumbnails"
          :key="i"
          :src="src"
          :alt="`${preview.title} thumbnail ${i + 1}`"
        />
        <h3>{{ preview.title }}</h3>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap'

interface Project {
  path: string
  title: string
  thumbnails?: string[]
}

const { data: projects } = await useAsyncData('projects', () =>
  queryCollection('work').order('stem', 'ASC').all()
)

const preview = ref<Project | null>(null)
const previewEl = ref<HTMLElement | null>(null)
const previewStyle = ref<Record<string, string>>({})


function positionPreview(tile: HTMLElement) {
  const rect = tile.getBoundingClientRect()
  const modalWidth = 420
  const margin = 16

  let left = rect.left + rect.width / 2 - modalWidth / 2
  left = Math.max(margin, Math.min(left, window.innerWidth - modalWidth - margin))

  let top = rect.top - margin
  previewStyle.value = {
    left: `${left}px`,
    top: `${top}px`,
    width: `${modalWidth}px`,
    transform: 'translateY(-100%)',
  }
}

function onTileEnter(e: MouseEvent, project: Project) {
  if (!project.thumbnails || project.thumbnails.length <= 1) return

  const tile = e.currentTarget as HTMLElement
  preview.value = project as Project
  nextTick(() => {
    positionPreview(tile)
    if (previewEl.value) {
      gsap.fromTo(previewEl.value,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' },
      )
    }
  })
}

function onTileLeave() {
  if (previewEl.value) {
    gsap.to(previewEl.value, {
      opacity: 0,
      y: 8,
      duration: 0.15,
      ease: 'power2.in',
      onComplete: () => {
        preview.value = null
      },
    })
  } else {
    preview.value = null
  }
}
</script>

<style lang="scss" scoped>
.home {
  color: $text-secondary;
}

.tiles {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.tile {
  position: relative;
}

.tile-thumb {
  width: 100%;
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

  h2 span {
    background: $bg-base;
    padding: 2px 6px;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
  }
}
</style>

<style lang="scss">
.preview-modal {
  position: fixed;
  z-index: 1000;
  background: $bg-base;
  border: 1px solid $tan;
  padding: 16px;
  box-shadow: 0 16px 48px rgba(28, 20, 16, 0.12);
  pointer-events: none;
  display: flex;
  flex-direction: column;
  gap: 8px;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: $text-primary;
    margin-top: 4px;
  }

}
</style>

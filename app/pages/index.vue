<template>
  <div class="home">
    <div class="tiles">
      <NuxtLink
        v-for="project in projects"
        :key="project.path"
        :to="project.path"
        class="tile"
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
  </div>
</template>

<script setup lang="ts">
const { data: projects } = await useAsyncData('projects', () =>
  queryCollection('work').order('stem', 'ASC').all()
)
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

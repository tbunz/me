<template>
  <div class="home">
    <h1>Projects</h1>
    <div class="tiles">
      <NuxtLink
        v-for="project in projects"
        :key="project.slug"
        :to="`/work/${project.slug}`"
        class="tile"
      >
        <h2>{{ project.name }}</h2>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const projects = [
  { slug: 'project-alpha', name: 'Project Alpha' },
  { slug: 'project-beta', name: 'Project Beta' },
  { slug: 'project-gamma', name: 'Project Gamma' },
]
</script>

<style lang="scss" scoped>
.home {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 24px;
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
}
</style>

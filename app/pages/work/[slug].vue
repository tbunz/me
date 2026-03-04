<template>
  <div class="project">
    <ContentRenderer v-if="project" :value="project" />
    <p v-else>Project not found.</p>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const { data: project } = await useAsyncData(`project-${route.params.slug}`, () =>
  queryCollection('work')
    .path(`/work/${route.params.slug}`)
    .first()
)

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}
</script>

<style lang="scss" scoped>
.project :deep(.hero-image:first-child) {
  margin-top: calc(-1 * (var(--nav-height, 0px) + 16px));
}
</style>

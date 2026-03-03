<template>
  <div class="project page-narrow">
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
</style>

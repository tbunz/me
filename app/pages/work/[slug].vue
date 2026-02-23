<template>
  <div class="project">
    <ContentRenderer v-if="project" :value="project" />
    <p v-else>Project not found.</p>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const { data: project } = await useAsyncData(`project-${route.params.slug}`, () =>
  queryCollection('content')
    .path(`/work/${route.params.slug}`)
    .first()
)

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}
</script>

<style lang="scss" scoped>
.project {
  max-width: 700px;
  margin: 0 auto;
  padding: 40px 24px;
}
</style>

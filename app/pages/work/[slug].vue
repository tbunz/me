<template>
  <div class="project">
    <ContentRenderer v-if="project" :value="project" />
    <p v-else>Project not found.</p>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { setProjectTitle, clearProjectTitle } = useProjectTitle()

const { data: project } = await useAsyncData(`project-${route.params.slug}`, () =>
  queryCollection('work')
    .path(`/work/${route.params.slug}`)
    .first()
)

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}

setProjectTitle(project.value.title)

onBeforeUnmount(() => {
  clearProjectTitle()
})
</script>

<style lang="scss" scoped>
.project {
  padding-bottom: 128px;
}

.project :deep(.hero-image) {
  height: calc(100dvh - var(--nav-height, 0px));
  margin-top: -16px;
}
</style>

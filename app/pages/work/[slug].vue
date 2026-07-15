<template>
  <div class="project">
    <ContentRenderer v-if="project" :value="project" />
    <p v-else>Project not found.</p>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { setProjectTitle, clearProjectTitle } = useProjectTitle()

const { data: project } = await useAsyncData(
  `project-${route.params.slug}`,
  () => queryCollection('work').path(`/work/${route.params.slug}`).first(),
  {
    getCachedData: (key, nuxtApp) =>
      nuxtApp.payload.data[key] ?? nuxtApp.static.data[key],
  },
)

if (!project.value || (project.value.draft && !import.meta.dev)) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}

// Hand both variants to the nav; it picks desktop vs mobile using its own
// (persistent, reliably-resolved) breakpoint. Deciding here would be wrong —
// this component remounts per navigation, so its isMobile is false until mount.
setProjectTitle(project.value.tagline || project.value.title, project.value.taglineMobile ?? null)

onBeforeUnmount(() => {
  clearProjectTitle()
})
</script>

<style lang="scss" scoped>
.project :deep(.hero-image) {
  // svh (static) rather than dvh so the toolbar show/hide doesn't resize the
  // hero mid-scroll — see HeroImage.vue for the full rationale.
  height: calc(100svh - var(--nav-height, 0px));
  margin-top: -16px;
}
</style>

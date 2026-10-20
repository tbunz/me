<template>
  <div class="about page-narrow">
    <ContentRenderer v-if="about" :value="about" />
  </div>
</template>

<script setup lang="ts">
const { data: about } = await useAsyncData('about', () =>
  queryCollection('content').path('/about').first()
)
</script>

<style lang="scss" scoped>
.about :deep(.links) {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1.5rem;
}
</style>

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
</style>

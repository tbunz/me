<template>
  <div class="contact page-narrow">
    <ContentRenderer v-if="contact" :value="contact" />
  </div>
</template>

<script setup lang="ts">
const { data: contact } = await useAsyncData('contact', () =>
  queryCollection('content').path('/contact').first()
)
</script>

<style lang="scss" scoped>
</style>

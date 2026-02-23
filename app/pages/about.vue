<template>
  <div class="about">
    <ContentRenderer v-if="about" :value="about" />
  </div>
</template>

<script setup lang="ts">
const { data: about } = await useAsyncData('about', () =>
  queryCollection('content').path('/about').first()
)
</script>

<style lang="scss" scoped>
.about {
  max-width: 700px;
  margin: 0 auto;
  padding: 40px 24px;
}
</style>

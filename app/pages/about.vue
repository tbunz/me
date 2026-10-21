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
// The page is short, so centre the block in the viewport instead of leaving
// it stranded at the top. Subtracts the main padding (nav + 16px top, 175px
// bottom) so the maths lines up with layouts/default.vue.
.about {
  min-height: calc(100lvh - var(--nav-height, 0px) - 16px - 175px);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.about :deep(.statement) {
  margin-top: 0;
}

.about :deep(.lead) {
  text-wrap: balance;
}

.about :deep(.links) {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1rem;
}

.about :deep(.eyebrow) {
  margin-top: 2.25rem;
}

.about :deep(.now) {
  margin: 0.25rem 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  text-align: center;
  list-style-position: inside;
  color: $text-secondary;
}

@include mobile {
  .about {
    justify-content: flex-start;
    min-height: 0;
  }
  .about :deep(.statement) {
    margin-top: 2.5rem;
  }
}
</style>

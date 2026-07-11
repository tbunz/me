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
$line: rgba($text-secondary, 0.15);

// Section labels + records break to left alignment (hero stays centered)
.about :deep(.section-label) {
  align-self: stretch;
  text-align: left;
  margin-top: 3.25rem;
}

// ── Editorial rail: date column + content ──
.about :deep(.rail-entry) {
  align-self: stretch;
  display: grid;
  grid-template-columns: 10rem 1fr;
  column-gap: 2rem;
  row-gap: 0.3rem;
  padding: 1.25rem 0;
  text-align: left;
}
.about :deep(.rail-entry + .rail-entry) {
  border-top: 1px solid $line;
}

.about :deep(.rail-date) {
  grid-column: 1;
  grid-row: 1;
  padding-top: 0.15rem;
  font-size: 0.8rem;
  letter-spacing: 0.04em;
  color: rgba($text-secondary, 0.75);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.about :deep(.rail-role) {
  grid-column: 2;
  grid-row: 1;
  font-weight: $weight-bold;
  letter-spacing: $tracking-snug;
}
.about :deep(.rail-desc) {
  grid-column: 2;
  grid-row: 2;
  color: $text-secondary;
}
.about :deep(.rail-stack) {
  grid-column: 2;
  grid-row: 3;
  font-size: 0.82rem;
  color: rgba($text-secondary, 0.7);
}

// ── Along the Way ──
.about :deep(.fun-entry) {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1.1rem 0;
  text-align: left;
}
.about :deep(.fun-entry + .fun-entry) {
  border-top: 1px solid $line;
}
.about :deep(.fun-title) {
  font-weight: $weight-bold;
  letter-spacing: $tracking-snug;
}
.about :deep(.fun-desc) {
  color: $text-secondary;
}
.about :deep(.fun-date) {
  font-size: 0.8rem;
  letter-spacing: 0.04em;
  color: rgba($text-secondary, 0.75);
}

@include mobile {
  .about :deep(.rail-entry) {
    grid-template-columns: 1fr;
  }
  .about :deep(.rail-date),
  .about :deep(.rail-role),
  .about :deep(.rail-desc),
  .about :deep(.rail-stack) {
    grid-column: 1;
    grid-row: auto;
  }
  .about :deep(.rail-date) {
    padding-top: 0;
  }
}
</style>

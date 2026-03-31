<template>
  <div class="code-block">
    <div v-if="title" class="code-block__header">
      <span class="code-block__title">{{ title }}</span>
      <span v-if="lang" class="code-block__lang">{{ lang }}</span>
    </div>
    <div class="code-block__body" @wheel="onWheel">
      <pre class="code-block__pre"><code class="code-block__code">{{ code }}</code></pre>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  lang?: string
  code?: string
}>()

function onWheel(e: WheelEvent) {
  const el = e.currentTarget as HTMLElement
  const atTop = el.scrollTop <= 0 && e.deltaY < 0
  const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1 && e.deltaY > 0

  if (!atTop && !atBottom) {
    e.stopPropagation()
  }
}
</script>

<style lang="scss">
.code-block {
  background: $bg-dark;
  border-radius: 6px;
  overflow: hidden;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.625rem 1.25rem;
    border-bottom: 1px solid rgba(#fff, 0.08);
  }

  &__title {
    @include type-caption;
    color: rgba(#fff, 0.5);
  }

  &__lang {
    @include type-caption;
    color: rgba(#fff, 0.3);
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
  }

  &__body {
    max-height: 28rem;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: rgba(#fff, 0.15) transparent;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(#fff, 0.15);
      border-radius: 3px;
    }
  }

  &__pre {
    margin: 0;
    padding: 1.25rem;
    overflow-x: auto;
  }

  &__code {
    font-family: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', 'Consolas', monospace;
    font-size: 0.875rem;
    line-height: 1.7;
    color: rgba(#fff, 0.85);
    white-space: pre;
    tab-size: 2;

    // Style any nested elements from markdown rendering
    p {
      margin: 0;
      white-space: pre;
    }
  }
}
</style>

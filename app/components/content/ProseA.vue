<template>
  <a :href="href" :target="target" :rel="rel">
    <slot />
  </a>
</template>

<script setup lang="ts">
const props = defineProps<{
  href?: string
  target?: string
}>()

const isExternal = computed(() => /^https?:\/\//.test(props.href || ''))

const target = computed(() => props.target || (isExternal.value ? '_blank' : undefined))
const rel = computed(() => (target.value === '_blank' ? 'noopener noreferrer' : undefined))
</script>

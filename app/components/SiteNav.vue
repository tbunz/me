<template>
  <header class="site-header">
    <nav class="site-nav">
      <div class="site-title-wrap">
        <Transition name="title-flip">
          <h1 class="site-title" :key="pageTitle">{{ pageTitle }}</h1>
        </Transition>
      </div>
      <AppLink to="/" class="nav-link" style="width: 45px">Work</AppLink>
      <AppLink to="/about" class="nav-link" style="width: 51px">About</AppLink>
      <AppLink to="/contact" class="nav-link" style="width: 71px">Contact</AppLink>
    </nav>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()

const titles: Record<string, string> = {
  '/': 'Projects',
  '/about': 'Trevor McKinney',
  '/contact': 'Connect',
}

const pageTitle = computed(() => {
  // Exact match first
  if (titles[route.path]) return titles[route.path]
  // Work subpages (TODO: use project title)
  if (route.path.startsWith('/work/')) return 'TODO'
  return 'Projects'
})
</script>

<style lang="scss" scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: $bg-base;
  border-bottom: 1px solid $tan-light;
}

.site-nav {
  max-width: 1600px;
  margin: 0 auto;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 24px;
}

.site-title-wrap {
  position: relative;
  overflow: hidden;
  margin-right: auto;
  padding: 2px 0;
  mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent);
}

.site-title {
  margin: 0;
  white-space: nowrap;
  @include type-h2;
  font-weight: $weight-bold;
  color: $brown-dark;
}

.title-flip-leave-active {
  transition: transform 0.4s $ease-in-out;
}

.title-flip-leave-to {
  transform: translateY(120%);
}

.title-flip-enter-active {
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.4s $ease-in-out;
  transition-delay: 0.05s;
}

.title-flip-enter-from {
  transform: translateY(-120%);
}

.nav-link {
  font-size: $text-caption;
  font-weight: $weight-medium;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: $brown-dark;

  &.router-link-active :deep(.app-link-text) {
    font-weight: $weight-bold;
  }

  &.router-link-active :deep(.app-link-text--out) {
    color: $sage;
  }

  &.router-link-active :deep(.app-link-sizer) {
    font-weight: $weight-bold;
  }
}
</style>

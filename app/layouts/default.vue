<template>
  <div class="site">
    <SiteNav />
    <main>
      <slot />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.site {
  min-height: 100dvh;
}

main {
  padding-top: 60px;
}
</style>

<template>
  <header class="site-header">
    <nav class="site-nav">
      <AppLink to="/" class="nav-link">Work</AppLink>
      <AppLink to="/about" class="nav-link">About</AppLink>
      <AppLink to="/contact" class="nav-link">Contact</AppLink>
    </nav>
  </header>
</template>

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
  gap: 24px;
}

.nav-link {
  font-size: $text-caption;
  font-weight: $weight-medium;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: $brown-dark;

  &.router-link-active {
    color: $text-primary;
    font-weight: $weight-bold;
  }
}
</style>

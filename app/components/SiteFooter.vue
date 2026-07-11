<template>
  <!--
    Sticky reveal footer. Pinned to the bottom of the viewport and sits *behind*
    the opaque `.site-content` layer in the layout; scrolling to the end of the
    page lifts that layer away and reveals this. Content/colors are placeholders.
  -->
  <footer class="site-footer">
    <div class="site-footer__inner">
      <!-- blank for now -->
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.site-footer {
  position: sticky;
  bottom: 0;
  // Stays behind `.site-content` (z-index: 1) so it's covered until revealed.
  z-index: 0;
  // Must stay <= viewport height so the whole footer can be revealed.
  min-height: 50vh;
  // Placeholder background so the reveal is visible while we build it out.
  background: $brown-dark;
  color: $bg-base;
  // Fades out with the leaving page (class toggled by the layout).
  transition: opacity $duration-normal $ease-out;

  &.is-navigating {
    opacity: 0;
  }
}

.site-footer__inner {
  max-width: 1600px;
  margin: 0 auto;
  padding: 48px 16px;
}
</style>

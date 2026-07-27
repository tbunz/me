<template>
  <!--
    Sticky reveal footer. Pinned to the bottom of the viewport and sits *behind*
    the opaque `.site-content` layer in the layout; scrolling to the end of the
    page lifts that layer away and reveals this. Content/colors are placeholders.
  -->
  <footer class="site-footer">
    <WesternBackdrop class="site-footer__backdrop" />
    <HorseGallop class="site-footer__horse" />
    <div class="site-footer__inner">
      <!-- blank for now -->
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.site-footer {
  position: sticky;
  bottom: 0;
  // Anchor for the absolutely-positioned horse.
  overflow: hidden;
  // Stays behind `.site-content` (z-index: 1) so it's covered until revealed.
  z-index: 0;
  // Must stay <= viewport height so the whole footer can be revealed.
  // Mobile keeps the original height; desktop is a little taller.
  min-height: 50vh;
  @include desktop {
    min-height: 60vh;
  }
  // Flat monochrome dusk sky: a single deep warm-brown twilight tone (in the
  // palette's brown family) so the pale desert and cream moon read brightly.
  background: #40332A;
  color: $bg-base;
  // Fades out with the leaving page (class toggled by the layout).
  transition: opacity $duration-normal $ease-out;

  &.is-navigating {
    opacity: 0;
  }
}

.site-footer__backdrop {
  // Scrolling desert + fixed sun, fills the footer behind everything.
  z-index: 0;
}

.site-footer__horse {
  // Left side, spanning the full footer height; width follows the art.
  // Sits above the backdrop so buttes scroll past behind it.
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1;

  // On mobile the horse is scaled huge (its height fills the footer) while its
  // art keeps empty space below the hooves, so its body reads as floating above
  // the desert ground line. Nudge the whole horse down — top/bottom shift keeps
  // the size identical and just drops it, with the overflow clipped. Desktop is
  // untouched. Tune SHIFT to taste (higher = lower on screen).
  @include mobile {
    $shift: 10%;
    top: $shift;
    bottom: -$shift;
  }
}

.site-footer__inner {
  position: relative;
  // Any real footer content sits above the art.
  z-index: 2;
  max-width: 1600px;
  margin: 0 auto;
  padding: 48px 16px;
}
</style>

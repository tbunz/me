<template>
  <!--
    Galloping-horse pixel animation. The SVG in `public/` is fully self-contained:
    its frame-cycling animation (and reduced-motion fallback) lives in the file's
    own embedded <style>, and runs even when loaded via <img>. We just size it.
  -->
  <img
    class="horse-gallop"
    src="/horse_gallop_final.svg"
    alt=""
    aria-hidden="true"
    draggable="false"
  >
</template>

<style lang="scss" scoped>
.horse-gallop {
  // Fill the parent's height; width follows the art's natural 4:3 aspect ratio.
  display: block;
  height: 100%;
  width: auto;
  // Keep the pixel art crisp instead of blurring on upscale.
  image-rendering: pixelated;
  user-select: none;
}
</style>

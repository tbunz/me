<template>
  <!--
    Monochrome western backdrop, tuned to sit *behind* the near-black running
    horse: everything here is a lighter desert tan so the horse never blends in.

    Depth comes from two parallax layers — a small, hazy, slow FAR layer near the
    horizon and a detailed, faster NEAR layer — plus a sun that bobs up and down
    on a loop. The sun is behind both layers, so buttes eclipse it and the near
    ground band clips it as it dips to the horizon.
  -->
  <div class="western" aria-hidden="true">
    <img class="western__sun" src="/sunset-moon.svg" alt="" draggable="false">

    <div class="western__layer western__layer--far">
      <img
        v-for="n in TILE_COUNT"
        :key="n"
        class="western__tile"
        src="/desert-far.svg"
        alt=""
        draggable="false"
      >
    </div>

    <div class="western__layer western__layer--near">
      <img
        v-for="n in TILE_COUNT"
        :key="n"
        class="western__tile"
        src="/desert-near.svg"
        alt=""
        draggable="false"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
// Each strip already holds a full non-repeating set of mesas/cacti and is wider
// than the viewport, so no variant is ever on screen twice. A few copies chained
// together give the seamless infinite scroll (translate by exactly one strip).
const TILE_COUNT = 3
</script>

<style lang="scss" scoped>
.western {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.western__sun {
  position: absolute;
  right: 14%;
  // Sits low, half-setting into the horizon like a sunset; the buttes and near
  // ground band eclipse its lower edge as the desert scrolls past.
  bottom: 38%;
  height: 26%;
  width: auto;
  z-index: 0;
  image-rendering: pixelated;
  user-select: none;
}

.western__layer {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  width: max-content;
  will-change: transform;
}

// Distant: slow. Nearer: faster. (Horse runs right → world slides left.)
// The far layer is opaque (haze comes from its lighter tone) so it occludes the sun.
.western__layer--far {
  z-index: 1;
  animation: western-scroll 320s linear infinite;
}
.western__layer--near {
  z-index: 2;
  animation: western-scroll 58s linear infinite;
}

.western__tile {
  flex: 0 0 auto;
  display: block;
  height: 100%;
  width: auto;
  image-rendering: pixelated;
  user-select: none;
}

// One strip = 100% / TILE_COUNT (3) = 33.3333%; identical strips → seamless wrap.
@keyframes western-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-33.3333%); }
}

@media (prefers-reduced-motion: reduce) {
  .western__layer { animation: none; }
}
</style>

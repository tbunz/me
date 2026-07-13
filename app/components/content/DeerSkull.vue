<template>
  <!--
    Pixel-art deer skull mount. On hover the right antler (#antR) breaks off,
    tumbles down, and settles on the ground beside the skull. The animation CSS
    lives in the scoped <style> below (Vue strips <style> tags out of templates,
    so it can't stay inline in the SVG). Honors prefers-reduced-motion.
  -->
  <svg
    class="deer-skull"
    :class="{ 'is-falling': state === 'falling', 'is-fallen': state === 'fallen' }"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 62"
    role="img"
    aria-label="Pixel art deer skull with antlers"
    @mouseenter="trigger"
    @click="trigger"
  >
    <desc>A pixel art deer skull mount. On hover, the right antler breaks off, tumbles down, and comes to rest on the ground beside the skull.</desc>
    <g shape-rendering="crispEdges">
      <path fill="#EDE4D3" d="M13 29h1v1H13zM14 30h1v1H14zM19 37h1v1H19zM19 38h1v1H19zM19 45h2v1H19zM20 46h1v1H20zM23 46h1v1H23zM20 47h1v1H20zM23 47h1v1H23zM20 48h1v1H20zM23 48h1v1H23zM20 49h1v1H20zM22 49h1v1H22zM21 50h1v1H21zM21 51h1v1H21zM22 52h1v1H22z"/>
      <path fill="#D4C4A8" d="M5 2h1v1H5zM4 3h2v1H4zM4 4h1v1H4zM2 18h1v1H2zM2 19h1v1H2zM7 21h2v1H7zM7 22h1v1H7zM15 23h1v1H15zM2 24h1v1H2zM15 24h1v1H15zM0 25h3v1H0zM15 25h1v1H15zM11 27h1v1H11zM12 28h1v1H12zM17 35h1v1H17zM17 36h3v1H17zM22 36h2v1H22zM20 37h4v1H20zM20 38h4v1H20zM19 39h1v1H19zM22 39h2v1H22zM22 40h2v1H22zM28 40h1v1H28zM28 41h2v1H28zM20 42h1v1H20zM22 42h1v1H22zM20 43h3v1H20zM20 44h1v1H20zM22 44h2v1H22zM22 45h2v1H22zM22 47h1v1H22zM21 48h2v1H21zM21 49h1v1H21zM23 49h1v1H23zM22 50h2v1H22zM22 51h2v1H22zM22 53h1v1H22zM22 54h1v1H22zM25 56h1v1H25zM24 57h3v1H24zM23 58h4v1H23zM23 59h2v1H23zM26 59h1v1H26zM23 60h1v1H23zM25 60h1v1H25z"/>
      <path fill="#A08B74" d="M3 7h2v1H3zM3 8h2v1H3zM2 9h2v1H2zM2 10h1v1H2zM1 11h1v1H1zM1 12h1v1H1zM2 14h1v1H2zM0 15h1v1H0zM2 15h1v1H2zM0 16h1v1H0zM2 16h1v1H2zM0 17h1v1H0zM2 17h1v1H2zM0 18h1v1H0zM0 19h1v1H0zM0 20h1v1H0zM0 21h1v1H0zM5 21h1v1H5zM16 21h1v1H16zM0 22h1v1H0zM6 22h1v1H6zM15 22h1v1H15zM0 23h1v1H0zM3 23h3v1H3zM0 24h2v1H0zM3 24h2v1H3zM7 25h2v1H7zM9 26h2v1H9zM14 26h2v1H14zM17 26h1v1H17zM12 27h1v1H12zM17 27h1v1H17zM13 28h3v1H13zM14 29h2v1H14zM15 30h1v1H15zM15 31h2v1H15zM16 32h1v1H16zM16 33h1v1H16zM22 33h4v1H22zM27 33h1v1H27zM17 34h1v1H17zM20 34h1v1H20zM22 34h5v1H22zM28 34h2v1H28zM18 35h1v1H18zM21 35h9v1H21zM20 36h2v1H20zM24 36h5v1H24zM24 37h5v1H24zM24 38h5v1H24zM20 39h2v1H20zM24 39h5v1H24zM18 40h4v1H18zM24 40h4v1H24zM29 40h1v1H29zM19 41h9v1H19zM30 41h1v1H30zM19 42h1v1H19zM21 42h1v1H21zM23 42h7v1H23zM23 43h3v1H23zM29 43h1v1H29zM21 44h1v1H21zM24 44h1v1H24zM21 45h1v1H21zM24 45h1v1H24zM21 46h2v1H21zM24 46h1v1H24zM21 47h1v1H21zM24 47h1v1H24zM24 48h1v1H24zM24 49h1v1H24zM24 50h1v1H24zM24 51h1v1H24zM23 52h1v1H23zM27 52h1v1H27zM26 53h1v1H26zM22 55h1v1H22zM26 55h1v1H26zM22 56h1v1H22zM24 56h1v1H24zM26 56h1v1H26zM22 57h2v1H22zM22 58h1v1H22z"/>
      <path fill="#6B5340" d="M4 5h1v1H4zM3 6h2v1H3zM2 11h1v1H2zM2 12h1v1H2zM1 13h2v1H1zM0 14h2v1H0zM1 15h1v1H1zM1 16h1v1H1zM1 17h1v1H1zM1 18h1v1H1zM1 19h1v1H1zM3 19h1v1H3zM1 20h3v1H1zM15 20h1v1H15zM15 21h1v1H15zM5 22h1v1H5zM16 22h1v1H16zM6 23h3v1H6zM16 23h1v1H16zM5 24h6v1H5zM16 24h1v1H16zM9 25h4v1H9zM16 25h1v1H16zM11 26h3v1H11zM16 26h1v1H16zM13 27h4v1H13zM16 28h2v1H16zM16 29h1v1H16zM16 30h1v1H16zM17 32h1v1H17zM17 33h1v1H17zM26 33h1v1H26zM28 33h3v1H28zM18 34h2v1H18zM27 34h1v1H27zM30 34h1v1H30zM19 35h2v1H19zM30 35h2v1H30zM29 36h2v1H29zM29 37h2v1H29zM29 38h2v1H29zM29 39h2v1H29zM30 40h2v1H30zM17 41h2v1H17zM31 41h1v1H31zM18 42h1v1H18zM17 43h3v1H17zM26 43h3v1H26zM18 44h2v1H18zM25 44h2v1H25zM28 44h1v1H28zM25 45h1v1H25zM28 45h2v1H28zM25 46h1v1H25zM28 46h2v1H28zM25 47h1v1H25zM28 47h2v1H28zM25 48h1v1H25zM28 48h2v1H28zM25 49h5v1H25zM25 50h4v1H25zM25 51h4v1H25zM24 52h3v1H24zM23 53h1v1H23zM25 53h1v1H25zM23 54h2v1H23zM26 54h1v1H26zM23 55h3v1H23zM23 56h1v1H23z"/>
      <path fill="#2A2118" d="M3 10h1v1H3zM3 11h1v1H3zM3 12h1v1H3zM3 13h1v1H3zM3 14h1v1H3zM3 15h1v1H3zM3 16h1v1H3zM3 17h1v1H3zM3 18h1v1H3zM4 19h1v1H4zM4 20h1v1H4zM1 21h4v1H1zM1 22h4v1H1zM1 23h2v1H1zM17 29h1v1H17zM17 30h2v1H17zM17 31h2v1H17zM18 32h2v1H18zM18 33h2v1H18zM31 34h1v1H31zM30 42h2v1H30zM30 43h2v1H30zM27 44h1v1H27zM29 44h2v1H29zM26 45h2v1H26zM26 46h2v1H26zM26 47h2v1H26zM26 48h2v1H26zM24 53h1v1H24zM25 54h1v1H25z"/>
      <g id="antR">
        <path fill="#EDE4D3" d="M36 18h2v1H36zM37 19h1v1H37z"/>
        <path fill="#D4C4A8" d="M43 9h1v1H43zM43 10h1v1H43zM43 15h1v1H43zM43 16h1v1H43zM43 17h1v1H43zM40 19h1v1H40zM39 20h1v1H39zM39 21h1v1H39zM37 26h1v1H37zM36 27h1v1H36zM35 28h1v1H35z"/>
        <path fill="#A08B74" d="M41 1h1v1H41zM41 2h2v1H41zM42 3h1v1H42zM42 4h2v1H42zM47 18h1v1H47zM47 19h1v1H47zM40 21h1v1H40zM41 22h3v1H41z"/>
        <path fill="#6B5340" d="M42 5h2v1H42zM42 6h2v1H42zM42 7h3v1H42zM43 8h2v1H43zM44 9h1v1H44zM44 10h2v1H44zM44 11h2v1H44zM44 12h2v1H44zM44 13h3v1H44zM44 14h3v1H44zM44 15h3v1H44zM44 16h3v1H44zM44 17h3v1H44zM43 18h4v1H43zM38 19h2v1H38zM42 19h5v1H42zM40 20h1v1H40zM43 20h3v1H43zM47 20h1v1H47zM32 21h1v1H32zM41 21h2v1H41zM47 21h1v1H47zM32 22h2v1H32zM38 22h3v1H38zM46 22h1v1H46zM32 23h2v1H32zM36 23h6v1H36zM32 24h2v1H32zM35 24h5v1H35zM32 25h1v1H32zM35 25h4v1H35zM32 26h1v1H32zM36 26h1v1H36zM31 27h2v1H31zM31 28h1v1H31zM30 29h2v1H30zM30 30h2v1H30zM30 31h2v1H30zM29 32h2v1H29z"/>
        <path fill="#2A2118" d="M41 20h2v1H41zM46 20h1v1H46zM43 21h4v1H43zM44 22h2v1H44zM33 25h2v1H33zM33 26h3v1H33zM33 27h3v1H33zM32 28h3v1H32zM32 29h3v1H32zM32 30h2v1H32zM32 31h2v1H32zM31 32h2v1H31zM31 33h2v1H31z"/>
      </g>
    </g>
  </svg>
</template>

<script lang="ts">
// Plain <script> runs once at module load (unlike <script setup>, which re-runs
// its body on every mount). Keeping the flag here makes the fallen state survive
// SPA route changes: once the antler drops it stays dropped everywhere on the
// site until a full page refresh.
let hasFallen = false
</script>

<script setup lang="ts">
import { ref } from 'vue'

// 'idle' → antler intact; 'falling' → animation running (holds final frame via
// `forwards`); 'fallen' → jump straight to the rest pose with no animation
// (used on remount when it already fell earlier this session).
const state = ref<'idle' | 'falling' | 'fallen'>(hasFallen ? 'fallen' : 'idle')

function trigger() {
  if (state.value !== 'idle') return
  hasFallen = true
  // Respect reduced-motion by skipping the tumble and settling in place.
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  state.value = reduce ? 'fallen' : 'falling'
}
</script>

<style lang="scss" scoped>
.deer-skull {
  display: block;
  width: 300px;
  max-width: 100%;
  height: auto;
  margin: 3rem auto 0;
  // The view-box is cropped to the intact skull (so it sits with no empty
  // right margin), but the antler's resting spot is off to the right — let it
  // fall outside the box rather than reserving layout space for it.
  overflow: visible;
}

// The breaking antler. transform-box/origin are set in view-box units so the
// rotation pivots at the antler's base.
#antR {
  transform-box: view-box;
  transform-origin: 31.5px 32.5px;
}

// First trigger: play the tumble once and hold the final frame.
.deer-skull.is-falling #antR {
  animation: drop 1s forwards;
}

// Already fell earlier this session (or reduced-motion): show the rest pose
// directly, no animation. Matches the animation's final keyframe.
.deer-skull.is-fallen #antR {
  transform: translate(2px, 12px) rotate(90deg);
}

@keyframes drop {
  0% { transform: none; animation-timing-function: ease-out; }
  14% { transform: rotate(7deg); animation-timing-function: linear; }
  24% { transform: rotate(7deg); animation-timing-function: ease-in; }
  48% { transform: translate(1px, 5px) rotate(70deg); animation-timing-function: ease-in; }
  62% { transform: translate(2px, 12px) rotate(96deg); animation-timing-function: ease-out; }
  74% { transform: translate(2px, 10px) rotate(87deg); animation-timing-function: ease-in; }
  86% { transform: translate(2px, 12px) rotate(91deg); animation-timing-function: ease-out; }
  100% { transform: translate(2px, 12px) rotate(90deg); }
}

@media (prefers-reduced-motion: reduce) {
  #antR { animation: none !important; }
}
</style>

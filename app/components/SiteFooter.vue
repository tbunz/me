<template>
  <!--
    Sticky reveal footer. Pinned to the bottom of the viewport and sits *behind*
    the opaque `.site-content` layer in the layout; scrolling to the end of the
    page lifts that layer away and reveals this. Content/colors are placeholders.
  -->
  <footer ref="footerRef" class="site-footer">
    <WesternBackdrop class="site-footer__backdrop" />
    <HorseGallop class="site-footer__horse" />
    <div class="site-footer__inner">
      <!-- blank for now -->
    </div>
  </footer>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

// ── Mouse-follow tuning ─────────────────────────────────────────
// The horse creeps toward the pointer on the X axis only, at a constant
// (no spring, no easing) speed — subtle enough to take ~CROSS_SECONDS to
// travel the full width of the footer. Higher = slower.
const CROSS_SECONDS = 45

const footerRef = ref<HTMLElement | null>(null)

let horseEl: HTMLElement | null = null
let targetX = 0
let currentX = 0
let lastTime = 0
let rafId: number | null = null

function clamp(x: number): number {
  const footer = footerRef.value
  if (!footer || !horseEl) return x
  const maxX = Math.max(0, footer.clientWidth - horseEl.clientWidth)
  return Math.max(0, Math.min(x, maxX))
}

function tick(now: number) {
  const footer = footerRef.value
  const dt = lastTime ? now - lastTime : 0
  lastTime = now

  // Constant speed: full footer width in CROSS_SECONDS (px per ms).
  const speed = (footer?.clientWidth ?? 0) / (CROSS_SECONDS * 1000)
  const step = speed * dt
  const dx = targetX - currentX

  // Arrived (only when we actually had a step to take this frame).
  if (dx === 0 || (step > 0 && Math.abs(dx) <= step)) {
    currentX = targetX
    if (horseEl) horseEl.style.transform = `translate3d(${currentX}px, 0, 0)`
    rafId = null
    lastTime = 0
    return
  }

  // step is 0 on the very first frame (dt === 0) — just wait for the next one.
  currentX += Math.sign(dx) * step
  if (horseEl) horseEl.style.transform = `translate3d(${currentX}px, 0, 0)`
  rafId = requestAnimationFrame(tick)
}

function ensureRunning() {
  if (rafId == null) {
    lastTime = 0
    rafId = requestAnimationFrame(tick)
  }
}

function onMove(e: MouseEvent) {
  const footer = footerRef.value
  if (!footer || !horseEl) return
  const rect = footer.getBoundingClientRect()
  // Center the horse under the pointer — X only, never vertical.
  targetX = clamp(e.clientX - rect.left - horseEl.clientWidth / 2)
  ensureRunning()
}

function onLeave() {
  // Freeze right where it is; a re-enter will retarget from here.
  targetX = currentX
  if (rafId != null) {
    cancelAnimationFrame(rafId)
    rafId = null
    lastTime = 0
  }
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const footer = footerRef.value
  horseEl = footer?.querySelector<HTMLElement>('.site-footer__horse') ?? null
  if (!footer || !horseEl) return
  footer.addEventListener('mousemove', onMove)
  footer.addEventListener('mouseleave', onLeave)
})

onBeforeUnmount(() => {
  footerRef.value?.removeEventListener('mousemove', onMove)
  footerRef.value?.removeEventListener('mouseleave', onLeave)
  if (rafId != null) cancelAnimationFrame(rafId)
})
</script>

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
  // Promoted to its own layer so the JS-driven follow stays smooth.
  will-change: transform;

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

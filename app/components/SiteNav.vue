<template>
  <header class="site-header">
    <nav class="site-nav">
      <div class="site-title-wrap">
        <span class="site-title site-title--sizer" ref="sizer">{{ initialTitle }}</span>
        <h1 class="site-title site-title--slot" ref="titleEl">{{ initialTitle }}</h1>
      </div>
      <AppLink to="/" class="nav-link" style="width: 45px">Work</AppLink>
      <AppLink to="/about" class="nav-link" style="width: 51px">About</AppLink>
      <AppLink to="/contact" class="nav-link" style="width: 71px">Contact</AppLink>
    </nav>
  </header>
</template>

<script setup lang="ts">
import gsap from 'gsap'

const route = useRoute()

const titles: Record<string, string> = {
  '/': 'Projects',
  '/about': 'Trevor McKinney',
  '/contact': 'Connect',
}

const pageTitle = computed(() => {
  if (titles[route.path]) return titles[route.path]
  if (route.path.startsWith('/work/')) return 'TODO'
  return 'Projects'
})

const initialTitle = pageTitle.value ?? 'Projects'

const sizer = ref<HTMLElement | null>(null)
const titleEl = ref<HTMLElement | null>(null)

let tween: gsap.core.Tween | null = null
let currentDisplay = initialTitle

const FILLER_WORDS = [
  'Cimarron Alamo', 'Green A', 'Legumes', 'Pues, Fíjate Que Sí', 'T-Bone', 'Mori', 'Yesterday Blues', 'Sweet And Low', 'La Sal', 'Rabbit Ears', 'Tombstone', 'Mt. Diablo', 'Agulhas'
]
const ROULETTE_DURATION = 1.5

function buildSequence(current: string, target: string): string[] {
  const pool = FILLER_WORDS.filter(w => w !== current && w !== target)
  const shuffled = [...pool].sort(() => Math.random() - 0.5)
  return [...shuffled, target]
}

function runRoulette(target: string) {
  const el = titleEl.value
  if (!el) return

  if (tween) {
    tween.kill()
    tween = null
    gsap.set(el, { y: '0%' })
  }

  const sequence = buildSequence(currentDisplay, target)
  const words = [currentDisplay, ...sequence]
  const scrollRange = words.length - 1

  // Size container to the widest word in the entire sequence
  if (sizer.value) {
    let maxWidth = 0
    let widestWord = target
    for (const word of words) {
      sizer.value.textContent = word
      const w = sizer.value.offsetWidth
      if (w > maxWidth) { maxWidth = w; widestWord = word }
    }
    sizer.value.textContent = widestWord
  }

  const proxy = { scroll: 0 }
  let lastIdx = 0

  tween = gsap.to(proxy, {
    scroll: scrollRange,
    duration: ROULETTE_DURATION,
    ease: 'power2.inOut',
    onUpdate: () => {
      const idx = Math.min(Math.round(proxy.scroll), words.length - 1)
      const offset = proxy.scroll - idx
      if (idx !== lastIdx) {
        el.textContent = words[idx]!
        lastIdx = idx
      }
      gsap.set(el, { y: `${offset * 180}%` })
    },
    onComplete: () => {
      currentDisplay = target
      gsap.set(el, { y: '0%' })
      if (sizer.value) sizer.value.textContent = target
      tween = null
    },
  })
}

watch(pageTitle, (newTitle) => {
  if (!newTitle || newTitle === currentDisplay) return
  runRoulette(newTitle)
})

onMounted(() => {
  if (titleEl.value) gsap.set(titleEl.value, { y: '0%' })
})

onBeforeUnmount(() => {
  if (tween) {
    tween.kill()
    tween = null
  }
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
  border-bottom: 1px solid $tan;
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
  padding: 8px 0;
  mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
}

.site-title {
  margin: 0;
  white-space: nowrap;
  @include type-h2;
  font-weight: $weight-bold;

  &--sizer {
    display: block;
    visibility: hidden;
  }

  &--slot {
    position: absolute;
    top: 8px;
    left: 0;
    color: $brown-dark;
    will-change: transform;
  }
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

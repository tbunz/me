<template>
  <header class="site-header">
    <nav class="site-nav">
      <div class="site-title-wrap">
        <NuxtLink to="/" class="site-title-link">
          <span class="site-title site-title--sizer" ref="sizer">{{ initialTitle }}</span>
          <h1 class="site-title site-title--slot" ref="titleEl">{{ initialTitle }}</h1>
        </NuxtLink>
      </div>
      <template v-if="isDesktop">
        <AppLink to="/" class="nav-link" style="width: 45px">Work</AppLink>
        <AppLink to="/about" class="nav-link" style="width: 51px">About</AppLink>
        <AppLink to="/contact" class="nav-link" style="width: 71px">Contact</AppLink>
      </template>
      <button v-else class="hamburger-btn" @click="toggleMenu" aria-label="Menu">
        <span class="hamburger-roulette">
          <svg class="hamburger-roulette__sizer" viewBox="0 0 20 20" width="20" height="20" />
          <svg
            ref="hamburgerSlotEl"
            class="hamburger-roulette__slot"
            viewBox="0 0 20 20"
            width="20"
            height="20"
            v-html="currentIconSvg"
          />
        </span>
      </button>
    </nav>
    <Transition v-if="isMobile" name="menu">
      <div v-show="menuOpen" class="mobile-menu">
        <AppLink to="/" class="mobile-menu-link" @click="closeMenu">Work</AppLink>
        <AppLink to="/about" class="mobile-menu-link" @click="closeMenu">About</AppLink>
        <AppLink to="/contact" class="mobile-menu-link" @click="closeMenu">Contact</AppLink>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import gsap from 'gsap'
import { HAMBURGER_SVG, CLOSE_SVG, FILLER_ICONS } from '~/assets/svg/hamburger-icons'

const { isMobile, isDesktop } = useBreakpoints()
const { stop: lenisStop, start: lenisStart } = useLenis()
const { projectTitle, projectTitleMobile, setProjectTitle } = useProjectTitle()
const route = useRoute()
const menuOpen = ref(false)

// Pre-fetch project title during SSR so initialTitle is correct (deduped with [slug].vue)
const workSlug = route.params.slug as string | undefined
if (workSlug && route.path.startsWith('/work/')) {
  const { data: _proj } = await useAsyncData(`project-${workSlug}`, () =>
    queryCollection('work').path(`/work/${workSlug}`).first()
  )
  if (_proj.value?.title) setProjectTitle(_proj.value.title)
}

const HAMBURGER_ROULETTE_DURATION = 1.3

const hamburgerSlotEl = ref<SVGElement | null>(null)
const currentIconSvg = ref(HAMBURGER_SVG)
let hamburgerTween: gsap.core.Tween | null = null
let currentHamburgerIcon = HAMBURGER_SVG

function buildIconSequence(current: string, target: string): string[] {
  const pool = FILLER_ICONS.filter(svg => svg !== current && svg !== target)
  const shuffled = [...pool].sort(() => Math.random() - 0.5)
  const count = 8 + Math.floor(Math.random() * 3)
  return [...shuffled.slice(0, count), target]
}

function runHamburgerRoulette(target: string) {
  const el = hamburgerSlotEl.value
  if (!el) return

  if (hamburgerTween) {
    hamburgerTween.kill()
    hamburgerTween = null
    currentHamburgerIcon = currentIconSvg.value
    gsap.set(el, { y: '0%' })
  }

  const sequence = buildIconSequence(currentHamburgerIcon, target)
  const icons = [currentHamburgerIcon, ...sequence]
  const scrollRange = icons.length - 1

  const proxy = { scroll: 0 }
  let lastIdx = 0

  hamburgerTween = gsap.to(proxy, {
    scroll: scrollRange,
    duration: HAMBURGER_ROULETTE_DURATION,
    ease: 'power2.inOut',
    onUpdate: () => {
      const idx = Math.min(Math.round(proxy.scroll), icons.length - 1)
      const offset = proxy.scroll - idx
      if (idx !== lastIdx) {
        currentIconSvg.value = icons[idx]!
        lastIdx = idx
      }
      gsap.set(el, { y: `${offset * 180}%` })
    },
    onComplete: () => {
      currentHamburgerIcon = target
      currentIconSvg.value = target
      gsap.set(el, { y: '0%' })
      hamburgerTween = null
    },
  })
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value
  const target = menuOpen.value ? CLOSE_SVG : HAMBURGER_SVG
  runHamburgerRoulette(target)
}

function closeMenu() {
  if (!menuOpen.value) return
  menuOpen.value = false
  runHamburgerRoulette(HAMBURGER_SVG)
}

watch(menuOpen, (open) => {
  if (open) lenisStop()
  else lenisStart()
})

watch(isDesktop, (v) => {
  if (v) {
    menuOpen.value = false
    currentIconSvg.value = HAMBURGER_SVG
    currentHamburgerIcon = HAMBURGER_SVG
    if (hamburgerTween) { hamburgerTween.kill(); hamburgerTween = null }
  }
})
watch(() => route.path, () => {
  menuOpen.value = false
  if (currentHamburgerIcon !== HAMBURGER_SVG || hamburgerTween) {
    runHamburgerRoulette(HAMBURGER_SVG)
  }
})

const titles: Record<string, string> = {
  '/': 'Portfolio',
  '/about': 'Trevor McKinney',
  '/contact': 'Connect',
}

const pageTitle = computed(() => {
  if (titles[route.path]) return titles[route.path]
  if (route.path.startsWith('/work/')) {
    if (!projectTitle.value) return 'Projects'
    // Prefer the shorter mobile tagline below the breakpoint. isMobile here is
    // the nav's own (persistent) breakpoint, reliable once mounted.
    return (isMobile.value && projectTitleMobile.value) || projectTitle.value
  }
  return 'Projects'
})

const initialTitle = pageTitle.value ?? 'Projects'

const sizer = ref<HTMLElement | null>(null)
const titleEl = ref<HTMLElement | null>(null)

let tween: gsap.core.Tween | null = null
let currentDisplay = initialTitle
let targetTitle = initialTitle
// The route the currently-shown title belongs to. Used to distinguish a real
// navigation (should spin) from a same-page title settling — e.g. the mobile
// tagline resolving after mount, since `isMobile` is only known client-side.
let lastRoutePath = route.path

const FILLER_WORDS = [
  'Cimarron Alamo', 'Ride or Die', 'Legumes', 'Wild, Wild, Wild Horses', 'T-Bone', 'Mori', 'Yesterday Blues', 'La Sal', 'Rabbit Ears', 'Te juro que te amo', 'Ouray', 'I aint fresh?', '24 hours', 'Fishigan'
]
// Separate, shorter filler set for mobile so long phrases don't overflow the
// narrow nav. Curate freely — this list is used only below the breakpoint.
const FILLER_WORDS_MOBILE = [
  'Ride', 'Legumes', 'T-Bone', 'Mori', 'La Sal', 'Rabbit Ears', 'Ouray', '24 hours', 'Fishigan', 'Wild Wild', 'Te juro', 'Te amo'
]
const ROULETTE_DURATION = 1.5

function buildSequence(current: string, target: string): string[] {
  const words = isMobile.value ? FILLER_WORDS_MOBILE : FILLER_WORDS
  const pool = words.filter(w => w !== current && w !== target)
  const shuffled = [...pool].sort(() => Math.random() - 0.5)
  return [...shuffled, target]
}

function runRoulette(target: string) {
  const el = titleEl.value
  if (!el) return

  if (tween) {
    tween.kill()
    tween = null
    currentDisplay = el.textContent || currentDisplay
    gsap.set(el, { y: '0%' })
  }

  targetTitle = target

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
  if (!newTitle || newTitle === targetTitle) return
  // On a work route, 'Projects' is only ever the fallback shown for the brief
  // async window before the article's real title/tagline loads. Spinning to it
  // and then to the real title double-pumps the roulette (start → kill → jump →
  // restart), so skip it — the real title change fires the single, clean spin.
  if (newTitle === 'Projects' && route.path.startsWith('/work/')) return
  // Only spin on an actual navigation. If the route hasn't changed since the
  // last spin, this title change is just the same page's title settling — most
  // often the mobile tagline resolving after mount (isMobile is false until the
  // client mounts). Ignore it so refresh/first-load doesn't play a stray spin,
  // matching desktop, which shows its title immediately with no animation.
  if (route.path === lastRoutePath) return
  lastRoutePath = route.path
  runRoulette(newTitle)
})

onMounted(() => {
  if (titleEl.value) gsap.set(titleEl.value, { y: '0%' })
})

onBeforeUnmount(() => {
  if (tween) { tween.kill(); tween = null }
  if (hamburgerTween) { hamburgerTween.kill(); hamburgerTween = null }
})

defineExpose({ menuOpen, closeMenu })
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
  flex: 1;
  min-width: 0;
  padding: 8px 0;
  mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
}

.site-title-link {
  display: inline-block;
  position: relative;
  text-decoration: none;
  color: inherit;
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
    top: 0;
    left: 0;
    color: $brown-dark;
    will-change: transform;
  }
}

.nav-link {
  font-size: 0.875rem; // 14px — nav pinned to original size

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

// ── Hamburger roulette button ──
.hamburger-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.hamburger-roulette {
  position: relative;
  width: 20px;
  height: 20px;
  overflow: hidden;
  mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
}

.hamburger-roulette__sizer {
  display: block;
  visibility: hidden;
}

.hamburger-roulette__slot {
  position: absolute;
  top: 0;
  left: 0;
  color: $brown-dark;
  will-change: transform;
  stroke: currentColor;
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

// ── Mobile menu dropdown ──
.mobile-menu {
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: 8px 16px 16px;
  background: $bg-base;
  margin-top: -1px;
  border-bottom: 1px solid $tan;
}

.mobile-menu-link {
  padding: 6px 0;
  font-size: 1rem; // 16px — nav pinned to original size

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

// ── Menu transition ──
.menu-enter-active {
  transition: opacity $duration-slow $ease-out;
}

.menu-leave-active {
  transition: opacity $duration-normal $ease-out;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}
</style>

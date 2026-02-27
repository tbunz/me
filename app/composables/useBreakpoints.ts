// NOTE: must match the values in app/assets/scss/_breakpoints.scss

const MOBILE_MAX = 999

export function useBreakpoints() {
  const isMobile = useMediaQuery(`(max-width: ${MOBILE_MAX}px)`)
  const isDesktop = useMediaQuery(`(min-width: ${MOBILE_MAX + 1}px)`)

  return { isMobile, isDesktop }
}

function useMediaQuery(query: string) {
  const matches = ref(false)

  onMounted(() => {
    const mql = window.matchMedia(query)
    matches.value = mql.matches
    const handler = (e: MediaQueryListEvent) => { matches.value = e.matches }
    mql.addEventListener('change', handler)
    onUnmounted(() => mql.removeEventListener('change', handler))
  })

  return matches
}

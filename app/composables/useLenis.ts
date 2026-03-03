import type Lenis from 'lenis'

export function useLenis() {
  const { $lenis } = useNuxtApp()
  const lenis = $lenis as Lenis | null

  function scrollTo(
    target: number | string | HTMLElement,
    options?: {
      offset?: number
      duration?: number
      easing?: (t: number) => number
      immediate?: boolean
      lock?: boolean
      onComplete?: () => void
    },
  ) {
    lenis?.scrollTo(target, options)
  }

  function stop() {
    lenis?.stop()
  }

  function start() {
    lenis?.start()
  }

  return { lenis, scrollTo, stop, start }
}

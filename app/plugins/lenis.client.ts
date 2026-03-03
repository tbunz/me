import Lenis from 'lenis'
import gsap from 'gsap'

export default defineNuxtPlugin(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) {
    return { provide: { lenis: null as Lenis | null } }
  }

  const lenis = new Lenis({
    duration: 1.4,
    wheelMultiplier: 0.9,
  })

  // Drive Lenis through GSAP's ticker so scroll and animations share the same frame loop
  gsap.ticker.add((time: number) => {
    lenis.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)

  return { provide: { lenis } }
})

import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  // Scroll is reset manually via Lenis in the page transition (app.vue).
  // Returning false keeps the router from scrolling the still-visible outgoing
  // page to the top mid-fade, and avoids fighting Lenis's internal position.
  scrollBehavior: () => false,
}

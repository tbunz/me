import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior: () => ({ top: 0, behavior: 'instant' }),
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxt/fonts'],
  components: [
    { path: '~/components/content', pathPrefix: false },
    '~/components',
  ],
  content: {
    renderer: {
      anchorLinks: false,
    },
  },
  router: {
    options: {
      scrollBehavior: () => ({ top: 0, behavior: 'instant' }),
    },
  },
  fonts: {
    families: [
      {
        name: 'DM Sans',
        provider: 'google',
        weights: [400, 500, 700],
        styles: ['normal', 'italic'],
      },
    ],
  },
  css: [
    '~/assets/css/reset.css',
    '~/assets/scss/global.scss',
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/_index" as *;'
        }
      }
    }
  }
})
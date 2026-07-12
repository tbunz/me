import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: {
        include: '**',
        exclude: ['work/**'],
      },
    }),
    work: defineCollection({
      type: 'page',
      source: 'work/**',
      schema: z.object({
        tagline: z.string().optional(),
        // Shorter tagline used as the nav h1 target on mobile (falls back to
        // `tagline` when omitted). Keeps long desktop taglines from overflowing.
        taglineMobile: z.string().optional(),
        thumbnails: z.array(z.string()).optional(),
        titleColor: z.enum(['dark', 'light']).optional(),
        sortOrder: z.number().optional(),
        draft: z.boolean().optional(),
      }),
    }),
  },
})

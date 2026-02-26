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
        thumbnails: z.array(z.string()).optional(),
      }),
    }),
  },
})

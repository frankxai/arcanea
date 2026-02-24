import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Arcanea Prompt Books',
    short_name: 'Prompt Books',
    description: 'Cross-device AI prompt management with context engineering',
    start_url: '/prompt-books',
    display: 'standalone',
    background_color: '#0a0e1a',
    theme_color: '#7fffd4',
    orientation: 'any',
    categories: ['productivity', 'utilities'],
    icons: [
      { src: '/icons/prompt-books-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/prompt-books-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icons/prompt-books-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
    share_target: {
      action: '/prompt-books/share',
      method: 'POST',
      enctype: 'multipart/form-data',
      params: {
        title: 'title',
        text: 'text',
        url: 'url',
        files: [
          {
            name: 'files',
            accept: ['text/plain', 'text/markdown', 'application/json', '.md', '.txt', '.json'],
          },
        ],
      },
    },
  }
}

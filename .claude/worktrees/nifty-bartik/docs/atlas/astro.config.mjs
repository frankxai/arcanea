import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [mdx()],
  srcDir: './src',
  outDir: './dist',
  site: 'https://atlas.arcanea.ai',
  markdown: {
    syntaxHighlight: 'shiki'
  }
});

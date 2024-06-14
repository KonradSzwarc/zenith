import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), mdx(), icon()],
  site: 'https://example.com',
  devToolbar: {
    enabled: process.env['PDF_MODE'] !== 'true',
  },
});

import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import { defineConfig, envField } from 'astro/config';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), mdx(), icon()],
  site: 'https://example.com',
  devToolbar: {
    enabled: process.env['DISABLE_TOOLBAR'] !== 'true',
  },
  experimental: {
    env: {
      schema: {
        PUBLIC_UMAMI_WEBSITE_ID: envField.string({ context: 'client', access: 'public', optional: true }),
      },
    },
  },
});

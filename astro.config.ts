import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig, envField } from 'astro/config';
import icon from 'astro-icon';
import metaTags from 'astro-meta-tags';

// https://astro.build/config
export default defineConfig({
  integrations: [metaTags(), mdx(), icon(), tailwind(), sitemap({ filter: (url) => new URL(url).pathname === '/' })],
  site: 'https://example.com',
  devToolbar: {
    enabled: process.env['DISABLE_TOOLBAR'] !== 'true',
  },
  experimental: {
    env: {
      schema: {
        PUBLIC_UMAMI_WEBSITE_ID: envField.string({ context: 'client', access: 'public', optional: true }),
        PUBLIC_POSTHOG_API_HOST: envField.string({ context: 'client', access: 'public', optional: true, url: true }),
        PUBLIC_POSTHOG_API_KEY: envField.string({ context: 'client', access: 'public', optional: true }),
      },
    },
  },
});

import { existsSync } from 'node:fs';
import { rm } from 'node:fs/promises';
import { join } from 'node:path';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig, envField } from 'astro/config';
import icon from 'astro-icon';
import metaTags from 'astro-meta-tags';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  experimental: {
    env: {
      schema: {
        PUBLIC_UMAMI_WEBSITE_ID: envField.string({ context: 'client', access: 'public', optional: true }),
        PUBLIC_POSTHOG_API_HOST: envField.string({ context: 'client', access: 'public', optional: true, url: true }),
        PUBLIC_POSTHOG_API_KEY: envField.string({ context: 'client', access: 'public', optional: true }),
      },
    },
  },
  integrations: [
    metaTags(),
    mdx(),
    icon(),
    tailwind(),
    sitemap({ filter: (url) => new URL(url).pathname === '/' }),
    {
      name: 'remove-asset-sites',
      hooks: {
        'astro:build:done': async ({ dir }) => {
          await Promise.all([removeIfExists(join(dir.pathname, 'og')), removeIfExists(join(dir.pathname, 'pdf'))]);
        },
      },
    },
  ],
});

async function removeIfExists(path: string) {
  if (existsSync(path)) {
    await rm(path, { recursive: true });
  }
}

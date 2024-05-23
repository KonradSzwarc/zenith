import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      /** We use a custom css file with @layer directives, so resume styles can be customized per page. */
      applyBaseStyles: false,
    }),
  ],
});

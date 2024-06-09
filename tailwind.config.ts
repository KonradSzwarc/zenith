import typographyPlugin from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        ['zenith']: 'hsl(var(--zenith) / <alpha-value>)',
        ['zenith-light']: 'hsl(var(--zenith-light) / <alpha-value>)',
        ['zenith-contrast-text']: 'hsl(var(--zenith-contrast-text) / <alpha-value>)',

        ['dusk-950']: 'hsl(var(--dusk-950) / <alpha-value>)',
        ['dusk-900']: 'hsl(var(--dusk-900) / <alpha-value>)',
        ['dusk-800']: 'hsl(var(--dusk-800) / <alpha-value>)',
        ['dusk-700']: 'hsl(var(--dusk-700) / <alpha-value>)',
        ['dusk-600']: 'hsl(var(--dusk-600) / <alpha-value>)',
        ['dusk-500']: 'hsl(var(--dusk-500) / <alpha-value>)',
        ['dusk-400']: 'hsl(var(--dusk-400) / <alpha-value>)',
        ['dusk-300']: 'hsl(var(--dusk-300) / <alpha-value>)',
        ['dusk-200']: 'hsl(var(--dusk-200) / <alpha-value>)',
        ['dusk-100']: 'hsl(var(--dusk-100) / <alpha-value>)',
        ['dusk-50']: 'hsl(var(--dusk-50) / <alpha-value>)',

        ['color-text-title']: 'hsl(var(--text-title) / <alpha-value>)',
        ['color-text-primary']: 'hsl(var(--text-primary) / <alpha-value>)',
        ['color-text-secondary']: 'hsl(var(--text-secondary) / <alpha-value>)',
        ['color-icon-light']: 'hsl(var(--icon-light) / <alpha-value>)',
        ['color-icon-main']: 'hsl(var(--icon-main) / <alpha-value>)',
        ['color-icon-dark']: 'hsl(var(--icon-dark) / <alpha-value>)',
        ['color-border']: 'hsl(var(--border) / <alpha-value>)',
        ['color-separator']: 'hsl(var(--separator) / <alpha-value>)',
        ['color-bg-body']: 'hsl(var(--bg-body) / <alpha-value>)',
        ['color-bg-card']: 'hsl(var(--bg-card) / <alpha-value>)',
        ['color-bg-light']: 'hsl(var(--bg-light) / <alpha-value>)',
        ['color-bg-main']: 'hsl(var(--bg-main) / <alpha-value>)',
        ['color-bg-dark']: 'hsl(var(--bg-dark) / <alpha-value>)',
      },
      fontFamily: {
        header: ['var(--font-header)', ...defaultTheme.fontFamily.sans],
        body: ['var(--font-body)', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [typographyPlugin],
} satisfies Config;

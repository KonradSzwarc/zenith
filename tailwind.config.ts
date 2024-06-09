import typographyPlugin from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  darkMode: 'selector',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        ['color-primary']: 'hsl(var(--primary) / <alpha-value>)',
        ['color-primary-light']: 'hsl(var(--primary-light) / <alpha-value>)',
        ['color-primary-contrast']: 'hsl(var(--primary-contrast) / <alpha-value>)',

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
        ['color-bg-popover']: 'hsl(var(--bg-popover) / <alpha-value>)',
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

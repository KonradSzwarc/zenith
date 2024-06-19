import typographyPlugin from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  darkMode: 'selector',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      spacing: {
        18: '4.5rem',
      },
      colors: {
        ['color-primary-dark']: 'hsl(var(--primary-dark) / <alpha-value>)',
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
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': 'hsl(var(--text-primary))',
            '--tw-prose-headings': 'hsl(var(--text-title))',
            '--tw-prose-lead': 'hsl(var(--text-primary))',
            '--tw-prose-links': 'hsl(var(--text-title))',
            '--tw-prose-bold': 'hsl(var(--text-title))',
            '--tw-prose-counters': 'hsl(var(--text-secondary))',
            '--tw-prose-bullets': 'hsl(var(--text-secondary))',
            '--tw-prose-hr': 'hsl(var(--separator))',
            '--tw-prose-quotes': 'hsl(var(--text-title))',
            '--tw-prose-quote-borders': 'hsl(var(--border))',
            '--tw-prose-captions': 'hsl(var(--text-secondary))',
            '--tw-prose-kbd': 'hsl(var(--text-title))',
            '--tw-prose-kbd-shadows': 'hsl(var(--text-title))',
            '--tw-prose-code': 'hsl(var(--text-title))',
            '--tw-prose-pre-code': 'hsl(var(--bg-main))',
            '--tw-prose-pre-bg': 'hsl(var(--text-title))',
            '--tw-prose-th-borders': 'hsl(var(--separator))',
            '--tw-prose-td-borders': 'hsl(var(--border))',
          },
        },
      },
    },
  },
  plugins: [typographyPlugin],
} satisfies Config;

import typographyPlugin from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  darkMode: 'selector',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,svg}'],
  theme: {
    extend: {
      spacing: {
        15: '3.75rem',
        18: '4.5rem',
        26: '6.5rem',
        50: '12.5rem',
      },
      colors: {
        ...getCustomColors(),
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

function getCustomColors() {
  // Tailwind shades used for base colors.
  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

  // Base color palettes used in the project. Related CSS variables are located in `src/styles/colors/(dusk|accent)`.
  const baseColors = ['dusk', 'accent'];

  // Colors used in the code for styling. Related CSS variables are located in `src/styles/colors/elements`.
  // prettier-ignore
  const elementColors = ['button-bg', 'button-bg-contrast', 'web-heading-underline', 'pdf-heading-underline', 'primary-dark', 'primary', 'primary-light', 'primary-contrast', 'text-title', 'text-primary', 'text-secondary', 'text-contrast', 'icon-light', 'icon-main', 'icon-dark', 'border', 'separator', 'bg-body', 'bg-card', 'bg-popover', 'bg-tooltip', 'bg-light', 'bg-main', 'bg-dark'];

  const result: Record<string, Record<string, string>> = {};

  for (const color of baseColors) {
    result[color] = Object.fromEntries(shades.map((shade) => [shade, `hsl(var(--${color}-${shade}) / <alpha-value>)`]));
  }

  result.color = {};
  for (const color of elementColors) {
    result.color[color] = `hsl(var(--${color}) / <alpha-value>)`;
  }

  return result;
}

import { exec } from 'cli/helpers';
import { writeFile } from 'fs/promises';
import { parseToHsl } from 'polished';
import colors from 'tailwindcss/colors';

type Shades = Record<50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950, string>;

const dusks: Record<string, Shades> = {
  ...pick(colors, ['slate', 'gray', 'zinc', 'neutral', 'stone'] as const),
  // Add custom dusk presets here
};

const accents: Record<string, Shades> = {
  // prettier-ignore
  ...pick(colors, ['rose', 'pink', 'fuchsia', 'purple', 'violet', 'indigo', 'blue', 'sky', 'cyan', 'teal', 'emerald', 'green', 'lime', 'yellow', 'amber', 'orange', 'red'] as const),
  // Add custom accent presets here
};

export async function colorsCommand() {
  await Promise.all([
    ...Object.entries(dusks).map(([name, shades]) => saveStyles(`dusk/${name}`, shadesToVars('dusk', shades))),
    ...Object.entries(accents).map(([name, shades]) => saveStyles(`accent/${name}`, shadesToVars('accent', shades))),
  ]);
  await exec('prettier --write src/styles/colors/**/*.astro --log-level error');
  process.exit(0);
}

function shadesToVars(name: string, shades: Shades) {
  return Object.entries(shades)
    .toSorted(([num1], [num2]) => Number(num2) - Number(num1))
    .map(([num, value]) => {
      const { hue, saturation, lightness } = parseToHsl(value);
      return `--${name}-${num}: ${Math.round(hue)} ${Math.round(saturation * 100)}% ${Math.round(lightness * 100)}%;`;
    });
}

async function saveStyles(path: string, vars: string[]) {
  await writeFile(`src/styles/colors/${path}.astro`, `<style is:global>:root {${vars.join('\n')}}</style>`);
}

function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as T;
  keys.forEach((key) => (result[key] = obj[key]));
  return result;
}

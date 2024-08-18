import eslint from '@eslint/js';
import gitignore from 'eslint-config-flat-gitignore';
import prettierConfig from 'eslint-config-prettier';
import astro from 'eslint-plugin-astro';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tailwind from 'eslint-plugin-tailwindcss';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { name: 'gitignore', ...gitignore() },
  { name: 'eslint/recommended', ...eslint.configs.recommended },
  ...simpleImportSortPlugin(),
  ...tseslint.configs.recommended.map(withAstroFiles),
  {
    name: 'typescript-eslint/custom',
    rules: {
      '@typescript-eslint/no-empty-object-type': ['error', { allowInterfaces: 'with-single-extends' }],
    },
  },
  ...astro.configs.recommended,
  ...tailwindPlugin(),
  { name: 'prettier', ...prettierConfig }, // Must be the last one.
);

function withAstroFiles(config) {
  if (config.files && !config.files.includes('**/*.astro')) {
    config.files?.push('**/*.astro');
  }
  return config;
}

function simpleImportSortPlugin() {
  return [
    {
      name: 'simple-import-sort',
      plugins: {
        'simple-import-sort': simpleImportSort,
      },
      rules: {
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
      },
    },
  ];
}

function tailwindPlugin() {
  return [
    ...tailwind.configs['flat/recommended'],
    {
      name: 'tailwindcss:settings',
      settings: {
        tailwindcss: {
          config: 'tailwind.config.ts',
          callees: ['cn'],
        },
      },
    },
  ];
}

// Specify only the rules that cannot be defined within the .editorconfig file as Prettier inherits config from there.
// See: https://prettier.io/docs/en/configuration.html#editorconfig

/** @type {import('prettier').Config} */
const config = {
  singleQuote: true,
  trailingComma: 'all',
  plugins: ['prettier-plugin-astro'],
  overrides: [
    {
      files: '*.astro',
      options: { parser: 'astro' },
    },
    {
      files: '*.svg',
      options: { parser: 'html' },
    },
  ],
};

export default config;

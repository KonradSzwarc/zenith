import { exec } from 'node:child_process';
import { promisify } from 'node:util';

import type { FaviconFile, FaviconImage } from 'favicons';
import { favicons } from 'favicons';
import { existsSync } from 'fs';
import { mkdir, rm, writeFile } from 'fs/promises';

import { log } from './script-helpers';

const INPUT_IMAGE = 'src/assets/me.jpg';
const OUTPUT_PATH = 'public/favicons';
const OUTPUT_ASTRO_COMPONENT = 'src/web/components/metadata/generated-favicons.astro';

await main();

async function main() {
  const { images, files, html } = await generateFavicons();

  await prepareDir();

  await Promise.all([...images, ...files].map(saveFile));

  await generateAstroFile(html);

  log.success('Favicons generated successfully');
}

async function generateFavicons() {
  return favicons(INPUT_IMAGE, {
    path: '/favicons',
    appName: 'Mark Freeman Resume',
    appDescription: 'Virtual resume of Mark Freeman',
    appShortName: 'Mark Freeman Resume',
    lang: 'en',
    start_url: '.',
    icons: {
      android: ['android-chrome-192x192.png', 'android-chrome-512x512.png'],
      windows: false,
      yandex: false,
      appleStartup: false,
      appleIcon: ['apple-touch-icon.png'],
      favicons: ['favicon-16x16.png', 'favicon-32x32.png', 'favicon.ico'],
    },
  });
}

async function prepareDir() {
  if (existsSync(OUTPUT_PATH)) {
    await rm(OUTPUT_PATH, { recursive: true, force: true });
  }

  await mkdir(OUTPUT_PATH);
}

async function saveFile(file: FaviconFile | FaviconImage) {
  log.info(`Creating ${file.name} file...`);

  await writeFile(`${OUTPUT_PATH}/${file.name}`, file.contents);
}

async function generateAstroFile(html: string[]) {
  log.info(`Creating ${OUTPUT_ASTRO_COMPONENT.split('/').pop()} file...`);

  const topComment = `
<!--
  This file is auto-generated. Do not edit it manually.
  In order to apply changes to it, adjust configuration object in scripts/generate-favicons.ts script and run it
-->
`.trim();

  await writeFile(OUTPUT_ASTRO_COMPONENT, [topComment, ...html].join('\n'));
  await promisify(exec)(`prettier --write ${OUTPUT_ASTRO_COMPONENT}`);
}

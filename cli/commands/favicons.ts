import { join } from 'node:path';

import type { FaviconFile, FaviconImage } from 'favicons';
import { favicons } from 'favicons';
import { writeFile } from 'fs/promises';

import data from '../../favicons.data.json';
import { ensureCleanDirExists, log } from '../helpers';

const OUTPUT_ASSETS_DIR = 'public/generated/favicons';
const OUTPUT_ASTRO_DIR = 'src/web/components/metadata/generated';
const OUTPUT_ASTRO_FILE = 'favicons.astro';

export async function faviconsCommand() {
  const { images, files, html } = await generateFavicons();

  await ensureCleanDirExists(OUTPUT_ASSETS_DIR);
  await ensureCleanDirExists(OUTPUT_ASTRO_DIR);

  await Promise.all([...images, ...files].map(saveFile));

  await generateAstroFile(html);

  log.success('Favicons generated successfully');
  process.exit(0);
}

async function generateFavicons() {
  return favicons(data.baseImage, {
    path: OUTPUT_ASSETS_DIR.replace('public', ''),
    appName: data.appName,
    appDescription: data.appDescription,
    appShortName: data.appShortName,
    lang: data.lang,
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

async function saveFile(file: FaviconFile | FaviconImage) {
  log.info(`Creating ${file.name} file...`);

  await writeFile(`${OUTPUT_ASSETS_DIR}/${file.name}`, file.contents);
}

async function generateAstroFile(html: string[]) {
  log.info(`Creating ${OUTPUT_ASTRO_FILE} file...`);

  const topComment = `
<!--
  This file is auto-generated. Do not edit it manually.
  In order to apply changes to it, adjust configuration object in scripts/generate-favicons.ts script and run it
-->
`.trim();

  const astroFilePath = join(OUTPUT_ASTRO_DIR, OUTPUT_ASTRO_FILE);

  await writeFile(astroFilePath, [topComment, ...html].join('\n'));
}

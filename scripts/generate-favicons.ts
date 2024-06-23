import { exec } from 'node:child_process';
import { promisify } from 'node:util';

import chalk from 'chalk';
import type { FaviconFile, FaviconImage } from 'favicons';
import { favicons } from 'favicons';
import { existsSync } from 'fs';
import { mkdir, rm, writeFile } from 'fs/promises';

const FAVICON_SOURCE = 'src/assets/me.jpg';
const PUBLIC_FAVICONS_PATH = 'public/favicons';
const ASTRO_FAVICONS_FILE_PATH = 'src/web/components/metadata/generated-favicons.astro';

await main();

async function main() {
  const { images, files, html } = await generateFavicons();

  await prepareDir();

  await Promise.all([...images, ...files].map(saveFile));

  await generateAstroFile(html);

  console.log(chalk.green(`[SUCCESS] Favicons generated successfully`));
}

async function generateFavicons() {
  return favicons(FAVICON_SOURCE, {
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
  if (existsSync(PUBLIC_FAVICONS_PATH)) {
    await rm(PUBLIC_FAVICONS_PATH, { recursive: true, force: true });
  }

  await mkdir(PUBLIC_FAVICONS_PATH);
}

async function saveFile(file: FaviconFile | FaviconImage) {
  console.log(chalk.blue(`[INFO] Creating ${file.name} file...`));

  await writeFile(`${PUBLIC_FAVICONS_PATH}/${file.name}`, file.contents);
}

async function generateAstroFile(html: string[]) {
  console.log(chalk.blue(`[INFO] Creating ${ASTRO_FAVICONS_FILE_PATH.split('/').pop()} file...`));

  const topComment = `
<!--
  This file is auto-generated. Do not edit it manually.
  In order to apply changes to it, adjust configuration object in scripts/generate-favicons.ts script and run it
-->
`.trim();

  await writeFile(ASTRO_FAVICONS_FILE_PATH, [topComment, ...html].join('\n'));
  await promisify(exec)(`prettier --write ${ASTRO_FAVICONS_FILE_PATH}`);
}

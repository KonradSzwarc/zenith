import chalk from 'chalk';
import { existsSync } from 'fs';
import { readdir } from 'fs/promises';
import { mkdir } from 'fs/promises';
import puppeteer, { Page } from 'puppeteer';

const LOCAL_OG_URL = 'http://localhost:4321/og';
const PUBLIC_OG_PATH = 'public/og';
const ASTRO_OG_SITES_PATH = 'src/pages/og';

await main();

async function main() {
  await ensureServerIsRunning();
  await ensureOutputDirExists();

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const [name] = process.argv.slice(2);

  if (name) {
    await generateOg(name, page);
  } else {
    await forAllOgPages((name) => generateOg(name, page));
  }

  await browser.close();

  console.log(chalk.green(`[SUCCESS] Open Graphs generated successfully`));
}

async function generateOg(name: string, page: Page) {
  console.log(chalk.blue(`[INFO] Generating Open Graph for ${name}...`));

  const url = `${LOCAL_OG_URL}/${name.replace('index', '')}`;

  if (!(await doesPageExist(url))) {
    console.warn(chalk.yellow(`[WARNING] Page ${url} does not exist. Skipping...`));
    return;
  }

  await page.goto(url, { waitUntil: 'networkidle0' });
  await removeAstroToolbar(page);

  await page.screenshot({
    path: `${PUBLIC_OG_PATH}/${name}.png`,
    clip: { x: 0, y: 0, width: 1200, height: 630 },
  });
}

async function forAllOgPages(callback: (name: string) => Promise<void>) {
  for (const file of await readdir(ASTRO_OG_SITES_PATH)) {
    if (file.endsWith('.astro')) {
      await callback(file.replace('.astro', ''));
    }
  }
}

async function doesPageExist(url: string) {
  const response = await fetch(url);

  return response.ok;
}

async function ensureServerIsRunning() {
  try {
    await fetch(LOCAL_OG_URL);
  } catch {
    console.error(chalk.red('[ERROR] Server is not running. Invoke `npm run dev` in another terminal and try again.'));
    process.exit(1);
  }
}

async function ensureOutputDirExists() {
  if (!existsSync(PUBLIC_OG_PATH)) {
    await mkdir(PUBLIC_OG_PATH);
  }
}

async function removeAstroToolbar(page: Page) {
  await page.evaluate(() => document.querySelector('astro-dev-toolbar')?.remove());
}

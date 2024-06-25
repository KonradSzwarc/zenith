import chalk from 'chalk';
import { existsSync } from 'fs';
import { mkdir, readdir } from 'fs/promises';
import puppeteer, { Page } from 'puppeteer';

export const log = {
  info: (message: string) => console.log(chalk.blue(`[INFO] ${message}`)),
  success: (message: string) => console.log(chalk.green(`[SUCCESS] ${message}`)),
  warn: (message: string) => console.log(chalk.yellow(`[WARNING] ${message}`)),
  error: (message: string) => console.error(chalk.red(`[ERROR] ${message}`)),
};

export async function ensureServerIsRunning(url: string) {
  try {
    await fetch(url);
  } catch {
    log.error('Server is not running. Invoke `npm run dev` in another terminal and try again.');
    process.exit(1);
  }
}

export async function ensureDirExists(dir: string) {
  if (!existsSync(dir)) {
    await mkdir(dir);
  }
}

export async function runBrowser(cb: (page: Page) => Promise<void>) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await cb(page);

  await browser.close();
}

export async function forAllPages(path: string, callback: (name: string) => Promise<void>) {
  for (const file of await readdir(path)) {
    if (file.endsWith('.astro')) {
      await callback(file.replace('.astro', ''));
    }
  }
}

export async function visitPage(baseUrl: string, name: string, page: Page) {
  const url = `${baseUrl}/${name.replace('index', '')}`;

  if (!(await doesPageExist(url))) {
    log.warn(`Page ${url} does not exist. Skipping...`);
    return;
  }

  await page.goto(url, { waitUntil: 'networkidle0' });
  await removeAstroToolbar(page);
}

async function doesPageExist(url: string) {
  const response = await fetch(url);

  return response.ok;
}

async function removeAstroToolbar(page: Page) {
  await page.evaluate(() => document.querySelector('astro-dev-toolbar')?.remove());
}

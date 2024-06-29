import chalk from 'chalk';
import { execa } from 'execa';
import { existsSync } from 'fs';
import { mkdir, readdir, rm } from 'fs/promises';
import puppeteer, { Page } from 'puppeteer';

import { SERVER_URL } from './constants';

export function exec(command: string) {
  return execa(command, { shell: true, stdio: ['ignore', 'inherit', 'inherit'] });
}

export const log = {
  info: (message: string) => console.log(chalk.blue(`[INFO] ${message}`)),
  success: (message: string) => console.log(chalk.green(`[SUCCESS] ${message}`)),
  warn: (message: string) => console.log(chalk.yellow(`[WARNING] ${message}`)),
  error: (message: string) => console.error(chalk.red(`[ERROR] ${message}`)),
};

export async function ensureCleanDirExists(dir: string) {
  if (existsSync(dir)) {
    await rm(dir, { recursive: true, force: true });
  }

  await mkdir(dir, { recursive: true });
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

export async function withLocalServer(cb: () => Promise<void>) {
  if (await isServerRunning()) return cb();

  const server = exec('npm run dev');

  try {
    await waitForServer();
    await cb();
  } finally {
    server.kill();
  }
}

async function isServerRunning() {
  try {
    await fetch(SERVER_URL);
    return true;
  } catch {
    return false;
  }
}

async function waitForServer() {
  let attempts = 10;

  while (!(await isServerRunning())) {
    if (attempts === 0) {
      log.error('Cannot start the server. Exiting...');
      process.exit(1);
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
    attempts -= 1;
  }
}

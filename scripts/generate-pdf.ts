import chalk from 'chalk';
import { readdir } from 'fs/promises';
import puppeteer, { Page } from 'puppeteer';

const LOCAL_PDF_URL = 'http://localhost:4321/pdf';
const PUBLIC_PDF_PATH = 'public/pdf';
const ASTRO_PDF_SITES_PATH = 'src/pages/pdf';

await main();

async function main() {
  await ensureServerIsRunning();

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const [name] = process.argv.slice(2);

  if (name) {
    await generatePagePdf(name, page);
  } else {
    await forAllPdfPages((name) => generatePagePdf(name, page));
  }

  await browser.close();
}

async function generatePagePdf(name: string, page: Page) {
  console.log(chalk.blue(`[INFO] Generating PDF for ${name}...`));

  const url = `${LOCAL_PDF_URL}/${name.replace('index', '')}`;

  if (!(await doesPageExist(url))) {
    console.warn(chalk.yellow(`[WARNING] Page ${url} does not exist. Skipping...`));
    return;
  }

  await page.goto(url, { waitUntil: 'networkidle0' });

  await page.pdf({
    path: `${PUBLIC_PDF_PATH}/${name}.pdf`,
    format: 'A4',
    printBackground: true,
    margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' },
  });
}

async function forAllPdfPages(callback: (name: string) => Promise<void>) {
  for (const file of await readdir(ASTRO_PDF_SITES_PATH)) {
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
    await fetch(LOCAL_PDF_URL);
  } catch {
    console.error(
      chalk.red('[ERROR] Server is not running. Invoke `npm run dev:pdf` in another terminal and try again.'),
    );
    process.exit(1);
  }
}

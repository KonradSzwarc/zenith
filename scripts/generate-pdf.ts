import type { Page } from 'puppeteer';

import { ensureCleanDirExists, ensureServerIsRunning, forAllPages, log, runBrowser, visitPage } from './script-helpers';

const INPUT_URL = 'http://localhost:4321/pdf';
const INPUT_PATH = 'src/pages/pdf';
const OUTPUT_PATH = 'public/generated/pdf';

await main();

async function main() {
  await ensureServerIsRunning(INPUT_URL);
  await ensureCleanDirExists(OUTPUT_PATH);

  await runBrowser(async (page) => {
    const [name] = process.argv.slice(2);

    if (name) {
      await generatePdf(name, page);
    } else {
      await forAllPages(INPUT_PATH, (name) => generatePdf(name, page));
    }
  });

  log.success(`PDFs generated successfully`);
  process.exit(0);
}

async function generatePdf(name: string, page: Page) {
  log.info(`Generating PDF for ${name}...`);

  await visitPage(INPUT_URL, name, page);

  await page.pdf({
    path: `${OUTPUT_PATH}/${name}.pdf`,
    format: 'A4',
    printBackground: true,
  });
}

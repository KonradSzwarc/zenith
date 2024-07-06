import type { Page } from 'puppeteer';

import { SERVER_URL } from '../constants';
import { assertServerIsRunning, ensureCleanDirExists, forAllPages, log, runBrowser, visitPage } from '../helpers';

const INPUT_URL = `${SERVER_URL}/pdf`;
const INPUT_PATH = 'src/pages/pdf';
const OUTPUT_PATH = 'public/generated/pdf';

export async function pdfCommand(name?: string) {
  await assertServerIsRunning();
  await ensureCleanDirExists(OUTPUT_PATH);

  await runBrowser(async (page) => {
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

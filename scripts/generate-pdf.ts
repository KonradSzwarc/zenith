import type { Page } from 'puppeteer';

import { ensureDirExists, ensureServerIsRunning, forAllPages, log, runBrowser, visitPage } from './script-helpers';

const INPUT_URL = 'http://localhost:4321/pdf';
const INPUT_PATH = 'src/pages/pdf';
const OUTPUT_PATH = 'public/generated/pdf';

await main();

async function main() {
  await ensureServerIsRunning(INPUT_URL);
  await ensureDirExists(OUTPUT_PATH);

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

  const footer = await getFooter(page);
  const { margin } = await getPdfConfig(page);

  await page.pdf({
    path: `${OUTPUT_PATH}/${name}.pdf`,
    format: 'A4',
    printBackground: true,
    margin,
    displayHeaderFooter: Boolean(footer),
    footerTemplate: footer,
    headerTemplate: '<div></div>',
  });
}

function getFooter(page: Page) {
  return page.evaluate(() => {
    const footer = document.getElementById('footer');

    if (!footer) {
      return undefined;
    }

    // Casting required as some style properties (e.g. webkitPrintColorAdjust) are not recognized by TypeScript.
    const footerStyle = footer.style as unknown as Record<string, unknown>;
    const inlineStyles = JSON.parse(JSON.stringify(getComputedStyle(footer))) as object;

    for (const [property, value] of Object.entries(inlineStyles)) {
      footerStyle[property] = value;
    }

    footerStyle.margin = '0 auto';
    footerStyle.webkitPrintColorAdjust = 'exact';

    footer.removeAttribute('class');
    const footerHtml = footer.outerHTML;
    footer?.remove();

    return footerHtml;
  });
}

async function getPdfConfig(page: Page) {
  const margin = await page.evaluate(() => {
    return {
      top: document.querySelector('meta[name="pdf-margin-top"]')?.getAttribute('content') ?? undefined,
      right: document.querySelector('meta[name="pdf-margin-right"]')?.getAttribute('content') ?? undefined,
      bottom: document.querySelector('meta[name="pdf-margin-bottom"]')?.getAttribute('content') ?? undefined,
      left: document.querySelector('meta[name="pdf-margin-left"]')?.getAttribute('content') ?? undefined,
    };
  });

  return { margin };
}

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
    await generatePdf(name, page);
  } else {
    await forAllPdfPages((name) => generatePdf(name, page));
  }

  await browser.close();

  console.log(chalk.green(`[SUCCESS] PDFs generated successfully`));
}

async function generatePdf(name: string, page: Page) {
  console.log(chalk.blue(`[INFO] Generating PDF for ${name}...`));

  const url = `${LOCAL_PDF_URL}/${name.replace('index', '')}`;

  if (!(await doesPageExist(url))) {
    console.warn(chalk.yellow(`[WARNING] Page ${url} does not exist. Skipping...`));
    return;
  }

  await page.goto(url, { waitUntil: 'networkidle0' });
  await removeAstroToolbar(page);

  const footer = await getFooter(page);
  const { margin } = await getPdfConfig(page);

  await page.pdf({
    path: `${PUBLIC_PDF_PATH}/${name}.pdf`,
    format: 'A4',
    printBackground: true,
    margin,
    displayHeaderFooter: Boolean(footer),
    footerTemplate: footer,
    headerTemplate: '<div></div>',
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
    console.error(chalk.red('[ERROR] Server is not running. Invoke `npm run dev` in another terminal and try again.'));
    process.exit(1);
  }
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

async function removeAstroToolbar(page: Page) {
  await page.evaluate(() => document.querySelector('astro-dev-toolbar')?.remove());
}

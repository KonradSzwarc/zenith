import type { Page } from 'puppeteer';

import { ensureCleanDirExists, ensureServerIsRunning, forAllPages, log, runBrowser, visitPage } from './script-helpers';

const INPUT_URL = 'http://localhost:4321/og';
const INPUT_PATH = 'src/pages/og';
const OUTPUT_PATH = 'public/generated/og';

await main();

async function main() {
  await ensureServerIsRunning(INPUT_URL);
  await ensureCleanDirExists(OUTPUT_PATH);

  await runBrowser(async (page) => {
    const [name] = process.argv.slice(2);

    if (name) {
      await generateOpenGraph(name, page);
    } else {
      await forAllPages(INPUT_PATH, (name) => generateOpenGraph(name, page));
    }
  });

  log.success(`Open Graphs generated successfully`);
  process.exit(0);
}

async function generateOpenGraph(name: string, page: Page) {
  log.info(`Generating Open Graph for ${name}...`);

  await visitPage(INPUT_URL, name, page);

  await page.screenshot({
    path: `${OUTPUT_PATH}/${name}.png`,
    clip: { x: 0, y: 0, width: 1200, height: 630 },
  });
}

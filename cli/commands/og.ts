import type { Page } from 'puppeteer';

import { SERVER_URL } from '../constants';
import { assertServerIsRunning, ensureCleanDirExists, forAllPages, log, runBrowser, visitPage } from '../helpers';

const INPUT_URL = `${SERVER_URL}/og`;
const INPUT_PATH = 'src/pages/og';
const OUTPUT_PATH = 'public/generated/og';

export async function ogCommand(name?: string) {
  await assertServerIsRunning();
  await ensureCleanDirExists(OUTPUT_PATH);

  await runBrowser(async (page) => {
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

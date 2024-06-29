import { exec, log, withLocalServer } from '../helpers';

export async function buildCommand() {
  // Netlify caching mechanism causes chromium used by puppeteer not to work properly.
  if (process.env.NETLIFY) {
    await reinstallPuppeteer();
  }

  await withLocalServer(async () => {
    await exec('npm run generate');
  });

  await exec('astro build');
}

async function reinstallPuppeteer() {
  log.info('Reinstalling puppeteer...');

  await exec('npm rm puppeteer --no-save');
  await exec('npm add --no-save');

  log.success('Puppeteer reinstalled successfully');
}

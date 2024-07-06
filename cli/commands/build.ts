import { exec, execWithLocalServer, log } from '../helpers';

export async function buildCommand() {
  // Netlify caching mechanism causes chromium used by puppeteer not to work properly.
  if (process.env.NETLIFY) {
    await reinstallPuppeteer();
  }

  await execWithLocalServer('npm run generate');

  await exec('astro build');
  process.exit(0);
}

async function reinstallPuppeteer() {
  log.info('Reinstalling puppeteer...');

  await exec('npm rm puppeteer --no-save');
  await exec('npm add --no-save');

  log.success('Puppeteer reinstalled successfully');
}

import { spawnSync } from 'node:child_process';

import { log } from './script-helpers';

// Netlify caching mechanism causes chromium used by puppeteer not to work properly.
if (process.env.NETLIFY) {
  log.info('Reinstalling puppeteer...');

  spawnSync('npm', ['rm', 'puppeteer', '--no-save'], { stdio: 'inherit' });
  spawnSync('npm', ['add', '--no-save'], { stdio: 'inherit' });

  log.success('Puppeteer reinstalled successfully');
}

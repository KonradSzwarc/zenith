import { assertServerIsRunning, exec } from '../helpers';

export async function generateCommand() {
  assertServerIsRunning();

  await exec('concurrently "npm:generate:*(!watch)" -c red,yellow,blue');

  process.exit(0);
}

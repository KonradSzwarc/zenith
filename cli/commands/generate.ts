import { exec, withLocalServer } from '../helpers';

export async function generateCommand() {
  await withLocalServer(async () => {
    await exec('concurrently "npm:generate:*(!watch)" -c red,yellow,blue');
  });
}

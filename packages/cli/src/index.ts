import { run } from './lib/cli';

export { run };
export { addCommand } from './lib/add';
export { initCommand } from './lib/init';

void run(process.argv.slice(2)).catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exitCode = 1;
});

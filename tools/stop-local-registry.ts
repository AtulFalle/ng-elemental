/**
 * Stops Verdaccio after e2e. Used as Vitest globalTeardown.
 */
import { execSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { findRepoRoot } from './repo-root';

const registryUrlFile = join(findRepoRoot(), 'tmp/local-registry/registry-url.txt');

export default (): void => {
  globalThis.stopLocalRegistry?.();
  killLocalRegistryPort();
};

function killLocalRegistryPort(): void {
  let port = 4873;
  if (existsSync(registryUrlFile)) {
    const match = readFileSync(registryUrlFile, 'utf8').trim().match(/:(\d+)/);
    if (match?.[1]) {
      port = Number(match[1]);
    }
  }

  if (process.platform === 'win32') {
    try {
      const out = execSync(`netstat -ano | findstr :${port}`, { encoding: 'utf8' });
      const pids = new Set(
        out
          .split(/\r?\n/)
          .map((line) => line.trim().split(/\s+/).pop())
          .filter((pid): pid is string => typeof pid === 'string' && /^\d+$/.test(pid) && pid !== '0'),
      );
      for (const pid of pids) {
        try {
          execSync(`taskkill /PID ${pid} /T /F`, { stdio: 'ignore' });
        } catch {
          // process already exited
        }
      }
    } catch {
      // nothing listening
    }
    return;
  }

  try {
    execSync(`fuser -k ${port}/tcp`, { stdio: 'ignore' });
  } catch {
    try {
      const pids = execSync(`lsof -ti:${port}`, { encoding: 'utf8' }).trim();
      if (pids) {
        execSync(`kill -9 ${pids.split('\n').join(' ')}`, { stdio: 'ignore' });
      }
    } catch {
      // nothing listening
    }
  }
}

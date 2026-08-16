/**
 * Starts Verdaccio and publishes workspace release packages (cli and mcp) for e2e.
 * Used as Vitest globalSetup.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { startLocalRegistry } from '@nx/js/plugins/jest/local-registry';
import { releasePublish, releaseVersion } from 'nx/release';
import { findRepoRoot } from './repo-root';

const repoRoot = findRepoRoot();
const storage = join(repoRoot, 'tmp/local-registry/storage');
const registryUrlFile = join(repoRoot, 'tmp/local-registry/registry-url.txt');

export default async (): Promise<void> => {
  globalThis.stopLocalRegistry = await startLocalRegistry({
    localRegistryTarget: 'ng-elemental:local-registry',
    storage,
    verbose: false,
    clearStorage: true,
  });

  const registry = process.env['npm_config_registry'];
  if (!registry) {
    globalThis.stopLocalRegistry?.();
    throw new Error('Local registry did not set npm_config_registry');
  }

  mkdirSync(dirname(registryUrlFile), { recursive: true });
  writeFileSync(registryUrlFile, registry, 'utf8');

  await releaseVersion({
    specifier: '0.0.0-e2e',
    stageChanges: false,
    gitCommit: false,
    gitTag: false,
    firstRelease: true,
    versionActionsOptionsOverrides: {
      skipLockFileUpdate: true,
    },
  });

  const publishStatus = await releasePublish({
    tag: 'e2e',
    firstRelease: true,
    registry,
  });

  const failed = Object.values(publishStatus).some((result) => result.code !== 0);
  if (failed) {
    globalThis.stopLocalRegistry?.();
    throw new Error(
      'Failed to publish workspace release packages (cli and mcp) to the local registry',
    );
  }
};

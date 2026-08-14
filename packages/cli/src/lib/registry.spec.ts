import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  validateBuiltRegistry,
  validateProjectJsonRegistryAssets,
} from './registry-validation';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '../../../..');
const builtRegistryRoot = join(repoRoot, 'dist/packages/cli/registry');
const projectJsonPath = join(repoRoot, 'packages/cli/project.json');

describe('CLI component registry', () => {
  it('keeps project.json registry assets in sync with the manifest', () => {
    const errors = validateProjectJsonRegistryAssets(projectJsonPath);
    expect(errors, errors.join('\n')).toEqual([]);
  });

  it('ships a valid built registry after cli:build (no stories, required files present)', () => {
    const errors = validateBuiltRegistry(builtRegistryRoot);
    expect(errors, errors.join('\n')).toEqual([]);
  });
});

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  COMPONENT_REGISTRY,
  isRegistryFilenameAllowed,
  REGISTRY_GLOB_MUST_NOT_CONTAIN,
  type ComponentRegistryEntry,
} from './component-registry';

export interface RegistryAsset {
  glob: string;
  input: string;
  output: string;
}

export function validateBuiltRegistry(registryRoot: string): string[] {
  const errors: string[] = [];

  if (!existsSync(registryRoot)) {
    return [`Registry root does not exist: ${registryRoot}`];
  }

  for (const entry of COMPONENT_REGISTRY) {
    errors.push(...validateRegistryEntry(registryRoot, entry));
  }

  return errors;
}

function validateRegistryEntry(
  registryRoot: string,
  entry: ComponentRegistryEntry,
): string[] {
  const errors: string[] = [];
  const componentDir = join(registryRoot, entry.name);

  if (!existsSync(componentDir)) {
    errors.push(`Missing registry directory: registry/${entry.name}`);
    return errors;
  }

  const files = readdirSync(componentDir, { withFileTypes: true })
    .filter((dirent) => dirent.isFile())
    .map((dirent) => dirent.name);

  for (const file of files) {
    if (!isRegistryFilenameAllowed(file)) {
      errors.push(
        `Forbidden file in registry/${entry.name}: ${file} (stories and story hosts must not ship)`,
      );
    }
  }

  for (const basename of entry.requiredBasenames) {
    if (!files.includes(`${basename}.ts`)) {
      errors.push(`Missing registry/${entry.name}/${basename}.ts`);
    }
  }

  return errors;
}

export function extractRegistryAssetsFromProjectJson(
  projectJsonPath: string,
): RegistryAsset[] {
  const projectJson = JSON.parse(readFileSync(projectJsonPath, 'utf8')) as {
    targets?: {
      build?: {
        options?: {
          assets?: RegistryAsset[];
        };
      };
    };
  };

  const assets = projectJson.targets?.build?.options?.assets ?? [];
  return assets.filter((asset) => asset.output.startsWith('registry/'));
}

export function validateProjectJsonRegistryAssets(
  projectJsonPath: string,
): string[] {
  const errors: string[] = [];
  const assets = extractRegistryAssetsFromProjectJson(projectJsonPath);

  for (const entry of COMPONENT_REGISTRY) {
    const expectedInput = `packages/ui/src/lib/${entry.name}`;
    const expectedOutput = `registry/${entry.name}`;

    for (const glob of entry.assetGlobs) {
      const matched = assets.some(
        (asset) =>
          asset.glob === glob &&
          asset.input === expectedInput &&
          asset.output === expectedOutput,
      );

      if (!matched) {
        errors.push(
          `packages/cli/project.json is missing registry asset for "${entry.name}": glob "${glob}" → ${expectedOutput}`,
        );
      }
    }

    const componentAssets = assets.filter((asset) => asset.output === expectedOutput);
    for (const asset of componentAssets) {
      if (asset.glob.includes(REGISTRY_GLOB_MUST_NOT_CONTAIN)) {
        errors.push(
          `packages/cli/project.json uses a wildcard registry glob for "${entry.name}": "${asset.glob}". Use explicit globs instead.`,
        );
      }
    }
  }

  return errors;
}

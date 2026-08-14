/** Filename fragments that must never ship in the CLI registry or consumer copies. */
export const REGISTRY_FORBIDDEN_FILENAME_PARTS = [
  '.stories.',
  '.story-host.',
] as const;

export interface ComponentRegistryEntry {
  /** CLI component id (folder name under registry/). */
  readonly name: string;
  /**
   * Explicit nx/esbuild asset globs for packages/cli/project.json.
   * Do not use `*` wildcards — they can accidentally include story files.
   */
  readonly assetGlobs: readonly string[];
  /** File basenames that must exist in the built registry (e.g. "button", "segmented-button-item"). */
  readonly requiredBasenames: readonly string[];
}

/**
 * Single source of truth for CLI registry components.
 * When adding a component, update this list and matching project.json assets.
 */
export const COMPONENT_REGISTRY = [
  {
    name: 'button',
    assetGlobs: ['button.{ts,html,scss}'],
    requiredBasenames: ['button'],
  },
  {
    name: 'label',
    assetGlobs: ['label.{ts,html,scss}'],
    requiredBasenames: ['label'],
  },
  {
    name: 'segmented-button',
    assetGlobs: [
      'segmented-button.{ts,html,scss}',
      'segmented-button-item.{ts,html,scss}',
      'segmented-button.token.ts',
    ],
    requiredBasenames: [
      'segmented-button',
      'segmented-button-item',
      'segmented-button.token',
    ],
  },
] as const satisfies readonly ComponentRegistryEntry[];

export type AvailableComponent = (typeof COMPONENT_REGISTRY)[number]['name'];

export const AVAILABLE_COMPONENTS: AvailableComponent[] = COMPONENT_REGISTRY.map(
  (entry) => entry.name,
);

/** Registry asset globs must be explicit — never use `*`. */
export const REGISTRY_GLOB_MUST_NOT_CONTAIN = '*';

export function isRegistryFilenameAllowed(filename: string): boolean {
  return !REGISTRY_FORBIDDEN_FILENAME_PARTS.some((part) => filename.includes(part));
}

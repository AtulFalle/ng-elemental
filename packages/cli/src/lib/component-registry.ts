/** Filename fragments that must never ship in the CLI registry or consumer copies. */
export const REGISTRY_FORBIDDEN_FILENAME_PARTS = [
  '.stories.',
  '.story-host.',
] as const;

export interface ComponentRegistryEntry {
  /** CLI component id (folder name under registry/). */
  readonly name: string;
  /** Source directory relative to repo root. Defaults to packages/ui/src/lib/<name>. */
  readonly sourceDir?: string;
  /**
   * Explicit nx/esbuild asset globs for packages/cli/project.json.
   * Do not use `*` wildcards — they can accidentally include story files.
   */
  readonly assetGlobs: readonly string[];
  /** TypeScript file basenames that must exist in the built registry (e.g. "button"). */
  readonly requiredBasenames: readonly string[];
  /** Additional required files with extensions (e.g. "tokens.scss"). */
  readonly requiredFiles?: readonly string[];
}

/**
 * Single source of truth for CLI registry components.
 * When adding a component, update this list and matching project.json assets.
 */
export const COMPONENT_REGISTRY = [
  {
    name: 'icon',
    assetGlobs: ['icon.{ts,scss}', 'fontawesome.scss'],
    requiredBasenames: ['icon'],
    requiredFiles: ['fontawesome.scss'],
  },
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
    name: 'form-error',
    assetGlobs: ['form-error.{ts,html,scss}'],
    requiredBasenames: ['form-error'],
  },
  {
    name: 'input',
    assetGlobs: ['input.{ts,html,scss}'],
    requiredBasenames: ['input'],
  },
  {
    name: 'checkbox',
    assetGlobs: ['checkbox.{ts,html,scss}'],
    requiredBasenames: ['checkbox'],
  },
  {
    name: 'slide-toggle',
    assetGlobs: ['slide-toggle.{ts,html,scss}'],
    requiredBasenames: ['slide-toggle'],
  },
  {
    name: 'radio',
    assetGlobs: [
      'radio.{ts,html,scss}',
      'radio-group.{ts,html,scss}',
      'radio.token.ts',
    ],
    requiredBasenames: ['radio', 'radio-group', 'radio.token'],
  },
  {
    name: 'select',
    assetGlobs: [
      'select.{ts,html,scss}',
      'select-item.{ts,html,scss}',
      'select-group.{ts,html,scss}',
      'select-value.ts',
      'select.token.ts',
    ],
    requiredBasenames: [
      'select',
      'select-item',
      'select-group',
      'select-value',
      'select.token',
    ],
  },
  {
    name: 'chip',
    assetGlobs: ['chip.{ts,html,scss}'],
    requiredBasenames: ['chip'],
  },
  {
    name: 'progress',
    assetGlobs: [
      'progress.{ts,html,scss}',
      'progress-circle.{ts,html,scss}',
      'progress-utils.ts',
    ],
    requiredBasenames: ['progress', 'progress-circle', 'progress-utils'],
  },
  {
    name: 'slider',
    assetGlobs: ['slider.{ts,html,scss}', 'slider-utils.ts'],
    requiredBasenames: ['slider', 'slider-utils'],
  },
  {
    name: 'avatar',
    assetGlobs: ['avatar.{ts,html,scss}'],
    requiredBasenames: ['avatar'],
  },
  {
    name: 'card',
    assetGlobs: ['card.{ts,html,scss}'],
    requiredBasenames: ['card'],
  },
  {
    name: 'attachment',
    assetGlobs: [
      'attachment.{ts,html,scss}',
      'attachment-media.{ts,html,scss}',
      'attachment-content.{ts,html,scss}',
      'attachment-title.{ts,html,scss}',
      'attachment-description.{ts,html,scss}',
      'attachment-actions.{ts,html,scss}',
      'attachment-action.{ts,html,scss}',
      'attachment-group.{ts,html,scss}',
      'attachment.token.ts',
    ],
    requiredBasenames: [
      'attachment',
      'attachment-media',
      'attachment-content',
      'attachment-title',
      'attachment-description',
      'attachment-actions',
      'attachment-action',
      'attachment-group',
      'attachment.token',
    ],
  },
  {
    name: 'file-upload',
    assetGlobs: [
      'file-upload.{ts,html,scss}',
      'file-upload-utils.ts',
    ],
    requiredBasenames: ['file-upload', 'file-upload-utils'],
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
  {
    name: 'datepicker',
    assetGlobs: [
      'date.ts',
      'calendar.{ts,html,scss}',
      'clock.{ts,html,scss}',
      'date-fields.{ts,html,scss}',
      'date-picker.{ts,html,scss}',
      'date-range-picker.{ts,html,scss}',
    ],
    requiredBasenames: [
      'date',
      'calendar',
      'clock',
      'date-fields',
      'date-picker',
      'date-range-picker',
    ],
  },
  {
    name: 'theme',
    sourceDir: 'packages/ui/src/lib/theme',
    assetGlobs: [
      'theme.ts',
      'theme.token.ts',
      'tokens.scss',
      'fonts.scss',
      'geist-latin-wght-normal.woff2',
      'geist-mono-latin-wght-normal.woff2',
    ],
    requiredBasenames: ['theme', 'theme.token'],
    requiredFiles: [
      'tokens.scss',
      'fonts.scss',
      'geist-latin-wght-normal.woff2',
      'geist-mono-latin-wght-normal.woff2',
    ],
  },
] as const satisfies readonly ComponentRegistryEntry[];

export type AvailableComponent = (typeof COMPONENT_REGISTRY)[number]['name'];

export const AVAILABLE_COMPONENTS: AvailableComponent[] = COMPONENT_REGISTRY.map(
  (entry) => entry.name,
);

/** Registry asset globs must be explicit — never use `*`. */
export const REGISTRY_GLOB_MUST_NOT_CONTAIN = '*';

export function getComponentSourceDir(entry: ComponentRegistryEntry): string {
  return entry.sourceDir ?? `packages/ui/src/lib/${entry.name}`;
}

export function isRegistryFilenameAllowed(filename: string): boolean {
  return !REGISTRY_FORBIDDEN_FILENAME_PARTS.some((part) => filename.includes(part));
}

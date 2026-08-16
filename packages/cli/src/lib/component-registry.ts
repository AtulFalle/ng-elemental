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
    name: 'carousel',
    assetGlobs: [
      'carousel.{ts,html,scss}',
      'carousel-slide.{ts,html,scss}',
      'carousel.token.ts',
      'carousel-utils.ts',
    ],
    requiredBasenames: [
      'carousel',
      'carousel-slide',
      'carousel.token',
      'carousel-utils',
    ],
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
    name: 'container',
    assetGlobs: ['container.{ts,html,scss}'],
    requiredBasenames: ['container'],
  },
  {
    name: 'stack',
    assetGlobs: ['stack.{ts,html,scss}'],
    requiredBasenames: ['stack'],
  },
  {
    name: 'grid',
    assetGlobs: ['grid.{ts,html,scss}'],
    requiredBasenames: ['grid'],
  },
  {
    name: 'aspect-ratio',
    assetGlobs: ['aspect-ratio.{ts,html,scss}'],
    requiredBasenames: ['aspect-ratio'],
  },
  {
    name: 'scroll-area',
    assetGlobs: ['scroll-area.{ts,html,scss}'],
    requiredBasenames: ['scroll-area'],
  },
  {
    name: 'separator',
    assetGlobs: ['separator.{ts,scss}'],
    requiredBasenames: ['separator'],
  },
  {
    name: 'resizable',
    assetGlobs: [
      'resizable.{ts,html,scss}',
      'resizable-panel.{ts,html,scss}',
      'resizable-handle.{ts,html,scss}',
      'resizable.token.ts',
      'resizable-utils.ts',
    ],
    requiredBasenames: [
      'resizable',
      'resizable-panel',
      'resizable-handle',
      'resizable.token',
      'resizable-utils',
    ],
  },
  {
    name: 'list',
    assetGlobs: [
      'list.{ts,html,scss}',
      'list-item.{ts,html,scss}',
      'list-item-def.ts',
      'list-virtual.ts',
    ],
    requiredBasenames: ['list', 'list-item', 'list-item-def', 'list-virtual'],
  },
  {
    name: 'tree',
    assetGlobs: [
      'tree.{ts,html,scss}',
      'tree-item.{ts,html,scss}',
      'tree-node-def.ts',
      'tree.token.ts',
      'tree-utils.ts',
      'tree-virtual.ts',
    ],
    requiredBasenames: [
      'tree',
      'tree-item',
      'tree-node-def',
      'tree.token',
      'tree-utils',
      'tree-virtual',
    ],
  },
  {
    name: 'infinite-scroll',
    assetGlobs: ['infinite-scroll.ts'],
    requiredBasenames: ['infinite-scroll'],
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
    name: 'table',
    assetGlobs: [
      'table.{ts,html,scss}',
      'table-column.ts',
      'table-header.ts',
      'table-cell-def.ts',
      'table-expand.ts',
      'table-virtual.ts',
      'table.token.ts',
    ],
    requiredBasenames: [
      'table',
      'table-column',
      'table-header',
      'table-cell-def',
      'table-expand',
      'table-virtual',
      'table.token',
    ],
  },
  {
    name: 'pagination',
    assetGlobs: ['pagination.{ts,html,scss}', 'pagination-utils.ts'],
    requiredBasenames: ['pagination', 'pagination-utils'],
  },
  {
    name: 'skeleton',
    assetGlobs: [
      'skeleton.{ts,html,scss}',
      'skeleton-cover.{ts,scss}',
      'skeleton-target.ts',
    ],
    requiredBasenames: ['skeleton', 'skeleton-cover', 'skeleton-target'],
  },
  {
    name: 'breadcrumb',
    assetGlobs: [
      'breadcrumb.{ts,html,scss}',
      'breadcrumb-item.{ts,html,scss}',
    ],
    requiredBasenames: ['breadcrumb', 'breadcrumb-item'],
  },
  {
    name: 'tooltip',
    assetGlobs: ['tooltip.ts', 'tooltip-bubble.{ts,html,scss}'],
    requiredBasenames: ['tooltip', 'tooltip-bubble'],
  },
  {
    name: 'menu',
    assetGlobs: [
      'menu.{ts,html,scss}',
      'menu-trigger.ts',
      'menu-panel.{ts,html,scss}',
      'menu-item.{ts,html,scss}',
      'menu-separator.ts',
      'menu-label.ts',
      'menu-position.ts',
      'menu.token.ts',
    ],
    requiredBasenames: [
      'menu',
      'menu-trigger',
      'menu-panel',
      'menu-item',
      'menu-separator',
      'menu-label',
      'menu-position',
      'menu.token',
    ],
  },
  {
    name: 'menubar',
    sourceDir: 'packages/ui/src/lib/menubar',
    assetGlobs: ['menubar.{ts,html,scss}'],
    requiredBasenames: ['menubar'],
  },
  {
    name: 'popover',
    assetGlobs: [
      'popover.{ts,html,scss}',
      'popover-trigger.ts',
      'popover-panel.{ts,html,scss}',
      'popover-close.ts',
      'popover-position.ts',
      'popover.token.ts',
    ],
    requiredBasenames: [
      'popover',
      'popover-trigger',
      'popover-panel',
      'popover-close',
      'popover-position',
      'popover.token',
    ],
  },
  {
    name: 'dialog',
    assetGlobs: [
      'dialog.{ts,html,scss}',
      'dialog-close.ts',
      'dialog.token.ts',
      'dialog-ref.ts',
      'dialog.service.ts',
      'dialog-outlet.ts',
    ],
    requiredBasenames: [
      'dialog',
      'dialog-close',
      'dialog.token',
      'dialog-ref',
      'dialog.service',
      'dialog-outlet',
    ],
  },
  {
    name: 'alert',
    assetGlobs: ['alert.{ts,html,scss}'],
    requiredBasenames: ['alert'],
  },
  {
    name: 'toast',
    assetGlobs: [
      'toast.{ts,html,scss}',
      'toaster.{ts,html,scss}',
      'toast.service.ts',
    ],
    requiredBasenames: ['toast', 'toaster', 'toast.service'],
  },

  {
    name: 'tabs',
    assetGlobs: [
      'tabs.{ts,html,scss}',
      'tab.{ts,html,scss}',
      'tab-content.ts',
      'tab-label.ts',
    ],
    requiredBasenames: ['tabs', 'tab', 'tab-content', 'tab-label'],
  },
  {
    name: 'stepper',
    assetGlobs: [
      'stepper.{ts,html,scss}',
      'step.{ts,html,scss}',
      'step-content.ts',
      'step-label.ts',
    ],
    requiredBasenames: ['stepper', 'step', 'step-content', 'step-label'],
  },
  {
    name: 'accordion',
    assetGlobs: [
      'accordion.{ts,html,scss}',
      'accordion-item.{ts,html,scss}',
      'accordion-title.ts',
      'accordion-subtitle.ts',
      'accordion-content.ts',
      'accordion.token.ts',
    ],
    requiredBasenames: [
      'accordion',
      'accordion-item',
      'accordion-title',
      'accordion-subtitle',
      'accordion-content',
      'accordion.token',
    ],
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
    assetGlobs: ['theme.ts', 'theme.token.ts', 'tokens.scss'],
    requiredBasenames: ['theme', 'theme.token'],
    requiredFiles: ['tokens.scss'],
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

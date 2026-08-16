export interface TokenDefinition {
  name: string;
  description: string;
}

export const COLOR_TOKENS: TokenDefinition[] = [
  {
    name: '--el-color-primary',
    description: 'Brand fill (buttons, selected controls, progress, slider).',
  },
  {
    name: '--el-color-on-primary',
    description: 'Text and icons on primary fills.',
  },
  {
    name: '--el-color-primary-container',
    description: 'Soft primary surface (ghost hover, selected option, range).',
  },
  {
    name: '--el-color-on-primary-container',
    description: 'Text on primary-container surfaces.',
  },
  {
    name: '--el-color-secondary-container',
    description: 'Secondary fill (filled chips, segmented secondary selected).',
  },
  {
    name: '--el-color-on-secondary-container',
    description: 'Text on secondary-container surfaces.',
  },
  {
    name: '--el-color-error',
    description: 'Error and destructive emphasis.',
  },
  {
    name: '--el-color-on-error',
    description: 'Text on error fills.',
  },
  {
    name: '--el-color-error-container',
    description: 'Soft error surface (file-upload reject, attachment error).',
  },
  {
    name: '--el-color-surface',
    description: 'Default page and component background.',
  },
  {
    name: '--el-color-on-surface',
    description: 'Default text and icon color.',
  },
  {
    name: '--el-color-on-surface-variant',
    description: 'Muted text (hints, labels, placeholders).',
  },
  {
    name: '--el-color-surface-container',
    description: 'Raised container background (clock face, avatar-adjacent chrome).',
  },
  {
    name: '--el-color-outline',
    description: 'Strong outline (checkbox, radio, chip border).',
  },
  {
    name: '--el-color-outline-variant',
    description: 'Default field and card borders.',
  },
  {
    name: '--el-color-inverse-surface',
    description: 'Inverted tooltip/value-label background.',
  },
  {
    name: '--el-color-inverse-on-surface',
    description: 'Text on inverse-surface.',
  },
  {
    name: '--el-color-primary-hover',
    description: 'Primary hover fill, derived from primary via color-mix.',
  },
  {
    name: '--el-color-hover',
    description: 'State-layer overlay for hover backgrounds.',
  },
  {
    name: '--el-color-disabled',
    description: 'Disabled text and selected-disabled fills.',
  },
];

export const DENSITY_TOKENS: TokenDefinition[] = [
  {
    name: '--el-space-1',
    description: '0.25rem spacing step.',
  },
  {
    name: '--el-space-2',
    description: '0.5rem spacing step.',
  },
  {
    name: '--el-space-3',
    description: '0.75rem spacing step.',
  },
  {
    name: '--el-space-4',
    description: '1rem spacing step.',
  },
  {
    name: '--el-radius-xs',
    description: '6px corners — inputs, buttons, select trigger.',
  },
  {
    name: '--el-radius-sm',
    description: '8px corners — chips, compact cards.',
  },
  {
    name: '--el-radius-md',
    description: '12px corners — cards, attachments, file upload.',
  },
  {
    name: '--el-radius-full',
    description: 'Pill radius — tracks, thumbs, avatars, calendar days.',
  },
  {
    name: '--el-shadow-1',
    description: 'Low elevation (cards, slider thumb).',
  },
  {
    name: '--el-shadow-2',
    description: 'Medium elevation (elevated chips).',
  },
  {
    name: '--el-shadow-3',
    description: 'High elevation (select and datepicker panels).',
  },
  {
    name: '--el-border-width',
    description: 'Default 1px stroke.',
  },
  {
    name: '--el-border-width-thick',
    description: '2px stroke for checkboxes, radios, and focus rings.',
  },
  {
    name: '--el-icon-size-sm',
    description: 'Small icon size used in compact controls.',
  },
  {
    name: '--el-icon-size-md',
    description: 'Default icon size.',
  },
  {
    name: '--el-icon-size-lg',
    description: 'Large icon size for emphasis.',
  },
  {
    name: '--el-font-sans',
    description:
      'UI font stack. Defaults to inherit / system-ui. Set this to your brand typeface in global styles.',
  },
  {
    name: '--el-font-mono',
    description:
      'Monospace font stack. Defaults to inherit / system monospace. Override after loading your code font.',
  },
];

export const ICON_TOKENS: TokenDefinition[] = DENSITY_TOKENS.filter((token) =>
  token.name.startsWith('--el-icon-size-'),
);

export interface BrandToken {
  readonly name: string;
  readonly label: string;
  readonly description: string;
  readonly light: string;
  readonly dark: string;
  readonly preview?: boolean;
}

export interface BrandTokenGroup {
  readonly id: string;
  readonly label: string;
  readonly description: string;
  readonly tokens: readonly BrandToken[];
}

export type ThemePalette = Record<string, { light: string; dark: string }>;

/** Colors wired to the panel preview — one row per visible change. */
export const PREVIEW_TOKEN_GROUPS: readonly BrandTokenGroup[] = [
  {
    id: 'primary-action',
    label: 'Primary action',
    description: 'The filled Primary button and ghost button text',
    tokens: [
      {
        name: '--el-color-primary',
        label: 'Fill',
        description: 'Primary button background and ghost button label',
        light: '#0f172a',
        dark: '#f8fafc',
        preview: true,
      },
      {
        name: '--el-color-on-primary',
        label: 'Label',
        description: 'Text and icons on the primary button',
        light: '#f8fafc',
        dark: '#0f172a',
        preview: true,
      },
    ],
  },
  {
    id: 'quiet-action',
    label: 'Quiet action',
    description: 'The Secondary button in the preview',
    tokens: [
      {
        name: '--el-color-surface-container-highest',
        label: 'Fill',
        description: 'Secondary button background (not the secondary token)',
        light: '#cbd5e1',
        dark: '#334155',
        preview: true,
      },
      {
        name: '--el-color-on-surface',
        label: 'Label',
        description: 'Secondary button text and default body copy',
        light: '#000000',
        dark: '#ffffff',
        preview: true,
      },
    ],
  },
  {
    id: 'ghost-action',
    label: 'Ghost action',
    description: 'Hover state for the Ghost button',
    tokens: [
      {
        name: '--el-color-primary-container',
        label: 'Hover fill',
        description: 'Ghost button background on hover',
        light: '#f1f5f9',
        dark: '#1e293b',
        preview: true,
      },
    ],
  },
  {
    id: 'chip',
    label: 'Chip',
    description: 'The outlined Chip in the preview',
    tokens: [
      {
        name: '--el-color-on-surface-variant',
        label: 'Label',
        description: 'Chip text and other muted labels',
        light: '#64748b',
        dark: '#94a3b8',
        preview: true,
      },
      {
        name: '--el-color-outline',
        label: 'Border',
        description: 'Chip outline, input borders, and dividers',
        light: '#94a3b8',
        dark: '#64748b',
        preview: true,
      },
    ],
  },
  {
    id: 'canvas',
    label: 'Preview canvas',
    description: 'Background behind the preview buttons',
    tokens: [
      {
        name: '--el-color-surface-container',
        label: 'Fill',
        description: 'Preview panel, cards, and grouped surfaces',
        light: '#f1f5f9',
        dark: '#0f172a',
        preview: true,
      },
    ],
  },
];

export const BRAND_TOKEN_GROUPS: readonly BrandTokenGroup[] = [
  {
    id: 'primary',
    label: 'Primary',
    description: 'Main brand actions across the app',
    tokens: [
      {
        name: '--el-color-primary',
        label: 'Primary',
        description: 'Primary buttons, ghost text, links, and focus rings',
        light: '#0f172a',
        dark: '#f8fafc',
        preview: true,
      },
      {
        name: '--el-color-on-primary',
        label: 'On primary',
        description: 'Text and icons placed on primary fills',
        light: '#f8fafc',
        dark: '#0f172a',
        preview: true,
      },
      {
        name: '--el-color-primary-container',
        label: 'Primary container',
        description: 'Ghost hover, selected chips, and soft primary tints',
        light: '#f1f5f9',
        dark: '#1e293b',
        preview: true,
      },
      {
        name: '--el-color-on-primary-container',
        label: 'On primary container',
        description: 'Text on primary container backgrounds',
        light: '#0f172a',
        dark: '#f8fafc',
      },
    ],
  },
  {
    id: 'secondary',
    label: 'Secondary',
    description: 'Alternate fills — rarely used directly by buttons',
    tokens: [
      {
        name: '--el-color-secondary',
        label: 'Secondary',
        description: 'Secondary role fills where components reference it',
        light: '#f1f5f9',
        dark: '#1e293b',
      },
      {
        name: '--el-color-on-secondary',
        label: 'On secondary',
        description: 'Text on secondary fills',
        light: '#0f172a',
        dark: '#f8fafc',
      },
      {
        name: '--el-color-secondary-container',
        label: 'Secondary container',
        description: 'Filled chip and quiet surface backgrounds',
        light: '#f1f5f9',
        dark: '#1e293b',
      },
      {
        name: '--el-color-on-secondary-container',
        label: 'On secondary container',
        description: 'Text on secondary container backgrounds',
        light: '#0f172a',
        dark: '#f8fafc',
      },
    ],
  },
  {
    id: 'tertiary',
    label: 'Tertiary',
    description: 'Extra accent when primary and secondary are taken',
    tokens: [
      {
        name: '--el-color-tertiary',
        label: 'Tertiary',
        description: 'Tertiary role fills for badges and accents',
        light: '#f1f5f9',
        dark: '#1e293b',
      },
      {
        name: '--el-color-on-tertiary',
        label: 'On tertiary',
        description: 'Text on tertiary fills',
        light: '#0f172a',
        dark: '#f8fafc',
      },
      {
        name: '--el-color-tertiary-container',
        label: 'Tertiary container',
        description: 'Soft tertiary tints and containers',
        light: '#e2e8f0',
        dark: '#334155',
      },
      {
        name: '--el-color-on-tertiary-container',
        label: 'On tertiary container',
        description: 'Text on tertiary container backgrounds',
        light: '#0f172a',
        dark: '#f8fafc',
      },
    ],
  },
  {
    id: 'error',
    label: 'Error',
    description: 'Destructive actions, alerts, and invalid fields',
    tokens: [
      {
        name: '--el-color-error',
        label: 'Error',
        description: 'Destructive buttons, error borders, and alert fills',
        light: '#ef4444',
        dark: '#7f1d1d',
      },
      {
        name: '--el-color-on-error',
        label: 'On error',
        description: 'Text and icons on error fills',
        light: '#ffffff',
        dark: '#f8fafc',
      },
      {
        name: '--el-color-error-container',
        label: 'Error container',
        description: 'Soft error backgrounds and inline messages',
        light: '#fee2e2',
        dark: '#7f1d1d',
      },
      {
        name: '--el-color-on-error-container',
        label: 'On error container',
        description: 'Text on error container backgrounds',
        light: '#7f1d1d',
        dark: '#fee2e2',
      },
    ],
  },
  {
    id: 'surface',
    label: 'Surfaces',
    description: 'Page backgrounds, cards, and elevation steps',
    tokens: [
      {
        name: '--el-color-surface',
        label: 'Surface',
        description: 'App background and sheet/dialog panels',
        light: '#ffffff',
        dark: '#000000',
      },
      {
        name: '--el-color-on-surface',
        label: 'On surface',
        description: 'Default body text and secondary button labels',
        light: '#000000',
        dark: '#ffffff',
        preview: true,
      },
      {
        name: '--el-color-on-surface-variant',
        label: 'On surface variant',
        description: 'Muted text, placeholders, and chip labels',
        light: '#64748b',
        dark: '#94a3b8',
        preview: true,
      },
      {
        name: '--el-color-surface-container',
        label: 'Surface container',
        description: 'Cards, preview panels, and grouped blocks',
        light: '#f1f5f9',
        dark: '#0f172a',
        preview: true,
      },
      {
        name: '--el-color-surface-container-low',
        label: 'Surface container low',
        description: 'Recessed panels and subtle background steps',
        light: '#f8fafc',
        dark: '#020617',
      },
      {
        name: '--el-color-surface-container-high',
        label: 'Surface container high',
        description: 'Raised cards and hover surfaces',
        light: '#e2e8f0',
        dark: '#1e293b',
      },
      {
        name: '--el-color-surface-container-highest',
        label: 'Surface container highest',
        description: 'Secondary button fill and highest elevation',
        light: '#cbd5e1',
        dark: '#334155',
        preview: true,
      },
    ],
  },
  {
    id: 'outline',
    label: 'Outlines',
    description: 'Borders, dividers, and input chrome',
    tokens: [
      {
        name: '--el-color-outline',
        label: 'Outline',
        description: 'Chip borders, input outlines, and strong dividers',
        light: '#94a3b8',
        dark: '#64748b',
        preview: true,
      },
      {
        name: '--el-color-outline-variant',
        label: 'Outline variant',
        description: 'Subtle borders and secondary button hover',
        light: '#e2e8f0',
        dark: '#334155',
      },
    ],
  },
  {
    id: 'inverse',
    label: 'Inverse',
    description: 'High-contrast overlays, snackbars, and tooltips',
    tokens: [
      {
        name: '--el-color-inverse-surface',
        label: 'Inverse surface',
        description: 'Dark overlays on light UI (and the reverse in dark mode)',
        light: '#0f172a',
        dark: '#f8fafc',
      },
      {
        name: '--el-color-inverse-on-surface',
        label: 'Inverse on surface',
        description: 'Text on inverse surfaces',
        light: '#f8fafc',
        dark: '#0f172a',
      },
      {
        name: '--el-color-inverse-primary',
        label: 'Inverse primary',
        description: 'Primary accents on inverse surfaces',
        light: '#f8fafc',
        dark: '#0f172a',
      },
    ],
  },
];

export const BRAND_TOKENS: readonly BrandToken[] = BRAND_TOKEN_GROUPS.flatMap(
  (group) => group.tokens,
);

export function defaultPalette(): ThemePalette {
  return Object.fromEntries(
    BRAND_TOKENS.map((token) => [token.name, { light: token.light, dark: token.dark }]),
  );
}

export function toRootOverrideCss(palette: ThemePalette): string {
  const lines = BRAND_TOKENS.map((token) => {
    const pair = palette[token.name] ?? { light: token.light, dark: token.dark };
    return `  ${token.name}: light-dark(${pair.light}, ${pair.dark});`;
  });
  return `/* Paste after @use of tokens.scss */\n:root {\n${lines.join('\n')}\n}\n`;
}

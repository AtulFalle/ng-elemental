export interface BrandToken {
  readonly name: string;
  readonly label: string;
  readonly light: string;
  readonly dark: string;
}

export interface BrandTokenGroup {
  readonly label: string;
  readonly tokens: readonly BrandToken[];
}

export type ThemePalette = Record<string, { light: string; dark: string }>;

export const BRAND_TOKEN_GROUPS: readonly BrandTokenGroup[] = [
  {
    label: 'Primary',
    tokens: [
      { name: '--el-color-primary', label: 'primary', light: '#0f172a', dark: '#f8fafc' },
      { name: '--el-color-on-primary', label: 'on-primary', light: '#f8fafc', dark: '#0f172a' },
      {
        name: '--el-color-primary-container',
        label: 'primary-container',
        light: '#f1f5f9',
        dark: '#1e293b',
      },
      {
        name: '--el-color-on-primary-container',
        label: 'on-primary-container',
        light: '#0f172a',
        dark: '#f8fafc',
      },
    ],
  },
  {
    label: 'Secondary',
    tokens: [
      { name: '--el-color-secondary', label: 'secondary', light: '#f1f5f9', dark: '#1e293b' },
      { name: '--el-color-on-secondary', label: 'on-secondary', light: '#0f172a', dark: '#f8fafc' },
      {
        name: '--el-color-secondary-container',
        label: 'secondary-container',
        light: '#f1f5f9',
        dark: '#1e293b',
      },
      {
        name: '--el-color-on-secondary-container',
        label: 'on-secondary-container',
        light: '#0f172a',
        dark: '#f8fafc',
      },
    ],
  },
  {
    label: 'Tertiary',
    tokens: [
      { name: '--el-color-tertiary', label: 'tertiary', light: '#f1f5f9', dark: '#1e293b' },
      { name: '--el-color-on-tertiary', label: 'on-tertiary', light: '#0f172a', dark: '#f8fafc' },
      {
        name: '--el-color-tertiary-container',
        label: 'tertiary-container',
        light: '#e2e8f0',
        dark: '#334155',
      },
      {
        name: '--el-color-on-tertiary-container',
        label: 'on-tertiary-container',
        light: '#0f172a',
        dark: '#f8fafc',
      },
    ],
  },
  {
    label: 'Error',
    tokens: [
      { name: '--el-color-error', label: 'error', light: '#ef4444', dark: '#7f1d1d' },
      { name: '--el-color-on-error', label: 'on-error', light: '#ffffff', dark: '#f8fafc' },
      {
        name: '--el-color-error-container',
        label: 'error-container',
        light: '#fee2e2',
        dark: '#7f1d1d',
      },
      {
        name: '--el-color-on-error-container',
        label: 'on-error-container',
        light: '#7f1d1d',
        dark: '#fee2e2',
      },
    ],
  },
  {
    label: 'Surface',
    tokens: [
      { name: '--el-color-surface', label: 'surface', light: '#ffffff', dark: '#000000' },
      { name: '--el-color-on-surface', label: 'on-surface', light: '#000000', dark: '#ffffff' },
      {
        name: '--el-color-on-surface-variant',
        label: 'on-surface-variant',
        light: '#64748b',
        dark: '#94a3b8',
      },
      {
        name: '--el-color-surface-container',
        label: 'surface-container',
        light: '#f1f5f9',
        dark: '#0f172a',
      },
      {
        name: '--el-color-surface-container-low',
        label: 'surface-container-low',
        light: '#f8fafc',
        dark: '#020617',
      },
      {
        name: '--el-color-surface-container-high',
        label: 'surface-container-high',
        light: '#e2e8f0',
        dark: '#1e293b',
      },
      {
        name: '--el-color-surface-container-highest',
        label: 'surface-container-highest',
        light: '#cbd5e1',
        dark: '#334155',
      },
    ],
  },
  {
    label: 'Outline',
    tokens: [
      { name: '--el-color-outline', label: 'outline', light: '#94a3b8', dark: '#64748b' },
      {
        name: '--el-color-outline-variant',
        label: 'outline-variant',
        light: '#e2e8f0',
        dark: '#334155',
      },
    ],
  },
  {
    label: 'Inverse',
    tokens: [
      {
        name: '--el-color-inverse-surface',
        label: 'inverse-surface',
        light: '#0f172a',
        dark: '#f8fafc',
      },
      {
        name: '--el-color-inverse-on-surface',
        label: 'inverse-on-surface',
        light: '#f8fafc',
        dark: '#0f172a',
      },
      {
        name: '--el-color-inverse-primary',
        label: 'inverse-primary',
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

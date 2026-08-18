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
      { name: '--el-color-primary', label: 'primary', light: '#5f479b', dark: '#d0bcff' },
      { name: '--el-color-on-primary', label: 'on-primary', light: '#ffffff', dark: '#381e72' },
      {
        name: '--el-color-primary-container',
        label: 'primary-container',
        light: '#eaddff',
        dark: '#4f378b',
      },
      {
        name: '--el-color-on-primary-container',
        label: 'on-primary-container',
        light: '#21005d',
        dark: '#eaddff',
      },
    ],
  },
  {
    label: 'Secondary',
    tokens: [
      { name: '--el-color-secondary', label: 'secondary', light: '#625b71', dark: '#ccc2dc' },
      { name: '--el-color-on-secondary', label: 'on-secondary', light: '#ffffff', dark: '#332d41' },
      {
        name: '--el-color-secondary-container',
        label: 'secondary-container',
        light: '#e8def8',
        dark: '#4a4458',
      },
      {
        name: '--el-color-on-secondary-container',
        label: 'on-secondary-container',
        light: '#1d192b',
        dark: '#e8def8',
      },
    ],
  },
  {
    label: 'Tertiary',
    tokens: [
      { name: '--el-color-tertiary', label: 'tertiary', light: '#7d5260', dark: '#efb8c8' },
      { name: '--el-color-on-tertiary', label: 'on-tertiary', light: '#ffffff', dark: '#492532' },
      {
        name: '--el-color-tertiary-container',
        label: 'tertiary-container',
        light: '#ffd8e4',
        dark: '#633b48',
      },
      {
        name: '--el-color-on-tertiary-container',
        label: 'on-tertiary-container',
        light: '#31111d',
        dark: '#ffd8e4',
      },
    ],
  },
  {
    label: 'Error',
    tokens: [
      { name: '--el-color-error', label: 'error', light: '#b3261e', dark: '#f2b8b5' },
      { name: '--el-color-on-error', label: 'on-error', light: '#ffffff', dark: '#601410' },
      {
        name: '--el-color-error-container',
        label: 'error-container',
        light: '#f9dedc',
        dark: '#8c1d18',
      },
      {
        name: '--el-color-on-error-container',
        label: 'on-error-container',
        light: '#410e0b',
        dark: '#f9dedc',
      },
    ],
  },
  {
    label: 'Surface',
    tokens: [
      { name: '--el-color-surface', label: 'surface', light: '#fffbfe', dark: '#1c1b1f' },
      { name: '--el-color-on-surface', label: 'on-surface', light: '#1c1b1f', dark: '#e6e1e5' },
      {
        name: '--el-color-on-surface-variant',
        label: 'on-surface-variant',
        light: '#49454f',
        dark: '#cac4d0',
      },
      {
        name: '--el-color-surface-container',
        label: 'surface-container',
        light: '#f3edf7',
        dark: '#211f26',
      },
      {
        name: '--el-color-surface-container-low',
        label: 'surface-container-low',
        light: '#f7f2fa',
        dark: '#1d1b20',
      },
      {
        name: '--el-color-surface-container-high',
        label: 'surface-container-high',
        light: '#ece6f0',
        dark: '#2b2930',
      },
      {
        name: '--el-color-surface-container-highest',
        label: 'surface-container-highest',
        light: '#e6e0e9',
        dark: '#36343b',
      },
    ],
  },
  {
    label: 'Outline',
    tokens: [
      { name: '--el-color-outline', label: 'outline', light: '#79747e', dark: '#938f99' },
      {
        name: '--el-color-outline-variant',
        label: 'outline-variant',
        light: '#cac4d0',
        dark: '#49454f',
      },
    ],
  },
  {
    label: 'Inverse',
    tokens: [
      {
        name: '--el-color-inverse-surface',
        label: 'inverse-surface',
        light: '#313033',
        dark: '#e6e1e5',
      },
      {
        name: '--el-color-inverse-on-surface',
        label: 'inverse-on-surface',
        light: '#f4eff4',
        dark: '#313033',
      },
      {
        name: '--el-color-inverse-primary',
        label: 'inverse-primary',
        light: '#d0bcff',
        dark: '#5f479b',
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

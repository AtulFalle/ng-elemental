import type { StorybookConfig } from '@storybook/angular-vite';

const config: StorybookConfig = {
  stories: [
    '../src/app/**/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../packages/ui/**/*.@(mdx|stories.@(js|jsx|ts|tsx))',
  ],
  addons: ['@storybook/addon-docs', '@storybook/addon-vitest', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/angular-vite',
    options: {
      jit: true,
      compodoc: false,
      inlineStylesExtension: 'scss',
      tsconfig: './.storybook/tsconfig.json',
    },
  },
  previewHead: (head) => `
    ${head}
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  `,
};

export default config;

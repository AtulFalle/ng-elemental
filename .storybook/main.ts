import type { StorybookConfig } from '@storybook/angular-vite';

const config: StorybookConfig = {
  stories: [
    '../src/app/**/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../packages/ui/**/*.@(mdx|stories.@(js|jsx|ts|tsx))',
  ],
  addons: [],
  framework: {
    name: '@storybook/angular-vite',
    options: {
      jit: true,
      compodoc: false,
      inlineStylesExtension: 'scss',
      tsconfig: './.storybook/tsconfig.json',
    },
  },
};

export default config;

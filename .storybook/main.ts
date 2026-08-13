import type { StorybookConfig } from '@storybook/angular-vite';

const config: StorybookConfig = {
  stories: ['../src/app/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  addons: [],
  framework: {
    name: '@storybook/angular-vite',
    options: {
      jit: true,
      compodoc: false,
      inlineStylesExtension: 'scss',
    },
  },
};

export default config;

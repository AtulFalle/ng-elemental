import type { Preview } from '@storybook/angular-vite';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Color theme',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: [
    (storyFn, context) => {
      const theme = (context.globals['theme'] as string) ?? 'light';
      const root = document.documentElement;
      root.setAttribute('data-el-theme', theme);
      root.style.colorScheme = theme;
      return storyFn();
    },
  ],
  parameters: {
    backgrounds: {
      default: 'surface',
      values: [{ name: 'surface', value: 'var(--el-color-surface)' }],
    },
    docs: {
      codePanel: true,
    },
    a11y: {
      options: {
        runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice', 'wcag2aaa'],
      },
    },
    chromatic: {
      disableSnapshot: true,
    }
  },
};

export default preview;

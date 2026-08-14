import type { Preview } from '@storybook/angular-vite';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'surface',
      values: [
        { name: 'surface', value: '#fffbfe' },
        { name: 'muted', value: '#f3edf7' },
      ],
    },
  },
};

export default preview;

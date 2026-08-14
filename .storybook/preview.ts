import type { Preview } from '@storybook/angular-vite';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'surface',
      values: [
        { name: 'surface', value: 'var(--el-surface-canvas)' },
        { name: 'muted', value: 'var(--el-surface-canvas-muted)' },
      ],
    },
  },
};

export default preview;

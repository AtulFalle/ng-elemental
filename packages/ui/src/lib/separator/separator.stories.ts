import type { Meta, StoryObj } from '@storybook/angular-vite';
import { ElSeparator } from './separator';

const meta: Meta<ElSeparator> = {
  title: 'Components/Separator',
  component: ElSeparator,
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    decorative: { control: 'boolean' },
  },
  args: {
    orientation: 'horizontal',
    decorative: true,
  },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [ElSeparator] },
    template: `
      <div style="width: 16rem; color: var(--el-color-on-surface);">
        <div>Above</div>
        <el-separator [orientation]="orientation" [decorative]="decorative" style="margin-block: var(--el-space-3)" />
        <div>Below</div>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<ElSeparator>;

export const Horizontal: Story = {};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [ElSeparator] },
    template: `
      <div style="display: flex; align-items: center; gap: var(--el-space-3); height: 2rem;">
        <span>Left</span>
        <el-separator [orientation]="orientation" [decorative]="decorative" />
        <span>Right</span>
      </div>
    `,
  }),
};

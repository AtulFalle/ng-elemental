import type { Meta, StoryObj } from '@storybook/angular-vite';
import { ElContainer } from './container';

const meta: Meta<ElContainer> = {
  title: 'Components/Container',
  component: ElContainer,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    padded: { control: 'boolean' },
  },
  args: {
    size: 'lg',
    padded: true,
  },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [ElContainer] },
    template: `
      <el-container [size]="size" [padded]="padded">
        <div style="padding: 1rem; background: var(--el-color-surface-container); border-radius: var(--el-radius-sm);">
          Constrained content
        </div>
      </el-container>
    `,
  }),
};

export default meta;
type Story = StoryObj<ElContainer>;

export const Large: Story = {};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Full: Story = {
  args: { size: 'full' },
};

import type { Meta, StoryObj } from '@storybook/angular-vite';
import { ElAspectRatio } from './aspect-ratio';

const meta: Meta<ElAspectRatio> = {
  title: 'Components/Aspect Ratio',
  component: ElAspectRatio,
  argTypes: {
    ratio: { control: 'text' },
  },
  args: {
    ratio: '16/9',
  },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [ElAspectRatio] },
    template: `
      <el-aspect-ratio [ratio]="ratio" style="max-width: 24rem">
        <div
          style="display: flex; align-items: center; justify-content: center; height: 100%; background: var(--el-color-surface-container); color: var(--el-color-on-surface-variant);"
        >
          16 / 9
        </div>
      </el-aspect-ratio>
    `,
  }),
};

export default meta;
type Story = StoryObj<ElAspectRatio>;

export const Widescreen: Story = {};

export const Square: Story = {
  args: { ratio: '1/1' },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [ElAspectRatio] },
    template: `
      <el-aspect-ratio [ratio]="ratio" style="max-width: 16rem">
        <div
          style="display: flex; align-items: center; justify-content: center; height: 100%; background: var(--el-color-surface-container);"
        >
          1 / 1
        </div>
      </el-aspect-ratio>
    `,
  }),
};

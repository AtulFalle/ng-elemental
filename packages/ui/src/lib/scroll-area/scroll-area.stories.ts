import type { Meta, StoryObj } from '@storybook/angular-vite';
import { ElScrollArea } from './scroll-area';

const meta: Meta<ElScrollArea> = {
  title: 'Components/Scroll Area',
  component: ElScrollArea,
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal', 'both'],
    },
    ariaLabel: { control: 'text' },
  },
  args: {
    orientation: 'vertical',
    ariaLabel: 'Example',
  },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [ElScrollArea] },
    template: `
      <el-scroll-area
        [orientation]="orientation"
        [ariaLabel]="ariaLabel"
        style="height: 10rem; max-width: 20rem; border: var(--el-border-width) solid var(--el-color-outline-variant); border-radius: var(--el-radius-sm); padding: var(--el-space-3);"
      >
        <p>Line 1 — overflow this region to scroll.</p>
        <p>Line 2</p>
        <p>Line 3</p>
        <p>Line 4</p>
        <p>Line 5</p>
        <p>Line 6</p>
        <p>Line 7</p>
        <p>Line 8</p>
        <p>Line 9</p>
        <p>Line 10</p>
      </el-scroll-area>
    `,
  }),
};

export default meta;
type Story = StoryObj<ElScrollArea>;

export const Vertical: Story = {};

export const Horizontal: Story = {
  args: { orientation: 'horizontal' },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [ElScrollArea] },
    template: `
      <el-scroll-area
        [orientation]="orientation"
        ariaLabel="Wide content"
        style="max-width: 20rem; border: var(--el-border-width) solid var(--el-color-outline-variant); border-radius: var(--el-radius-sm); padding: var(--el-space-3);"
      >
        <div style="white-space: nowrap;">
          A long horizontal strip that overflows the viewport so you can scroll sideways.
        </div>
      </el-scroll-area>
    `,
  }),
};

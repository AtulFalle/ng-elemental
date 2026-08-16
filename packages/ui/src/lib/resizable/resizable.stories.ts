import type { Meta, StoryObj } from '@storybook/angular-vite';
import { ElResizable, ElResizableHandle, ElResizablePanel } from './resizable';

const pane =
  'display: flex; align-items: center; justify-content: center; height: 100%; min-height: 8rem; background: var(--el-color-surface-container); color: var(--el-color-on-surface);';

const meta: Meta<ElResizable> = {
  title: 'Components/Resizable',
  component: ElResizable,
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
  },
  args: {
    orientation: 'horizontal',
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [ElResizable, ElResizablePanel, ElResizableHandle],
    },
    template: `
      <el-resizable [orientation]="orientation" style="height: 12rem; border: var(--el-border-width) solid var(--el-color-outline-variant); border-radius: var(--el-radius-sm);">
        <el-resizable-panel [defaultSize]="30" [min]="15">
          <div style="${pane}">A</div>
        </el-resizable-panel>
        <el-resizable-handle />
        <el-resizable-panel [min]="20">
          <div style="${pane}">B</div>
        </el-resizable-panel>
      </el-resizable>
    `,
  }),
};

export default meta;
type Story = StoryObj<ElResizable>;

export const Horizontal: Story = {};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
};

export const ThreePanes: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [ElResizable, ElResizablePanel, ElResizableHandle],
    },
    template: `
      <el-resizable style="height: 12rem; border: var(--el-border-width) solid var(--el-color-outline-variant); border-radius: var(--el-radius-sm);">
        <el-resizable-panel [defaultSize]="25" [min]="10">
          <div style="${pane}">A</div>
        </el-resizable-panel>
        <el-resizable-handle />
        <el-resizable-panel [defaultSize]="50" [min]="20">
          <div style="${pane}">B</div>
        </el-resizable-panel>
        <el-resizable-handle />
        <el-resizable-panel [min]="10">
          <div style="${pane}">C</div>
        </el-resizable-panel>
      </el-resizable>
    `,
  }),
};

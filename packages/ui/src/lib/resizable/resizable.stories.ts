import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect } from 'storybook/test';
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
        <el-resizable-handle ariaLabel="Resize panels B and C" />
        <el-resizable-panel [min]="10">
          <div style="${pane}">C</div>
        </el-resizable-panel>
      </el-resizable>
    `,
  }),
};

export const Interactions: Story = {
  name: 'Interactions',
  tags: ['!test'],
  render: () => ({
    moduleMetadata: {
      imports: [ElResizable, ElResizablePanel, ElResizableHandle],
    },
    template: `
      <el-resizable style="height: 12rem; border: var(--el-border-width) solid var(--el-color-outline-variant); border-radius: var(--el-radius-sm);">
        <el-resizable-panel [defaultSize]="30" [min]="15">
          <div style="${pane}">A</div>
        </el-resizable-panel>
        <el-resizable-handle ariaLabel="Resize panels" />
        <el-resizable-panel [min]="20">
          <div style="${pane}">B</div>
        </el-resizable-panel>
      </el-resizable>
    `,
  }),
  play: async ({ canvas, userEvent, step }) => {
    const handle = canvas.getByRole('separator', { name: 'Resize panels' });

    await step('Splitter exposes valuenow and keyboard resize', async () => {
      await expect(handle).toHaveAttribute('aria-valuenow');
      await expect(handle).toHaveAttribute('aria-valuetext', expect.stringContaining('percent'));
      handle.focus();
      await userEvent.keyboard('{ArrowRight}');
      const before = Number(handle.getAttribute('aria-valuenow'));
      await userEvent.keyboard('{ArrowRight}');
      const after = Number(handle.getAttribute('aria-valuenow'));
      await expect(after).not.toBe(before);
    });
  },
};

import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect } from 'storybook/test';
import { ElProgress } from './progress';
import { ElProgressCircle } from './progress-circle';

const meta: Meta<ElProgress> = {
  title: 'Components/Progress',
  component: ElProgress,
  argTypes: {
    value: { control: { type: 'number', min: 0, max: 100 } },
    max: { control: { type: 'number', min: 1 } },
    indeterminate: { control: 'boolean' },
    showValue: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
  args: {
    value: 42,
    max: 100,
    indeterminate: false,
    showValue: false,
    size: 'md',
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [ElProgress],
    },
    template: `<el-progress
      [value]="value"
      [max]="max"
      [indeterminate]="indeterminate"
      [showValue]="showValue"
      [size]="size"
      style="max-width: 20rem"
    />`,
  }),
};

export default meta;
type Story = StoryObj<ElProgress>;

export const Line: Story = {};

export const LineWithValue: Story = {
  args: { showValue: true, value: 68 },
};

export const LineIndeterminate: Story = {
  args: { indeterminate: true },
};

export const LineSizes: Story = {
  render: () => ({
    moduleMetadata: { imports: [ElProgress] },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 20rem">
        <el-progress size="sm" [value]="40" showValue />
        <el-progress size="md" [value]="60" showValue />
        <el-progress size="lg" [value]="80" showValue />
      </div>
    `,
  }),
};

export const Circle: Story = {
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [ElProgressCircle] },
    template: `<el-progress-circle
      [value]="value"
      [max]="max"
      [indeterminate]="indeterminate"
      [showValue]="showValue"
      [size]="size"
    />`,
  }),
  args: { value: 72, showValue: true },
};

export const CircleIndeterminate: Story = {
  render: () => ({
    moduleMetadata: { imports: [ElProgressCircle] },
    template: `<el-progress-circle indeterminate size="lg" />`,
  }),
};

export const CircleSizes: Story = {
  render: () => ({
    moduleMetadata: { imports: [ElProgressCircle] },
    template: `
      <div style="display: flex; align-items: center; gap: 1.5rem">
        <el-progress-circle size="sm" [value]="40" showValue />
        <el-progress-circle size="md" [value]="60" showValue />
        <el-progress-circle size="lg" [value]="80" showValue />
      </div>
    `,
  }),
};

export const Interactions: Story = {
  name: 'Interactions',
  tags: ['!test'],
  render: () => ({
    moduleMetadata: { imports: [ElProgress, ElProgressCircle] },
    template: `<div style="display: flex; flex-direction: column; gap: 1rem; max-width: 20rem">
      <el-progress [value]="68" showValue />
      <el-progress indeterminate />
      <el-progress-circle [value]="72" showValue />
    </div>`,
  }),
  play: async ({ canvas, step }) => {
    await step('Determinate line exposes values', async () => {
      const bars = canvas.getAllByRole('progressbar');
      const line = bars[0];
      await expect(line).toHaveAttribute('aria-valuenow', '68');
      await expect(line).toHaveAttribute('aria-valuemax', '100');
    });

    await step('Indeterminate omits value', async () => {
      const indeterminate = canvas.getAllByRole('progressbar')[1];
      await expect(indeterminate).not.toHaveAttribute('aria-valuenow');
    });

    await step('Circle exposes values', async () => {
      const circle = canvas.getAllByRole('progressbar')[2];
      await expect(circle).toHaveAttribute('aria-valuenow', '72');
    });
  },
};

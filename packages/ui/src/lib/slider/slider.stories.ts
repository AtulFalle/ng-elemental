import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect } from 'storybook/test';
import { ElSlider } from './slider';

const meta: Meta<ElSlider> = {
  title: 'Components/Slider',
  component: ElSlider,
  argTypes: {
    value: { control: { type: 'number', min: 0, max: 100 } },
    start: { control: { type: 'number', min: 0, max: 100 } },
    end: { control: { type: 'number', min: 0, max: 100 } },
    min: { control: { type: 'number' } },
    max: { control: { type: 'number' } },
    step: { control: { type: 'number', min: 0.1 } },
    range: { control: 'boolean' },
    showTicks: { control: 'boolean' },
    showValue: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
  args: {
    value: 40,
    start: 20,
    end: 70,
    min: 0,
    max: 100,
    step: 1,
    range: false,
    showTicks: false,
    showValue: false,
    disabled: false,
    error: false,
    size: 'md',
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [ElSlider],
    },
    template: `<el-slider
      [(value)]="value"
      [(start)]="start"
      [(end)]="end"
      [min]="min"
      [max]="max"
      [step]="step"
      [range]="range"
      [showTicks]="showTicks"
      [showValue]="showValue"
      [disabled]="disabled"
      [error]="error"
      [size]="size"
      style="width: 100%;"
    />`,
  }),
};

export default meta;
type Story = StoryObj<ElSlider>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { showValue: true, value: 55 },
};

export const WithTicks: Story = {
  args: { showTicks: true, step: 10, showValue: true, value: 40 },
};

export const Range: Story = {
  args: {
    range: true,
    start: 25,
    end: 75,
    showValue: true,
    showTicks: true,
    step: 5,
  },
};

export const Sizes: Story = {
  render: () => ({
    moduleMetadata: { imports: [ElSlider] },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; width: 100%;">
        <el-slider size="sm" [value]="30" showValue />
        <el-slider size="md" [value]="50" showValue />
        <el-slider size="lg" [value]="70" showValue />
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: { disabled: true, value: 45, showValue: true },
};

export const Error: Story = {
  args: { error: true, value: 20, showValue: true },
};

export const Interactions: Story = {
  name: 'Interactions',
  tags: ['!test'],
  parameters: { docs: { codePanel: true } },
  render: () => ({
    props: { value: 40, start: 20, end: 70 },
    moduleMetadata: { imports: [ElSlider] },
    template: `<div style="display:flex;flex-direction:column;gap:1.5rem;width:100%">
      <el-slider [(value)]="value" showValue ariaLabel="Volume" />
      <el-slider range [(start)]="start" [(end)]="end" showValue ariaLabelStart="Min price" ariaLabelEnd="Max price" />
      <el-slider [value]="30" disabled showValue ariaLabel="Disabled" />
    </div>`,
  }),
  play: async ({ canvas, userEvent, step }) => {
    const volume = canvas.getByRole('slider', { name: 'Volume' });
    const minThumb = canvas.getByRole('slider', { name: 'Min price' });
    const disabled = canvas.getByRole('slider', { name: 'Disabled' });

    await step('Single thumb has custom aria-label and orientation', async () => {
      await expect(volume).toHaveAttribute('aria-orientation', 'horizontal');
      volume.focus();
      await expect(volume).toHaveFocus();
    });

    await step('Keyboard: ArrowRight increases value', async () => {
      const before = volume.getAttribute('aria-valuenow');
      await userEvent.keyboard('{ArrowRight}');
      const after = volume.getAttribute('aria-valuenow');
      await expect(Number(after)).toBeGreaterThan(Number(before));
    });

    await step('Range exposes named min/max thumbs', async () => {
      await expect(minThumb).toHaveAttribute('aria-orientation', 'horizontal');
      await expect(canvas.getByRole('slider', { name: 'Max price' })).toBeInTheDocument();
    });

    await step('Disabled thumb is inert', async () => {
      await expect(disabled).toBeDisabled();
    });
  },
};

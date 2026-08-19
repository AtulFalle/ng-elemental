import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect } from 'storybook/test';
import { ElDateRangePicker } from './date-range-picker';

const panelSpace = 'min-height: 32rem; max-width: 48rem;';

const meta: Meta<ElDateRangePicker> = {
  title: 'Components/Date Range Picker',
  component: ElDateRangePicker,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    ariaLabel: { control: 'text' },
  },
  args: {
    size: 'md',
    disabled: false,
    placeholder: 'Select date range',
    ariaLabel: 'Date range',
    value: {
      start: new Date(2026, 7, 14),
      end: new Date(2026, 7, 20),
    },
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [ElDateRangePicker],
    },
    template: `<div style="${panelSpace}">
      <el-date-range-picker
        [(value)]="value"
        [size]="size"
        [disabled]="disabled"
        [placeholder]="placeholder"
        [ariaLabel]="ariaLabel"
      />
    </div>`,
  }),
};

export default meta;
type Story = StoryObj<ElDateRangePicker>;

export const Range: Story = {};

export const Empty: Story = {
  args: {
    value: { start: null, end: null },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Interactions: Story = {
  name: 'Interactions',
  tags: ['!test'],
  render: () => ({
    props: {
      value: {
        start: new Date(2026, 7, 14),
        end: new Date(2026, 7, 20),
      },
    },
    moduleMetadata: {
      imports: [ElDateRangePicker],
    },
    template: `<div style="${panelSpace}">
      <div style="display:flex; flex-direction:column; gap:0.75rem;">
        <el-date-range-picker [(value)]="value" ariaLabel="Travel dates"></el-date-range-picker>
        <el-date-range-picker disabled ariaLabel="Disabled travel dates"></el-date-range-picker>
      </div>
    </div>`,
  }),
  play: async ({ canvas, userEvent, step }) => {
    const rangeTrigger = canvas.getByRole('button', { name: 'Travel dates' });
    const disabledTrigger = canvas.getByRole('button', {
      name: 'Disabled travel dates',
    });

    await step('Pointer opens and closes date range panel', async () => {
      await userEvent.click(rangeTrigger);
      await expect(canvas.getByRole('dialog', { name: 'Travel dates' })).toBeVisible();
      await userEvent.keyboard('{Escape}');
      await expect(
        canvas.queryByRole('dialog', { name: 'Travel dates' }),
      ).not.toBeInTheDocument();
    });

    await step('Keyboard opens with Enter and closes with Escape', async () => {
      rangeTrigger.focus();
      await expect(rangeTrigger).toHaveFocus();
      await userEvent.keyboard('{Enter}');
      await expect(canvas.getByRole('dialog', { name: 'Travel dates' })).toBeVisible();
      await userEvent.keyboard('{Escape}');
      await expect(
        canvas.queryByRole('dialog', { name: 'Travel dates' }),
      ).not.toBeInTheDocument();
    });

    await step('Disabled picker stays non-interactive', async () => {
      await expect(disabledTrigger).toBeDisabled();
    });
  },
};

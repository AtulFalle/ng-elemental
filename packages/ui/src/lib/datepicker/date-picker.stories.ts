import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect } from 'storybook/test';
import { ElDatePicker } from './date-picker';

const panelSpace = 'min-height: 32rem; width: 100%; max-width: 24rem;';

const meta: Meta<ElDatePicker> = {
  title: 'Components/Date Picker',
  component: ElDatePicker,
  argTypes: {
    mode: {
      control: 'select',
      options: ['date', 'time', 'datetime'],
    },
    hourCycle: {
      control: 'select',
      options: ['h12', 'h23'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    ariaLabel: { control: 'text' },
    minuteStep: { control: 'number' },
  },
  args: {
    mode: 'date',
    hourCycle: 'h12',
    size: 'md',
    disabled: false,
    placeholder: 'Select date',
    ariaLabel: 'Date',
    minuteStep: 5,
    value: new Date(2026, 7, 14),
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [ElDatePicker],
    },
    template: `<div style="${panelSpace}">
      <el-date-picker
        [(value)]="value"
        [mode]="mode"
        [hourCycle]="hourCycle"
        [minuteStep]="minuteStep"
        [size]="size"
        [disabled]="disabled"
        [placeholder]="placeholder"
        [ariaLabel]="ariaLabel"
      />
    </div>`,
  }),
};

export default meta;
type Story = StoryObj<ElDatePicker>;

export const DateOnly: Story = {};

export const Time: Story = {
  args: {
    mode: 'time',
    placeholder: 'Select time',
    ariaLabel: 'Time',
    value: new Date(2026, 7, 14, 14, 30),
  },
};

export const DateTime: Story = {
  args: {
    mode: 'datetime',
    placeholder: 'Select date and time',
    ariaLabel: 'Date and time',
    value: new Date(2026, 7, 14, 9, 15),
  },
};

export const Hour24: Story = {
  args: {
    mode: 'time',
    hourCycle: 'h23',
    placeholder: 'Select time',
    ariaLabel: 'Time 24-hour',
    value: new Date(2026, 7, 14, 18, 45),
  },
};

export const Sizes: Story = {
  render: () => ({
    props: {
      sm: new Date(2026, 7, 14),
      md: new Date(2026, 7, 15),
      lg: new Date(2026, 7, 16),
    },
    moduleMetadata: { imports: [ElDatePicker] },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; ${panelSpace}">
        <el-date-picker [(value)]="sm" size="sm" placeholder="Small" ariaLabel="Small" />
        <el-date-picker [(value)]="md" size="md" placeholder="Medium" ariaLabel="Medium" />
        <el-date-picker [(value)]="lg" size="lg" placeholder="Large" ariaLabel="Large" />
      </div>
    `,
  }),
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
      value: new Date(2026, 7, 14, 14, 30),
    },
    moduleMetadata: {
      imports: [ElDatePicker],
    },
    template: `<div style="${panelSpace}">
      <div style="display:flex; flex-direction:column; gap:0.75rem;">
        <el-date-picker [(value)]="value" ariaLabel="Pickup date"></el-date-picker>
        <el-date-picker
          mode="time"
          [minuteStep]="15"
          [(value)]="value"
          ariaLabel="Pickup time"
        ></el-date-picker>
        <el-date-picker disabled ariaLabel="Disabled picker"></el-date-picker>
      </div>
    </div>`,
  }),
  play: async ({ canvas, userEvent, step }) => {
    const dateTrigger = canvas.getByRole('button', { name: 'Pickup date' });
    const timeTrigger = canvas.getByRole('button', { name: 'Pickup time' });
    const disabledTrigger = canvas.getByRole('button', {
      name: 'Disabled picker',
    });

    await step('Pointer opens and closes date panel', async () => {
      await userEvent.click(dateTrigger);
      await expect(canvas.getByRole('dialog', { name: 'Pickup date' })).toBeVisible();
      await userEvent.keyboard('{Escape}');
      await expect(
        canvas.queryByRole('dialog', { name: 'Pickup date' }),
      ).not.toBeInTheDocument();
    });

    await step('Keyboard opens with Enter and closes with Escape', async () => {
      dateTrigger.focus();
      await expect(dateTrigger).toHaveFocus();
      await userEvent.keyboard('{Enter}');
      await expect(canvas.getByRole('dialog', { name: 'Pickup date' })).toBeVisible();
      await userEvent.keyboard('{Escape}');
      await expect(
        canvas.queryByRole('dialog', { name: 'Pickup date' }),
      ).not.toBeInTheDocument();
    });

    await step('Time mode panel has a named dialog', async () => {
      await userEvent.click(timeTrigger);
      await expect(canvas.getByRole('dialog', { name: 'Pickup time' })).toBeVisible();
      await userEvent.keyboard('{Escape}');
    });

    await step('Disabled picker stays non-interactive', async () => {
      await expect(disabledTrigger).toBeDisabled();
    });
  },
};

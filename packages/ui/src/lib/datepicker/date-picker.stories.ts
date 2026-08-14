import type { Meta, StoryObj } from '@storybook/angular-vite';
import { ElDatePicker } from './date-picker';

const panelSpace = 'min-height: 32rem; max-width: 24rem;';

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

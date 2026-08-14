import type { Meta, StoryObj } from '@storybook/angular-vite';
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

import type { Meta, StoryObj } from '@storybook/angular-vite';
import { ElLabel } from './label';

const meta: Meta<ElLabel> = {
  title: 'Components/Label',
  component: ElLabel,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'muted', 'error'],
    },
    htmlFor: { control: 'text' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    variant: 'default',
    htmlFor: 'email',
    required: false,
    disabled: false,
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [ElLabel],
    },
    template: `<el-label [variant]="variant" [htmlFor]="htmlFor" [required]="required" [disabled]="disabled">Email</el-label>`,
  }),
};

export default meta;
type Story = StoryObj<ElLabel>;

export const Default: Story = {};

export const Muted: Story = {
  args: { variant: 'muted' },
};

export const Error: Story = {
  args: { variant: 'error' },
};

export const Required: Story = {
  args: { required: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

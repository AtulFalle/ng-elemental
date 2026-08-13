import type { Meta, StoryObj } from '@storybook/angular-vite';
import { ElButton } from './button';

const meta: Meta<ElButton> = {
  title: 'Components/Button',
  component: ElButton,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
    },
  },
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    type: 'button',
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [ElButton],
    },
    template: `<el-button [variant]="variant" [size]="size" [disabled]="disabled" [type]="type">Button</el-button>`,
  }),
};

export default meta;
type Story = StoryObj<ElButton>;

export const Default: Story = {};

export const Primary: Story = {
  args: { variant: 'primary' },
};

export const Secondary: Story = {
  args: { variant: 'secondary' },
};

export const Ghost: Story = {
  args: { variant: 'ghost' },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Medium: Story = {
  args: { size: 'md' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

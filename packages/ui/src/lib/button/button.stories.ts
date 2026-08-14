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
    iconStart: { control: 'text' },
    iconEnd: { control: 'text' },
  },
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    type: 'button',
    iconStart: '',
    iconEnd: '',
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [ElButton],
    },
    template: `<el-button
      [variant]="variant"
      [size]="size"
      [disabled]="disabled"
      [type]="type"
      [iconStart]="iconStart"
      [iconEnd]="iconEnd"
    >Button</el-button>`,
  }),
};

export default meta;
type Story = StoryObj<ElButton>;

export const Default: Story = {};

export const WithIconStart: Story = {
  args: { iconStart: 'plus' },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [ElButton] },
    template: `<el-button variant="primary" iconStart="plus">Add item</el-button>`,
  }),
};

export const WithIconEnd: Story = {
  render: () => ({
    moduleMetadata: { imports: [ElButton] },
    template: `<el-button variant="secondary" iconEnd="arrow-right">Next</el-button>`,
  }),
};

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

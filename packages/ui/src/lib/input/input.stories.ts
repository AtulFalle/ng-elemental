import type { Meta, StoryObj } from '@storybook/angular-vite';
import { ElIcon } from '../icon/icon';
import { ElInput, ElInputPrefix, ElInputSuffix } from './input';

const meta: Meta<ElInput> = {
  title: 'Components/Input',
  component: ElInput,
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'tel', 'url', 'search', 'number'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    mask: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    inputId: { control: 'text' },
  },
  args: {
    type: 'text',
    size: 'md',
    mask: '',
    placeholder: 'Enter text',
    disabled: false,
    error: false,
    inputId: 'input-preview',
    value: '',
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [ElInput],
    },
    template: `<el-input
      [(value)]="value"
      [type]="type"
      [size]="size"
      [mask]="mask"
      [placeholder]="placeholder"
      [disabled]="disabled"
      [error]="error"
      [inputId]="inputId"
    />`,
  }),
};

export default meta;
type Story = StoryObj<ElInput>;

export const Default: Story = {};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'you@example.com',
    inputId: 'input-email',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Password',
    inputId: 'input-password',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Cannot edit',
    placeholder: 'Disabled',
  },
};

export const Error: Story = {
  args: {
    error: true,
    value: 'Invalid value',
    placeholder: 'Error',
  },
};

export const Sizes: Story = {
  render: () => ({
    props: { sm: '', md: '', lg: '' },
    moduleMetadata: { imports: [ElInput] },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; width: 100%;;">
        <el-input [(value)]="sm" size="sm" placeholder="Small" inputId="input-sm" />
        <el-input [(value)]="md" size="md" placeholder="Medium" inputId="input-md" />
        <el-input [(value)]="lg" size="lg" placeholder="Large" inputId="input-lg" />
      </div>
    `,
  }),
};

export const PrefixSuffix: Story = {
  render: () => ({
    props: { search: '', amount: '' },
    moduleMetadata: {
      imports: [ElInput, ElInputPrefix, ElInputSuffix, ElIcon],
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; width: 100%;;">
        <el-input [(value)]="search" type="search" placeholder="Search" inputId="input-search">
          <el-icon elInputPrefix name="magnifying-glass" size="sm" />
        </el-input>
        <el-input [(value)]="amount" placeholder="Amount" inputId="input-amount">
          <span elInputPrefix>$</span>
          <span elInputSuffix>USD</span>
        </el-input>
      </div>
    `,
  }),
};

export const Mask: Story = {
  args: {
    type: 'tel',
    mask: '(000) 000-0000',
    placeholder: 'Phone',
    inputId: 'input-mask',
  },
};

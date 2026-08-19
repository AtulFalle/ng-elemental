import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect } from 'storybook/test';
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

export const Interactions: Story = {
  name: 'Interactions',
  tags: ['!test'],
  parameters: { docs: { codePanel: true } },
  render: () => ({
    props: { value: '', errorValue: 'Invalid', disabledValue: 'Cannot edit' },
    moduleMetadata: { imports: [ElInput] },
    template: `<div style="display:flex;flex-direction:column;gap:0.75rem;width:100%;max-width:20rem">
      <el-input [(value)]="value" placeholder="Enter text" inputId="input-active" />
      <el-input value="Cannot edit" disabled placeholder="Disabled" inputId="input-disabled" />
      <el-input [(value)]="errorValue" error placeholder="Error" inputId="input-error" ariaDescribedby="input-error-msg" />
      <span id="input-error-msg" style="font-size:0.75rem;color:var(--el-color-error)">Invalid value</span>
    </div>`,
  }),
  play: async ({ canvas, userEvent, step }) => {
    const input = canvas.getByPlaceholderText('Enter text');
    const disabled = canvas.getByPlaceholderText('Disabled');
    const error = canvas.getByPlaceholderText('Error');

    await step('Pointer: focus and type', async () => {
      await userEvent.click(input);
      await expect(input).toHaveFocus();
      await userEvent.type(input, 'hello');
      await expect(input).toHaveValue('hello');
    });

    await step('Keyboard: Tab moves focus', async () => {
      await userEvent.tab();
      await expect(disabled).toHaveFocus();
    });

    await step('Disabled is not editable', async () => {
      await expect(disabled).toBeDisabled();
    });

    await step('Error exposes aria-invalid and describedby', async () => {
      await expect(error).toHaveAttribute('aria-invalid', 'true');
      await expect(error).toHaveAttribute('aria-describedby', 'input-error-msg');
    });
  },
};

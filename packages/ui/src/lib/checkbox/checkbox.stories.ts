import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect, fn } from 'storybook/test';
import { ElCheckbox } from './checkbox';

const meta: Meta<ElCheckbox> = {
  title: 'Components/Checkbox',
  component: ElCheckbox,
  argTypes: {
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    labelPosition: {
      control: 'select',
      options: ['left', 'right'],
    },
    name: { control: 'text' },
    value: { control: 'text' },
    inputId: { control: 'text' },
  },
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    error: false,
    labelPosition: 'right',
    name: '',
    value: '',
    inputId: 'checkbox-preview',
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [ElCheckbox],
    },
    template: `<el-checkbox
      [(checked)]="checked"
      [indeterminate]="indeterminate"
      [disabled]="disabled"
      [error]="error"
      [labelPosition]="labelPosition"
      [inputId]="inputId"
    >Accept terms and conditions</el-checkbox>`,
  }),
};

export default meta;
type Story = StoryObj<ElCheckbox>;

export const Default: Story = {};

export const Checked: Story = {
  args: { checked: true },
};

export const Indeterminate: Story = {
  args: { indeterminate: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledChecked: Story = {
  args: { disabled: true, checked: true },
};

export const Error: Story = {
  args: { error: true },
};

export const LabelLeft: Story = {
  args: { labelPosition: 'left', checked: true },
};

export const CheckboxList: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [ElCheckbox],
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <el-checkbox inputId="cb-1" [checked]="true">Notifications</el-checkbox>
        <el-checkbox inputId="cb-2">Marketing emails</el-checkbox>
        <el-checkbox inputId="cb-3" labelPosition="left" [checked]="true">Label on left</el-checkbox>
        <el-checkbox inputId="cb-4" [indeterminate]="true">Select all</el-checkbox>
      </div>
    `,
  }),
};

export const Interactions: Story = {
  name: 'Interactions',
  tags: ['!test'],
  parameters: { docs: { codePanel: true } },
  render: () => ({
    props: { checked: false },
    moduleMetadata: { imports: [ElCheckbox] },
    template: `<div style="display:flex;flex-direction:column;gap:0.75rem">
      <el-checkbox [(checked)]="checked" inputId="cb-active">Accept terms</el-checkbox>
      <el-checkbox inputId="cb-disabled" disabled>Disabled</el-checkbox>
      <el-checkbox inputId="cb-indeterminate" [indeterminate]="true">Select all</el-checkbox>
    </div>`,
  }),
  play: async ({ canvas, userEvent, step }) => {
    const active = canvas.getByRole('checkbox', { name: 'Accept terms' });
    const disabled = canvas.getByRole('checkbox', { name: 'Disabled' });
    const indeterminate = canvas.getByRole('checkbox', { name: 'Select all' });

    await step('Pointer: toggle checkbox', async () => {
      await userEvent.click(active);
      await expect(active).toBeChecked();
    });

    await step('Keyboard: Space toggles', async () => {
      active.focus();
      await userEvent.keyboard(' ');
      await expect(active).not.toBeChecked();
    });

    await step('Disabled does not toggle', async () => {
      await expect(disabled).toBeDisabled();
      const onClick = fn();
      disabled.addEventListener('click', onClick);
      await userEvent.click(disabled);
      await expect(onClick).not.toHaveBeenCalled();
    });

    await step('Indeterminate is exposed', async () => {
      await expect(indeterminate).toHaveAttribute('aria-checked', 'mixed');
    });
  },
};

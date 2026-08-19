import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect, fn } from 'storybook/test';
import { ElIcon } from '../icon/icon';
import { ElSlideToggle } from './slide-toggle';

const meta: Meta<ElSlideToggle> = {
  title: 'Components/Slide Toggle',
  component: ElSlideToggle,
  argTypes: {
    checked: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
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
    size: 'md',
    disabled: false,
    labelPosition: 'right',
    name: '',
    value: '',
    inputId: 'slide-toggle-preview',
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [ElSlideToggle],
    },
    template: `<el-slide-toggle
      [(checked)]="checked"
      [size]="size"
      [disabled]="disabled"
      [labelPosition]="labelPosition"
      [inputId]="inputId"
    >Notifications</el-slide-toggle>`,
  }),
};

export default meta;
type Story = StoryObj<ElSlideToggle>;

export const Default: Story = {};

export const Checked: Story = {
  args: { checked: true },
};

export const Small: Story = {
  args: { size: 'sm', checked: true },
};

export const Large: Story = {
  args: { size: 'lg', checked: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledChecked: Story = {
  args: { disabled: true, checked: true },
};

export const LabelLeft: Story = {
  args: { labelPosition: 'left', checked: true },
};

export const TrackIcons: Story = {
  args: { checked: true },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [ElSlideToggle, ElIcon],
    },
    template: `<el-slide-toggle
      [(checked)]="checked"
      [size]="size"
      [disabled]="disabled"
      [labelPosition]="labelPosition"
      [inputId]="inputId"
    >
      <el-icon elSlideToggleTrackOnIcon name="check" size="sm" />
      <el-icon elSlideToggleTrackOffIcon name="xmark" size="sm" />
      Wi-Fi
    </el-slide-toggle>`,
  }),
};

export const ThumbIcons: Story = {
  args: { checked: true },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [ElSlideToggle, ElIcon],
    },
    template: `<el-slide-toggle
      [(checked)]="checked"
      [size]="size"
      [disabled]="disabled"
      [labelPosition]="labelPosition"
      [inputId]="inputId"
    >
      <el-icon elSlideToggleThumbOnIcon name="check" size="sm" />
      <el-icon elSlideToggleThumbOffIcon name="xmark" size="sm" />
      Dark mode
    </el-slide-toggle>`,
  }),
};

export const Sizes: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [ElSlideToggle],
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <el-slide-toggle size="sm" inputId="st-sm" [checked]="true">Small</el-slide-toggle>
        <el-slide-toggle size="md" inputId="st-md" [checked]="true">Medium</el-slide-toggle>
        <el-slide-toggle size="lg" inputId="st-lg" [checked]="true">Large</el-slide-toggle>
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
    moduleMetadata: { imports: [ElSlideToggle] },
    template: `<div style="display:flex;flex-direction:column;gap:0.75rem">
      <el-slide-toggle [(checked)]="checked" inputId="st-active">Notifications</el-slide-toggle>
      <el-slide-toggle inputId="st-disabled" disabled>Disabled</el-slide-toggle>
    </div>`,
  }),
  play: async ({ canvas, userEvent, step }) => {
    const active = canvas.getByRole('switch', { name: 'Notifications' });
    const disabled = canvas.getByRole('switch', { name: 'Disabled' });

    await step('Pointer: toggle switch', async () => {
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
  },
};

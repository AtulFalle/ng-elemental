import type { Meta, StoryObj } from '@storybook/angular-vite';
import { ElAlert } from './alert';

const meta: Meta<ElAlert> = {
  title: 'Components/Alert',
  component: ElAlert,
  argTypes: {
    color: {
      control: 'select',
      options: ['neutral', 'success', 'error', 'warning', 'info'],
    },
    title: { control: 'text' },
    icon: { control: 'text' },
    dismissible: { control: 'boolean' },
  },
  args: {
    color: 'info',
    title: '',
    icon: undefined,
    dismissible: false,
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [ElAlert],
    },
    template: `<el-alert
      [color]="color"
      [title]="title"
      [icon]="icon"
      [dismissible]="dismissible"
      style="max-width: 28rem"
    >Something needs your attention.</el-alert>`,
  }),
};

export default meta;
type Story = StoryObj<ElAlert>;

export const Info: Story = {
  args: { color: 'info' },
};

export const Success: Story = {
  args: { color: 'success' },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [ElAlert] },
    template: `<el-alert [color]="color" style="max-width: 28rem">Saved successfully.</el-alert>`,
  }),
};

export const Error: Story = {
  args: { color: 'error' },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [ElAlert] },
    template: `<el-alert [color]="color" style="max-width: 28rem">Could not save changes.</el-alert>`,
  }),
};

export const Warning: Story = {
  args: { color: 'warning' },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [ElAlert] },
    template: `<el-alert [color]="color" style="max-width: 28rem">This action cannot be undone.</el-alert>`,
  }),
};

export const Neutral: Story = {
  args: { color: 'neutral' },
};

export const WithTitle: Story = {
  args: { color: 'success', title: 'Saved' },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [ElAlert] },
    template: `<el-alert [color]="color" [title]="title" style="max-width: 28rem">Your changes were written.</el-alert>`,
  }),
};

export const Dismissible: Story = {
  args: { color: 'info', dismissible: true, title: 'New version' },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [ElAlert] },
    template: `<el-alert
      [color]="color"
      [title]="title"
      [dismissible]="dismissible"
      style="max-width: 28rem"
    >A newer version of the design system is available.</el-alert>`,
  }),
};

export const NoIcon: Story = {
  args: { color: 'info', icon: '' },
};

export const CustomIcon: Story = {
  args: { color: 'success', icon: 'check' },
};

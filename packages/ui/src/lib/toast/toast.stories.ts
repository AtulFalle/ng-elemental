import type { Meta, StoryObj } from '@storybook/angular-vite';
import { ElToast } from './toast';

const meta: Meta<ElToast> = {
  title: 'Components/Toast',
  component: ElToast,
  argTypes: {
    color: {
      control: 'select',
      options: ['neutral', 'success', 'error', 'warning', 'info'],
    },
    title: { control: 'text' },
    dismissible: { control: 'boolean' },
  },
  args: {
    color: 'neutral',
    title: '',
    dismissible: true,
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [ElToast],
    },
    template: `<el-toast
      [color]="color"
      [title]="title"
      [dismissible]="dismissible"
    >Saved to your library.</el-toast>`,
  }),
};

export default meta;
type Story = StoryObj<ElToast>;

export const Neutral: Story = {};

export const Success: Story = {
  args: { color: 'success', title: 'Saved' },
};

export const Error: Story = {
  args: { color: 'error', title: 'Could not save' },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [ElToast] },
    template: `<el-toast [color]="color" [title]="title">Check your connection and try again.</el-toast>`,
  }),
};

export const Warning: Story = {
  args: { color: 'warning', title: 'Unsaved changes' },
};

export const Info: Story = {
  args: { color: 'info' },
};

export const NoDismiss: Story = {
  args: { dismissible: false },
};

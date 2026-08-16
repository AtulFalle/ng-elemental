import type { Meta, StoryObj } from '@storybook/angular-vite';
import {
  SnackbarBulkStoryHost,
  SnackbarServiceStoryHost,
  SnackbarStoryHost,
} from '../../stories/snackbar.story-host';

const meta: Meta<SnackbarStoryHost> = {
  title: 'Components/Snackbar',
  component: SnackbarStoryHost,
  argTypes: {
    color: {
      control: 'select',
      options: ['neutral', 'success', 'error', 'warning', 'info'],
    },
    message: { control: 'text' },
    action: { control: 'text' },
    duration: { control: 'number' },
    dismissible: { control: 'boolean' },
    position: {
      control: 'select',
      options: ['bottom', 'top'],
    },
  },
  args: {
    color: 'neutral',
    message: 'File deleted',
    action: 'Undo',
    duration: 4000,
    dismissible: true,
    position: 'bottom',
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [SnackbarStoryHost],
    },
    template: `
      <el-snackbar-story-host
        [message]="message"
        [action]="action"
        [color]="color"
        [duration]="duration"
        [dismissible]="dismissible"
        [position]="position"
      />
    `,
  }),
};

export default meta;
type Story = StoryObj<SnackbarStoryHost>;

export const Default: Story = {};

export const Success: Story = {
  args: { color: 'success', message: 'Saved', action: '' },
};

export const Error: Story = {
  args: { color: 'error', message: 'Could not save', action: 'Retry' },
};

export const Top: Story = {
  args: { position: 'top', message: 'Pinned to the top' },
};

export const Sticky: Story = {
  args: { duration: 0, message: 'Stays until dismissed' },
};

export const Service: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [SnackbarServiceStoryHost],
    },
    template: `<el-snackbar-service-story-host />`,
  }),
};

export const BulkActions: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [SnackbarBulkStoryHost],
    },
    template: `<el-snackbar-bulk-story-host />`,
  }),
};

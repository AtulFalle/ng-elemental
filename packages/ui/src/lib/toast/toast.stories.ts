import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect } from 'storybook/test';
import { ElButton } from '../button/button';
import { ElToast } from './toast';
import { ElToastService } from './toast.service';
import { ElToaster } from './toaster';

@Component({
  selector: 'el-toast-interactions-host',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ElButton, ElToast, ElToaster],
  template: `
    <el-toaster />
    <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center">
      <el-button (click)="show()">Show toast</el-button>
      <el-toast color="success" title="Saved">Your changes were written.</el-toast>
    </div>
  `,
})
class ToastInteractionsHost {
  private readonly toast = inject(ElToastService);

  protected show(): void {
    this.toast.show('Saved to your library.', {
      color: 'success',
      title: 'Saved',
      duration: 0,
    });
  }
}

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

export const Interactions: Story = {
  name: 'Interactions',
  tags: ['!test'],
  render: () => ({
    moduleMetadata: { imports: [ToastInteractionsHost] },
    template: `<el-toast-interactions-host />`,
  }),
  play: async ({ canvas, userEvent, step }) => {
    await step('Presentational toast uses role status', async () => {
      const status = canvas.getByRole('status');
      await expect(status).toHaveTextContent('Saved');
    });

    await step('Service toast appears and dismisses', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Show toast' }));
      const toast = await canvas.findByText('Saved to your library.');
      await expect(toast).toBeVisible();
      const dismissButtons = canvas.getAllByRole('button', { name: 'Dismiss' });
      await userEvent.click(dismissButtons[dismissButtons.length - 1]);
      await expect(canvas.queryByText('Saved to your library.')).not.toBeInTheDocument();
    });
  },
};

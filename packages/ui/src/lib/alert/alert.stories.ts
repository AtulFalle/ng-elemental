import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect, fn } from 'storybook/test';
import { ElAlert } from './alert';

@Component({
  selector: 'el-alert-interactions-host',
  imports: [ElAlert],
  template: `
    <div style="display: flex; flex-direction: column; gap: 0.75rem; max-width: 28rem">
      <el-alert color="info">Something needs your attention.</el-alert>
      <el-alert color="error" title="Could not save">Check your connection.</el-alert>
      @if (showDismissible()) {
        <el-alert
          color="success"
          title="Saved"
          dismissible
          (dismissed)="onDismiss()"
        >
          Your changes were written.
        </el-alert>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class AlertInteractionsHost {
  protected readonly showDismissible = signal(true);
  readonly dismissed = fn();

  protected onDismiss(): void {
    this.dismissed();
    this.showDismissible.set(false);
  }
}

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

export const Interactions: Story = {
  name: 'Interactions',
  tags: ['!test'],
  render: () => ({
    moduleMetadata: { imports: [AlertInteractionsHost] },
    template: `<el-alert-interactions-host />`,
  }),
  play: async ({ canvas, userEvent, step }) => {
    await step('Info uses role status', async () => {
      const statuses = canvas.getAllByRole('status');
      await expect(statuses[0]).toHaveTextContent('Something needs your attention.');
    });

    await step('Error uses role alert', async () => {
      const error = canvas.getByRole('alert');
      await expect(error).toHaveTextContent('Could not save');
    });

    await step('Dismissible closes on pointer', async () => {
      const dismiss = canvas.getByRole('button', { name: 'Dismiss' });
      await userEvent.click(dismiss);
      await expect(canvas.queryByText('Your changes were written.')).not.toBeInTheDocument();
    });
  },
};

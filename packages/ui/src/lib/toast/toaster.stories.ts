import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular-vite';
import { ElButton } from '../button/button';
import { ElToastService } from './toast.service';
import { ElToaster } from './toaster';

@Component({
  selector: 'el-toaster-story',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ElButton, ElToaster],
  template: `
    <el-toaster />
    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
      <el-button (click)="show('neutral')">Neutral</el-button>
      <el-button (click)="show('success')">Success</el-button>
      <el-button (click)="show('error')">Error</el-button>
      <el-button (click)="show('warning')">Warning</el-button>
      <el-button (click)="show('info')">Info</el-button>
    </div>
  `,
})
class ElToasterStory {
  private readonly toast = inject(ElToastService);

  protected show(color: 'neutral' | 'success' | 'error' | 'warning' | 'info'): void {
    this.toast.show(`This is a ${color} toast.`, {
      color,
      title: color === 'neutral' ? '' : color,
      duration: 0,
    });
  }
}

const meta: Meta = {
  title: 'Components/Toast/Toaster',
  component: ElToaster,
  render: () => ({
    moduleMetadata: {
      imports: [ElToasterStory],
    },
    template: `<el-toaster-story />`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Stacked: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [ElToasterStackedStory],
    },
    template: `<el-toaster-stacked-story />`,
  }),
};

@Component({
  selector: 'el-toaster-stacked-story',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ElToaster],
  template: `<el-toaster />`,
})
class ElToasterStackedStory {
  constructor() {
    const toast = inject(ElToastService);
    toast.show('Saved successfully.', { color: 'success', duration: 0 });
    toast.show('Could not save changes.', { color: 'error', title: 'Error', duration: 0 });
    toast.show('A newer version is available.', { color: 'info', duration: 0 });
  }
}

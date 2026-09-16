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
    <el-button (click)="show()">Save</el-button>
  `,
})
class ElToasterStory {
  private readonly toast = inject(ElToastService);

  protected show(): void {
    this.toast.show('Saved to your library.', {
      color: 'success',
      title: 'Saved',
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
    toast.show('Saved to your library.', { color: 'success', title: 'Saved', duration: 0 });
    toast.show('Check your connection and try again.', {
      color: 'error',
      title: 'Could not save',
      duration: 0,
    });
    toast.show('A newer version is available.', { color: 'info', duration: 0 });
  }
}

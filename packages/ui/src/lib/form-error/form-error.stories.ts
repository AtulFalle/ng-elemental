import type { Meta, StoryObj } from '@storybook/angular-vite';
import { signal } from '@angular/core';
import { ElInput } from '../input/input';
import { ElLabel } from '../label/label';
import { ElFormError } from './form-error';

const meta: Meta<ElFormError> = {
  title: 'Components/FormError',
  component: ElFormError,
  render: () => ({
    props: {
      email: signal(''),
      invalid: signal(true),
    },
    moduleMetadata: {
      imports: [ElFormError, ElLabel, ElInput],
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.375rem; max-width: 24rem;">
        <el-label htmlFor="story-email" required>Email</el-label>
        <el-input
          inputId="story-email"
          [(value)]="email"
          [error]="invalid()"
          [attr.aria-describedby]="invalid() ? 'story-email-err' : null"
        />
        @if (invalid()) {
          <el-form-error id="story-email-err">Email is required</el-form-error>
        }
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<ElFormError>;

export const Default: Story = {};

export const MessageOnly: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [ElFormError],
    },
    template: `<el-form-error>Something went wrong</el-form-error>`,
  }),
};

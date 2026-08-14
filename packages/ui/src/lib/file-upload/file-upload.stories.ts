import type { Meta, StoryObj } from '@storybook/angular-vite';
import { signal } from '@angular/core';
import { ElFileUpload } from './file-upload';

const meta: Meta<ElFileUpload> = {
  title: 'Components/File Upload',
  component: ElFileUpload,
  argTypes: {
    multiple: { control: 'boolean' },
    accept: { control: 'text' },
    disabled: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    browseLabel: { control: 'text' },
    dropTitle: { control: 'text' },
  },
  args: {
    multiple: false,
    accept: '',
    disabled: false,
    size: 'md',
    browseLabel: 'Browse files',
    dropTitle: 'Drop files here',
  },
  render: (args) => {
    const files = signal<File[]>([]);
    return {
      props: { ...args, files },
      moduleMetadata: { imports: [ElFileUpload] },
      template: `
        <el-file-upload
          style="max-width: 28rem"
          [(files)]="files"
          [multiple]="multiple"
          [accept]="accept"
          [disabled]="disabled"
          [size]="size"
          [browseLabel]="browseLabel"
          [dropTitle]="dropTitle"
        >
          Drag and drop, or browse to select a file
        </el-file-upload>
      `,
    };
  },
};

export default meta;
type Story = StoryObj<ElFileUpload>;

export const Default: Story = {};

export const Multiple: Story = {
  args: {
    multiple: true,
    accept: 'image/*,.pdf',
    dropTitle: 'Drop images or PDFs',
  },
  render: (args) => {
    const files = signal<File[]>([]);
    return {
      props: { ...args, files, maxFiles: 5, maxSize: 5 * 1024 * 1024 },
      moduleMetadata: { imports: [ElFileUpload] },
      template: `
        <el-file-upload
          style="max-width: 28rem"
          [(files)]="files"
          multiple
          accept="image/*,.pdf"
          [maxFiles]="maxFiles"
          [maxSize]="maxSize"
          [size]="size"
        >
          PNG, JPG, or PDF — up to 5 files, 5 MB each
        </el-file-upload>
      `,
    };
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};

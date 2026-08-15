import type { Meta, StoryObj } from '@storybook/angular-vite';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { ElAttachment } from '../attachment/attachment';
import { ElAttachmentAction } from '../attachment/attachment-action';
import { ElAttachmentActions } from '../attachment/attachment-actions';
import { ElAttachmentContent } from '../attachment/attachment-content';
import { ElAttachmentDescription } from '../attachment/attachment-description';
import { ElAttachmentMedia } from '../attachment/attachment-media';
import { ElAttachmentTitle } from '../attachment/attachment-title';
import { ElIcon } from '../icon/icon';
import { ElProgress } from '../progress/progress';
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

interface DemoUpload {
  readonly name: string;
  readonly icon: string;
  readonly description: string;
  readonly progress: number;
  readonly state: 'uploading' | 'processing' | 'done' | 'error';
}

/**
 * Demo host: FileUpload for selection + Attachment/Progress for app-owned upload UI.
 * Stories must not ship in the CLI registry.
 */
@Component({
  selector: 'el-file-upload-progress-story',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ElFileUpload,
    ElAttachment,
    ElAttachmentMedia,
    ElAttachmentContent,
    ElAttachmentTitle,
    ElAttachmentDescription,
    ElAttachmentActions,
    ElAttachmentAction,
    ElIcon,
    ElProgress,
  ],
  template: `
    <div class="story" style="display: grid; gap: 1.25rem; max-width: 28rem">
      <el-file-upload [(files)]="files" multiple accept="image/*,.pdf,.zip">
        Select files, then use Attachment + Progress for upload status (app-owned).
      </el-file-upload>

      <div style="display: grid; gap: 0.75rem">
        <p
          style="
            margin: 0;
            font: 600 0.8125rem/1.3 var(--el-font-sans, system-ui);
            color: var(--el-color-on-surface-variant);
          "
        >
          Upload progress (compose ElProgress with ElAttachment)
        </p>

        @for (item of uploads(); track item.name) {
          <div style="display: grid; gap: 0.375rem">
            <el-attachment [state]="item.state" size="md">
              <el-attachment-media>
                <el-icon [name]="item.icon" />
              </el-attachment-media>
              <el-attachment-content>
                <el-attachment-title>{{ item.name }}</el-attachment-title>
                <el-attachment-description>{{
                  item.description
                }}</el-attachment-description>
              </el-attachment-content>
              <el-attachment-actions>
                @if (item.state === 'uploading' || item.state === 'processing') {
                  <el-attachment-action
                    [ariaLabel]="'Cancel ' + item.name"
                    icon="xmark"
                  />
                } @else if (item.state === 'error') {
                  <el-attachment-action
                    [ariaLabel]="'Retry ' + item.name"
                    icon="rotate-right"
                  />
                } @else {
                  <el-attachment-action
                    [ariaLabel]="'Remove ' + item.name"
                    icon="xmark"
                  />
                }
              </el-attachment-actions>
            </el-attachment>
            <el-progress
              [value]="item.progress"
              [indeterminate]="item.state === 'processing'"
              size="sm"
              [showValue]="item.state !== 'processing'"
            />
          </div>
        }
      </div>
    </div>
  `,
})
class FileUploadProgressStory {
  readonly files = signal<File[]>([]);
  readonly uploads = signal<DemoUpload[]>([
    {
      name: 'design-system.zip',
      icon: 'file-zipper',
      description: 'Uploading · 12%',
      progress: 12,
      state: 'uploading',
    },
    {
      name: 'briefing-notes.pdf',
      icon: 'file-pdf',
      description: 'Processing document',
      progress: 100,
      state: 'processing',
    },
    {
      name: 'workspace.png',
      icon: 'file-image',
      description: 'Uploaded · 820 KB',
      progress: 100,
      state: 'done',
    },
  ]);

  constructor() {
    const destroyRef = inject(DestroyRef);
    const timer = window.setInterval(() => {
      this.uploads.update((items) =>
        items.map((item) => {
          if (item.state !== 'uploading') {
            return item;
          }
          const next = Math.min(100, item.progress + 4);
          if (next >= 100) {
            return {
              ...item,
              progress: 100,
              state: 'done',
              description: 'Uploaded · 2.4 MB',
            };
          }
          return {
            ...item,
            progress: next,
            description: `Uploading · ${next}%`,
          };
        }),
      );
    }, 350);

    destroyRef.onDestroy(() => window.clearInterval(timer));
  }
}

/** App-owned upload progress via ElAttachment + ElProgress (not built into FileUpload). */
export const WithProgress: Story = {
  render: () => ({
    moduleMetadata: { imports: [FileUploadProgressStory] },
    template: `<el-file-upload-progress-story />`,
  }),
};

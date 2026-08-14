import type { Meta, StoryObj } from '@storybook/angular-vite';
import { ElIcon } from '../icon/icon';
import { ElAttachment } from './attachment';
import { ElAttachmentAction } from './attachment-action';
import { ElAttachmentActions } from './attachment-actions';
import { ElAttachmentContent } from './attachment-content';
import { ElAttachmentDescription } from './attachment-description';
import { ElAttachmentGroup } from './attachment-group';
import { ElAttachmentMedia } from './attachment-media';
import { ElAttachmentTitle } from './attachment-title';

const ATTACHMENT_IMPORTS = [
  ElAttachment,
  ElAttachmentMedia,
  ElAttachmentContent,
  ElAttachmentTitle,
  ElAttachmentDescription,
  ElAttachmentActions,
  ElAttachmentAction,
  ElAttachmentGroup,
  ElIcon,
];

const meta: Meta = {
  title: 'Components/Attachment',
  argTypes: {
    state: {
      control: 'select',
      options: ['idle', 'uploading', 'processing', 'error', 'done'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
  args: {
    state: 'done',
    size: 'md',
    orientation: 'horizontal',
  },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: ATTACHMENT_IMPORTS },
    template: `
      <el-attachment [state]="state" [size]="size" [orientation]="orientation" style="max-width: 22rem">
        <el-attachment-media>
          <el-icon name="file-lines" />
        </el-attachment-media>
        <el-attachment-content>
          <el-attachment-title>sales-dashboard.pdf</el-attachment-title>
          <el-attachment-description>PDF · 2.4 MB</el-attachment-description>
        </el-attachment-content>
        <el-attachment-actions>
          <el-attachment-action ariaLabel="Remove sales-dashboard.pdf" />
        </el-attachment-actions>
      </el-attachment>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Uploading: Story = {
  args: { state: 'uploading' },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: ATTACHMENT_IMPORTS },
    template: `
      <el-attachment [state]="state" style="max-width: 22rem">
        <el-attachment-media>
          <el-icon name="file-lines" />
        </el-attachment-media>
        <el-attachment-content>
          <el-attachment-title>design-system.zip</el-attachment-title>
          <el-attachment-description>Uploading · 64%</el-attachment-description>
        </el-attachment-content>
        <el-attachment-actions>
          <el-attachment-action ariaLabel="Cancel upload" icon="xmark" />
        </el-attachment-actions>
      </el-attachment>
    `,
  }),
};

export const Error: Story = {
  args: { state: 'error' },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: ATTACHMENT_IMPORTS },
    template: `
      <el-attachment [state]="state" style="max-width: 22rem">
        <el-attachment-media>
          <el-icon name="file-excel" />
        </el-attachment-media>
        <el-attachment-content>
          <el-attachment-title>financial-model.xlsx</el-attachment-title>
          <el-attachment-description>Upload failed. Try again.</el-attachment-description>
        </el-attachment-content>
        <el-attachment-actions>
          <el-attachment-action ariaLabel="Retry financial-model.xlsx" icon="rotate-right" />
        </el-attachment-actions>
      </el-attachment>
    `,
  }),
};

export const ImageVertical: Story = {
  args: { orientation: 'vertical', state: 'done' },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: ATTACHMENT_IMPORTS },
    template: `
      <el-attachment [state]="state" [orientation]="orientation" style="max-width: 12rem">
        <el-attachment-media variant="image">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=320&q=80"
            alt=""
          />
        </el-attachment-media>
        <el-attachment-content>
          <el-attachment-title>workspace.png</el-attachment-title>
          <el-attachment-description>PNG · 820 KB</el-attachment-description>
        </el-attachment-content>
        <el-attachment-actions>
          <el-attachment-action ariaLabel="Remove workspace.png" />
        </el-attachment-actions>
      </el-attachment>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    moduleMetadata: { imports: ATTACHMENT_IMPORTS },
    template: `
      <div style="display: grid; gap: 0.75rem; max-width: 22rem">
        @for (size of ['lg', 'md', 'sm']; track size) {
          <el-attachment [size]="size" state="done">
            <el-attachment-media>
              <el-icon name="file-lines" />
            </el-attachment-media>
            <el-attachment-content>
              <el-attachment-title>{{ size }} attachment</el-attachment-title>
              <el-attachment-description>PDF · 2.4 MB</el-attachment-description>
            </el-attachment-content>
            <el-attachment-actions>
              <el-attachment-action [ariaLabel]="'Remove ' + size" />
            </el-attachment-actions>
          </el-attachment>
        }
      </div>
    `,
  }),
};

export const Group: Story = {
  render: () => ({
    moduleMetadata: { imports: ATTACHMENT_IMPORTS },
    template: `
      <el-attachment-group ariaLabel="Recent files" style="max-width: 28rem">
        <el-attachment state="done">
          <el-attachment-media>
            <el-icon name="file-lines" />
          </el-attachment-media>
          <el-attachment-content>
            <el-attachment-title>briefing-notes.pdf</el-attachment-title>
            <el-attachment-description>PDF · 1.4 MB</el-attachment-description>
          </el-attachment-content>
        </el-attachment>
        <el-attachment state="done" orientation="vertical">
          <el-attachment-media variant="image">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=320&q=80"
              alt=""
            />
          </el-attachment-media>
          <el-attachment-content>
            <el-attachment-title>workspace.png</el-attachment-title>
            <el-attachment-description>PNG · 820 KB</el-attachment-description>
          </el-attachment-content>
        </el-attachment>
        <el-attachment state="done">
          <el-attachment-media>
            <el-icon name="file-code" />
          </el-attachment-media>
          <el-attachment-content>
            <el-attachment-title>renderer.tsx</el-attachment-title>
            <el-attachment-description>TSX · 12 KB</el-attachment-description>
          </el-attachment-content>
        </el-attachment>
      </el-attachment-group>
    `,
  }),
};

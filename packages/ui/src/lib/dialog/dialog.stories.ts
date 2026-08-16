import type { Meta, StoryObj } from '@storybook/angular-vite';
import { ElButton } from '../button/button';
import { ElDialog } from './dialog';
import { ElDialogClose } from './dialog-close';
import {
  DialogServiceStoryHost,
  DialogStoryHost,
  DialogWizardStoryHost,
} from '../../stories/dialog.story-host';

const meta: Meta<DialogStoryHost> = {
  title: 'Components/Dialog',
  component: DialogStoryHost,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    title: { control: 'text' },
    closable: { control: 'boolean' },
    closeOnBackdrop: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
  },
  args: {
    title: 'Edit profile',
    size: 'md',
    closable: true,
    closeOnBackdrop: true,
    closeOnEscape: true,
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [DialogStoryHost],
    },
    template: `
      <el-dialog-story-host
        [title]="title"
        [size]="size"
        [closable]="closable"
        [closeOnBackdrop]="closeOnBackdrop"
        [closeOnEscape]="closeOnEscape"
      />
    `,
  }),
};

export default meta;
type Story = StoryObj<DialogStoryHost>;

export const Default: Story = {};

export const Small: Story = {
  args: { size: 'sm', title: 'Confirm' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

export const CustomHeader: Story = {
  render: () => ({
    props: { open: false },
    moduleMetadata: {
      imports: [ElDialog, ElDialogClose, ElButton],
    },
    template: `
      <el-button (click)="open = true">Custom header</el-button>
      <el-dialog [open]="open" (openChange)="open = $event" size="sm">
        <div elDialogHeader>
          <span style="font-weight: 600">Discard draft?</span>
        </div>
        <div elDialogContent>
          Unsaved paragraphs will be lost.
        </div>
        <div elDialogFooter>
          <el-button elDialogClose variant="ghost">Keep editing</el-button>
          <el-button (click)="open = false">Discard</el-button>
        </div>
      </el-dialog>
    `,
  }),
};

export const Service: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [DialogServiceStoryHost],
    },
    template: `<el-dialog-service-story-host />`,
  }),
};

export const Wizard: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [DialogWizardStoryHost],
    },
    template: `<el-dialog-wizard-story-host />`,
  }),
};

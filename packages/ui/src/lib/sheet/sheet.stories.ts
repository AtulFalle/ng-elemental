import type { Meta, StoryObj } from '@storybook/angular-vite';
import { ElButton } from '../button/button';
import { ElSheet } from './sheet';
import { ElSheetClose } from './sheet-close';
import {
  SheetServiceStoryHost,
  SheetStoryHost,
} from '../../stories/sheet.story-host';

const meta: Meta<SheetStoryHost> = {
  title: 'Components/Sheet',
  component: SheetStoryHost,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
    title: { control: 'text' },
    closable: { control: 'boolean' },
    closeOnBackdrop: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
  },
  args: {
    title: 'Filters',
    size: 'md',
    side: 'bottom',
    closable: true,
    closeOnBackdrop: true,
    closeOnEscape: true,
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [SheetStoryHost],
    },
    template: `
      <el-sheet-story-host
        [title]="title"
        [size]="size"
        [side]="side"
        [closable]="closable"
        [closeOnBackdrop]="closeOnBackdrop"
        [closeOnEscape]="closeOnEscape"
      />
    `,
  }),
};

export default meta;
type Story = StoryObj<SheetStoryHost>;

export const Default: Story = {};

export const Left: Story = {
  args: { side: 'left', title: 'Details' },
};

export const Right: Story = {
  args: { side: 'right', title: 'Details' },
};

export const Top: Story = {
  args: { side: 'top', size: 'sm', title: 'Status' },
};

export const CustomHeader: Story = {
  render: () => ({
    props: { open: false },
    moduleMetadata: {
      imports: [ElSheet, ElSheetClose, ElButton],
    },
    template: `
      <el-button (click)="open = true">Custom header</el-button>
      <el-sheet [open]="open" (openChange)="open = $event" size="sm">
        <div elSheetHeader>
          <span style="font-weight: 600">Discard draft?</span>
        </div>
        <div elSheetContent>
          Unsaved paragraphs will be lost.
        </div>
        <div elSheetFooter>
          <el-button elSheetClose variant="ghost">Keep editing</el-button>
          <el-button (click)="open = false">Discard</el-button>
        </div>
      </el-sheet>
    `,
  }),
};

export const Service: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [SheetServiceStoryHost],
    },
    template: `<el-sheet-service-story-host />`,
  }),
};

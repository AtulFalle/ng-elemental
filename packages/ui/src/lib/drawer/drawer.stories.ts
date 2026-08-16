import type { Meta, StoryObj } from '@storybook/angular-vite';
import { ElButton } from '../button/button';
import { ElDrawer } from './drawer';
import { ElDrawerClose } from './drawer-close';
import {
  DrawerServiceStoryHost,
  DrawerStoryHost,
} from '../../stories/drawer.story-host';

const meta: Meta<DrawerStoryHost> = {
  title: 'Components/Drawer',
  component: DrawerStoryHost,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    side: {
      control: 'select',
      options: ['left', 'right'],
    },
    title: { control: 'text' },
    closable: { control: 'boolean' },
    closeOnBackdrop: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
  },
  args: {
    title: 'Navigation',
    size: 'md',
    side: 'left',
    closable: true,
    closeOnBackdrop: true,
    closeOnEscape: true,
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [DrawerStoryHost],
    },
    template: `
      <el-drawer-story-host
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
type Story = StoryObj<DrawerStoryHost>;

export const Default: Story = {};

export const Right: Story = {
  args: { side: 'right', title: 'Account' },
};

export const Small: Story = {
  args: { size: 'sm', title: 'Menu' },
};

export const CustomHeader: Story = {
  render: () => ({
    props: { open: false },
    moduleMetadata: {
      imports: [ElDrawer, ElDrawerClose, ElButton],
    },
    template: `
      <el-button (click)="open = true">Custom header</el-button>
      <el-drawer [open]="open" (openChange)="open = $event" size="sm">
        <div elDrawerHeader>
          <span style="font-weight: 600">Workspace</span>
        </div>
        <div elDrawerContent>
          Switch projects or sign out.
        </div>
        <div elDrawerFooter>
          <el-button elDrawerClose variant="ghost">Close</el-button>
        </div>
      </el-drawer>
    `,
  }),
};

export const Service: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [DrawerServiceStoryHost],
    },
    template: `<el-drawer-service-story-host />`,
  }),
};

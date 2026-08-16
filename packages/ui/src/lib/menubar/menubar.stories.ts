import type { Meta, StoryObj } from '@storybook/angular-vite';
import { ElButton } from '../button/button';
import {
  ElMenu,
  ElMenuItem,
  ElMenuPanel,
  ElMenuSeparator,
  ElMenuTrigger,
} from '../menu/menu';
import { ElMenubar } from './menubar';

const IMPORTS = [
  ElMenubar,
  ElMenu,
  ElMenuItem,
  ElMenuPanel,
  ElMenuSeparator,
  ElMenuTrigger,
  ElButton,
];

const meta: Meta<ElMenubar> = {
  title: 'Components/Menubar',
  component: ElMenubar,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
  args: {
    size: 'md',
    ariaLabel: 'Application',
  },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: IMPORTS },
    template: `
      <div style="min-height: 16rem">
        <el-menubar [size]="size" [ariaLabel]="ariaLabel">
          <el-menu>
            <el-button elMenuTrigger variant="ghost" size="sm">File</el-button>
            <el-menu-panel>
              <el-menu-item icon="file">New</el-menu-item>
              <el-menu-item icon="folder-open">Open</el-menu-item>
              <el-menu-separator />
              <el-menu-item>Save</el-menu-item>
            </el-menu-panel>
          </el-menu>
          <el-menu>
            <el-button elMenuTrigger variant="ghost" size="sm">Edit</el-button>
            <el-menu-panel>
              <el-menu-item shortcut="Ctrl+Z">Undo</el-menu-item>
              <el-menu-item shortcut="Ctrl+Y">Redo</el-menu-item>
              <el-menu>
                <el-menu-item elMenuTrigger>Find</el-menu-item>
                <el-menu-panel>
                  <el-menu-item>Find in file</el-menu-item>
                  <el-menu-item>Find in project</el-menu-item>
                </el-menu-panel>
              </el-menu>
            </el-menu-panel>
          </el-menu>
          <el-menu>
            <el-button elMenuTrigger variant="ghost" size="sm">View</el-button>
            <el-menu-panel>
              <el-menu-item>Command palette</el-menu-item>
              <el-menu-item>Appearance</el-menu-item>
            </el-menu-panel>
          </el-menu>
        </el-menubar>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<ElMenubar>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => ({
    moduleMetadata: { imports: IMPORTS },
    template: `
      <div style="display: grid; gap: 1rem; min-height: 8rem">
        <el-menubar size="sm" ariaLabel="Small">
          <el-menu>
            <el-button elMenuTrigger variant="ghost" size="sm">File</el-button>
            <el-menu-panel>
              <el-menu-item>New</el-menu-item>
            </el-menu-panel>
          </el-menu>
          <el-menu>
            <el-button elMenuTrigger variant="ghost" size="sm">Edit</el-button>
            <el-menu-panel>
              <el-menu-item>Undo</el-menu-item>
            </el-menu-panel>
          </el-menu>
        </el-menubar>
        <el-menubar size="lg" ariaLabel="Large">
          <el-menu>
            <el-button elMenuTrigger variant="ghost">File</el-button>
            <el-menu-panel>
              <el-menu-item>New</el-menu-item>
            </el-menu-panel>
          </el-menu>
        </el-menubar>
      </div>
    `,
  }),
};

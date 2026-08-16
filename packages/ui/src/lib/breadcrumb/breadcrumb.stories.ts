import type { Meta, StoryObj } from '@storybook/angular-vite';
import { ElBreadcrumb } from './breadcrumb';
import { ElBreadcrumbItem } from './breadcrumb-item';

const meta: Meta<ElBreadcrumb> = {
  title: 'Components/Breadcrumb',
  component: ElBreadcrumb,
  render: () => ({
    moduleMetadata: {
      imports: [ElBreadcrumb, ElBreadcrumbItem],
    },
    template: `
      <el-breadcrumb ariaLabel="Breadcrumb">
        <el-breadcrumb-item href="/">Home</el-breadcrumb-item>
        <el-breadcrumb-item href="/docs">Components</el-breadcrumb-item>
        <el-breadcrumb-item current>Chip</el-breadcrumb-item>
      </el-breadcrumb>
    `,
  }),
};

export default meta;
type Story = StoryObj<ElBreadcrumb>;

export const Default: Story = {};

export const CurrentPage: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [ElBreadcrumb, ElBreadcrumbItem],
    },
    template: `
      <el-breadcrumb>
        <el-breadcrumb-item href="/">Home</el-breadcrumb-item>
        <el-breadcrumb-item current>Overview</el-breadcrumb-item>
      </el-breadcrumb>
    `,
  }),
};

export const LongText: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [ElBreadcrumb, ElBreadcrumbItem],
    },
    template: `
      <div style="max-width: 22rem;">
        <el-breadcrumb>
          <el-breadcrumb-item href="/">Home</el-breadcrumb-item>
          <el-breadcrumb-item href="/workspace">Product documentation</el-breadcrumb-item>
          <el-breadcrumb-item current>
            Quarterly planning notes for the North American regional strategy review
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    `,
  }),
};

export const CustomLinkContent: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [ElBreadcrumb, ElBreadcrumbItem],
    },
    template: `
      <el-breadcrumb>
        <el-breadcrumb-item>
          <a href="/docs">Docs</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item current>Breadcrumb</el-breadcrumb-item>
      </el-breadcrumb>
    `,
  }),
};

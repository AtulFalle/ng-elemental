import type { Meta, StoryObj } from '@storybook/angular-vite';
import { ElButton } from '../button/button';
import { ElEmptyState } from './empty-state';

const meta: Meta<ElEmptyState> = {
  title: 'Components/Empty State',
  component: ElEmptyState,
  argTypes: {
    icon: { control: 'text' },
    title: { control: 'text' },
    description: { control: 'text' },
  },
  args: {
    icon: 'folder-open',
    title: 'No projects',
    description: 'Create a project to get started.',
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [ElEmptyState, ElButton],
    },
    template: `
      <el-empty-state [icon]="icon" [title]="title" [description]="description">
        <div elEmptyStateActions>
          <el-button>Create project</el-button>
          <el-button variant="ghost">Learn more</el-button>
        </div>
      </el-empty-state>
    `,
  }),
};

export default meta;
type Story = StoryObj<ElEmptyState>;

export const Default: Story = {};

export const IconOnly: Story = {
  args: {
    title: 'Inbox zero',
    description: 'You are all caught up.',
    icon: 'inbox',
  },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [ElEmptyState] },
    template: `<el-empty-state [icon]="icon" [title]="title" [description]="description" />`,
  }),
};

export const WithExtraContent: Story = {
  args: {
    icon: 'magnifying-glass',
    title: 'No results',
    description: 'Try a different search term.',
  },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [ElEmptyState, ElButton] },
    template: `
      <el-empty-state [icon]="icon" [title]="title" [description]="description">
        Filters are still applied.
        <div elEmptyStateActions>
          <el-button variant="secondary">Clear filters</el-button>
        </div>
      </el-empty-state>
    `,
  }),
};

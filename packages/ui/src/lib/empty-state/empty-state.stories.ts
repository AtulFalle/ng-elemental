import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect, fn } from 'storybook/test';
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

export const Interactions: Story = {
  name: 'Interactions',
  tags: ['!test'],
  render: () => ({
    moduleMetadata: { imports: [ElEmptyState, ElButton] },
    template: `
      <el-empty-state
        icon="folder-open"
        title="No projects"
        description="Create a project to get started."
      >
        <div elEmptyStateActions>
          <el-button>Create project</el-button>
          <el-button variant="ghost">Learn more</el-button>
        </div>
      </el-empty-state>
    `,
  }),
  play: async ({ canvas, userEvent, step }) => {
    await step('Announces empty status', async () => {
      const status = canvas.getByRole('status');
      await expect(status).toHaveTextContent('No projects');
      await expect(status).toHaveTextContent('Create a project to get started.');
    });

    const primary = canvas.getByRole('button', { name: 'Create project' });
    const secondary = canvas.getByRole('button', { name: 'Learn more' });
    const onPrimary = fn();
    const onSecondary = fn();
    primary.addEventListener('click', onPrimary);
    secondary.addEventListener('click', onSecondary);

    await step('Pointer activates actions', async () => {
      await userEvent.click(primary);
      await expect(onPrimary).toHaveBeenCalledTimes(1);
    });

    await step('Keyboard activates actions', async () => {
      secondary.focus();
      await expect(secondary).toHaveFocus();
      await userEvent.keyboard('{Enter}');
      await expect(onSecondary).toHaveBeenCalledTimes(1);
    });
  },
};

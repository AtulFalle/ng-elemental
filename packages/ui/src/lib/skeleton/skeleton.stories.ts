import type { Meta, StoryObj } from '@storybook/angular-vite';
import { ElButton } from '../button/button';
import { ElInput } from '../input/input';
import { ElSkeleton, ElSkeletonDirective } from './skeleton';

const meta: Meta<ElSkeleton> = {
  title: 'Components/Skeleton',
  component: ElSkeleton,
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circular', 'rectangular'],
    },
    animation: { control: 'boolean' },
    lines: { control: { type: 'number', min: 1, max: 8 } },
    width: { control: 'text' },
    height: { control: 'text' },
  },
  args: {
    variant: 'text',
    animation: true,
    lines: 1,
    width: '',
    height: '',
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [ElSkeleton],
    },
    template: `<el-skeleton
      [variant]="variant"
      [animation]="animation"
      [lines]="lines"
      [width]="width"
      [height]="height"
      style="max-width: 20rem"
    />`,
  }),
};

export default meta;
type Story = StoryObj<ElSkeleton>;

export const Text: Story = {};

export const Multiline: Story = {
  args: { lines: 3 },
};

export const Circular: Story = {
  args: { variant: 'circular' },
};

export const Rectangular: Story = {
  args: { variant: 'rectangular', height: '8rem' },
};

export const NoAnimation: Story = {
  args: { lines: 3, animation: false },
};

export const ProfileCard: Story = {
  render: () => ({
    moduleMetadata: { imports: [ElSkeleton] },
    template: `
      <div style="display: flex; gap: 1rem; max-width: 20rem; align-items: flex-start;">
        <el-skeleton variant="circular" width="2.5rem" height="2.5rem" />
        <div style="flex: 1; display: flex; flex-direction: column; gap: 0.5rem;">
          <el-skeleton [lines]="2" />
          <el-skeleton variant="rectangular" height="4rem" />
        </div>
      </div>
    `,
  }),
};

export const OnHost: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [ElSkeletonDirective, ElButton, ElInput],
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 20rem;">
        <el-button elSkeleton>Save changes</el-button>
        <el-input elSkeleton placeholder="Email" />
        <input
          elSkeleton
          type="text"
          placeholder="Native input"
          style="padding: 0.5rem 0.75rem; border-radius: 0.375rem; font: inherit;"
        />
        <button
          elSkeleton
          type="button"
          style="padding: 0.5rem 0.875rem; border-radius: 0.375rem;"
        >
          Native button
        </button>
        <div
          elSkeleton
          style="height: 4rem; border-radius: 0.5rem; padding: 0.75rem;"
        >
          Card body that will load
        </div>
      </div>
    `,
  }),
};

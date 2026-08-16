import type { Meta, StoryObj } from '@storybook/angular-vite';
import { ElStack } from './stack';

const item =
  'padding: 0.75rem; background: var(--el-color-surface-container); border-radius: var(--el-radius-sm);';

const meta: Meta<ElStack> = {
  title: 'Components/Stack',
  component: ElStack,
  argTypes: {
    direction: { control: 'select', options: ['row', 'column'] },
    gap: { control: 'select', options: ['1', '2', '3', '4', '5', '6', '8'] },
    align: { control: 'select', options: ['start', 'center', 'end', 'stretch'] },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between'],
    },
    wrap: { control: 'boolean' },
  },
  args: {
    direction: 'column',
    gap: '4',
    align: 'stretch',
    justify: 'start',
    wrap: false,
  },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [ElStack] },
    template: `
      <el-stack
        [direction]="direction"
        [gap]="gap"
        [align]="align"
        [justify]="justify"
        [wrap]="wrap"
        style="width: 20rem"
      >
        <div style="${item}">One</div>
        <div style="${item}">Two</div>
        <div style="${item}">Three</div>
      </el-stack>
    `,
  }),
};

export default meta;
type Story = StoryObj<ElStack>;

export const Column: Story = {};

export const Row: Story = {
  args: { direction: 'row', align: 'center' },
};

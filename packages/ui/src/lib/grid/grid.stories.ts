import type { Meta, StoryObj } from '@storybook/angular-vite';
import { ElGrid } from './grid';

const item =
  'padding: 0.75rem; background: var(--el-color-surface-container); border-radius: var(--el-radius-sm);';

const meta: Meta<ElGrid> = {
  title: 'Components/Grid',
  component: ElGrid,
  argTypes: {
    columns: { control: { type: 'number', min: 1, max: 12 } },
    gap: { control: 'select', options: ['1', '2', '3', '4', '5', '6', '8'] },
    minItemWidth: { control: 'text' },
  },
  args: {
    columns: 3,
    gap: '4',
    minItemWidth: '',
  },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [ElGrid] },
    template: `
      <el-grid [columns]="columns" [gap]="gap" [minItemWidth]="minItemWidth">
        <div style="${item}">One</div>
        <div style="${item}">Two</div>
        <div style="${item}">Three</div>
        <div style="${item}">Four</div>
        <div style="${item}">Five</div>
        <div style="${item}">Six</div>
      </el-grid>
    `,
  }),
};

export default meta;
type Story = StoryObj<ElGrid>;

export const ThreeColumns: Story = {};

export const AutoFit: Story = {
  args: { minItemWidth: '12rem' },
};
